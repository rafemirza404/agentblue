/**
 * useVoiceCallFlow Hook
 * Main business logic for voice call feature
 * Prevents stale closure bugs by using refs
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useCallState } from './useCallState';
import { useRateLimit } from './useRateLimit';
import { vapiService } from '@/services/api/vapi';
import { webhookService } from '@/services/api/webhooks';
import { storageService } from '@/services/storage/localStorage';
import { mobileAudioHandler } from '@/utils/mobileAudioHandler';
import { logCallDiagnostics, serializeError, isSlowNetwork } from '@/utils/callDiagnostics';
import { CALL_CONSTANTS } from '@/config/constants';
import type { LeadData, CallData, FeedbackData, CallStatus } from '@/types/models';

export const useVoiceCallFlow = () => {
  const { toast } = useToast();
  const callState = useCallState();
  const { checkRateLimit, saveCallTime } = useRateLimit();

  // Lead data management - using ref to prevent stale closures
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const leadDataRef = useRef<LeadData | null>(null);

  // Call state
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState<CallStatus>('listening');
  const [isMuted, setIsMuted] = useState(false);
  const [callStartTime, setCallStartTime] = useState<Date | null>(null);
  const [vapiCallId, setVapiCallId] = useState<string>('');

  // Feedback state
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  // Timers
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // Guards a stuck "connecting" call so it fails fast instead of hanging.
  const connectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearConnectTimeout = useCallback(() => {
    if (connectTimeoutRef.current) {
      clearTimeout(connectTimeoutRef.current);
      connectTimeoutRef.current = null;
    }
  }, []);

  // Refs for event handlers to access latest state
  const callStateRef = useRef(callState);
  const toastRef = useRef(toast);

  // FIX 1: Mobile audio handler cleanup function
  const mobileAudioCleanupRef = useRef<(() => Promise<void>) | null>(null);

  // Update refs when values change
  useEffect(() => {
    callStateRef.current = callState;
  }, [callState]);

  useEffect(() => {
    toastRef.current = toast;
  }, [toast]);

  /**
   * Update lead data (syncs state + ref + localStorage)
   * This prevents stale closure issues
   */
  const updateLeadData = useCallback((data: LeadData) => {
    console.log('[VoiceCallFlow] Updating lead data:', data);
    leadDataRef.current = data;
    setLeadData(data);
    storageService.saveUserData(data);
  }, []);

  /**
   * Load user data from localStorage on mount
   */
  useEffect(() => {
    const savedUser = storageService.getUserData();
    if (savedUser) {
      leadDataRef.current = savedUser;
      setLeadData(savedUser);
    }
  }, []);

  /**
   * Validate and check rate limit before initiating call
   * FIX 5: Form submission is now fully asynchronous - no blocking
   */
  const validateAndCheckRateLimit = useCallback(async (): Promise<boolean> => {
    const currentData = leadDataRef.current;

    if (!currentData) {
      toast({
        title: 'Error',
        description: 'User data not found. Please fill the form again.',
        variant: 'destructive',
      });
      return false;
    }

    // Check rate limit (client-side only now)
    const isAllowed = await checkRateLimit(currentData);
    if (!isAllowed) {
      return false;
    }

    // FIX 5: Save profile asynchronously in background (fire and forget)
    // User doesn't wait for n8n workflow - call starts immediately
    webhookService.saveProfile({
      name: currentData.name,
      email: currentData.email,
      phone: currentData.phone,
      company: currentData.company,
      role: currentData.role,
    }).catch((error) => {
      // Handle errors silently - don't block the call
      console.error('[Background] Failed to save profile:', error);
    });

    return true;
  }, [checkRateLimit, toast]);

  /**
   * Initiate call - THE CRITICAL FIX FOR FIRST CALL FAILURE
   */
  const initiateCall = useCallback(async () => {
    // CRITICAL: Always use ref, not state, to avoid stale closure
    const currentData = leadDataRef.current;

    if (!currentData) {
      toast({
        title: 'Error',
        description: 'User data not available. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    // FIX 4: Enforce phone number requirement - absolutely mandatory
    if (!currentData.phone || currentData.phone.trim() === '') {
      toast({
        title: 'Phone Number Required',
        description: 'Phone number is required to continue. Please fill out the form.',
        variant: 'destructive',
      });
      callState.transitionTo('ended');
      return;
    }

    // Guard against double-taps / re-entry: only start a call from idle/ended.
    if (callState.isConnecting || callState.isConnected || callState.isEnding) {
      console.warn('[VoiceCallFlow] Call already in progress; ignoring duplicate start');
      return;
    }

    console.log('[VoiceCallFlow] Initiating call with data:', currentData);

    // Immediately transition to connecting state
    callState.transitionTo('connecting');

    // Heads-up for slow connections — weak mobile networks legitimately take
    // 30–80s to load the Daily call-machine bundle + join.
    if (isSlowNetwork()) {
      toast({
        title: 'Slow connection detected',
        description:
          'Connecting may take up to a minute. For best results use Wi-Fi or a stronger signal.',
      });
    }

    // Overall connect guard: if 'call-start' hasn't fired by the timeout, abort
    // with an honest message instead of hanging for 60–80s.
    clearConnectTimeout();
    connectTimeoutRef.current = setTimeout(() => {
      if (!callStateRef.current.isConnecting) return;
      console.warn('[VoiceCallFlow] Connect timed out');
      logCallDiagnostics('connect-timeout');
      vapiService.stop();
      callStateRef.current.transitionTo('ended');
      document.body.style.overflow = 'auto';
      toastRef.current({
        title: "Couldn't connect",
        description:
          'Your network or device may be too slow. Try Wi-Fi or a stronger signal, then try again.',
        variant: 'destructive',
      });
    }, CALL_CONSTANTS.CONNECTION_TIMEOUT_MS);

    // Try to start, with one automatic retry on a network-y start failure.
    // The connect timeout above naturally caps total time, so a slow failure
    // won't stack two long waits.
    const maxAttempts = 2;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const callId = await vapiService.startCall({
          name: currentData.name,
          email: currentData.email,
          company: currentData.company,
          role: currentData.role,
          phone: currentData.phone,
          callSource: 'website',
        });

        // Reliable call-id capture (matches the Vapi dashboard).
        if (callId) setVapiCallId(callId);

        // saveCallTime() + connected transition + timeout clear happen in
        // handleCallStart, once the 'call-start' event actually fires.
        return;
      } catch (error) {
        // If the connect timeout already aborted us, stop retrying.
        if (!callStateRef.current.isConnecting) return;

        if (attempt < maxAttempts) {
          console.warn(`[VoiceCallFlow] Start attempt ${attempt} failed; retrying`, error);
          logCallDiagnostics('connect-retry', {
            error: serializeError(error),
            extra: { attempt },
          });
          toast({
            title: 'Reconnecting…',
            description: 'First attempt failed — trying again.',
          });
          continue;
        }

        // Final failure — give an honest, network-aware message.
        clearConnectTimeout();
        console.error('[VoiceCallFlow] Failed to start call:', error);
        callState.transitionTo('ended');
        document.body.style.overflow = 'auto';

        const reason = error instanceof Error ? error.message : '';
        const isMicIssue = /microphone|\bmic\b/i.test(reason);
        toast({
          title: 'Failed to Start Call',
          description: isMicIssue
            ? `${reason}. Please resolve it and try again.`
            : 'Couldn’t connect — your network or device may be struggling. Try Wi-Fi or a stronger signal, then try again.',
          variant: 'destructive',
        });
      }
    }
  }, [callState, toast, clearConnectTimeout]);

  /**
   * End call
   */
  const endCall = useCallback(() => {
    console.log('[VoiceCallFlow] Ending call');
    clearConnectTimeout();
    // From 'connecting' the SDK may never emit 'call-end', so end directly —
    // otherwise tapping Cancel leaves the user stuck on a frozen "Connecting…"
    // screen ('connecting → ending' is not a valid transition).
    if (callState.isConnecting) {
      callState.transitionTo('ended');
    } else {
      callState.transitionTo('ending');
    }
    vapiService.stop();
    // From 'connected', state transitions to 'ended' via the VAPI 'call-end' event
  }, [callState, clearConnectTimeout]);

  /**
   * Toggle mute
   */
  const toggleMute = useCallback(() => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    vapiService.setMuted(newMutedState);
  }, [isMuted]);

  /**
   * Save call record
   */
  const saveCallRecord = useCallback(
    async (endTime: Date) => {
      const currentData = leadDataRef.current;
      if (!currentData) return;

      const callData: CallData = {
        started_at: callStartTime?.toISOString() || '',
        ended_at: endTime.toISOString(),
        duration: formatTime(callDuration),
        vapi_call_id: vapiCallId || null,
      };

      const feedbackData: FeedbackData = {
        rating: rating || null,
        comment: feedbackText || '',
        next_action: null,
      };

      try {
        await webhookService.saveCallRecord({
          lead_data: {
            name: currentData.name,
            email: currentData.email,
            phone: currentData.phone,
            company: currentData.company,
            role: currentData.role,
          },
          call_data: callData,
          feedback: feedbackData,
        });
      } catch (error) {
        console.error('[VoiceCallFlow] Failed to save call record:', error);
      }
    },
    [callStartTime, callDuration, vapiCallId, rating, feedbackText]
  );

  /**
   * Setup VAPI event listeners - ONLY ONCE on mount
   */
  useEffect(() => {
    const handleCallStart = async () => {
      console.log('[VAPI] Call started');
      clearConnectTimeout();
      callStateRef.current.transitionTo('connected');
      setCallStartTime(new Date());
      document.body.style.overflow = 'hidden';

      // FIX 1: Start mobile audio handling to prevent microphone cutout
      try {
        const cleanup = await mobileAudioHandler.startCall();
        mobileAudioCleanupRef.current = cleanup;
        console.log('[MobileAudio] Mobile audio handling activated');
      } catch (error) {
        console.error('[MobileAudio] Failed to start mobile audio handling:', error);
        // Don't block call if mobile audio fails
      }

      // Start call duration timer
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      // CRITICAL FIX: Save call time ONLY when call actually connects
      // This ensures rate limit only applies to successful calls
      saveCallTime();
      console.log('[VoiceCallFlow] Call connected - rate limit timestamp saved');
    };

    const handleCallEnd = async () => {
      console.log('[VAPI] Call ended');
      clearConnectTimeout();
      callStateRef.current.transitionTo('ended');
      document.body.style.overflow = 'auto';

      // FIX 1: Clean up mobile audio handling
      if (mobileAudioCleanupRef.current) {
        try {
          await mobileAudioCleanupRef.current();
          mobileAudioCleanupRef.current = null;
          console.log('[MobileAudio] Mobile audio handling deactivated');
        } catch (error) {
          console.error('[MobileAudio] Failed to cleanup mobile audio:', error);
        }
      }

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Save call record using current state values
      const currentData = leadDataRef.current;
      if (!currentData) return;

      // Access current state at the time of call end
      const endTime = new Date();

      setCallDuration((currentDuration) => {
        setCallStartTime((currentStartTime) => {
          setVapiCallId((currentVapiCallId) => {
            setRating((currentRating) => {
              setFeedbackText((currentFeedback) => {
                // Save with all current values
                const callData: CallData = {
                  started_at: currentStartTime?.toISOString() || '',
                  ended_at: endTime.toISOString(),
                  duration: formatTime(currentDuration),
                  vapi_call_id: currentVapiCallId || null,
                };

                const feedbackData: FeedbackData = {
                  rating: currentRating || null,
                  comment: currentFeedback || '',
                  next_action: null,
                };

                webhookService.saveCallRecord({
                  lead_data: {
                    name: currentData.name,
                    email: currentData.email,
                    phone: currentData.phone,
                    company: currentData.company,
                    role: currentData.role,
                  },
                  call_data: callData,
                  feedback: feedbackData,
                }).catch((error) => {
                  console.error('[VoiceCallFlow] Failed to save call record:', error);
                });

                return currentFeedback;
              });
              return currentRating;
            });
            return currentVapiCallId;
          });
          return currentStartTime;
        });
        return currentDuration;
      });
    };

    const handleSpeechStart = () => {
      setCallStatus('speaking');
    };

    const handleSpeechEnd = () => {
      setCallStatus('listening');
    };

    const handleMessage = (message: any) => {
      if (message.type === 'call-started' && message.call?.id) {
        setVapiCallId(message.call.id);
      }
    };

    const handleError = (error: Error) => {
      console.error('[VAPI] Error:', error);
      clearConnectTimeout();
      logCallDiagnostics('call-error', { error: serializeError(error) });
      toastRef.current({
        title: 'Call Error',
        description: 'There was an issue with the call. Please try again.',
        variant: 'destructive',
      });
      callStateRef.current.transitionTo('ended');
      document.body.style.overflow = 'auto';
    };

    /**
     * NEW: Handle call-start-failed event with detailed error info
     * This provides exact stage and context where the call failed
     */
    const handleCallStartFailed = (event: any) => {
      console.error('[VAPI] Call start failed:', {
        stage: event.stage,
        error: event.error,
        duration: event.totalDuration,
        context: event.context,
      });
      clearConnectTimeout();
      logCallDiagnostics('call-start-failed', {
        error: event?.error != null ? serializeError(event.error) : null,
        extra: {
          stage: event?.stage,
          totalDuration: event?.totalDuration,
          context: event?.context,
          fullEvent: serializeError(event),
        },
      });

      // Transition to ended state
      callStateRef.current.transitionTo('ended');
      document.body.style.overflow = 'auto';

      // Show detailed error message to user
      const stageMessages: Record<string, string> = {
        'web-call-creation': 'Failed to connect to voice service',
        'daily-call-object-creation': 'Failed to initialize call',
        'mobile-permissions': 'Microphone permission issue',
        'daily-call-join': 'Failed to join call',
        'unknown': 'Call initialization failed',
      };

      const description = stageMessages[event.stage] || 'Unable to start call';

      toastRef.current({
        title: 'Call Failed',
        description: `${description}. Please check your microphone permissions and internet connection, then try again.`,
        variant: 'destructive',
      });
    };

    // Set up listeners and get cleanup function
    const removeListeners = vapiService.setupEventListeners({
      onCallStart: handleCallStart,
      onCallEnd: handleCallEnd,
      onSpeechStart: handleSpeechStart,
      onSpeechEnd: handleSpeechEnd,
      onMessage: handleMessage,
      onError: handleError,
      onCallStartFailed: handleCallStartFailed,
    });

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (connectTimeoutRef.current) {
        clearTimeout(connectTimeoutRef.current);
        connectTimeoutRef.current = null;
      }

      // If a call is still live when the widget unmounts (e.g. the user routes
      // to /watch-demo mid-call), hang it up so it doesn't keep running
      // invisibly, and release the mobile audio handler / screen wake lock.
      const st = callStateRef.current;
      if (st && !st.isIdle && !st.isEnded) {
        try {
          vapiService.stop();
        } catch (e) {
          console.error('[VoiceCallFlow] Failed to stop call on unmount:', e);
        }
        if (mobileAudioCleanupRef.current) {
          mobileAudioCleanupRef.current().catch(() => {});
          mobileAudioCleanupRef.current = null;
        }
      }

      removeListeners(); // Remove event listeners
      document.body.style.overflow = 'auto';
    };
  }, [clearConnectTimeout]); // Re-bind only if the (stable) clear helper changes

  /**
   * Reset call state
   */
  const resetCall = useCallback(() => {
    setCallDuration(0);
    setCallStatus('listening');
    setIsMuted(false);
    setCallStartTime(null);
    setVapiCallId('');
    setRating(0);
    setFeedbackText('');
    callState.reset();
  }, [callState]);

  return {
    // State
    callState,
    leadData,
    callDuration,
    callStatus,
    isMuted,
    rating,
    feedbackText,

    // Actions
    updateLeadData,
    validateAndCheckRateLimit,
    initiateCall,
    endCall,
    toggleMute,
    setRating,
    setFeedbackText,
    resetCall,
  };
};

/**
 * Format seconds to MM:SS
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
