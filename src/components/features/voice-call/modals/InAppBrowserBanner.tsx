/**
 * InAppBrowserBanner
 *
 * Voice calls are unreliable inside social-app in-app browsers (Instagram,
 * Facebook, TikTok, …) because their restricted webviews mishandle the
 * microphone — see src/utils/inAppBrowser.ts. When we detect one (and the user
 * is engaging the voice flow), we surface a banner nudging them to open the
 * page in their real browser, where calls work reliably.
 *
 * Self-contained, neutral styling so it can live identically on every branch
 * without touching the redesigned voice modals.
 */

import { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { detectInAppBrowser, getPlatform } from '@/utils/inAppBrowser';

interface InAppBrowserBannerProps {
  /** Only show while the user is actually in the voice flow. */
  active: boolean;
}

export const InAppBrowserBanner = ({ active }: InAppBrowserBannerProps) => {
  const [dismissed, setDismissed] = useState(false);

  const { isInApp, app } = detectInAppBrowser();
  if (!active || !isInApp || dismissed) return null;

  const platform = getPlatform();
  const instruction =
    platform === 'ios'
      ? 'tap the ••• menu → "Open in Safari"'
      : platform === 'android'
        ? 'tap the ⋮ menu → "Open in Chrome"'
        : 'open this page in your browser';

  return (
    <div className="fixed inset-x-3 top-3 z-[9999] mx-auto max-w-md rounded-2xl bg-[#0A2540] px-4 py-3 text-white shadow-[0_12px_40px_-8px_rgba(10,37,64,0.6)] ring-1 ring-white/10">
      <div className="flex items-start gap-3">
        <ExternalLink className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#86ABFF]" />
        <div className="flex-1 text-[13px] leading-snug">
          <p className="font-semibold">Voice calls work best in your browser</p>
          <p className="mt-0.5 text-white/75">
            You're in the {app ?? 'in-app'} browser, where the microphone is
            often blocked. For a reliable call, {instruction}.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="flex-shrink-0 rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
