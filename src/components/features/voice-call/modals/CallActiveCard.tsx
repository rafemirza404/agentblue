/**
 * CallActiveCard Component
 * Active call UI with connecting state — premium AgentBlue treatment
 */

import { Mic, MicOff, PhoneOff } from 'lucide-react';
import agentblueLogo from '@/assets/agentblue-logo.png';
import type { CallState, CallStatus } from '@/types/models';

interface CallActiveCardProps {
  callState: CallState;
  callStatus: CallStatus;
  callDuration: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onEndCall: () => void;
}

/* Sophia avatar with concentric "listening" rings. */
const SophiaAvatar = ({ active }: { active?: boolean }) => (
  <div className="relative flex items-center justify-center">
    {active && (
      <>
        <span className="absolute h-20 w-20 rounded-full bg-[#4F7CFF]/15 animate-ping" style={{ animationDuration: '2.4s' }} />
        <span className="absolute h-16 w-16 rounded-full bg-[#4F7CFF]/20 animate-ping" style={{ animationDuration: '2.4s', animationDelay: '0.5s' }} />
      </>
    )}
    <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-[#EEF4FF] to-[#DCE8FF] ring-1 ring-[#4F7CFF]/20 shadow-[0_8px_20px_-8px_rgba(79,124,255,0.5)] flex items-center justify-center p-2.5">
      <img src={agentblueLogo} alt="Sophia AI" className="h-full w-full object-contain" />
    </div>
  </div>
);

export const CallActiveCard = ({
  callState,
  callStatus,
  callDuration,
  isMuted,
  onToggleMute,
  onEndCall,
}: CallActiveCardProps) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Connecting State
  if (callState === 'connecting') {
    return (
      <>
        <div className="fixed inset-0 bg-[#0A2540]/45 backdrop-blur-[2px] z-[9996]" />

        <div className="fixed bottom-6 left-6 right-6 sm:right-auto z-[9997] w-auto sm:w-[300px] rounded-3xl bg-white p-6 shadow-[0_24px_70px_-12px_rgba(20,20,40,0.35)] ring-1 ring-black/[0.06] animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex flex-col items-center gap-4 text-center">
            <SophiaAvatar active />

            <div>
              <p className="text-[15px] font-semibold text-[#0A2540]">Connecting to Sophia…</p>
              <p className="mt-0.5 text-[12px] text-[#697386]">This usually takes 2–3 seconds</p>
            </div>

            {/* indeterminate shimmer bar */}
            <div className="h-1 w-full overflow-hidden rounded-full bg-[#EEF1F6]">
              <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#86ABFF] to-[#4F7CFF] animate-[connectSlide_1.3s_ease-in-out_infinite]" />
            </div>

            <p className="text-[11px] text-[#9AA5B1]">
              Please allow microphone access if prompted
            </p>

            <button
              onClick={onEndCall}
              className="w-full rounded-full border border-[#E5E7EB] py-2.5 text-[13px] font-medium text-[#697386] transition-colors hover:bg-[#F4F6FA]"
            >
              Cancel
            </button>
          </div>
        </div>

        <style>{`
          @keyframes connectSlide {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(360%); }
          }
        `}</style>
      </>
    );
  }

  // Connected State
  if (callState === 'connected') {
    const isSophiaSpeaking = callStatus === 'speaking';
    return (
      <>
        <div className="fixed inset-0 bg-[#0A2540]/45 backdrop-blur-[2px] z-[9996]" />

        <div className="fixed bottom-6 left-6 right-6 sm:right-auto z-[9997] w-auto sm:w-[300px] overflow-hidden rounded-3xl bg-white shadow-[0_24px_70px_-12px_rgba(20,20,40,0.35)] ring-1 ring-black/[0.06] animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* live badge strip */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#4F7CFF] to-[#3F6BF0] px-5 py-2.5">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white/70 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Live call
            </span>
            <span className="font-mono text-[13px] tabular-nums text-white/95">
              {formatTime(callDuration)}
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 px-6 py-6">
            <SophiaAvatar active />

            <div className="text-center">
              <p className="text-[15px] font-semibold text-[#0A2540]">Sophia AI</p>
              <p
                className={`mt-0.5 inline-flex items-center gap-1.5 text-[12px] font-medium ${
                  isSophiaSpeaking ? 'text-[#4F7CFF]' : 'text-[#1ABF6B]'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isSophiaSpeaking ? 'bg-[#4F7CFF]' : 'bg-[#1ABF6B]'
                  } animate-pulse`}
                />
                {isSophiaSpeaking ? 'Speaking…' : 'Listening to you…'}
              </p>
            </div>

            {/* live waveform */}
            <div className="flex h-12 items-center justify-center gap-[3px]">
              {[...Array(13)].map((_, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-gradient-to-t from-[#4F7CFF] to-[#86ABFF] animate-callwave"
                  style={{
                    animationDelay: `${i * 0.07}s`,
                    animationDuration: isSophiaSpeaking ? '0.7s' : '1.1s',
                  }}
                />
              ))}
            </div>

            {/* controls */}
            <div className="flex w-full gap-2.5">
              <button
                onClick={onToggleMute}
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                  isMuted
                    ? 'bg-[#FFF1F2] text-[#E5484D] ring-1 ring-[#E5484D]/20'
                    : 'bg-[#F4F6FA] text-[#697386] hover:bg-[#EEF1F6]'
                }`}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff className="h-[18px] w-[18px]" /> : <Mic className="h-[18px] w-[18px]" />}
              </button>
              <button
                onClick={onEndCall}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#FF5F57] to-[#E5484D] py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(229,72,77,0.6)] transition-transform hover:scale-[1.02] active:scale-95"
              >
                <PhoneOff className="h-4 w-4" />
                End Call
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes callwave {
            0%, 100% { height: 8px; opacity: 0.65; }
            50% { height: 38px; opacity: 1; }
          }
          .animate-callwave {
            animation: callwave 1s ease-in-out infinite;
          }
        `}</style>
      </>
    );
  }

  return null;
};
