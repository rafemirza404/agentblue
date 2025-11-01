import { useState, useEffect, useRef } from "react";
import { X, MessageCircle, Send, BarChart3, Wrench, Briefcase, Phone, MessageSquare } from "lucide-react";
import agentblueLogo from "@/assets/agentblue-logo.png";

interface Message {
  text: string;
  isBot: boolean;
}

// Session ID management
const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem('chatSessionId');
  if (!sessionId) {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 11);
    sessionId = `session_${timestamp}_${randomString}`;
    localStorage.setItem('chatSessionId', sessionId);
    localStorage.setItem('chatSessionCreated', timestamp.toString());
  }
  return sessionId;
};

// Configuration
const CHATBOT_CONFIG = {
  n8nWebhookUrl: 'https://n8nlocal.supportagentblue.com/webhook/4e02043e-82d8-4bd8-98a8-120178577d20',
  contactEmail: 'sophia@supportagentblue.in',
  companyName: 'AgentBlue',
  messageTimeout: 30000,
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTopicCards, setShowTopicCards] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageTimeRef = useRef<number>(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll to bottom when typing indicator appears/disappears
  useEffect(() => {
    scrollToBottom();
  }, [isTyping]);

  // Scroll to bottom when topic cards appear/disappear
  useEffect(() => {
    scrollToBottom();
  }, [showTopicCards]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Show initial greeting when chatbot opens
      setTimeout(() => {
        setMessages([
          {
            text: "Hi there! 👋 Welcome to AgentBlue.\n\nWe don't just automate your business—we architect operational excellence.\n\nHow can we help you today?",
            isBot: true,
          },
        ]);
      }, 300);
    }
  }, [isOpen]);

  // Prevent body scroll on mobile when chat is open
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

  const topicCards = [
    {
      id: 'audit',
      icon: BarChart3,
      title: "Operations Intelligence Audit",
      description: "Diagnose bottlenecks and quantify ROI opportunities",
      message: "I'm interested in Operations Audit"
    },
    {
      id: 'strategy',
      icon: Wrench,
      title: "Automation Infrastructure Design",
      description: "Get detailed technical blueprints for implementation",
      message: "I want to learn about Automation Strategy"
    },
    {
      id: 'implementation',
      icon: Briefcase,
      title: "Turnkey Implementation",
      description: "Full-service build, test, deploy, and train",
      message: "Tell me about Implementation Services"
    },
    {
      id: 'consultation',
      icon: Phone,
      title: "Book a Free Consultation",
      description: "Speak with our automation experts",
      message: "I'd like to book a consultation"
    },
    {
      id: 'other',
      icon: MessageSquare,
      title: "Other Questions",
      description: "Ask us anything about automation",
      message: null // Enable free text input
    },
  ];

  const handleTopicCardClick = (message: string | null) => {
    if (message === null) {
      // "Other Questions" - just hide cards and let user type
      setShowTopicCards(false);
      return;
    }
    
    setShowTopicCards(false);
    handleSendMessage(message);
  };

  const handleSendMessage = async (messageText: string) => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage) return;

    // Message throttling - prevent spam
    const now = Date.now();
    if (now - lastMessageTimeRef.current < 1000) {
      return;
    }
    lastMessageTimeRef.current = now;

    // Add user message
    setMessages((prev) => [...prev, { text: trimmedMessage, isBot: false }]);
    setInputValue("");
    setIsTyping(true);

    try {
      const sessionId = getOrCreateSessionId();
      const response = await fetch(CHATBOT_CONFIG.n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedMessage,
          sessionId: sessionId,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.response || data.message || "Thanks for your message! Our team will get back to you soon.";
      
      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorResponse = `I'm having trouble connecting right now. Please try again in a moment, or email us at ${CHATBOT_CONFIG.contactEmail}`;
      setMessages((prev) => [...prev, { text: errorResponse, isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    handleSendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-[52px] h-[52px] bg-[#0066FF] rounded-full shadow-[0_4px_20px_rgba(0,102,255,0.3)] hover:shadow-[0_6px_28px_rgba(0,102,255,0.4)] hover:scale-105 transition-all duration-300 z-[9998] flex items-center justify-center"
        aria-label="Open chat support"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    );
  }

  return (
    <>
      {/* Desktop Chat Modal */}
      <div className="hidden md:flex fixed bottom-[90px] right-6 w-[360px] max-w-[360px] h-[580px] max-h-[580px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] z-[9999] flex-col animate-in slide-in-from-bottom-4 fade-in duration-300 overflow-hidden">
        {/* Header */}
        <div className="h-[70px] bg-white px-5 py-4 flex items-center justify-between border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center">
              <img 
                src={agentblueLogo} 
                alt="AgentBlue" 
                className="w-full h-full object-contain"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </div>
            <div>
              <h3 className="text-[#1a1a2e] font-semibold text-base leading-tight">AgentBlue</h3>
              <p className="text-[#6B7280] text-xs mt-0.5">We architect operational excellence</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-[#6B7280] hover:bg-[#F3F4F6] rounded-lg p-1.5 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 bg-[#F8F9FA] p-4 overflow-y-auto scroll-smooth"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0,0,0,0.2) transparent'
          }}
        >
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-in fade-in duration-300`}>
                {message.isBot && (
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center p-1 mr-2.5 flex-shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
                    <img 
                      src={agentblueLogo} 
                      alt="Bot" 
                      className="w-full h-full object-contain"
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
                    />
                  </div>
                )}
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 whitespace-pre-line text-sm leading-relaxed ${
                    message.isBot
                      ? "bg-[#F3F4F6] text-[#1a1a2e] rounded-2xl rounded-tl-[4px]"
                      : "bg-[#0066FF] text-white rounded-2xl rounded-tr-[4px]"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {/* Topic Cards - Show only after welcome message */}
            {showTopicCards && messages.length === 1 && messages[0].isBot && (
              <div className="grid grid-cols-2 gap-2.5 mt-3 animate-in fade-in duration-500">
                {topicCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={card.id}
                      onClick={() => handleTopicCardClick(card.message)}
                      className="bg-white border-2 border-[#E5E7EB] rounded-xl p-3 cursor-pointer transition-all duration-250 hover:border-[#0066FF] hover:bg-[#F0F7FF] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,102,255,0.15)] text-left flex flex-col gap-1.5 col-span-2 last:col-span-2"
                    >
                      <Icon className="w-7 h-7 text-[#0066FF]" />
                      <div className="text-[14px] font-semibold text-[#1a1a2e] leading-tight">
                        {card.title}
                      </div>
                      <div className="text-xs text-[#6B7280] leading-snug">
                        {card.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-200">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center p-1 mr-2.5 flex-shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
                  <img 
                    src={agentblueLogo} 
                    alt="Bot" 
                    className="w-full h-full object-contain"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />
                </div>
                <div className="max-w-[70px] bg-white px-4 py-2.5 rounded-2xl rounded-tl-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce" style={{ animationDelay: "0ms", animationDuration: "1.4s" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce" style={{ animationDelay: "200ms", animationDuration: "1.4s" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce" style={{ animationDelay: "400ms", animationDuration: "1.4s" }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="h-[70px] bg-white px-4 py-3 border-t border-[#E5E7EB] flex gap-2.5 items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 h-11 bg-white border-2 border-[#E5E7EB] rounded-3xl px-4 text-sm text-[#1a1a2e] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#0066FF] focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)]"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="w-11 h-11 bg-[#0066FF] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,102,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Chat */}
      <div className="md:hidden fixed inset-0 bg-white z-[10000] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="h-[70px] bg-white px-5 py-4 flex items-center justify-between border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center">
              <img 
                src={agentblueLogo} 
                alt="AgentBlue" 
                className="w-full h-full object-contain"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </div>
            <div>
              <h3 className="text-[#1a1a2e] font-semibold text-base leading-tight">AgentBlue</h3>
              <p className="text-[#6B7280] text-xs mt-0.5">We architect operational excellence</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-[#6B7280] hover:bg-[#F3F4F6] rounded-lg p-1.5 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 bg-[#F8F9FA] p-4 overflow-y-auto scroll-smooth"
        >
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-in fade-in duration-300`}>
                {message.isBot && (
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center p-1 mr-3 flex-shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
                    <img 
                      src={agentblueLogo} 
                      alt="Bot" 
                      className="w-full h-full object-contain"
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
                    />
                  </div>
                )}
                <div
                  className={`max-w-[90%] px-4 py-3 whitespace-pre-line text-sm leading-relaxed ${
                    message.isBot
                      ? "bg-[#F3F4F6] text-[#1a1a2e] rounded-2xl rounded-tl-[4px]"
                      : "bg-[#0066FF] text-white rounded-2xl rounded-tr-[4px]"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {/* Topic Cards - Mobile */}
            {showTopicCards && messages.length === 1 && messages[0].isBot && (
              <div className="grid grid-cols-1 gap-2.5 mt-4 animate-in fade-in duration-500">
                {topicCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={card.id}
                      onClick={() => handleTopicCardClick(card.message)}
                      className="bg-white border-2 border-[#E5E7EB] rounded-xl p-3.5 cursor-pointer transition-all duration-250 hover:border-[#0066FF] hover:bg-[#F0F7FF] text-left flex flex-col gap-2"
                    >
                      <Icon className="w-8 h-8 text-[#0066FF]" />
                      <div className="text-[15px] font-semibold text-[#1a1a2e] leading-tight">
                        {card.title}
                      </div>
                      <div className="text-[13px] text-[#6B7280] leading-snug">
                        {card.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-200">
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center p-1 mr-3 flex-shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
                  <img 
                    src={agentblueLogo} 
                    alt="Bot" 
                    className="w-full h-full object-contain"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />
                </div>
                <div className="max-w-[80px] bg-white px-5 py-3 rounded-2xl rounded-tl-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce" style={{ animationDelay: "0ms", animationDuration: "1.4s" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce" style={{ animationDelay: "200ms", animationDuration: "1.4s" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce" style={{ animationDelay: "400ms", animationDuration: "1.4s" }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white px-4 py-3 border-t border-[#E5E7EB] flex gap-3 items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 h-11 bg-white border-2 border-[#E5E7EB] rounded-3xl px-5 text-base text-[#1a1a2e] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#0066FF] focus:shadow-[0_0_0_3px_rgba(0,102,255,0.1)]"
            style={{ fontSize: '16px' }} // Prevents zoom on iOS
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="w-12 h-12 bg-[#0066FF] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
