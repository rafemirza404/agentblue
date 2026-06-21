/**
 * Mobile Audio Handler
 * FIX 1: Handles mobile audio issues when screen turns off or app switches
 * Implements wake lock and mobile-specific audio policies
 */

export class MobileAudioHandler {
  private wakeLock: any = null;
  private isActive = false;

  /**
   * Check if the device is mobile
   */
  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  /**
   * Request wake lock to keep screen active during call
   * Prevents screen from turning off which can interrupt audio
   */
  async requestWakeLock(): Promise<void> {
    if (!this.isMobileDevice()) {
      console.log('[MobileAudio] Not a mobile device, skipping wake lock');
      return;
    }

    // Check if Wake Lock API is supported
    if ('wakeLock' in navigator) {
      try {
        this.wakeLock = await (navigator as any).wakeLock.request('screen');
        console.log('[MobileAudio] Wake lock acquired successfully');

        this.wakeLock.addEventListener('release', () => {
          console.log('[MobileAudio] Wake lock released');
        });
      } catch (error) {
        console.error('[MobileAudio] Failed to acquire wake lock:', error);
        // Don't throw - allow call to proceed even if wake lock fails
      }
    } else {
      console.warn('[MobileAudio] Wake Lock API not supported on this device');
    }
  }

  /**
   * Release wake lock when call ends
   */
  async releaseWakeLock(): Promise<void> {
    if (this.wakeLock) {
      try {
        await this.wakeLock.release();
        this.wakeLock = null;
        console.log('[MobileAudio] Wake lock released manually');
      } catch (error) {
        console.error('[MobileAudio] Failed to release wake lock:', error);
      }
    }
  }

  /**
   * Handle visibility change (app switching, screen lock)
   *
   * NOTE: We deliberately do NOT create/resume a separate AudioContext here.
   * Daily/WebRTC (the Vapi SDK) owns the call's audio pipeline; an extra
   * AudioContext would be wired to nothing and, on iOS Safari, re-configuring
   * the shared AVAudioSession can briefly mute the live capture — which Vapi
   * reports as "did not receive the customer's audio". The only thing worth
   * restoring on foreground is the screen wake lock, which iOS auto-releases
   * when the page is backgrounded.
   */
  setupVisibilityHandler(): (() => void) | void {
    if (!this.isMobileDevice()) {
      return;
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('[MobileAudio] App backgrounded');
      } else {
        console.log('[MobileAudio] App foregrounded - restoring wake lock');
        // Re-request wake lock if it was released while backgrounded
        if (this.isActive && !this.wakeLock) {
          this.requestWakeLock();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Return cleanup function
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }

  /**
   * Start mobile audio handling for a call
   */
  async startCall(): Promise<() => void> {
    this.isActive = true;
    console.log('[MobileAudio] Starting mobile audio handling');

    // Request wake lock to keep the screen on for the duration of the call
    await this.requestWakeLock();

    // Setup visibility handler (restores wake lock on foreground)
    const cleanupVisibility = this.setupVisibilityHandler();

    // Return cleanup function
    return async () => {
      this.isActive = false;
      await this.releaseWakeLock();
      if (cleanupVisibility) {
        cleanupVisibility();
      }
      console.log('[MobileAudio] Mobile audio handling stopped');
    };
  }

  /**
   * Handle page unload (ensure cleanup)
   */
  setupUnloadHandler(): void {
    window.addEventListener('beforeunload', () => {
      this.releaseWakeLock();
    });
  }
}

// Singleton instance
export const mobileAudioHandler = new MobileAudioHandler();
