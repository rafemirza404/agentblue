import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import agentblueLogo from "@/assets/agentblue-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChatClick = () => {
    // Trigger custom event to open chatbot
    window.dispatchEvent(new Event('openChatbot'));
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 w-full bg-black border-b border-white/10 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src={agentblueLogo} 
              alt="AgentBlue Logo" 
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/services"
              className="text-white text-sm font-bold uppercase tracking-wider hover:text-[#4F7CFF] transition-colors"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-white text-sm font-bold uppercase tracking-wider hover:text-[#4F7CFF] transition-colors"
            >
              Contact
            </Link>
            <button
              onClick={handleChatClick}
              className="bg-[#4F7CFF] hover:bg-[#3d63cc] text-white text-sm font-bold px-6 py-3 rounded-md transition-colors"
            >
              CHAT WITH US
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <Link
                to="/services"
                className="text-white text-sm font-bold uppercase tracking-wider hover:text-[#4F7CFF] transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="text-white text-sm font-bold uppercase tracking-wider hover:text-[#4F7CFF] transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <button
                onClick={handleChatClick}
                className="bg-[#4F7CFF] hover:bg-[#3d63cc] text-white text-sm font-bold px-6 py-3 rounded-md transition-colors w-fit"
              >
                CHAT WITH US
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;