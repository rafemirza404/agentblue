/**
 * Client-side call diagnostics.
 *
 * Vapi/Daily run server-side and cannot see the caller's device, browser,
 * in-app-browser status, mic-permission result, or secure-context state — so
 * when a call dies with "did not receive the customer's audio" there's no way
 * to tell *why* from the Vapi dashboard alone. This captures that client-side
 * context at call start and on every failure path, logs it to the console for
 * immediate field debugging, and fires it (best-effort, non-blocking) to the
 * existing n8n webhook so failures are diagnosable after the fact.
 *
 * Tagged `type: 'call_diagnostics'` so the n8n workflow can route/ignore it
 * separately from real call records.
 */

import { ENV } from '@/config/env';
import { apiClient } from '@/services/api/client';
import { detectInAppBrowser } from './inAppBrowser';

export interface CallDiagnostics {
  /** Where in the flow this was captured. */
  stage:
    | 'call-start-attempt'
    | 'prewarm-result'
    | 'prewarm-skipped-inapp'
    | 'prewarm-error'
    | 'call-start-error'
    | 'call-start-failed'
    | 'call-error';
  timestamp: string;
  userAgent: string;
  platform: string;
  language: string;
  inAppBrowser: boolean;
  inAppName: string | null;
  isSecureContext: boolean;
  /** navigator.onLine at capture time. */
  onLine?: boolean;
  /** Network Information API hint (e.g. '4g', '3g', 'slow-2g') if available. */
  networkType?: string | null;
  vapiCallId?: string | null;
  /** 'granted' | 'skipped-inapp' | a DOMException name | etc. */
  micResult?: string;
  micTrack?: { label?: string; readyState?: string; enabled?: boolean } | null;
  endedReason?: string | null;
  error?: string | null;
  extra?: Record<string, unknown>;
}

/**
 * Turn any thrown value — including Vapi/Daily error *objects* — into a
 * readable string. The previous `String(err)` produced "[object Object]" for
 * the SDK's error events, hiding the real reason. This surfaces common
 * Vapi/Daily fields up front and appends a (circular-safe) JSON dump.
 */
export function serializeError(err: unknown): string {
  if (err == null) return 'null';
  if (err instanceof Error) return `${err.name}: ${err.message}`;
  if (typeof err === 'string') return err;
  if (typeof err !== 'object') return String(err);

  const obj = err as Record<string, unknown>;
  const keyed: string[] = [];
  for (const k of [
    'type',
    'action',
    'errorMsg',
    'msg',
    'message',
    'reason',
    'endedReason',
    'stage',
    'code',
  ]) {
    const v = obj[k];
    if (v != null && typeof v !== 'object') keyed.push(`${k}=${String(v)}`);
  }

  let json = '';
  try {
    const seen = new WeakSet<object>();
    json = JSON.stringify(err, (_key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) return '[Circular]';
        seen.add(value);
      }
      return value;
    });
  } catch {
    json = '';
  }

  if (keyed.length && json && json !== '{}') return `${keyed.join(' ')} | ${json}`;
  if (keyed.length) return keyed.join(' ');
  if (json && json !== '{}') return json;
  return String(err);
}

/** Snapshot the static client/browser context. */
function gatherClientInfo() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const inApp = detectInAppBrowser(ua);
  const conn =
    typeof navigator !== 'undefined'
      ? (navigator as unknown as { connection?: { effectiveType?: string } }).connection
      : undefined;
  return {
    userAgent: ua,
    platform: typeof navigator !== 'undefined' ? navigator.platform || '' : '',
    language: typeof navigator !== 'undefined' ? navigator.language || '' : '',
    inAppBrowser: inApp.isInApp,
    inAppName: inApp.app,
    isSecureContext:
      typeof window !== 'undefined' ? Boolean(window.isSecureContext) : false,
    onLine: typeof navigator !== 'undefined' ? navigator.onLine : true,
    networkType: conn?.effectiveType ?? null,
  };
}

/**
 * Log a diagnostics record (console always; webhook best-effort).
 * Never throws — diagnostics must not affect the call itself.
 */
export function logCallDiagnostics(
  stage: CallDiagnostics['stage'],
  details: Partial<CallDiagnostics> = {}
): void {
  const payload: CallDiagnostics = {
    stage,
    timestamp: new Date().toISOString(),
    ...gatherClientInfo(),
    ...details,
  };

  // Always log to console for immediate, no-setup field debugging.
  console.log('[CallDiagnostics]', payload);

  // Best-effort send to the existing n8n endpoint. apiClient.request already
  // swallows its own errors, but guard anyway so diagnostics never throw.
  try {
    const url = ENV.webhooks.saveCallRecord;
    if (url) {
      void apiClient
        .post(url, { type: 'call_diagnostics', diagnostics: payload })
        .catch(() => {
          /* ignore — diagnostics are non-critical */
        });
    }
  } catch {
    /* never throw from diagnostics */
  }
}
