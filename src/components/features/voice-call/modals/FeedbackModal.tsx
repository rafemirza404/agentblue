/**
 * FeedbackModal Component
 * Post-call feedback collection
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { webhookService } from '@/services/api/webhooks';
import type { LeadData } from '@/types/models';

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  leadData: LeadData | null;
  callStartTime: Date | null;
  callDuration: number;
  vapiCallId: string;
  rating: number;
  feedbackText: string;
  onRatingChange: (rating: number) => void;
  onFeedbackTextChange: (text: string) => void;
}

export const FeedbackModal = ({
  open,
  onClose,
  leadData,
  callStartTime,
  callDuration,
  vapiCallId,
  rating,
  feedbackText,
  onRatingChange,
  onFeedbackTextChange,
}: FeedbackModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [autoCloseCountdown, setAutoCloseCountdown] = useState(10);

  // Auto-close countdown
  useEffect(() => {
    if (open && autoCloseCountdown > 0) {
      const timer = setTimeout(() => {
        setAutoCloseCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (open && autoCloseCountdown === 0) {
      onClose();
    }
  }, [open, autoCloseCountdown, onClose]);

  const resetCountdown = () => {
    setAutoCloseCountdown(10);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFeedbackSubmit = async () => {
    resetCountdown();

    if (!leadData) return;

    try {
      await webhookService.saveCallRecord({
        lead_data: {
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          company: leadData.company,
          role: leadData.role,
        },
        call_data: {
          started_at: callStartTime?.toISOString() || '',
          ended_at: new Date().toISOString(),
          duration: formatTime(callDuration),
          vapi_call_id: vapiCallId || null,
        },
        feedback: {
          rating: rating,
          comment: feedbackText,
          next_action: 'submitted',
        },
      });

      toast({
        title: 'Thank you!',
        description: 'Your feedback has been recorded.',
      });

      onClose();
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const handleExploreServices = async () => {
    resetCountdown();

    if (!leadData) return;

    try {
      await webhookService.saveCallRecord({
        lead_data: {
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          company: leadData.company,
          role: leadData.role,
        },
        call_data: {
          started_at: callStartTime?.toISOString() || '',
          ended_at: new Date().toISOString(),
          duration: formatTime(callDuration),
          vapi_call_id: vapiCallId || null,
        },
        feedback: {
          rating: rating || null,
          comment: feedbackText || '',
          next_action: 'explore_services',
        },
      });
    } catch (error) {
      console.error('Error updating action:', error);
    }

    navigate('/services');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md rounded-3xl border-0 shadow-[0_30px_80px_-16px_rgba(20,20,40,0.4)]"
        onClick={resetCountdown}
        onKeyDown={resetCountdown}
      >
        <div className="text-center space-y-4 py-2">
          <div className="flex justify-center">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <span className="absolute h-16 w-16 rounded-full bg-[#1ABF6B]/15 animate-ping" style={{ animationDuration: '2.6s' }} />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#E7F8EF] to-[#D6F2E3] ring-1 ring-[#1ABF6B]/20">
                <Check className="h-8 w-8 text-[#1ABF6B]" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-[22px] font-semibold tracking-tight text-[#0A2540]">
              Thanks for speaking with Sophia!
            </h3>
            <p className="text-[13px] text-[#697386]">
              Your consultation summary will be sent to your email
            </p>
          </div>

          <div className="space-y-3 pt-3">
            <p className="text-[14px] font-medium text-[#0A2540]">
              How was your experience?
            </p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    onRatingChange(star);
                    resetCountdown();
                  }}
                  className="transition-transform hover:scale-125"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= rating
                        ? 'fill-[#FFB020] text-[#FFB020]'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Textarea
              placeholder="Any additional feedback? (optional)"
              value={feedbackText}
              onChange={(e) => {
                onFeedbackTextChange(e.target.value);
                resetCountdown();
              }}
              maxLength={500}
              className="min-h-[80px]"
            />
            <p className="text-xs text-gray-500 text-right">
              {feedbackText.length}/500
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              onClick={handleExploreServices}
              className="w-full rounded-full bg-gradient-to-br from-[#5C87FF] to-[#3F6BF0] hover:opacity-95 shadow-[0_10px_26px_-8px_rgba(79,124,255,0.65)]"
            >
              Explore Our Services
            </Button>

            {rating > 0 && (
              <Button onClick={handleFeedbackSubmit} variant="outline" className="w-full">
                Submit Feedback
              </Button>
            )}
          </div>

          <div className="pt-2 space-y-2">
            <p className="text-sm text-gray-500">Closing in {autoCloseCountdown} seconds...</p>
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
