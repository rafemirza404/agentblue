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
   * Start a call with the given variables
   */
  async startCall(variables: VapiVariables): Promise<void> {
    const assistantOverrides: VapiAssistantOverrides = {
      variableValues: variables,
    };

    console.log('[VAPI] Starting call with variables:', variables);

    try {
      await this.client.start(this.assistantId, assistantOverrides);
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
