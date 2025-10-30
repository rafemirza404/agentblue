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

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      // TODO: Replace with actual chatbot webhook URL when provided
      // const response = await fetch('YOUR_CHATBOT_WEBHOOK_URL', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: userMessage }),
      // });
      // const data = await response.json();
      // const botResponse = data.response || "Thanks for your message!";
      
      // For now, show default response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const botResponse = "Thanks for your message! For detailed assistance, please reach out to our team:\n\n📧 sophia@supportagentblue.in\n📞 +91 99340 17786\n\nOr book a free consultation to discuss your needs in detail.";
      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorResponse = "Sorry, I'm having trouble connecting. Please email us at sophia@supportagentblue.in";
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
        className="fixed bottom-8 right-8 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-accent rounded-full shadow-elegant hover:shadow-glow hover:scale-105 transition-smooth z-[9999] flex items-center justify-center group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
    );
  }

  return (
    <>
      {/* Desktop Chat Modal */}
      <div className="hidden md:flex fixed bottom-8 right-8 w-[400px] h-[600px] max-h-[calc(100vh-4rem)] bg-background rounded-2xl shadow-elegant z-[9999] flex-col animate-in slide-in-from-bottom-4 fade-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a2332] to-[#2c3e50] rounded-t-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
              <img src={agentblueLogo} alt="AgentBlue" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">AgentBlue Assistant</h3>
              <p className="text-gray-300 text-sm">⚡ Typically replies instantly</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/10 rounded-lg p-1 transition-smooth"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-gray-50 p-5 overflow-y-auto min-h-0">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                {message.isBot && (
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1 mr-2 flex-shrink-0 shadow-sm">
                    <img src={agentblueLogo} alt="Bot" className="w-full h-full object-contain" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-xl whitespace-pre-line ${
                    message.isBot
                      ? "bg-white text-gray-800 shadow-sm rounded-tl-none"
                      : "bg-accent text-white rounded-tr-none"
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
              <div className="flex justify-start">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1 mr-2 flex-shrink-0 shadow-sm">
                  <img src={agentblueLogo} alt="Bot" className="w-full h-full object-contain" />
                </div>
                <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm">
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
              placeholder="Type your message..."
              className="pr-12 rounded-3xl border-gray-300 focus:border-accent"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-smooth ${
                inputValue.trim() ? "bg-accent hover:bg-accent/90" : "bg-gray-300"
              }`}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Chat */}
      <div className="md:hidden fixed inset-0 bg-background z-[9999] flex flex-col animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a2332] to-[#2c3e50] p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
              <img src={agentblueLogo} alt="AgentBlue" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">AgentBlue Assistant</h3>
              <p className="text-gray-300 text-sm">⚡ Typically replies instantly</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/10 rounded-lg p-1 transition-smooth"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto min-h-0">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                {message.isBot && (
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1 mr-2 flex-shrink-0 shadow-sm">
                    <img src={agentblueLogo} alt="Bot" className="w-full h-full object-contain" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-xl whitespace-pre-line ${
                    message.isBot
                      ? "bg-white text-gray-800 shadow-sm rounded-tl-none"
                      : "bg-accent text-white rounded-tr-none"
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
                    className="text-left p-3 bg-white hover:bg-gray-100 rounded-xl text-sm text-gray-700 shadow-sm transition-smooth border border-gray-200"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1 mr-2 flex-shrink-0 shadow-sm">
                  <img src={agentblueLogo} alt="Bot" className="w-full h-full object-contain" />
                </div>
                <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm">
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
              placeholder="Type your message..."
              className="pr-12 rounded-3xl border-gray-300 focus:border-accent"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-smooth ${
                inputValue.trim() ? "bg-accent hover:bg-accent/90" : "bg-gray-300"
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
