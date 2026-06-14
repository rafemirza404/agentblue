"use client";

import React from "react";
import { CalendarBooking } from "@/components/CalendarBooking";
import { ArrowRight } from "lucide-react";

// Full-color logos via jsDelivr simple-icons package
const ICONS_ROW1 = [
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hubspot.svg",      label: "HubSpot",    color: "#FF7A59" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/salesforce.svg",   label: "Salesforce", color: "#00A1E0" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/slack.svg",        label: "Slack",      color: "#4A154B" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlesheets.svg", label: "Sheets",     color: "#34A853" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zapier.svg",       label: "Zapier",     color: "#FF4A00" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/twilio.svg",       label: "Twilio",     color: "#F22F46" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/notion.svg",       label: "Notion",     color: "#000000" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlemeet.svg",   label: "Meet",       color: "#00897B" },
];

const ICONS_ROW2 = [
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gmail.svg",        label: "Gmail",      color: "#EA4335" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/airtable.svg",     label: "Airtable",   color: "#18BFFF" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg",       label: "Stripe",     color: "#635BFF" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg",     label: "WhatsApp",   color: "#25D366" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googledrive.svg",  label: "Drive",      color: "#4285F4" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/calendly.svg",     label: "Calendly",   color: "#006BFF" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/monday.svg",       label: "Monday",     color: "#FF3D57" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlecalendar.svg", label: "Calendar", color: "#4285F4" },
];

// Utility to repeat icons enough times for a seamless loop
const repeatedIcons = <T,>(icons: T[], repeat = 4): T[] =>
  Array.from({ length: repeat }).flatMap(() => icons);

const IconPill = ({ src, label, color }: { src: string; label: string; color: string }) => (
  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full"
      style={{ backgroundColor: color }}
    >
      <img
        src={src}
        alt={label}
        className="h-6 w-6 object-contain"
        style={{ filter: "brightness(0) invert(1)" }}
      />
    </div>
  </div>
);

export default function IntegrationCarousel() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* Light grid background */}
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 text-center">
        {/* eyebrow */}
        <span className="mb-4 inline-block rounded-full border border-[#E6E6E6] bg-white px-3.5 py-1 text-sm text-[#425466] shadow-sm">
          ⚡ Integrations
        </span>

        {/* heading */}
        <h2 className="text-[2rem] leading-[1.1] tracking-tight text-[#0A2540] md:text-[2.75rem]">
          Plug into the tools your team already uses
        </h2>

        {/* subheading */}
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#425466] md:text-lg">
          AgentBlue connects with 50+ platforms — CRMs, dialers, calendars,
          spreadsheets — so automation fits your stack, not the other way around.
        </p>

        {/* CTA */}
        <CalendarBooking
          trigger={
            <button className="group mt-8 inline-flex h-[46px] items-center gap-2 rounded-full bg-[#0A2540] px-7 text-[15px] font-semibold text-white shadow-[0_8px_22px_-8px_rgba(10,37,64,0.5)] transition-all duration-300 hover:bg-[#0d2e50] hover:shadow-[0_12px_28px_-8px_rgba(10,37,64,0.6)]">
              Book a strategy call
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          }
        />

        {/* Carousel */}
        <div className="relative mt-12 overflow-hidden pb-2">
          {/* Row 1 — scrolls left */}
          <div className="flex gap-10 whitespace-nowrap integration-scroll-left">
            {repeatedIcons(ICONS_ROW1, 4).map((icon, i) => (
              <IconPill key={i} {...icon} />
            ))}
          </div>

          {/* Row 2 — scrolls right */}
          <div className="mt-6 flex gap-10 whitespace-nowrap integration-scroll-right">
            {repeatedIcons(ICONS_ROW2, 4).map((icon, i) => (
              <IconPill key={i} {...icon} />
            ))}
          </div>

          {/* Fade overlays */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
