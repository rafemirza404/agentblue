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

    try {
      const response = await webhookService.lookupUser({ email });

      if (response.data && response.data.found && response.data.data) {
        // User found
        const userProfile: LeadData = {
          name: response.data.data.name,
          email: response.data.data.email,
          phone: response.data.data.phone,
          company: response.data.data.company,
          role: response.data.data.role,
          consent: true,
          website_form_filled: response.data.website_form_filled || false,
        };
        onUserFound(userProfile);
      } else {
        // User not found
        onUserNotFound(email);
      }
    } catch (error) {
      console.error('Email lookup error:', error);
      // On error, proceed to form
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome back!</DialogTitle>
          <DialogDescription className="text-base pt-2">
            Enter your email to continue
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
            className="w-full bg-[#0066FF] hover:bg-[#0052CC]"
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
