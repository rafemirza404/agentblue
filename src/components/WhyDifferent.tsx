"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const WhyDifferent = () => {
  const differentiators = [
    {
      title: "Strategy before tools",
      body: "We audit your operations before recommending solutions",
    },
    {
      title: "Platform-agnostic",
      body: "No vendor bias, no commissions—just what works best for you",
    },
    {
      title: "You own everything",
      body: "Blueprints, specs, roadmaps—all yours to implement",
    },
  ];

  return (
    <section className="bg-white py-14 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-black mb-8"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease }}
          >
            Most Automation Projects Fail. Here's <em className="italic">Why We're Different:</em>
          </motion.h2>

          <motion.p
            className="text-sm md:text-base text-gray-600 text-center leading-relaxed mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            The problem isn't tools—it's strategy. Businesses rush to automate before understanding their operations. We diagnose first, design second, build third. Every engagement starts with a comprehensive audit because you can't fix what you don't understand.
          </motion.p>

          <div className="space-y-8 max-w-3xl mx-auto">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.1 + index * 0.1, ease }}
              >
                <span className="text-[#10B981] text-2xl flex-shrink-0 mt-1">✓</span>
                <p className="text-sm md:text-base text-black">
                  <strong className="font-semibold">{item.title}</strong> - {item.body}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyDifferent;
