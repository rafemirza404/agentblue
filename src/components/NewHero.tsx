"use client";

import {
  Phone,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Clock,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { CalendarBooking } from "@/components/CalendarBooking";

const NewHero = () => {
  const openSophia = () => window.dispatchEvent(new CustomEvent('openVoiceCall'));

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(135%_120%_at_15%_0%,#D3E2FF_0%,#E8F0FF_45%,#FFFFFF_100%)] py-16 md:py-28">
      {/* faint dot-grid texture, masked toward the upper-left for depth */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:radial-gradient(rgba(79,124,255,0.16)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_28%_28%,black,transparent_75%)]" />

      <div className="container relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">

        {/* ── Left: copy ── */}
        <div className="text-center lg:text-left">
          {/* Eyebrow chip */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E6E6E6] bg-white/80 px-3.5 py-1.5 text-sm text-[#425466] shadow-sm backdrop-blur-sm animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-[#4F7CFF]" />
            Automate smarter. Not harder.
          </div>

          {/* Headline */}
          <h1 className="mx-auto max-w-[15ch] text-[2rem] leading-[1.14] tracking-tight text-[#0A2540] animate-slide-up md:text-[2.6rem] lg:mx-0 lg:max-w-[16ch] lg:text-[3rem]">
            Automation strategy that fixes revenue leaks
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[#425466] animate-slide-up-subtle animate-delay-100 lg:mx-0 md:text-lg">
            For operations-heavy businesses. Audit, identify the leaks, automate
            the fix—first call in 30 minutes, revenue flowing in 90 days.
          </p>

          {/* CTAs — primary "call" button + quiet ghost link, evenly balanced */}
          <div className="mt-9 flex flex-col items-center gap-4 animate-slide-up-subtle animate-delay-200 sm:flex-row sm:gap-6 lg:justify-start">
            {/* Primary: slim pill with a live cue + inline icon */}
            <button
              onClick={openSophia}
              className="group relative inline-flex h-[46px] items-center gap-2.5 overflow-hidden rounded-full bg-[#4F7CFF] px-6 text-[15px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(79,124,255,0.6)] transition-all duration-300 hover:bg-[#3F6BF0] hover:shadow-[0_12px_26px_-8px_rgba(79,124,255,0.7)]"
            >
              {/* sheen sweep on hover */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.3),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
              {/* live dot */}
              <span className="relative flex h-2 w-2">
                <span className="live-blip absolute inline-flex h-2 w-2 rounded-full bg-white/90" />
              </span>
              <span className="relative">Talk to Sophia</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            {/* Secondary: quiet ghost link, same height for a shared baseline */}
            <CalendarBooking
              trigger={
                <button className="group inline-flex h-[46px] cursor-pointer items-center gap-2 text-[15px] font-semibold text-[#0A2540] transition-colors hover:text-[#4F7CFF]">
                  <CalendarDays className="h-4 w-4 text-[#4F7CFF]" />
                  <span className="relative">
                    Book a call
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#4F7CFF] transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </button>
              }
            />
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-sm text-[#697391] animate-slide-up-subtle animate-delay-300">
            See how our voice agent handles real conversations.
          </p>
        </div>

        {/* ── Right: product vignette — "Revenue recovery" dashboard ── */}
        <div className="relative mx-auto w-full max-w-md pb-16 animate-slide-up-subtle animate-delay-200 lg:max-w-none lg:pb-10">
          {/* main dashboard card with browser chrome */}
          <div className="relative z-10 overflow-hidden rounded-[1.75rem] border border-[#EBEBF0] bg-white shadow-[0_36px_84px_-36px_rgba(20,40,90,0.45)]">
            {/* chrome / url bar */}
            <div className="flex items-center gap-2 border-b border-[#F0F1F4] bg-[#FBFCFE] px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
              <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
              <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
              <div className="ml-2 flex flex-1 items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-[9px] text-[#9AA5B1] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1ABF6B]" />
                app.agentblue.in/operations
              </div>
            </div>

            <div className="p-5">
              {/* recovered-revenue headline stat */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-[#697386]">
                    Revenue recovered
                  </p>
                  <p className="mt-1 text-[1.7rem] font-semibold leading-none tracking-tight text-[#0A2540]">
                    $218,400
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF1FF] px-2.5 py-1 text-[10px] font-semibold text-[#4F7CFF]">
                  <TrendingUp className="h-3 w-3" />
                  +24%
                </span>
              </div>

              {/* trend chart with a baseline + month ticks (fixed plot height) */}
              <div className="mt-5">
                <div className="flex h-[68px] items-end gap-[5px] border-b border-[#EEF0F4]">
                  {[34, 46, 38, 58, 50, 70, 56, 80, 66, 88].map((h, i) => (
                    <div
                      key={i}
                      className="group/bar flex-1 rounded-t-[4px] bg-gradient-to-t from-[#4F7CFF] to-[#86ABFF]"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-1.5 flex justify-between text-[8px] font-medium text-[#9AA5B1]">
                  <span>Jan</span>
                  <span>Apr</span>
                  <span>Jul</span>
                  <span>Oct</span>
                </div>
              </div>

              {/* leak-detection table */}
              <div className="mt-5 overflow-hidden rounded-xl border border-[#EEF0F4]">
                <div className="flex items-center justify-between border-b border-[#EEF0F4] bg-[#FBFCFE] px-3.5 py-2">
                  <p className="text-[10px] font-semibold text-[#0A2540]">
                    Leaks detected
                  </p>
                  <span className="rounded-full bg-[#FFF1F2] px-2 py-0.5 text-[8px] font-semibold text-[#E5484D]">
                    3 active
                  </span>
                </div>
                {[
                  ["Slow lead response", "$18,200/mo", "fixing", "#4F7CFF"],
                  ["Missed follow-ups", "$9,400/mo", "automated", "#1ABF6B"],
                  ["Manual data entry", "$6,100/mo", "automated", "#1ABF6B"],
                ].map(([label, amt, status, color], i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-[#F4F5F8] px-3.5 py-2 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      {status === "automated" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-[#1ABF6B]" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 flex-shrink-0 text-[#4F7CFF]" />
                      )}
                      <span className="text-[10px] text-[#0A2540]">{label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-[#0A2540]">
                        {amt}
                      </span>
                      <span
                        className="w-[58px] rounded-full px-1.5 py-0.5 text-center text-[8px] font-semibold capitalize"
                        style={{
                          color: color as string,
                          backgroundColor: `${color}14`,
                        }}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* footer metric strip */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#EEF0F4] pt-4 text-center">
                {[
                  ["30 min", "First call"],
                  ["90 days", "To revenue"],
                  ["24/7", "Always on"],
                ].map(([v, l], i) => (
                  <div key={i}>
                    <p className="text-sm font-bold tracking-tight text-[#0A2540]">
                      {v}
                    </p>
                    <p className="mt-0.5 text-[9px] text-[#9AA5B1]">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* live voice-agent call card — intentional overlap, hangs off lower-left corner */}
          <div className="absolute -bottom-10 left-0 z-20 w-[58%] max-w-[240px] rounded-2xl border border-[#EBEBF0] bg-white p-3.5 shadow-[0_24px_56px_-24px_rgba(20,40,90,0.4)] sm:-left-6 lg:-bottom-8 lg:-left-14">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6E97FF] to-[#4F7CFF] text-white">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[11px] font-bold leading-none text-[#0A2540]">
                    Sophia AI
                  </p>
                  <p className="mt-0.5 text-[8px] text-[#9AA5B1]">Voice agent</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF7F0] px-2 py-0.5 text-[8px] font-semibold text-[#1ABF6B]">
                <span className="live-blip h-1.5 w-1.5 rounded-full bg-[#1ABF6B]" />
                On call
              </span>
            </div>
            {/* waveform — brand blue only */}
            <div className="mt-3 flex h-9 items-center justify-center gap-[2.5px] rounded-lg bg-[#F2F6FF] px-3">
              {[8, 16, 24, 12, 30, 18, 34, 20, 28, 14, 24, 16, 32, 10, 22].map(
                (h, i) => (
                  <span
                    key={i}
                    className="hero-wave w-[2.5px] rounded-full bg-[#4F7CFF]"
                    style={{ height: `${h}px`, animationDelay: `${i * 0.09}s` }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHero;
