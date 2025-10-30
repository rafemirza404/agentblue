import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import agentblueLogo from "@/assets/agentblue-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "SERVICES", href: "/services" },
    { name: "CONTACT", href: "/contact" },
  ];

  const handleChatWithUs = () => {
    // Open chatbot
    const chatButton = document.querySelector('[data-chatbot-trigger]');
    if (chatButton instanceof HTMLElement) {
      chatButton.click();
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-black border-b border-white/10 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-all">
            <img 
              src={agentblueLogo} 
              alt="AgentBlue Logo" 
              className="h-10 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white text-sm font-bold tracking-wider hover:text-blue-500 transition-all"
              >
                {item.name}
              </Link>
            ))}
            <Button 
              onClick={handleChatWithUs}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3 rounded-md transition-all"
            >
              CHAT WITH US
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white hover:text-blue-500 transition-all py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button 
                onClick={handleChatWithUs}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3 rounded-md w-fit"
              >
                CHAT WITH US
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;