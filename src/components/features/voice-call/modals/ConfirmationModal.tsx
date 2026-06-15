/**
 * ConfirmationModal Component
 * Confirmation screen for returning users
 */

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import type { LeadData } from '@/types/models';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onUpdateInfo: () => void;
  userData: LeadData | null;
}

export const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  onUpdateInfo,
  userData,
}: ConfirmationModalProps) => {
  if (!userData) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome back, {userData.name}!</DialogTitle>
          <DialogDescription className="text-base pt-2">
            {userData.website_form_filled
              ? 'Ready to speak with Sophia again?'
              : 'We have your info from a previous interaction. Ready to speak with Sophia?'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2 text-sm">
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Company:</strong> {userData.company}
            </p>
            <p>
              <strong>Role:</strong> {userData.role}
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={onUpdateInfo} variant="outline" className="flex-1">
            Update Info
          </Button>
          <Button onClick={onConfirm} className="flex-1 rounded-full bg-gradient-to-br from-[#5C87FF] to-[#3F6BF0] hover:opacity-95 shadow-[0_10px_26px_-8px_rgba(79,124,255,0.65)]">
            <Phone className="w-4 h-4 mr-2" />
            Start Call
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
