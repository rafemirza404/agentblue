"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
const agentblueLogo = "/agentblue-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isDemoPage = location.pathname === '/watch-demo';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Watch Demo", href: "/watch-demo" },
    { name: "Contact", href: "/contact" },
  ];

  const handleNavClick = (href: string) => {
    if (location.pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    if (location.pathname === '/' || location.pathname === '/home') {
      const contactSection = document.getElementById('contact-form-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/contact#contact-methods');
    }
    setIsOpen(false);
  };

  // When the mobile menu is open, force a solid white background so the
  // dropdown is never translucent (even at the top of the page).
  const navBg = isDemoPage
    ? 'bg-black/95 border-b border-gray-800'
    : isOpen
      ? 'bg-white border-b border-gray-100 shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
      : scrolled
        ? 'bg-white border-b border-gray-100 shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
        : 'bg-white/0 border-b border-transparent';

  return (
    <nav
      className={`${isDemoPage ? 'relative' : 'fixed top-0'} w-full ${isOpen ? '' : 'md:backdrop-blur-xl'} z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-center h-[68px]">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => handleNavClick('/')}
            className="flex items-center space-x-2.5 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-9 h-9 flex items-center justify-center">
              <img
                src={agentblueLogo}
                alt="AgentBlue Logo"
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
            <span className={`text-[17px] font-normal tracking-tight ${isDemoPage ? 'text-white' : 'text-gray-900'}`}>
              AgentBlue
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`px-4 py-2 rounded-lg text-[14px] font-normal transition-colors duration-150 ${
                  isDemoPage
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleGetStarted}
              className={`px-4 py-2 rounded-lg text-[14px] font-normal transition-colors duration-150 ${
                isDemoPage
                  ? 'text-gray-300 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Talk to Sales
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${isDemoPage ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden py-4 border-t ${isDemoPage ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-3 rounded-lg text-[15px] font-normal transition-colors ${
                    isDemoPage
                      ? 'text-gray-300 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => { handleNavClick(item.href); setIsOpen(false); }}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3">
                <Button
                  onClick={handleGetStarted}
                  className="w-full bg-[#4F7CFF] hover:bg-[#3B6AE8] text-white font-light rounded-full"
                >
                  Talk to Sales
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
