/**
 * VAPI Service
 * Abstraction layer for VAPI SDK
 */

import Vapi from '@vapi-ai/web';
import { ENV } from '@/config/env';
import { isInAppBrowser } from '@/utils/inAppBrowser';
import { logCallDiagnostics, serializeError } from '@/utils/callDiagnostics';
import type { VapiVariables, VapiAssistantOverrides, VapiEventHandlers } from '@/types/vapi';

export class VapiService {
  private client: Vapi;
  private assistantId: string;

  constructor() {
    if (!ENV.vapi.apiKey) {
      console.error('VAPI API key is missing');
    }

    this.client = new Vapi(ENV.vapi.apiKey);
    this.assistantId = ENV.vapi.assistantId;
  }

  /**
   * Pre-acquire the microphone BEFORE the Vapi/Daily call starts.
   *
   * ROOT CAUSE of the intermittent "did not receive the customer's audio"
   * failures: the Vapi SDK requests the mic lazily *during* start(). On a
   * first-time permission prompt or a cold mic, Daily joins the room and
   * begins its no-customer-audio timeout before the local audio track is
   * producing frames, so Vapi terminates the call right as it connects.
   *
   * Warming the mic here, within the user gesture, forces the permission
   * prompt + hardware spin-up to finish first (audio is already flowing when
   * Daily joins) and surfaces device errors (NotAllowedError / NotReadableError)
   * up front instead of as a silent dead call. We release the track
   * immediately so the SDK can acquire the now-warm, permission-granted device
   * cleanly.
   */
  private async prewarmMicrophone(): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      console.warn('[VAPI] mediaDevices.getUserMedia unavailable; skipping mic pre-warm');
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      // Re-throw with a clear, actionable message; the caller maps this to a
      // user-facing toast and aborts the call instead of joining audio-less.
      const name = (error as DOMException)?.name;
      const message =
        name === 'NotAllowedError' || name === 'SecurityError'
          ? 'Microphone permission denied'
          : name === 'NotReadableError'
            ? 'Microphone is already in use by another app or tab'
            : name === 'NotFoundError'
              ? 'No microphone was found on this device'
              : 'Could not access the microphone';
      console.error('[VAPI] Microphone pre-warm failed:', name, error);
      logCallDiagnostics('prewarm-error', { micResult: name || 'unknown' });
      throw new Error(message);
    }

    const track = stream.getAudioTracks()[0];
    const micTrack = {
      label: track?.label,
      readyState: track?.readyState,
      enabled: track?.enabled,
    };
    console.log('[VAPI] Microphone pre-warmed:', micTrack);
    logCallDiagnostics('prewarm-result', { micResult: 'granted', micTrack });

    // Release the device so the SDK's own getUserMedia gets it instantly.
    // Permission is now granted and the mic subsystem is enumerated + warm.
    stream.getTracks().forEach((t) => t.stop());
  }

  /**
   * Start a call with the given variables.
   * Returns the Vapi call id on success (or null) so the caller can store a
   * reliable id that matches the Vapi dashboard.
   * FIX: Check for null return value from VAPI SDK
   */
  async startCall(variables: VapiVariables): Promise<string | null> {
    // Validate that phone number is always present
    if (!variables.phone || variables.phone.trim() === '') {
      const error = new Error('Phone number is required but missing in VAPI metadata');
      console.error('[VAPI] CRITICAL:', error);
      throw error;
    }

    // Verify all required fields are present
    if (!variables.name || !variables.email || !variables.company || !variables.role) {
      console.warn('[VAPI] Warning: Some metadata fields are missing:', {
        name: !!variables.name,
        email: !!variables.email,
        phone: !!variables.phone,
        company: !!variables.company,
        role: !!variables.role,
      });
    }

    const assistantOverrides: VapiAssistantOverrides = {
      variableValues: variables,
    };

    console.log('[VAPI] Starting call with validated variables:', variables);
    logCallDiagnostics('call-start-attempt');

    try {
      // Warm + permission-check the mic BEFORE starting the SDK, so the
      // customer's audio track is already live when Daily joins the room. This
      // is the fix for the intermittent "did not receive the customer's audio"
      // call drops.
      //
      // EXCEPTION: in-app browsers (Instagram/Facebook/etc.) cannot survive two
      // separate getUserMedia acquisitions — the pre-warm's grab-release plus
      // the SDK's own grab hands the call a dead/silent mic (Android Instagram
      // "did not receive customer audio"). There we skip the pre-warm and let
      // the SDK's getUserMedia be the ONLY mic request. Fix B's banner nudges
      // those users into a real browser where the pre-warm path is reliable.
      if (isInAppBrowser()) {
        console.warn('[VAPI] In-app browser detected — skipping mic pre-warm (single SDK getUserMedia).');
        logCallDiagnostics('prewarm-skipped-inapp', { micResult: 'skipped-inapp' });
      } else {
        await this.prewarmMicrophone();
      }

      // CRITICAL FIX: Check if start() returns null (indicates failure)
      const result = await this.client.start(this.assistantId, assistantOverrides);

      if (result === null) {
        // Call failed to start - VAPI SDK will emit 'call-start-failed' event
        const error = new Error('Call initialization failed. Check call-start-failed event for details.');
        console.error('[VAPI] Call start returned null:', error);
        throw error;
      }

      console.log('[VAPI] Call start initiated successfully');
      // Attach a best-effort "black box" on the underlying Daily call object so
      // we capture WebRTC/ICE state during the join phase (data Vapi's servers
      // never see). Non-blocking, never throws.
      this.attachConnectionDiagnostics();
      return (result as { id?: string })?.id ?? null;
    } catch (error) {
      console.error('[VAPI] Failed to start call:', error);
      logCallDiagnostics('call-start-error', { error: serializeError(error) });
      throw error;
    }
  }

  /**
   * Get the underlying Daily call object (exposed by @vapi-ai/web), or null.
   * Available after a call has started.
   */
  getDailyCallObject(): any | null {
    try {
      const anyClient = this.client as unknown as {
        getDailyCallObject?: () => unknown;
      };
      return anyClient.getDailyCallObject?.() ?? null;
    } catch {
      return null;
    }
  }

  /**
   * Best-effort capture of the live WebRTC/Daily connection state into call
   * diagnostics. This is the only place we can see *why* a join stalls on a
   * weak network (ICE stuck on "checking", room deleted, etc.) — Vapi's
   * server-side records don't include it. Never throws.
   */
  private attachConnectionDiagnostics(): void {
    try {
      const daily = this.getDailyCallObject();
      if (!daily) return;

      const sample = (label: string) => {
        try {
          logCallDiagnostics('connection-state', {
            extra: {
              label,
              meetingState: daily.meetingState?.(),
              // Daily exposes participant/network stats lazily; capture what's safe.
              participantCount:
                typeof daily.participantCounts === 'function'
                  ? daily.participantCounts()
                  : undefined,
            },
          });
        } catch {
          /* ignore sampling errors */
        }
      };

      daily.on?.('joined-meeting', () => sample('joined-meeting'));
      daily.on?.('left-meeting', () => sample('left-meeting'));
      daily.on?.('error', (e: unknown) =>
        logCallDiagnostics('connection-state', {
          extra: { label: 'daily-error' },
          error: serializeError(e),
        })
      );
    } catch {
      /* diagnostics must never affect the call */
    }
  }

  /**
   * Stop the current call
   */
  stop(): void {
    console.log('[VAPI] Stopping call');
    this.client.stop();
  }

  /**
   * Set mute status
   */
  setMuted(muted: boolean): void {
    this.client.setMuted(muted);
  }

  /**
   * Register event listeners
   * FIX: Added call-start-failed listener for detailed error tracking
   */
  setupEventListeners(handlers: VapiEventHandlers): () => void {
    if (handlers.onCallStart) {
      this.client.on('call-start', handlers.onCallStart);
    }
    if (handlers.onCallEnd) {
      this.client.on('call-end', handlers.onCallEnd);
    }
    if (handlers.onSpeechStart) {
      this.client.on('speech-start', handlers.onSpeechStart);
    }
    if (handlers.onSpeechEnd) {
      this.client.on('speech-end', handlers.onSpeechEnd);
    }
    if (handlers.onMessage) {
      this.client.on('message', handlers.onMessage);
    }
    if (handlers.onError) {
      this.client.on('error', handlers.onError);
    }
    if (handlers.onCallStartFailed) {
      this.client.on('call-start-failed', handlers.onCallStartFailed);
    }

    // Return cleanup function
    return () => {
      if (handlers.onCallStart) {
        this.client.removeListener('call-start', handlers.onCallStart);
      }
      if (handlers.onCallEnd) {
        this.client.removeListener('call-end', handlers.onCallEnd);
      }
      if (handlers.onSpeechStart) {
        this.client.removeListener('speech-start', handlers.onSpeechStart);
      }
      if (handlers.onSpeechEnd) {
        this.client.removeListener('speech-end', handlers.onSpeechEnd);
      }
      if (handlers.onMessage) {
        this.client.removeListener('message', handlers.onMessage);
      }
      if (handlers.onError) {
        this.client.removeListener('error', handlers.onError);
      }
      if (handlers.onCallStartFailed) {
        this.client.removeListener('call-start-failed', handlers.onCallStartFailed);
      }
    };
  }

  /**
   * Get the underlying client (for advanced use)
   */
  getClient(): Vapi {
    return this.client;
  }
}

// Singleton instance
export const vapiService = new VapiService();
