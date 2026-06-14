"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { CalendarBooking } from "./CalendarBooking";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden bg-[#0A2540] py-20 md:py-28">
      {/* atmosphere: indigo glow + faint dot-grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#4F7CFF] opacity-25 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent_72%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow chip */}
          <motion.span
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#4F7CFF]" />
            Get started
          </motion.span>

          <motion.h2
            className="text-3xl leading-[1.1] tracking-tight text-white md:text-[2.75rem]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            Ready to see how this works for your business?
          </motion.h2>

          <motion.p
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#A8B6D4] md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            Book a 30-minute strategy call. We'll diagnose your biggest operational
            bottleneck and show you exactly how to fix it.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.2, ease }}
          >
            <CalendarBooking
              buttonText={
                <>
                  Schedule your free call
                  <ArrowRight className="ml-2 inline h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </>
              }
              buttonClassName="group inline-flex h-[50px] items-center rounded-full bg-[#4F7CFF] px-7 text-[15px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(79,124,255,0.7)] transition-all duration-300 hover:bg-[#3F6BF0] hover:shadow-[0_16px_38px_-10px_rgba(79,124,255,0.85)]"
            />

            <p className="mt-2 text-sm text-[#7E8FB5]">
              No sales pitch. Just strategic insights.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
