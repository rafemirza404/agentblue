/**
 * Chatbot Component (Optimized)
 * Refactored for better performance and maintainability
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X, Send, ChevronDown } from 'lucide-react';
import { useChatScroll } from '@/hooks/useChatScroll';
import { webhookService } from '@/services/api/webhooks';
import { storageService } from '@/services/storage/localStorage';
import { ENV } from '@/config/env';
import { CHATBOT_CONFIG } from '@/config/constants';
import { ChatMessage } from './ChatMessage';
import { TopicCards } from './TopicCards';
import agentblueLogo from '@/assets/agentblue-logo.png';
import type { ChatMessage as ChatMessageType } from '@/types/models';

const WELCOME_MESSAGE: ChatMessageType = {
  text: "Hi there! 👋 Welcome to AgentBlue.\n\nWe don't just automate your business—we architect operational excellence.\n\nHow can we help you today?",
  isBot: true,
  timestamp: Date.now(),
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTopicCards, setShowTopicCards] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);

  const lastMessageTimeRef = useRef<number>(0);
  const sessionId = useMemo(() => storageService.getChatSessionId(), []);

  const { containerRef, messagesEndRef, isUserScrolled, handleScroll, scrollToBottom } =
    useChatScroll(messages);

  /**
   * Show welcome message when chat opens
   */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        setMessages([WELCOME_MESSAGE]);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  /**
   * Prevent body scroll on mobile when chat is open
   */
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  /**
   * Show notification only when a NEW bot message arrives while user is scrolled up
   */
  useEffect(() => {
    if (messages.length <= 1) return;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.isBot && isUserScrolled) {
      setHasNewMessage(true);
    }
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Clear notification when user scrolls back to bottom
   */
  useEffect(() => {
    if (!isUserScrolled) {
      setHasNewMessage(false);
    }
  }, [isUserScrolled]);

  /**
   * Send message to chatbot
   */
  const handleSendMessage = useCallback(
    async (messageText: string) => {
      const trimmedMessage = messageText.trim();
      if (!trimmedMessage) return;

      // Message throttling
      const now = Date.now();
      if (now - lastMessageTimeRef.current < 1000) {
        return;
      }
      lastMessageTimeRef.current = now;

      // Add user message
      const userMessage: ChatMessageType = {
        text: trimmedMessage,
        isBot: false,
        timestamp: now,
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      try {
        const response = await webhookService.sendChatMessage({
          message: trimmedMessage,
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
        });

        const botResponse =
          response.data?.response ||
          response.data?.output ||
          response.data?.message ||
          'Thanks for your message! Our team will get back to you soon.';

        const botMessage: ChatMessageType = {
          text: botResponse,
          isBot: true,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Chatbot error:', error);

        const errorMessage: ChatMessageType = {
          text: `I'm having trouble connecting right now. Please try again in a moment, or email us at ${ENV.app.contactEmail}`,
          isBot: true,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    },
    [sessionId]
  );

  /**
   * Handle topic card click
   */
  const handleTopicCardClick = useCallback(
    (message: string | null) => {
      if (message === null) {
        setShowTopicCards(false);
        return;
      }

      setShowTopicCards(false);
      handleSendMessage(message);
    },
    [handleSendMessage]
  );

  /**
   * Handle send button click
   */
  const handleSend = useCallback(() => {
    handleSendMessage(inputValue);
  }, [inputValue, handleSendMessage]);

  /**
   * Handle enter key press
   */
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  /**
   * Handle close
   */
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Escape key to close
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  // Show prompt bubble after 4s, auto-hide after 8s
  useEffect(() => {
    if (isOpen || promptDismissed) return;
    const show = setTimeout(() => setShowPrompt(true), 4000);
    const hide = setTimeout(() => setShowPrompt(false), 12000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [isOpen, promptDismissed]);

  // Closed state
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-[9998] flex flex-col items-end gap-3.5">

        {/* Prompt bubble */}
        {showPrompt && !promptDismissed && (
          <div className="relative mr-1 animate-in slide-in-from-bottom-3 fade-in duration-400">
            <div className="relative flex items-center gap-2.5 bg-white rounded-2xl rounded-br-md pl-2.5 pr-4 py-2.5 shadow-[0_12px_40px_-8px_rgba(20,20,40,0.22)] ring-1 ring-black/[0.05] max-w-[230px]">
              <button
                onClick={() => { setShowPrompt(false); setPromptDismissed(true); }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-white ring-1 ring-black/10 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 text-[12px] flex items-center justify-center leading-none shadow-sm transition-colors"
                aria-label="Dismiss"
              >×</button>
              {/* mini avatar */}
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#EEF4FF] p-1 ring-1 ring-black/[0.04]">
                <img src={agentblueLogo} alt="AgentBlue" className="h-full w-full object-contain" />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-[#1a1a2e] leading-snug">
                  Have a question? 👋
                </p>
                <p className="text-[12px] text-gray-500 leading-snug">We're here to help.</p>
              </div>
            </div>
            {/* tail */}
            <span className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 bg-white ring-1 ring-black/[0.05] [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
          </div>
        )}

        {/* Launcher button */}
        <div className="relative">
          {/* soft outer glow pulse */}
          <span className="pointer-events-none absolute -inset-1.5 rounded-full bg-[#4F7CFF]/25 blur-md animate-ping" style={{ animationDuration: '3s' }} />
          <span className="pointer-events-none absolute inset-0 rounded-full bg-[#4F7CFF]/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.4s' }} />
          <button
            onClick={() => { setIsOpen(true); setShowPrompt(false); }}
            className="group relative w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#5C87FF] to-[#3F6BF0] shadow-[0_8px_28px_-6px_rgba(79,124,255,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] ring-1 ring-white/20 hover:shadow-[0_12px_36px_-6px_rgba(79,124,255,0.75)] hover:scale-[1.06] active:scale-95 transition-all duration-300 flex items-center justify-center overflow-hidden"
            aria-label="Open chat support"
          >
            {/* glossy top sheen */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative transition-transform duration-300 group-hover:-translate-y-px group-hover:rotate-[-6deg]">
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                fill="white"
              />
              <circle cx="8.5" cy="10" r="1.1" fill="#4F7CFF" />
              <circle cx="12" cy="10" r="1.1" fill="#4F7CFF" />
              <circle cx="15.5" cy="10" r="1.1" fill="#4F7CFF" />
            </svg>
            {/* online dot */}
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70 animate-ping" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
            </span>
          </button>
        </div>

      </div>
    );
  }

  return (
    <>
      {/* Chevron-down close button - desktop only, below chat window */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-[10000]">
        <button
          onClick={handleClose}
          className="group relative w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#5C87FF] to-[#3F6BF0] shadow-[0_8px_28px_-6px_rgba(79,124,255,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] ring-1 ring-white/20 hover:shadow-[0_12px_36px_-6px_rgba(79,124,255,0.75)] hover:scale-[1.06] active:scale-95 transition-all duration-300 flex items-center justify-center overflow-hidden"
          aria-label="Close chat"
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent" />
          <ChevronDown className="relative w-6 h-6 text-white transition-transform duration-300 group-hover:translate-y-0.5" />
        </button>
      </div>

      {/* Desktop Chat Modal */}
      <div className="hidden md:flex fixed bottom-[90px] right-6 w-[414px] max-w-[414px] h-[522px] max-h-[522px] bg-white rounded-[26px] shadow-[0_24px_70px_-12px_rgba(20,20,40,0.28),0_0_0_1px_rgba(20,20,40,0.04)] z-[9999] flex-col animate-in slide-in-from-bottom-4 fade-in duration-300 overflow-hidden">
        {/* Header */}
        <div className="h-[76px] bg-white px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <img
                src={agentblueLogo}
                alt="AgentBlue"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-[#1a1a2e] font-semibold text-[17px] leading-tight tracking-tight">
                {ENV.app.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                </span>
                <p className="text-[#6B7280] text-[12.5px]">
                  Online · We architect operational excellence
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F3F4F6] rounded-full transition-colors flex items-center justify-center"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="relative flex-1">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="absolute inset-0 bg-gradient-to-b from-[#FAFBFC] to-[#F4F6FA] px-5 py-5 overflow-y-auto scroll-smooth"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(0,0,0,0.15) transparent',
            }}
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} logo={agentblueLogo} />
              ))}

              {/* Topic Cards */}
              {showTopicCards && messages.length === 1 && messages[0].isBot && (
                <TopicCards onCardClick={handleTopicCardClick} />
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-in fade-in duration-200">
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center p-1 mr-2 flex-shrink-0 shadow-[0_2px_8px_rgba(20,20,40,0.1)] ring-1 ring-black/5">
                    <img src={agentblueLogo} alt="Bot" className="w-full h-full object-contain" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-[0_2px_10px_-2px_rgba(20,20,40,0.08)] ring-1 ring-black/[0.04]">
                    <div className="flex gap-1.5 items-center">
                      {[0, 200, 400].map((delay) => (
                        <span
                          key={delay}
                          className="w-1.5 h-1.5 bg-[#4F7CFF] rounded-full animate-bounce"
                          style={{ animationDelay: `${delay}ms`, animationDuration: '1.4s' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* New Message Notification */}
          {hasNewMessage && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-in slide-in-from-bottom-2 fade-in duration-200">
              <button
                onClick={() => {
                  setHasNewMessage(false);
                  scrollToBottom();
                }}
                className="bg-[#4F7CFF] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium hover:bg-[#3B6AE8] transition-all flex items-center gap-2"
              >
                <span>↓</span> New message
              </button>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white px-4 pb-4 pt-2 flex gap-2.5 items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 h-12 bg-[#F4F6FA] border border-transparent rounded-full px-5 text-sm text-[#1a1a2e] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:bg-white focus:border-[#4F7CFF] focus:shadow-[0_0_0_3px_rgba(79,124,255,0.12)]"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="w-12 h-12 flex-shrink-0 bg-[#4F7CFF] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-[0_6px_16px_rgba(79,124,255,0.4)] disabled:bg-[#E5E7EB] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label="Send message"
          >
            <Send className="w-[18px] h-[18px] text-white -ml-0.5" />
          </button>
        </div>
      </div>

      {/* Mobile Chat - Bottom Sheet */}
      <div className="md:hidden fixed inset-x-0 bottom-0 top-[5vh] bg-white z-[10000] flex flex-col animate-in slide-in-from-bottom duration-300 rounded-t-3xl shadow-[0_-8px_40px_rgba(0,0,0,0.18)] overflow-hidden">

        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EEF4FF] flex items-center justify-center p-1.5 flex-shrink-0">
              <img src={agentblueLogo} alt="AgentBlue" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-[#1a1a2e] font-semibold text-base leading-tight">
                {ENV.app.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                <p className="text-[#6B7280] text-xs">Online · Ready to help</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-[#6B7280] hover:bg-[#F3F4F6] rounded-xl p-2 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="relative flex-1">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="absolute inset-0 bg-gradient-to-b from-[#FAFBFC] to-[#F4F6FA] p-3 overflow-y-auto scroll-smooth"
          >
            <div className="space-y-2">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} logo={agentblueLogo} />
              ))}

              {/* Topic Cards - Mobile */}
              {showTopicCards && messages.length === 1 && messages[0].isBot && (
                <TopicCards onCardClick={handleTopicCardClick} isMobile />
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-in fade-in duration-200">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center p-1 mr-2 flex-shrink-0 shadow-[0_2px_8px_rgba(20,20,40,0.1)] ring-1 ring-black/5">
                    <img src={agentblueLogo} alt="Bot" className="w-full h-full object-contain" />
                  </div>
                  <div className="bg-white px-3.5 py-2.5 rounded-2xl rounded-bl-md shadow-[0_2px_10px_-2px_rgba(20,20,40,0.08)] ring-1 ring-black/[0.04]">
                    <div className="flex gap-1 items-center">
                      {[0, 200, 400].map((delay) => (
                        <span
                          key={delay}
                          className="w-1.5 h-1.5 bg-[#4F7CFF] rounded-full animate-bounce"
                          style={{ animationDelay: `${delay}ms`, animationDuration: '1.4s' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* New Message Notification - Mobile */}
          {hasNewMessage && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-in slide-in-from-bottom-2 fade-in duration-200">
              <button
                onClick={() => {
                  setHasNewMessage(false);
                  scrollToBottom();
                }}
                className="bg-[#4F7CFF] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium hover:bg-[#3B6AE8] transition-all flex items-center gap-2"
              >
                <span>↓</span> New message
              </button>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white px-4 pt-2 pb-3 flex gap-2.5 items-center" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 h-11 bg-[#F4F6FA] border border-transparent rounded-full px-4 text-base text-[#1a1a2e] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:bg-white focus:border-[#4F7CFF] focus:shadow-[0_0_0_3px_rgba(79,124,255,0.12)]"
            style={{ fontSize: '16px' }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="w-11 h-11 bg-[#4F7CFF] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 disabled:bg-[#E5E7EB] disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
