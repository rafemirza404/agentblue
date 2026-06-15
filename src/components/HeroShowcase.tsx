"use client";

import { motion } from "framer-motion";
import { CalendarBooking } from "@/components/CalendarBooking";

/* Faithful adaptation of the Aceternity HeroSectionOne reference — same box
   structure, gradient accent lines, word-by-word animated heading, two
   buttons, and framed preview. Navbar omitted (the site has its own nav).
   Content and accent color restyled to the AgentBlue brand. */
export function HeroShowcase() {
  const openSophia = () =>
    window.dispatchEvent(new CustomEvent("openVoiceCall"));

  return (
    <div className="relative bg-white">
      {/* soft fade so the gradient hero blends smoothly into this section */}
      <div className="pointer-events-none absolute -top-24 left-0 h-24 w-full bg-gradient-to-b from-transparent to-white" />

      <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
        <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80">
          <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-[#4F7CFF] to-transparent" />
        </div>
        <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80">
          <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-[#4F7CFF] to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80">
          <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-[#4F7CFF] to-transparent" />
        </div>

        <div className="px-4 py-10 md:py-20">
          <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl text-[#0A2540] md:text-4xl lg:text-7xl">
            {"See your revenue leaks fixed in real time"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600"
          >
            AgentBlue audits your operations, finds the leaks, and automates the
            fix — your first call in 30 minutes, revenue flowing in 90 days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={openSophia}
              className="w-60 transform rounded-lg bg-[#4F7CFF] px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3F6BF0]"
            >
              Talk to Sophia
            </button>
            <CalendarBooking
              trigger={
                <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100">
                  Book a call
                </button>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md"
          >
            <div className="w-full overflow-hidden rounded-xl border border-gray-300">
              <DashboardPreview />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* Brand operations dashboard rendered as HTML/CSS inside the framed box,
   sitting in the same 16/9 frame the reference uses for its image. */
const DashboardPreview = () => (
  <div className="aspect-[16/9] w-full bg-[#F7F8FA]">
    {/* browser chrome bar */}
    <div className="flex items-center gap-1.5 border-b border-[#EAECF0] bg-white px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      <div className="ml-3 flex max-w-[220px] flex-1 items-center gap-1.5 rounded-md border border-[#EBEBF0] bg-[#F7F8FA] px-2.5 py-1 text-[10px] text-[#9AA5B1]">
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1ABF6B]" />
        app.agentblue.in/operations
      </div>
    </div>

    {/* dashboard body */}
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[13px] font-semibold text-[#0A2540]">
            Operations overview
          </p>
          <p className="text-[10px] text-[#9AA5B1]">Last updated just now</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF7F0] px-2.5 py-1 text-[9px] font-semibold text-[#1ABF6B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1ABF6B]" /> Live
        </span>
      </div>

      {/* KPI strip */}
      <div className="mb-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {[
          { label: "Revenue recovered", value: "$218,400", color: "#4F7CFF" },
          { label: "Hours saved / mo", value: "340 hrs", color: "#1ABF6B" },
          { label: "Lead response", value: "< 90 sec", color: "#635BFF" },
          { label: "Leaks fixed", value: "3 of 3", color: "#FF6FA3" },
        ].map((k, i) => (
          <div key={i} className="rounded-xl border border-[#EAECF0] bg-white p-3">
            <p className="text-[8px] text-[#9AA5B1]">{k.label}</p>
            <p className="mt-0.5 text-[14px] font-semibold leading-tight text-[#0A2540]">
              {k.value}
            </p>
            <span
              className="mt-1 inline-block h-1 w-8 rounded-full"
              style={{ backgroundColor: k.color }}
            />
          </div>
        ))}
      </div>

      {/* bar chart */}
      <div className="rounded-xl border border-[#EAECF0] bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[10px] font-semibold text-[#0A2540]">
            Revenue recovered
          </p>
          <span className="text-[8px] text-[#9AA5B1]">12-month</span>
        </div>
        <div className="flex h-[90px] items-end gap-[3px] border-b border-[#F0F1F4]">
          {[22, 34, 28, 46, 38, 58, 44, 68, 52, 76, 60, 88].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-[2px] bg-gradient-to-t from-[#4F7CFF] to-[#86ABFF]"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
