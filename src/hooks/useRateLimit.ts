/**
 * useRateLimit Hook
 * Handle rate limiting logic for calls
 */

import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { webhookService } from '@/services/api/webhooks';
import { storageService } from '@/services/storage/localStorage';
import { CALL_CONSTANTS } from '@/config/constants';
import type { LeadData } from '@/types/models';

export const useRateLimit = () => {
  const { toast } = useToast();

  const checkRateLimit = useCallback(async (userData: LeadData): Promise<boolean> => {
    // Check localStorage first for quick client-side rate limit
    const lastCallTime = storageService.getLastCallTime();

    if (lastCallTime) {
      const timeSinceLastCall = Date.now() - lastCallTime;
      const minutesSince = Math.floor(timeSinceLastCall / 60000);

      if (minutesSince < CALL_CONSTANTS.RATE_LIMIT_MINUTES) {
        const minutesRemaining = CALL_CONSTANTS.RATE_LIMIT_MINUTES - minutesSince;
        toast({
          title: 'Please wait',
          description: `Please wait ${minutesRemaining} minutes before your next call`,
          variant: 'destructive',
        });
        return false;
      }
    }

    // Check with server-side webhook
    try {
      const response = await webhookService.checkEligibility({
        email: userData.email,
        phone: userData.phone,
        timestamp: new Date().toISOString(),
      });

      if (response.data && !response.data.allowed) {
        toast({
          title: 'Rate Limit Reached',
          description: response.data.message || 'Please wait before making another call',
          variant: 'destructive',
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Rate limit check failed:', error);
      // On error, allow call to proceed (don't block users)
      return true;
    }
  }, [toast]);

  const saveCallTime = useCallback(() => {
    storageService.saveLastCallTime(Date.now());
  }, []);

  return {
    checkRateLimit,
    saveCallTime,
  };
};
