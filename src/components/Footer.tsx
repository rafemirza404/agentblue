"use client";

import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const FONT = "'Inter', Helvetica, Arial, sans-serif";

type FooterLink = { label: string; href: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Voice agents", href: "/services" },
      { label: "AI chatbots", href: "/services" },
      { label: "Process automation", href: "/services" },
      { label: "Data analytics", href: "/services" },
      { label: "Integrations", href: "/#integrations" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
      { label: "Watch demo", href: "/watch-demo" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "How it works", href: "/#how-we-work" },
      { label: "Case studies", href: "/#case-studies" },
      { label: "FAQ", href: "/#faq" },
      { label: "Get started", href: "/#contact-form-section" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "sophia@supportagentblue.in", href: "mailto:sophia@supportagentblue.in" },
      { label: "Book a call", href: "https://cal.com/agent-blue-lt5i92/30min" },
      { label: "Remote-first", href: "/contact" },
    ],
  },
];

const socials: { label: string; href: string; Icon: typeof Linkedin }[] = [
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "X", href: "#", Icon: Twitter },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "YouTube", href: "#", Icon: Youtube },
  { label: "Facebook", href: "#", Icon: Facebook },
];

const legal: FooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        // On-brand blue field. Top edge (#ECF1FE) matches the CTA's bottom edge
        // exactly, and the top glow continues the CTA's glow for a seamless blend.
        background:
          "radial-gradient(80% 90% at 50% -15%, rgba(79,124,255,0.14), transparent 72%)," +
          "radial-gradient(55% 60% at 88% 105%, rgba(79,124,255,0.16), transparent 70%)," +
          "linear-gradient(180deg, #ECF1FE 0%, #E5ECFD 55%, #DFE8FC 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 pt-10 md:px-8">
        {/* Giant brand wordmark — the bridge between CTA and footer */}
        <div className="select-none">
          <span
            className="block w-full text-center font-normal leading-[0.85] tracking-[-0.02em] text-black"
            style={{
              fontFamily: FONT,
              fontSize: "clamp(3rem, 15vw, 13rem)",
            }}
          >
            AgentBlue
          </span>
        </div>

        {/* Links */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-black/10 pt-10 sm:grid-cols-3 lg:grid-cols-6">
          {columns.map((col) => (
            <div key={col.title}>
              <h3
                className="text-[13px] font-medium text-black/45"
                style={{ fontFamily: FONT }}
              >
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] leading-snug text-black/70 transition-colors hover:text-black"
                      style={{ fontFamily: FONT }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Socials */}
          <div>
            <h3
              className="text-[13px] font-medium text-black/45"
              style={{ fontFamily: FONT }}
            >
              Socials
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white/50 text-black/65 backdrop-blur-sm transition-colors hover:border-black/20 hover:bg-white/80 hover:text-black"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-black/10 py-6 sm:flex-row sm:items-center">
          <p className="text-[13px] text-black/45" style={{ fontFamily: FONT }}>
            © 2026 AgentBlue
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-black/55 transition-colors hover:text-black"
                style={{ fontFamily: FONT }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
