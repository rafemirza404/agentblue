"use client";

import { motion } from "framer-motion";
import { Compass, Boxes, FileDown, Check, Download } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease },
  }),
};

/* ───────── Vignettes — each argues one differentiator ───────── */

/* Strategy before tools: an order-of-operations stepper. */
const StrategyVignette = () => (
  <div className="rounded-2xl border border-[#EBEBF0] bg-white p-4 shadow-[0_18px_44px_-22px_rgba(20,20,40,0.25)]">
    <p className="text-[10px] font-semibold text-[#697386]">Our sequence</p>
    <div className="mt-3 flex items-center gap-1.5">
      {["Audit", "Strategy", "Tools"].map((step, i) => (
        <div key={i} className="flex flex-1 items-center gap-1.5">
          <div
            className={`flex-1 rounded-lg px-2 py-1.5 text-center text-[9px] font-semibold ${
              i === 0
                ? "bg-[#635BFF] text-white"
                : i === 1
                ? "bg-[#635BFF]/15 text-[#635BFF]"
                : "bg-[#F1F2F6] text-[#9AA5B1]"
            }`}
          >
            {step}
          </div>
          {i < 2 && <span className="text-[#C7CBDB]">→</span>}
        </div>
      ))}
    </div>
    <p className="mt-3 text-[10px] leading-snug text-[#425466]">
      Tools come <span className="font-semibold text-[#0A2540]">last</span>, never
      first.
    </p>
  </div>
);

/* Platform-agnostic: a neutral grid of integration tiles, none "preferred". */
const AgnosticVignette = () => (
  <div className="rounded-2xl border border-[#EBEBF0] bg-white p-4 shadow-[0_18px_44px_-22px_rgba(20,20,40,0.25)]">
    <div className="flex items-center justify-between">
      <p className="text-[10px] font-semibold text-[#697386]">Recommended stack</p>
      <span className="rounded-full bg-[#EAF7F0] px-2 py-0.5 text-[8px] font-semibold text-[#1ABF6B]">
        0 commissions
      </span>
    </div>
    <div className="mt-3 grid grid-cols-4 gap-1.5">
      {[
        "from-[#FF9ABF] to-[#FF6FA3]",
        "from-[#9FC2FF] to-[#635BFF]",
        "from-[#A78BFF] to-[#8B7BFF]",
        "from-[#5FE0A6] to-[#1ABF6B]",
        "from-[#FFD27A] to-[#F4B23E]",
        "from-[#9FC2FF] to-[#5FB8FF]",
        "from-[#FFB3C8] to-[#FF6FA3]",
        "from-[#C9B8FF] to-[#8EE6FF]",
      ].map((g, i) => (
        <div
          key={i}
          className="flex aspect-square items-center justify-center rounded-lg border border-[#EEF0F4] bg-[#FAFAFC]"
        >
          <span className={`h-3.5 w-3.5 rounded-md bg-gradient-to-br ${g}`} />
        </div>
      ))}
    </div>
    <p className="mt-3 text-[10px] leading-snug text-[#425466]">
      Picked on fit—<span className="font-semibold text-[#0A2540]">not</span> vendor
      bias.
    </p>
  </div>
);

/* You own everything: exportable deliverables list. */
const OwnershipVignette = () => (
  <div className="rounded-2xl border border-[#EBEBF0] bg-white p-4 shadow-[0_18px_44px_-22px_rgba(20,20,40,0.25)]">
    <p className="text-[10px] font-semibold text-[#697386]">Your deliverables</p>
    <div className="mt-3 space-y-1.5">
      {[
        ["Workflow_blueprints.pdf", "2.4 MB"],
        ["API_specifications.json", "184 KB"],
        ["Automation_roadmap.fig", "5.1 MB"],
      ].map(([name, size], i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border border-[#EEF0F4] bg-[#FAFAFC] px-2.5 py-1.5"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#635BFF]/10 text-[#635BFF]">
              <FileDown className="h-3 w-3" />
            </span>
            <span className="text-[9px] font-medium text-[#0A2540]">{name}</span>
          </div>
          <span className="text-[8px] text-[#9AA5B1]">{size}</span>
        </div>
      ))}
    </div>
    <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#1ABF6B]">
      <Download className="h-3 w-3" />
      Yours, forever
    </div>
  </div>
);

const WhyDifferent = () => {
  const differentiators = [
    {
      icon: Compass,
      title: "Strategy before tools",
      body: "We audit your operations before recommending a single solution.",
      gradient:
        "bg-[radial-gradient(125%_120%_at_15%_0%,#FFE7D6_0%,#FFF3EB_50%,#FFFFFF_100%)]",
      Vignette: StrategyVignette,
    },
    {
      icon: Boxes,
      title: "Platform-agnostic",
      body: "No vendor bias, no commissions—just what genuinely works best for you.",
      gradient:
        "bg-[radial-gradient(125%_120%_at_85%_0%,#E9DEFF_0%,#F3ECFF_50%,#FFFFFF_100%)]",
      Vignette: AgnosticVignette,
    },
    {
      icon: FileDown,
      title: "You own everything",
      body: "Blueprints, specs, and roadmaps—all yours to keep and implement.",
      gradient:
        "bg-[radial-gradient(125%_120%_at_50%_0%,#D6EEFF_0%,#EAF6FF_50%,#FFFFFF_100%)]",
      Vignette: OwnershipVignette,
    },
  ];

  return (
    <section className="bg-white py-16 px-4 md:py-28">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
        >
          <span className="mb-4 block text-sm font-semibold text-[#635BFF]">
            Why we're different
          </span>
          <h2 className="max-w-3xl text-3xl leading-[1.1] tracking-tight text-[#0A2540] md:text-[2.75rem]">
            Most automation projects fail. We start where they don't.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#425466] md:text-lg">
            The problem isn't tools—it's strategy. Businesses rush to automate
            before understanding their operations. We diagnose first, design
            second, build third, because you can't fix what you don't understand.
          </p>
        </motion.div>

        {/* Differentiator cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {differentiators.map((item, index) => {
            const { Vignette } = item;
            return (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                className={`flex flex-col overflow-hidden rounded-3xl border border-[#E6E6E6] p-6 md:p-7 ${item.gradient}`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-[#635BFF] shadow-[0_6px_16px_-8px_rgba(99,91,255,0.5)]">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg tracking-tight text-[#0A2540]">
                    {item.title}
                  </h3>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-[#425466]">
                  {item.body}
                </p>
                <div className="mt-auto">
                  <Vignette />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyDifferent;
