/**
 * VAPI Service
 * Abstraction layer for VAPI SDK
 */

import Vapi from '@vapi-ai/web';
import { ENV } from '@/config/env';
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
      throw new Error(message);
    }

    const track = stream.getAudioTracks()[0];
    console.log('[VAPI] Microphone pre-warmed:', {
      label: track?.label,
      readyState: track?.readyState,
      enabled: track?.enabled,
    });

    // Release the device so the SDK's own getUserMedia gets it instantly.
    // Permission is now granted and the mic subsystem is enumerated + warm.
    stream.getTracks().forEach((t) => t.stop());
  }

  /**
   * Start a call with the given variables
   * FIX: Check for null return value from VAPI SDK
   */
  async startCall(variables: VapiVariables): Promise<void> {
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

    try {
      // Warm + permission-check the mic BEFORE starting the SDK, so the
      // customer's audio track is already live when Daily joins the room. This
      // is the fix for the intermittent "did not receive the customer's audio"
      // call drops.
      await this.prewarmMicrophone();

      // CRITICAL FIX: Check if start() returns null (indicates failure)
      const result = await this.client.start(this.assistantId, assistantOverrides);

      if (result === null) {
        // Call failed to start - VAPI SDK will emit 'call-start-failed' event
        const error = new Error('Call initialization failed. Check call-start-failed event for details.');
        console.error('[VAPI] Call start returned null:', error);
        throw error;
      }

      console.log('[VAPI] Call start initiated successfully');
    } catch (error) {
      console.error('[VAPI] Failed to start call:', error);
      throw error;
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
