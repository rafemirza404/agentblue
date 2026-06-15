/**
 * EmailLookupModal Component
 * Modal for existing users to enter their email
 */

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { webhookService } from '@/services/api/webhooks';
import { validateEmail } from '@/lib/validation';
import agentblueLogo from '@/assets/agentblue-logo.png';
import type { LeadData } from '@/types/models';

interface EmailLookupModalProps {
  open: boolean;
  onClose: () => void;
  onUserFound: (userData: LeadData) => void;
  onUserNotFound: (email: string) => void;
}

export const EmailLookupModal = ({
  open,
  onClose,
  onUserFound,
  onUserNotFound,
}: EmailLookupModalProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');

    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // FIX 2: Disabled lookup client function - proceed directly to form
    // Let browser's native autofill handle returning user data
    try {
      // No longer calling webhookService.lookupUser
      // Always proceed to form with email
      onUserNotFound(email);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl border-0 shadow-[0_30px_80px_-16px_rgba(20,20,40,0.4)]">
        <DialogHeader className="items-center text-center">
          <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#EEF4FF] to-[#DCE8FF] ring-1 ring-[#4F7CFF]/15 p-2.5">
            <img src={agentblueLogo} alt="Sophia AI" className="h-full w-full object-contain" />
          </div>
          <DialogTitle className="text-2xl tracking-tight text-[#0A2540]">Welcome back!</DialogTitle>
          <DialogDescription className="text-[14px] text-[#697386]">
            Enter your email to continue your call with Sophia
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="lookup-email">Email Address</Label>
            <Input
              id="lookup-email"
              type="email"
              placeholder="john@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full rounded-full bg-gradient-to-br from-[#5C87FF] to-[#3F6BF0] hover:opacity-95 shadow-[0_10px_26px_-8px_rgba(79,124,255,0.65)]"
          >
            {isLoading ? 'Looking up...' : 'Continue'}
          </Button>
          <Button
            onClick={() => onUserNotFound('')}
            variant="ghost"
            className="w-full"
          >
            I'm new here
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
