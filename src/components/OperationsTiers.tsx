"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "@/components/ui/service-card";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Replaces the old "Three tiers" section with a picture-driven ServiceCard
// grid. Images are placeholders — swap with real illustrations/screenshots.
const tiers = [
  {
    title: "Diagnose",
    href: "#how-we-work",
    imgSrc: "https://placehold.co/320x320/EEF4FF/4F7CFF/png?text=01",
    imgAlt: "Operations audit illustration",
    variant: "default" as const,
  },
  {
    title: "Design",
    href: "#how-we-work",
    imgSrc: "https://placehold.co/320x320/4F7CFF/FFFFFF/png?text=02",
    imgAlt: "Automation blueprint illustration",
    variant: "blue" as const,
  },
  {
    title: "Deploy",
    href: "#how-we-work",
    imgSrc: "https://placehold.co/320x320/0A2540/FFFFFF/png?text=03",
    imgAlt: "Turnkey implementation illustration",
    variant: "navy" as const,
  },
];

const OperationsTiers = () => {
  return (
    <section className="bg-white py-14 px-4 md:py-28">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
        >
          <span className="mb-4 block text-sm font-semibold text-[#4F7CFF]">
            How we work
          </span>
          <h2 className="max-w-3xl text-3xl leading-[1.1] tracking-tight text-[#0A2540] md:text-[2.75rem]">
            Three tiers. One mission: operational excellence.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#425466] md:text-lg">
            Choose your entry point—every path starts with strategy, then builds
            toward a fully deployed automation stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <ServiceCard
              key={tier.title}
              title={tier.title}
              href={tier.href}
              imgSrc={tier.imgSrc}
              imgAlt={tier.imgAlt}
              variant={tier.variant}
              className="min-h-[220px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationsTiers;
