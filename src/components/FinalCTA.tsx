"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Same Cal.com target as CalendarBooking — submitting prefills the booking.
const CAL_URL = "https://cal.com/agent-blue-lt5i92/30min";

const FONT = "'Inter', Helvetica, Arial, sans-serif";

const FinalCTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = email
      ? `${CAL_URL}?email=${encodeURIComponent(email)}`
      : CAL_URL;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className="relative overflow-hidden px-4 pt-24 pb-16 md:pt-32 md:pb-20"
      style={{
        // On-brand blue field; bottom color (#ECF1FE) matches the footer's top
        // edge exactly so the two sections read as one continuous panel.
        background:
          "radial-gradient(100% 80% at 50% 130%, rgba(79,124,255,0.16), transparent 72%)," +
          "linear-gradient(180deg, #FFFFFF 0%, #F6F9FF 50%, #ECF1FE 100%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.h2
          className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-black md:text-[3.25rem]"
          style={{ fontFamily: FONT }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          Stop leaking revenue.
          <br />
          Start automating.
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-black/60 md:text-lg"
          style={{ fontFamily: FONT }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.08, ease }}
        >
          Book a free 30-minute audit. We'll find your biggest operational
          bottleneck and show you exactly how to fix it.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="mx-auto mt-9 flex w-full max-w-md flex-col items-stretch gap-2 rounded-2xl border border-black/[0.06] bg-white p-2 shadow-[0_20px_50px_-24px_rgba(20,30,60,0.30)] sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.16, ease }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email"
            aria-label="Work email"
            className="h-11 w-full flex-1 rounded-xl bg-transparent px-4 text-[15px] text-black placeholder:text-black/40 focus:outline-none"
            style={{ fontFamily: FONT }}
          />
          <button
            type="submit"
            className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-black px-6 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            style={{ fontFamily: FONT }}
          >
            Get started
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </motion.form>

        <p className="mt-3 text-sm text-black/45" style={{ fontFamily: FONT }}>
          No sales pitch. Just strategic insights.
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
