import { useState, useEffect, useRef } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import agentblueLogo from "@/assets/agentblue-logo.png";

interface Message {
  text: string;
  isBot: boolean;
  isQuickReply?: boolean;
}

// Session ID management
const getSessionId = () => {
  let sessionId = localStorage.getItem('chatSessionId');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem('chatSessionId', sessionId);
  }
  return sessionId;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message when chatbot opens
      setTimeout(() => {
        setMessages([
          {
            text: "👋 Hey there! I'm the AgentBlue Assistant.\n\nI help growing businesses understand if automation is right for them.\n\nWhat brings you here today?",
            isBot: true,
          },
        ]);
      }, 500);
    }
  }, [isOpen]);

  const quickReplies = [
    { text: "🔍 Learn about your services", key: "services" },
    { text: "💡 I have a specific need", key: "need" },
    { text: "📅 Book a consultation", key: "consultation" },
    { text: "❓ Just browsing", key: "browsing" },
  ];

  const handleQuickReply = (key: string) => {
    const userMessage = quickReplies.find((q) => q.key === key)?.text || "";
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let botResponse = "";
      
      switch (key) {
        case "services":
          botResponse = "Great! We offer three tiers of automation services:\n\n1️⃣ Operations Intelligence Audit ($4,900)\n2️⃣ Automation Infrastructure Blueprint ($8,900)\n3️⃣ Turnkey Implementation (Custom pricing)\n\nWhich one interests you most?";
          break;
        case "need":
          botResponse = "Perfect! I'd love to understand your specific challenge.\n\nCommon areas we help with:\n• Client onboarding automation\n• Workflow optimization\n• Data integration\n• Customer communication\n\nWhat's your biggest operational pain point?";
          break;
        case "consultation":
          botResponse = "Excellent! Our free 30-minute diagnostic call helps identify what's holding your operations back.\n\nTo book, please share:\n📧 Your email\n\nI'll send you a calendar link right away!";
          break;
        case "browsing":
          botResponse = "No problem! Feel free to explore our website.\n\nIf you have questions, I'm here to help. You can also:\n\n📧 Email: sophia@supportagentblue.in\n📞 Call: +91 99340 17786\n\nWould you like to know more about a specific topic?";
          break;
      }
      
      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInputValue("");
    
    setIsTyping(true);
    
    try {
      const sessionId = getSessionId();
      const response = await fetch('https://n8nlocal.supportagentblue.com/webhook/ffcf29b6-19e9-40fd-81a6-132910560043/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          sessionId: sessionId
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      const botResponse = data.response || data.message || "Thanks for your message! Our team will get back to you soon.";
      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorResponse = "Thanks for your message! For immediate assistance:\n\n📧 sophia@supportagentblue.in\n📞 +91 99340 17786";
      setMessages((prev) => [...prev, { text: errorResponse, isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-[52px] h-[52px] bg-accent rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.25)] hover:scale-105 transition-all duration-300 z-[9999] flex items-center justify-center group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>
    );
  }

  return (
    <>
      {/* Desktop Chat Modal */}
      <div className="hidden md:flex fixed bottom-8 right-8 w-[380px] h-[650px] max-h-[calc(100vh-4rem)] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] z-[9999] flex-col animate-in slide-in-from-bottom-4 fade-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a2332] to-[#2c3e50] rounded-t-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center p-1.5">
              <img 
                src={agentblueLogo} 
                alt="AgentBlue" 
                className="w-full h-full object-contain"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </div>
            <div>
              <h3 className="text-white font-semibold text-base">AgentBlue</h3>
              <p className="text-gray-300 text-xs">⚡ Typically replies instantly</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/10 rounded-lg p-1.5 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 bg-gray-50 p-4 overflow-y-auto min-h-0 scroll-smooth"
        >
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"} mb-3`}>
                {message.isBot && (
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center p-1 mr-2 flex-shrink-0 shadow-sm">
                    <img 
                      src={agentblueLogo} 
                      alt="Bot" 
                      className="w-full h-full object-contain"
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
                    />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl whitespace-pre-line text-sm leading-relaxed ${
                    message.isBot
                      ? "bg-white text-gray-800 shadow-sm rounded-tl-sm"
                      : "bg-[#0084ff] text-white rounded-tr-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {/* Quick Reply Buttons - Show only after welcome message */}
            {messages.length === 1 && messages[0].isBot && (
              <div className="grid grid-cols-1 gap-2 mt-4">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.key}
                    onClick={() => handleQuickReply(reply.key)}
                    className="text-left p-3 bg-white hover:bg-gray-100 rounded-xl text-sm text-gray-700 shadow-sm transition-smooth border border-gray-200"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}
            
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center p-1 mr-2 flex-shrink-0 shadow-sm">
                  <img 
                    src={agentblueLogo} 
                    alt="Bot" 
                    className="w-full h-full object-contain"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 border-t border-gray-200 rounded-b-2xl flex-shrink-0">
          <div className="relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="pr-12 rounded-full border-gray-300 focus:border-[#0084ff] focus:ring-1 focus:ring-[#0084ff] text-sm h-10"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                inputValue.trim() ? "bg-[#0084ff] hover:bg-[#0073e6]" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Chat */}
      <div className="md:hidden fixed inset-0 bg-white z-[9999] flex flex-col animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a2332] to-[#2c3e50] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center p-1.5">
              <img 
                src={agentblueLogo} 
                alt="AgentBlue" 
                className="w-full h-full object-contain"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </div>
            <div>
              <h3 className="text-white font-semibold text-base">AgentBlue</h3>
              <p className="text-gray-300 text-xs">⚡ Typically replies instantly</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/10 rounded-lg p-1.5 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 bg-gray-50 p-4 overflow-y-auto min-h-0 scroll-smooth"
        >
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"} mb-3`}>
                {message.isBot && (
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center p-1 mr-2 flex-shrink-0 shadow-sm">
                    <img 
                      src={agentblueLogo} 
                      alt="Bot" 
                      className="w-full h-full object-contain"
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
                    />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl whitespace-pre-line text-sm leading-relaxed ${
                    message.isBot
                      ? "bg-white text-gray-800 shadow-sm rounded-tl-sm"
                      : "bg-[#0084ff] text-white rounded-tr-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {messages.length === 1 && messages[0].isBot && (
              <div className="grid grid-cols-1 gap-2 mt-4">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.key}
                    onClick={() => handleQuickReply(reply.key)}
                    className="text-left p-3 bg-white hover:bg-gray-100 rounded-xl text-sm text-gray-700 shadow-sm transition-all duration-200 border border-gray-200"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}
            
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center p-1 mr-2 flex-shrink-0 shadow-sm">
                  <img 
                    src={agentblueLogo} 
                    alt="Bot" 
                    className="w-full h-full object-contain"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                  />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 border-t border-gray-200 flex-shrink-0">
          <div className="relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="pr-12 rounded-full border-gray-300 focus:border-[#0084ff] focus:ring-1 focus:ring-[#0084ff] text-sm h-10"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                inputValue.trim() ? "bg-[#0084ff] hover:bg-[#0073e6]" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
