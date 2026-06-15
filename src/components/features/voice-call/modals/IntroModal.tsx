/**
 * IntroModal Component
 * Introduction screen before starting the call
 */

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Check, Phone, Volume2, Mic, Clock } from 'lucide-react';
import agentblueLogo from '@/assets/agentblue-logo.png';

interface IntroModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CHECKLIST = [
  { icon: Volume2, text: "Make sure you're in a quiet environment" },
  { icon: Mic, text: 'Allow microphone access when prompted' },
  { icon: Clock, text: 'The call typically takes 2–3 minutes' },
];

export const IntroModal = ({ open, onClose, onConfirm }: IntroModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border-0 shadow-[0_30px_80px_-16px_rgba(20,20,40,0.4)]">
        <DialogTitle className="sr-only">Connect with Sophia AI</DialogTitle>

        {/* Header band with avatar */}
        <div className="relative bg-gradient-to-br from-[#EEF4FF] via-[#F5F8FF] to-white px-6 pt-7 pb-6 text-center">
          <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(79,124,255,0.12)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent_75%)]" />
          <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center">
            <span className="absolute h-16 w-16 rounded-full bg-[#4F7CFF]/15 animate-ping" style={{ animationDuration: '2.6s' }} />
            <div className="relative h-16 w-16 rounded-full bg-white ring-1 ring-[#4F7CFF]/15 shadow-[0_8px_24px_-8px_rgba(79,124,255,0.5)] flex items-center justify-center p-3">
              <img src={agentblueLogo} alt="Sophia AI" className="h-full w-full object-contain" />
            </div>
          </div>
          <h2 className="relative text-[22px] font-semibold tracking-tight text-[#0A2540]">
            Connect with Sophia AI
          </h2>
          <p className="relative mt-1.5 text-[13.5px] leading-relaxed text-[#697386]">
            You're about to speak with our AI automation expert. She'll ask about
            your business and show how we can help.
          </p>
        </div>

        {/* Checklist */}
        <div className="space-y-2.5 px-6 py-5">
          {CHECKLIST.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-[#F7F9FC] px-3.5 py-2.5">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#4F7CFF]">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="text-[13px] text-[#425466]">{text}</span>
              <Check className="ml-auto h-4 w-4 flex-shrink-0 text-[#1ABF6B]" />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-[#E5E7EB] py-3 text-[14px] font-medium text-[#697386] transition-colors hover:bg-[#F4F6FA]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex flex-[1.4] items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#5C87FF] to-[#3F6BF0] py-3 text-[14px] font-semibold text-white shadow-[0_10px_26px_-8px_rgba(79,124,255,0.65)] transition-transform hover:scale-[1.02] active:scale-95"
          >
            <Phone className="h-4 w-4" />
            Start Voice Call
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
