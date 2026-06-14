"use client";

import { Mail, MapPin } from "lucide-react";

const agentblueLogo = "/agentblue-logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0A2540] py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1">
                <img
                  src={agentblueLogo}
                  alt="AgentBlue Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xl font-bold">AgentBlue</span>
            </div>
            <p className="text-sm leading-relaxed text-[#A8B6D4]">
              Transforming businesses through strategic automation—not just tools, but operational excellence.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">Services</h3>
            <ul className="space-y-2 text-sm text-[#A8B6D4]">
              <li><a href="#" className="transition-colors hover:text-[#4F7CFF]">AI Chatbots</a></li>
              <li><a href="#" className="transition-colors hover:text-[#4F7CFF]">Process Automation</a></li>
              <li><a href="#" className="transition-colors hover:text-[#4F7CFF]">Data Analytics</a></li>
              <li><a href="#" className="transition-colors hover:text-[#4F7CFF]">Integration Services</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm text-[#A8B6D4]">
              <li><a href="/about" className="transition-colors hover:text-[#4F7CFF]">About Us</a></li>
              <li><a href="/services" className="transition-colors hover:text-[#4F7CFF]">Services</a></li>
              <li><a href="/contact" className="transition-colors hover:text-[#4F7CFF]">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">Contact</h3>
            <div className="space-y-3 text-sm text-[#A8B6D4]">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#4F7CFF]" />
                <a href="mailto:sophia@supportagentblue.in" className="transition-colors hover:text-[#4F7CFF]">
                  sophia@supportagentblue.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#4F7CFF]" />
                <span>Remote-First Consultancy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-[#7E8FB5]">
            © 2025 AgentBlue. All rights reserved.
          </p>
          <div className="mt-4 flex items-center gap-6 md:mt-0">
            <a href="#" className="text-sm text-[#7E8FB5] transition-colors hover:text-[#4F7CFF]">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-[#7E8FB5] transition-colors hover:text-[#4F7CFF]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;