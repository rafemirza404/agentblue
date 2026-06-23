/**
 * In-app browser (webview) detection.
 *
 * Social apps (Instagram, Facebook, TikTok, etc.) open links inside a
 * restricted in-app webview rather than the real browser. Those webviews are
 * unreliable for WebRTC voice:
 *  - they may re-prompt for the mic on every getUserMedia call, and
 *  - releasing then re-acquiring the mic (our pre-warm + the SDK's own
 *    getUserMedia) can hand the call a dead/silent audio track — which Vapi
 *    reports as "did not receive the customer's audio".
 *
 * We detect these so the call flow can (a) skip the mic pre-warm — letting the
 * SDK's getUserMedia be the ONLY mic acquisition — and (b) advise the user to
 * open the page in their real browser. Shared by the pre-warm skip, the
 * "open in browser" banner, and the call diagnostics.
 */

export interface InAppBrowserInfo {
  isInApp: boolean;
  /** Friendly name of the host app, e.g. "Instagram" — null when not in-app. */
  app: string | null;
}

const UA = (): string =>
  typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';

// Ordered most-specific first. Each entry maps a userAgent signature to a name.
const SIGNATURES: Array<[RegExp, string]> = [
  [/Instagram/i, 'Instagram'],
  [/FBAN|FBAV|FB_IAB|FB4A|FBIOS/i, 'Facebook'],
  [/Messenger/i, 'Messenger'],
  [/\bLine\//i, 'LINE'],
  [/Twitter/i, 'Twitter'],
  [/TikTok|musical_ly|BytedanceWebview|Bytedance/i, 'TikTok'],
  [/Snapchat/i, 'Snapchat'],
  [/LinkedInApp/i, 'LinkedIn'],
  [/Pinterest/i, 'Pinterest'],
  [/\bWhatsApp/i, 'WhatsApp'],
  [/GSA\//i, 'Google App'],
];

/**
 * Inspect the userAgent (or a supplied string) and report whether we're inside
 * a known in-app browser, plus which app.
 */
export function detectInAppBrowser(ua: string = UA()): InAppBrowserInfo {
  for (const [pattern, app] of SIGNATURES) {
    if (pattern.test(ua)) {
      return { isInApp: true, app };
    }
  }
  return { isInApp: false, app: null };
}

/** Convenience boolean check. */
export function isInAppBrowser(ua?: string): boolean {
  return detectInAppBrowser(ua).isInApp;
}

/** Rough platform hint for tailoring the "open in browser" instructions. */
export function getPlatform(ua: string = UA()): 'ios' | 'android' | 'other' {
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'other';
}
