"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { CalendarBooking } from "./CalendarBooking";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FinalCTA = () => {
  return (
    <section className="bg-black py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">

          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            Ready to See How This Works for Your Business?
          </motion.h2>

          <motion.p
            className="text-sm md:text-base text-[#9CA3AF] mb-10 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            Book a 30-minute strategy call. We'll diagnose your biggest operational bottleneck and show you exactly how to fix it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.2, ease }}
          >
            <CalendarBooking
              buttonText={
                <>
                  Schedule Your Free Call <ArrowRight className="ml-2 h-5 w-5 inline" />
                </>
              }
              buttonClassName="bg-[#4F7CFF] hover:bg-[#3B6AE8] text-white text-lg font-semibold px-8 py-7 rounded-full transition-all duration-200 hover:scale-[1.02] shadow-[0_0_30px_rgba(79,124,255,0.4)] hover:shadow-[0_0_40px_rgba(79,124,255,0.6)]"
            />

            <p className="text-sm text-[#9CA3AF] mt-4">
              No sales pitch. Just strategic insights.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
