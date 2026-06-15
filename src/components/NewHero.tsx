"use client";

import { HeroSection } from "@/components/ui/hero-section-with-smooth-bg-shader";
import { HeroShowcase } from "@/components/HeroShowcase";
import { CalendarBooking } from "@/components/CalendarBooking";
import { ArrowRight, CalendarDays } from "lucide-react";

const NewHero = () => {
  const openSophia = () =>
    window.dispatchEvent(new CustomEvent("openVoiceCall"));

  return (
    <>
      {/* Mesh-gradient shader hero */}
      <HeroSection
        title="Automation Strategy That Fixes"
        highlightText="Revenue Leaks"
        description="For operations-heavy businesses. Audit, identify the leaks, automate the fix — first call in 30 minutes, revenue flowing in 90 days."
        maxWidth="max-w-4xl"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight={400}
        titleClassName="!text-black !font-normal"
        descriptionClassName="!text-white font-normal"
        veilOpacity="bg-white/15"
      >
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <button
            onClick={openSophia}
            className="group inline-flex h-[48px] items-center gap-2.5 rounded-full bg-[#4F7CFF] px-7 text-[15px] font-semibold text-white shadow-[0_8px_22px_-8px_rgba(79,124,255,0.6)] transition-all duration-300 hover:bg-[#3F6BF0]"
          >
            <span className="relative flex h-2 w-2">
              <span className="live-blip absolute inline-flex h-2 w-2 rounded-full bg-white/90" />
            </span>
            Talk to Sophia
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>

          <CalendarBooking
            trigger={
              <button className="group inline-flex h-[48px] cursor-pointer items-center gap-2 rounded-full border border-[#0A2540]/15 bg-white/70 px-6 text-[15px] font-semibold text-[#0A2540] backdrop-blur-sm transition-colors hover:text-[#4F7CFF]">
                <CalendarDays className="h-4 w-4 text-[#4F7CFF]" />
                Book a call
              </button>
            }
          />
        </div>
      </HeroSection>

      {/* Below-hero bordered showcase box, connected to the hero */}
      <HeroShowcase />
    </>
  );
};

export default NewHero;
