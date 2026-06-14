"use client";

import { Search, Ruler, Rocket, Check } from "lucide-react";
import { ScrollIndicator, HorizontalScrollGradient } from "./ScrollIndicator";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease },
  }),
};

/* ───────────────────────── Vignettes ─────────────────────────
   Each tier gets a small "product UI" mock that visually argues
   what the step does — in the Modular Solutions vocabulary. */

/* Tier 1 — Diagnose: an audit dashboard with bottleneck bars. */
const DiagnoseVignette = () => (
  <div className="rounded-2xl border border-[#EBEBF0] bg-white p-4 shadow-[0_18px_44px_-22px_rgba(20,20,40,0.28)]">
    <div className="flex items-center justify-between">
      <p className="text-[11px] font-semibold text-[#697386]">Operations audit</p>
      <span className="rounded-full bg-[#FFE9EE] px-2 py-0.5 text-[8px] font-semibold text-[#FF6FA3]">
        3 leaks found
      </span>
    </div>
    <p className="mt-1 text-xl font-semibold tracking-tight text-[#0A2540]">
      $48,200<span className="text-[11px] font-medium text-[#9AA5B1]">/mo wasted</span>
    </p>
    <div className="mt-4 space-y-2.5">
      {[
        ["Manual data entry", 88, "from-[#FF6FA3] to-[#FF9ABF]"],
        ["Slow lead response", 64, "from-[#635BFF] to-[#A78BFF]"],
        ["Missed follow-ups", 41, "from-[#1ABF6B] to-[#5FE0A6]"],
      ].map(([label, pct, grad], i) => (
        <div key={i}>
          <div className="mb-1 flex items-center justify-between text-[9px]">
            <span className="text-[#425466]">{label}</span>
            <span className="font-semibold text-[#0A2540]">{pct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#F1F2F6]">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${grad}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* Tier 2 — Design: a blueprint / node-flow diagram. */
const DesignVignette = () => (
  <div className="relative overflow-hidden rounded-2xl border border-[#EBEBF0] bg-white p-4 shadow-[0_18px_44px_-22px_rgba(20,20,40,0.28)]">
    <p className="text-[11px] font-semibold text-[#697386]">Workflow blueprint</p>
    <div className="relative mt-4 h-[120px]">
      {/* connector lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 240 120" fill="none">
        <path d="M44 24 H120 V60" stroke="#D7D9E8" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M120 60 H44 V96" stroke="#D7D9E8" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M120 60 H196" stroke="#635BFF" strokeWidth="1.5" />
      </svg>
      {/* nodes */}
      <div className="absolute left-0 top-2 flex items-center gap-1.5 rounded-lg border border-[#EBEBF0] bg-white px-2 py-1 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-[#FF6FA3]" />
        <span className="text-[8px] font-medium text-[#0A2540]">Trigger</span>
      </div>
      <div className="absolute left-[42%] top-[44%] flex items-center gap-1.5 rounded-lg border border-[#635BFF] bg-[#F6F4FF] px-2 py-1 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-[#635BFF]" />
        <span className="text-[8px] font-semibold text-[#0A2540]">Logic</span>
      </div>
      <div className="absolute bottom-1 left-0 flex items-center gap-1.5 rounded-lg border border-[#EBEBF0] bg-white px-2 py-1 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-[#1ABF6B]" />
        <span className="text-[8px] font-medium text-[#0A2540]">Data sync</span>
      </div>
      <div className="absolute right-0 top-[40%] flex items-center gap-1.5 rounded-lg border border-[#EBEBF0] bg-white px-2 py-1 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-[#635BFF]" />
        <span className="text-[8px] font-medium text-[#0A2540]">Action</span>
      </div>
    </div>
    <div className="mt-2 flex items-center justify-between border-t border-[#F0F1F4] pt-2.5 text-[9px]">
      <span className="text-[#697386]">12 nodes · 4 integrations</span>
      <span className="font-semibold text-[#635BFF]">v1.0</span>
    </div>
  </div>
);

/* Tier 3 — Deploy: a launch checklist with live status. */
const DeployVignette = () => (
  <div className="rounded-2xl border border-[#EBEBF0] bg-white p-4 shadow-[0_18px_44px_-22px_rgba(20,20,40,0.28)]">
    <div className="flex items-center justify-between">
      <p className="text-[11px] font-semibold text-[#697386]">Go-live checklist</p>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF7F0] px-2 py-0.5 text-[8px] font-semibold text-[#1ABF6B]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#1ABF6B]" />
        Live
      </span>
    </div>
    <div className="mt-4 space-y-2.5">
      {[
        ["Platform configured", true],
        ["Workflows tested", true],
        ["Team onboarded", true],
        ["Monitoring active", false],
      ].map(([label, done], i) => (
        <div key={i} className="flex items-center gap-2.5 text-[10px]">
          <span
            className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
              done ? "bg-[#1ABF6B] text-white" : "border-2 border-[#D7D9E8] bg-white"
            }`}
          >
            {done ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
          </span>
          <span className={done ? "text-[#0A2540]" : "text-[#9AA5B1]"}>{label}</span>
        </div>
      ))}
    </div>
    <div className="mt-3.5 border-t border-[#F0F1F4] pt-2.5">
      <div className="h-1.5 overflow-hidden rounded-full bg-[#F1F2F6]">
        <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-[#635BFF] to-[#A78BFF]" />
      </div>
      <p className="mt-1.5 text-[8px] font-medium text-[#697386]">3 of 4 complete</p>
    </div>
  </div>
);

const HowItWorks = () => {
  const tiers = [
    {
      number: "01",
      icon: Search,
      title: "Diagnose",
      service: "Operations Intelligence Audit",
      description:
        "We map your operational chaos, quantify the true cost of manual work, and identify high-ROI automation opportunities.",
      gradient:
        "bg-[radial-gradient(125%_120%_at_15%_0%,#FFE7D6_0%,#FFF1E8_45%,#FFFFFF_100%)]",
      Vignette: DiagnoseVignette,
      features: [
        "Complete process audit & bottleneck analysis",
        "ROI projections for each opportunity",
        "Prioritized automation roadmap",
        "Technology stack recommendations",
      ],
    },
    {
      number: "02",
      icon: Ruler,
      title: "Design",
      service: "Automation Infrastructure Blueprint",
      description:
        "Detailed technical blueprints that any developer can execute—your team, freelancers, or ours.",
      gradient:
        "bg-[radial-gradient(125%_120%_at_85%_0%,#E9DEFF_0%,#F3ECFF_50%,#FFFFFF_100%)]",
      Vignette: DesignVignette,
      features: [
        "Complete workflow diagrams & data architecture",
        "Integration specifications & API mappings",
        "Security & compliance framework",
        "Implementation playbook with timelines",
      ],
    },
    {
      number: "03",
      icon: Rocket,
      title: "Deploy",
      service: "Turnkey Implementation",
      description:
        "Full-service build, test, train, and stabilize. We handle everything—you see the results.",
      gradient:
        "bg-[radial-gradient(125%_120%_at_50%_0%,#D6EEFF_0%,#EAF6FF_50%,#FFFFFF_100%)]",
      Vignette: DeployVignette,
      optional: true,
      features: [
        "Platform setup & workflow development",
        "Rigorous testing & optimization",
        "Team training & documentation",
        "30-day post-launch support",
      ],
    },
  ];

  const Tier = ({ tier, index }: { tier: (typeof tiers)[number]; index: number }) => {
    const { Vignette } = tier;
    return (
      <div className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#E6E6E6] p-6 md:p-7 ${tier.gradient}`}>
        {tier.optional && (
          <span className="absolute right-5 top-5 rounded-full border border-[#E6E6E6] bg-white/70 px-2.5 py-1 text-[10px] font-semibold text-[#635BFF] backdrop-blur-sm">
            Optional
          </span>
        )}

        {/* header: step number + icon + titles */}
        <div className="mb-5 flex items-start gap-3">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-[#635BFF] shadow-[0_6px_16px_-8px_rgba(99,91,255,0.5)]">
            <tier.icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-[#635BFF]">
              Step {tier.number}
            </p>
            <h3 className="text-xl tracking-tight text-[#0A2540]">{tier.title}</h3>
          </div>
        </div>

        <p className="mb-1.5 text-sm font-semibold text-[#0A2540]">{tier.service}</p>
        <p className="mb-5 text-sm leading-relaxed text-[#425466]">{tier.description}</p>

        {/* product UI vignette */}
        <Vignette />

        {/* feature list */}
        <div className="mt-5 space-y-2.5 border-t border-[#E6E6E6]/70 pt-5">
          {tier.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-left">
              <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#635BFF]/10 text-[#635BFF]">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              <span className="text-[13px] leading-snug text-[#425466]">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white py-20 px-4 md:py-28">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
        >
          <span className="mb-4 block text-sm font-semibold text-[#635BFF]">
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

        {/* Mobile: Horizontal scroll */}
        <ScrollIndicator />
        <div className="relative">
          <HorizontalScrollGradient />
          <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-5 min-w-max">
              {tiers.map((tier, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  className="w-[320px] flex-shrink-0"
                >
                  <Tier tier={tier} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <Tier tier={tier} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
