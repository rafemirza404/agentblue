"use client";

import { useState } from "react";
import { HeroSection } from "@/components/ui/hero-section-with-smooth-bg-shader";
import { HeroShowcase } from "@/components/HeroShowcase";
import { ArrowRight } from "lucide-react";

// Same Cal.com target as CalendarBooking — submitting prefills the booking.
const CAL_URL = "https://cal.com/agent-blue-lt5i92/30min";

const NewHero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = email
      ? `${CAL_URL}?email=${encodeURIComponent(email)}`
      : CAL_URL;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Mesh-gradient shader hero */}
      <HeroSection
        title="Simplify. Automate. Scale."
        highlightText=""
        description="We simplify your operations, automate the busywork, and scale what works — first call in 30 minutes."
        maxWidth="max-w-4xl"
        fontFamily="'Inter', Helvetica, Arial, sans-serif"
        fontWeight={400}
        titleClassName="!text-black !font-normal"
        descriptionClassName="!text-white font-normal"
        veilOpacity="bg-white/15"
        className="pt-32 md:pt-44"
      >
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-md flex-col items-stretch gap-2 rounded-2xl border border-black/[0.06] bg-white p-2 shadow-[0_20px_50px_-24px_rgba(20,30,60,0.45)] sm:flex-row sm:items-center"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Email"
            className="h-11 w-full flex-1 rounded-xl bg-transparent px-4 text-[15px] text-black placeholder:text-black/40 focus:outline-none"
            style={{ fontFamily: "'Inter', Helvetica, Arial, sans-serif" }}
          />
          <button
            type="submit"
            className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-6 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            style={{ fontFamily: "'Inter', Helvetica, Arial, sans-serif" }}
          >
            Get started
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </form>
      </HeroSection>

      {/* Below-hero bordered showcase box, connected to the hero */}
      <HeroShowcase />
    </>
  );
};

export default NewHero;
