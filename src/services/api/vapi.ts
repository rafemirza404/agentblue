/**
 * VAPI Service
 * Abstraction layer for VAPI SDK
 */

import type Vapi from '@vapi-ai/web';
import { ENV } from '@/config/env';
import type { VapiVariables, VapiAssistantOverrides, VapiEventHandlers } from '@/types/vapi';

export class VapiService {
  // Lazily created — the heavy @vapi-ai/web SDK is only downloaded and
  // instantiated the first time a call actually starts, keeping it out of
  // the initial page bundle.
  private client: Vapi | null = null;
  private clientPromise: Promise<Vapi> | null = null;
  private assistantId: string;
  // Handlers registered before the SDK is loaded; applied once the client
  // is created so listeners survive the deferred import.
  private pendingHandlers: VapiEventHandlers | null = null;

  constructor() {
    if (!ENV.vapi.apiKey) {
      console.error('VAPI API key is missing');
    }
    this.assistantId = ENV.vapi.assistantId;
  }

  /**
   * Dynamically import and instantiate the Vapi SDK on first use.
   * Subsequent calls reuse the same client.
   */
  private async getOrCreateClient(): Promise<Vapi> {
    if (this.client) return this.client;
    if (!this.clientPromise) {
      this.clientPromise = import('@vapi-ai/web').then(({ default: Vapi }) => {
        this.client = new Vapi(ENV.vapi.apiKey);
        // Apply any listeners registered before the SDK finished loading.
        if (this.pendingHandlers) {
          this.attachHandlers(this.client, this.pendingHandlers);
        }
        return this.client;
      });
    }
    return this.clientPromise;
  }

  private attachHandlers(client: Vapi, handlers: VapiEventHandlers): void {
    if (handlers.onCallStart) client.on('call-start', handlers.onCallStart);
    if (handlers.onCallEnd) client.on('call-end', handlers.onCallEnd);
    if (handlers.onSpeechStart) client.on('speech-start', handlers.onSpeechStart);
    if (handlers.onSpeechEnd) client.on('speech-end', handlers.onSpeechEnd);
    if (handlers.onMessage) client.on('message', handlers.onMessage);
    if (handlers.onError) client.on('error', handlers.onError);
    if (handlers.onCallStartFailed) client.on('call-start-failed', handlers.onCallStartFailed);
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
   *
   * Called before the SDK's dynamic import so the browser's transient user
   * activation (needed by getUserMedia) is not lost to an intervening await.
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
      // Warm + permission-check the mic BEFORE loading/starting the SDK, so the
      // customer's audio track is already live when Daily joins the room. This
      // is the fix for the intermittent "did not receive the customer's audio"
      // call drops. Must run before the dynamic import below to keep the user
      // gesture valid for getUserMedia.
      await this.prewarmMicrophone();

      const client = await this.getOrCreateClient();
      // CRITICAL FIX: Check if start() returns null (indicates failure)
      const result = await client.start(this.assistantId, assistantOverrides);

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
   * Stop the current call. No-op if no call/client exists yet.
   */
  stop(): void {
    console.log('[VAPI] Stopping call');
    this.client?.stop();
  }

  /**
   * Set mute status. No-op if no call/client exists yet.
   */
  setMuted(muted: boolean): void {
    this.client?.setMuted(muted);
  }

  /**
   * Register event listeners.
   * The SDK may not be loaded yet (it loads lazily on call start), so handlers
   * are stored and attached as soon as the client is created.
   * FIX: Added call-start-failed listener for detailed error tracking
   */
  setupEventListeners(handlers: VapiEventHandlers): () => void {
    this.pendingHandlers = handlers;
    // If the client already exists, attach immediately.
    if (this.client) {
      this.attachHandlers(this.client, handlers);
    }

    // Return cleanup function
    return () => {
      if (this.pendingHandlers === handlers) {
        this.pendingHandlers = null;
      }
      const client = this.client;
      if (!client) return;
      if (handlers.onCallStart) {
        client.removeListener('call-start', handlers.onCallStart);
      }
      if (handlers.onCallEnd) {
        client.removeListener('call-end', handlers.onCallEnd);
      }
      if (handlers.onSpeechStart) {
        client.removeListener('speech-start', handlers.onSpeechStart);
      }
      if (handlers.onSpeechEnd) {
        client.removeListener('speech-end', handlers.onSpeechEnd);
      }
      if (handlers.onMessage) {
        client.removeListener('message', handlers.onMessage);
      }
      if (handlers.onError) {
        client.removeListener('error', handlers.onError);
      }
      if (handlers.onCallStartFailed) {
        client.removeListener('call-start-failed', handlers.onCallStartFailed);
      }
    };
  }

  /**
   * Get the underlying client if it has been created, otherwise null.
   */
  getClient(): Vapi | null {
    return this.client;
  }
}

// Singleton instance
export const vapiService = new VapiService();
