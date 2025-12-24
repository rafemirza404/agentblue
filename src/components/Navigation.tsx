import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import agentblueLogo from "@/assets/agentblue-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on the watch demo page
  const isDemoPage = location.pathname === '/watch-demo';

  const navItems = [
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Watch Demo", href: "/watch-demo" },
    { name: "Contact", href: "/contact" },
  ];

  const handleGetStarted = () => {
    if (location.pathname === '/' || location.pathname === '/home') {
      // Scroll to contact form on homepage
      const contactSection = document.getElementById('contact-form-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to contact page with hash to contact methods section
      navigate('/contact#contact-methods');
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full backdrop-blur-lg border-b z-50 ${
      isDemoPage
        ? 'bg-black/95 border-gray-800'
        : 'bg-background/80 border-border/50'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-smooth">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
              <img
                src={agentblueLogo}
                alt="AgentBlue Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className={`text-xl font-bold ${isDemoPage ? 'text-white' : 'text-foreground'}`}>
              AgentBlue
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={isDemoPage
                  ? 'text-gray-300 hover:text-white transition-smooth'
                  : 'text-muted-foreground hover:text-foreground transition-smooth'
                }
              >
                {item.name}
              </Link>
            ))}
            <Button variant="hero" size="sm" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={isDemoPage ? 'text-white hover:text-gray-300' : ''}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden py-4 border-t ${isDemoPage ? 'border-gray-800' : 'border-border/50'}`}>
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={isDemoPage
                    ? 'text-gray-300 hover:text-white transition-smooth py-2'
                    : 'text-muted-foreground hover:text-foreground transition-smooth py-2'
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="hero" size="sm" className="w-fit" onClick={handleGetStarted}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;