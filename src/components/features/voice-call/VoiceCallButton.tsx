/**
 * VoiceCallButton Component (Refactored)
 * Orchestrates the voice call flow with modular modals
 * Fixed: First call failure, stale closure, connecting state
 */

import { useState, useEffect } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { useVoiceCallFlow } from '@/hooks/useVoiceCallFlow';
import { EmailLookupModal } from './modals/EmailLookupModal';
import { LeadFormModal } from './modals/LeadFormModal';
import { ConfirmationModal } from './modals/ConfirmationModal';
import { IntroModal } from './modals/IntroModal';
import { CallActiveCard } from './modals/CallActiveCard';
import { FeedbackModal } from './modals/FeedbackModal';
import type { LeadData, ModalState } from '@/types/models';

const VoiceCallButton = () => {
  const {
    callState,
    leadData,
    callDuration,
    callStatus,
    isMuted,
    rating,
    feedbackText,
    updateLeadData,
    validateAndCheckRateLimit,
    initiateCall,
    endCall,
    toggleMute,
    setRating,
    setFeedbackText,
    resetCall,
  } = useVoiceCallFlow();

  const [activeModal, setActiveModal] = useState<ModalState>('none');
  const [pendingEmail, setPendingEmail] = useState('');
  const [heroPassed, setHeroPassed] = useState(false);

  // Only show button once the hero section has scrolled out of view
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) { setHeroPassed(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => setHeroPassed(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Allow hero section button to trigger this flow via custom event
  useEffect(() => {
    const handler = () => handleButtonClick();
    window.addEventListener('openVoiceCall', handler);
    return () => window.removeEventListener('openVoiceCall', handler);
  }, [leadData]);

  /**
   * Handle floating button click
   */
  const handleButtonClick = () => {
    if (leadData) {
      // User exists in localStorage
      setActiveModal('confirmation');
    } else {
      // New user
      setActiveModal('email_lookup');
    }
  };

  /**
   * Handle user found from email lookup
   */
  const handleUserFound = (userData: LeadData) => {
    updateLeadData(userData);
    setActiveModal('confirmation');
  };

  /**
   * Handle user not found from email lookup
   */
  const handleUserNotFound = (email: string) => {
    setPendingEmail(email);
    setActiveModal('lead_form');
  };

  /**
   * Handle lead form submission
   */
  const handleLeadFormSubmit = async (data: LeadData) => {
    updateLeadData(data);
    setActiveModal('none');

    // Check rate limit and proceed
    const canProceed = await validateAndCheckRateLimit();
    if (canProceed) {
      setActiveModal('intro');
    }
  };

  /**
   * Handle confirmed returning user
   */
  const handleConfirmedUser = async () => {
    setActiveModal('none');

    // Check rate limit and proceed
    const canProceed = await validateAndCheckRateLimit();
    if (canProceed) {
      setActiveModal('intro');
    }
  };

  /**
   * Handle update info (from confirmation modal)
   */
  const handleUpdateInfo = () => {
    setActiveModal('lead_form');
  };

  /**
   * Handle intro modal confirm - start call
   */
  const handleStartCall = async () => {
    setActiveModal('none');
    await initiateCall();
  };

  /**
   * Handle call end
   */
  const handleEndCall = () => {
    endCall();
  };

  /**
   * Handle feedback modal close
   */
  const handleFeedbackClose = () => {
    setActiveModal('none');
    resetCall();
  };

  // Show feedback modal when call ends
  const showFeedbackModal = callState.isEnded;

  return (
    <>
      {/* Floating Button — visible only after hero scrolls out of view */}
      {heroPassed && callState.isIdle && (
        <button
          onClick={handleButtonClick}
          className="fixed bottom-6 left-6 z-[9997] h-[52px] bg-[#4F7CFF] hover:bg-[#4F7CFF] text-white text-sm font-semibold px-5 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(79,124,255,0.3)] hover:shadow-[0_6px_28px_rgba(79,124,255,0.4)] flex items-center gap-2"
          aria-label="Talk to Sophia AI"
        >
          Talk to Sophia AI <ArrowRight className="h-5 w-5" />
        </button>
      )}

      {/* Email Lookup Modal */}
      <EmailLookupModal
        open={activeModal === 'email_lookup'}
        onClose={() => setActiveModal('none')}
        onUserFound={handleUserFound}
        onUserNotFound={handleUserNotFound}
      />

      {/* Lead Form Modal */}
      <LeadFormModal
        open={activeModal === 'lead_form'}
        onClose={() => setActiveModal('none')}
        onSubmit={handleLeadFormSubmit}
        initialEmail={pendingEmail}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={activeModal === 'confirmation'}
        onClose={() => setActiveModal('none')}
        onConfirm={handleConfirmedUser}
        onUpdateInfo={handleUpdateInfo}
        userData={leadData}
      />

      {/* Intro Modal */}
      <IntroModal
        open={activeModal === 'intro'}
        onClose={() => setActiveModal('none')}
        onConfirm={handleStartCall}
      />

      {/* Call Active Card (includes connecting + connected states) */}
      <CallActiveCard
        callState={callState.state}
        callStatus={callStatus}
        callDuration={callDuration}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onEndCall={handleEndCall}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        open={showFeedbackModal}
        onClose={handleFeedbackClose}
        leadData={leadData}
        callStartTime={null} // Will be passed from useVoiceCallFlow if needed
        callDuration={callDuration}
        vapiCallId=""
        rating={rating}
        feedbackText={feedbackText}
        onRatingChange={setRating}
        onFeedbackTextChange={setFeedbackText}
      />
    </>
  );
};

export default VoiceCallButton;
