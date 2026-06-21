"use client";

import { motion } from "framer-motion";
import {
  Maximize2,
  Phone,
  Workflow,
  BarChart3,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
};

const ExpandIcon = () => (
  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#4F7CFF] text-white shadow-[0_4px_12px_-2px_rgba(79,124,255,0.5)]">
    <Maximize2 className="h-4 w-4" />
  </span>
);

const cardBase =
  "group relative flex flex-col overflow-hidden rounded-3xl border border-[#EAECF0] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_32px_-16px_rgba(16,24,40,0.12)] transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(16,24,40,0.05),0_20px_44px_-18px_rgba(16,24,40,0.18)]";

const ModularSolutions = () => {
  return (
    <section className="bg-white py-14 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section heading */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
        >
          <span className="mb-4 block text-sm font-semibold text-[#4F7CFF]">
            Modular solutions
          </span>
          <h2 className="max-w-3xl text-3xl leading-[1.1] tracking-tight text-black md:text-[2.75rem]">
            A fully integrated suite of automation products
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#425466] md:text-lg">
            Deploy a complete operations stack, or use individual building blocks
            to fit exactly what your business needs.
          </p>
        </motion.div>

        {/* ---- TOP ROW: three product tiles ---- */}
        <div className="mb-6 grid gap-6 md:grid-cols-3">
          {/* Tile 1 — Voice agent */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className={`${cardBase} p-7`}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#4F7CFF]">
                <Phone className="h-5 w-5" />
              </span>
              <h3 className="text-lg tracking-tight text-black">Voice agents</h3>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-[#425466]">
              Sophia answers, qualifies, and books — 24/7, in under 90 seconds.
            </p>
            {/* mini live-call card */}
            <div className="mt-auto rounded-2xl border border-[#EBEBF0] bg-[#FAFBFC] p-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4F7CFF] text-white">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold leading-none text-[#0A2540]">
                    Sophia AI
                  </p>
                  <p className="mt-0.5 text-[9px] text-[#9AA5B1]">On call</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 text-[8px] font-semibold text-[#1ABF6B]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1ABF6B]" /> Live
                </span>
              </div>
              <div className="mt-2.5 flex h-6 items-center gap-[2px] rounded-md bg-[#EEF4FF] px-2">
                {[5, 11, 18, 8, 22, 13, 26, 15, 20, 9, 17, 11].map((h, i) => (
                  <span
                    key={i}
                    className="w-[2px] rounded-full bg-[#4F7CFF]"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tile 2 — Workflow automation */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className={`${cardBase} p-7`}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#4F7CFF]">
                <Workflow className="h-5 w-5" />
              </span>
              <h3 className="text-lg tracking-tight text-black">
                Workflow automation
              </h3>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-[#425466]">
              Replace manual busywork with workflows that run themselves.
            </p>
            {/* mini workflow steps */}
            <div className="mt-auto space-y-2">
              {[
                ["Trigger: new lead", true],
                ["Enrich & route", true],
                ["Follow up + book", false],
              ].map(([label, done], i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl border border-[#EBEBF0] bg-[#FAFBFC] px-3 py-2"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full ${
                      done
                        ? "bg-[#4F7CFF] text-white"
                        : "border-2 border-[#D7D9E8] bg-white"
                    }`}
                  >
                    {done && <CheckCircle2 className="h-2.5 w-2.5" />}
                  </span>
                  <span className="text-[11px] font-medium text-[#0A2540]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tile 3 — Analytics */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className={`${cardBase} p-7`}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#4F7CFF]">
                <BarChart3 className="h-5 w-5" />
              </span>
              <h3 className="text-lg tracking-tight text-black">
                Real-time analytics
              </h3>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-[#425466]">
              See revenue recovered and hours saved, updated live.
            </p>
            {/* mini stat + chart */}
            <div className="mt-auto rounded-2xl border border-[#EBEBF0] bg-[#FAFBFC] p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-[#9AA5B1]">Revenue recovered</p>
                  <p className="text-lg font-semibold leading-tight text-[#0A2540]">
                    $218,400
                  </p>
                </div>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-[#EEF4FF] px-1.5 py-0.5 text-[8px] font-semibold text-[#4F7CFF]">
                  <TrendingUp className="h-2 w-2" /> +24%
                </span>
              </div>
              <div className="mt-2 flex h-12 items-end gap-[3px]">
                {[28, 40, 34, 52, 44, 64, 56, 78, 60, 88].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-[2px] bg-gradient-to-t from-[#4F7CFF] to-[#86ABFF]"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---- WIDE BLOCK: works inside your stack ---- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className={`${cardBase} mb-6 grid items-center gap-8 p-8 md:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10`}
        >
          {/* heading */}
          <div className="relative z-10">
            <h3 className="text-2xl leading-tight tracking-tight text-black md:text-[2rem]">
              Runs inside the stack
              <br />
              you already use
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#425466]">
              AgentBlue connects to your CRM, calendar, and tools — syncing
              records and routing every conversation without leaving your stack.
            </p>
          </div>

          {/* artwork: clean operations table */}
          <div className="overflow-hidden rounded-2xl border border-[#EBEBF0] bg-white shadow-[0_20px_50px_-24px_rgba(20,20,40,0.22)]">
            {/* browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-[#F0F1F4] bg-[#FAFBFC] px-4 py-2.5">
              <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
              <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
              <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
              <div className="ml-2 flex items-center gap-1.5 rounded-full border border-[#ECECF2] bg-white px-2.5 py-1 text-[10px] text-[#697386]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1ABF6B]" />
                app.agentblue.in/connections
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-[#0A2540]">
                Connected workflows
              </p>
              <div className="mt-3 grid grid-cols-[1.6fr_1fr_0.8fr] gap-2 border-b border-[#F0F1F4] pb-2 text-[9px] font-semibold text-[#697386]">
                <span>Workflow</span>
                <span>Trigger</span>
                <span>Status</span>
              </div>
              {[
                ["Lead response", "Form submit", "Live"],
                ["Follow-up sequence", "No reply 24h", "Live"],
                ["Data sync", "CRM update", "Live"],
                ["Appointment booking", "Call ended", "Live"],
              ].map(([name, trigger, status], i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1.6fr_1fr_0.8fr] items-center gap-2 border-b border-[#F4F5F8] py-2 text-[10px] last:border-b-0"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-4 w-4 items-center justify-center rounded-md bg-[#EEF4FF] text-[#4F7CFF]">
                      <Workflow className="h-2.5 w-2.5" />
                    </span>
                    <span className="font-medium text-[#0A2540]">{name}</span>
                  </div>
                  <span className="text-[#697386]">{trigger}</span>
                  <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#EEF4FF] px-1.5 py-0.5 text-[8px] font-semibold text-[#4F7CFF]">
                    <span className="h-1 w-1 rounded-full bg-[#4F7CFF]" />
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ---- BOTTOM ROW: three cards ---- */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 — chat */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className={`${cardBase} min-h-[340px] p-6 sm:p-8 md:min-h-[420px]`}
          >
            <div className="relative z-10 mb-5 flex items-start justify-between">
              <h3 className="max-w-[78%] text-xl leading-snug tracking-tight text-black">
                Automate your operations end-to-end
              </h3>
              <ExpandIcon />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] [background-image:radial-gradient(rgba(79,124,255,0.35)_1px,transparent_1.6px)] [background-size:13px_13px] opacity-50 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_100%,black,transparent_70%)]" />
            <div className="relative z-10 mt-auto space-y-3">
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-[#4F7CFF] px-3 py-2 text-[11px] leading-snug text-white">
                Map my busywork and fix the biggest revenue leak first.
              </div>
              <div className="w-fit max-w-[90%] rounded-2xl rounded-tl-sm border border-[#EBEBF0] bg-white px-3 py-2 text-[11px] leading-snug text-[#425466] shadow-sm">
                On it. Here are 3 high-ROI fixes I can ship this week:
              </div>
              <div className="flex gap-2">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-xl border border-[#EBEBF0] bg-white p-2 shadow-sm"
                  >
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-[#9FC2FF] to-[#D6E4FF]" />
                    <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-[#EEF0F4]" />
                    <div className="mt-1 h-1.5 w-1/2 rounded-full bg-[#F3F4F8]" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2 — outcome stat */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className={`${cardBase} min-h-[340px] p-6 sm:p-8 md:min-h-[420px]`}
          >
            <div className="relative z-10 mb-5 flex items-start justify-between">
              <h3 className="max-w-[78%] text-xl leading-snug tracking-tight text-black">
                Built to pay for itself in 90 days
              </h3>
              <ExpandIcon />
            </div>
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
              <p className="text-5xl font-semibold tracking-tight text-[#4F7CFF]">
                340<span className="text-2xl text-[#86ABFF]">hrs</span>
              </p>
              <p className="mt-1 text-sm text-[#697386]">saved every month</p>
              <div className="mt-6 grid w-full grid-cols-2 gap-2">
                {[
                  ["< 90s", "Lead response"],
                  ["3 of 3", "Leaks fixed"],
                ].map(([v, l], i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[#EBEBF0] bg-[#FAFBFC] py-3"
                  >
                    <p className="text-base font-semibold text-[#0A2540]">{v}</p>
                    <p className="text-[9px] text-[#9AA5B1]">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3 — always on */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className={`${cardBase} min-h-[340px] p-6 sm:p-8 md:min-h-[420px]`}
          >
            <div className="relative z-10 mb-5 flex items-start justify-between">
              <h3 className="max-w-[78%] text-xl leading-snug tracking-tight text-black">
                Scale across every channel and time zone
              </h3>
              <ExpandIcon />
            </div>
            <div className="relative z-10 flex flex-1 items-center justify-center">
              <div className="relative h-44 w-full">
                <div className="absolute inset-0 [background-image:radial-gradient(rgba(79,124,255,0.4)_1.4px,transparent_1.8px)] [background-size:13px_13px] opacity-70 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,black,transparent_72%)]" />
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 200 140"
                  fill="none"
                >
                  <path
                    d="M40 95 Q110 10 165 60"
                    stroke="#4F7CFF"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                </svg>
                <span className="absolute right-[18%] top-[34%] inline-flex items-center gap-1.5 rounded-full border border-[#EBEBF0] bg-white px-2.5 py-1 shadow-md">
                  <Clock className="h-3 w-3 text-[#4F7CFF]" />
                  <span className="text-[10px] font-semibold text-[#0A2540]">
                    Live
                  </span>
                </span>
              </div>
            </div>
            <div className="relative z-10 mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-[#EBEBF0] bg-white px-3 py-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#1ABF6B]" />
              <span className="text-xs font-semibold text-[#0A2540]">
                Always on · 24/7
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ModularSolutions;
