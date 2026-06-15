"use client";

import { motion } from "framer-motion";
import { Maximize2, Wifi, Apple, Flower2, MapPin, Zap, Lock } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
};

/* Small rounded-square expand button at the top-right of each bottom card. */
const ExpandIcon = () => (
  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#4F7CFF] text-white shadow-[0_4px_12px_-2px_rgba(79,124,255,0.5)]">
    <Maximize2 className="h-4 w-4" />
  </span>
);

const ModularSolutions = () => {
  return (
    <section className="bg-white py-20 md:py-28">
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
          <h2 className="max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-[#0A2540] md:text-[2.75rem]">
            A fully integrated suite of automation products
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#425466] md:text-lg">
            Reduce manual work and grow revenue with AgentBlue. Deploy a complete
            operations stack, or use individual building blocks to fit exactly what
            your business needs.
          </p>
        </motion.div>

        {/* ---- TOP ROW: three showcase blocks on soft gradients ---- */}
        <div className="mb-6 grid gap-6 md:grid-cols-3">
          {/* Block 1 — tap-to-pay phone */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="relative flex aspect-[4/5] items-end justify-center overflow-hidden rounded-3xl border border-[#E6E6E6] bg-[radial-gradient(135%_120%_at_10%_20%,#FFE2CC_0%,#FFD4E6_42%,#E6DBFF_100%)] p-6"
          >
            {/* phone, slightly tilted */}
            <div className="w-[66%] translate-y-6 rotate-[-4deg] rounded-t-[2.2rem] border-[7px] border-b-0 border-[#15151F] bg-white px-4 pt-5 shadow-[0_30px_60px_-20px_rgba(20,20,40,0.45)]">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full text-[#15151F]">
                <Wifi className="h-6 w-6 rotate-45" />
              </div>
              <p className="text-center text-[11px] font-medium text-[#697386]">
                Pay AgentBlue
              </p>
              <p className="mt-1 text-center text-2xl font-bold tracking-tight text-[#0A2540]">
                $5,000
              </p>
              <p className="mt-1 text-center text-[9px] leading-tight text-[#9AA5B1]">
                Tap, insert, or swipe to pay
              </p>
              <div className="mt-4 space-y-2 border-t border-[#EEF0F4] pt-3">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#425466]">Ops audit</span>
                  <span className="font-semibold text-[#0A2540]">$22.60</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#425466]">Automation</span>
                  <span className="font-semibold text-[#0A2540]">$4.29</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Block 2 — checkout browser window */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="relative flex aspect-[4/5] items-center overflow-hidden rounded-3xl border border-[#E6E6E6] bg-[radial-gradient(130%_120%_at_15%_100%,#FFE2CC_0%,#EEF4FF_55%,#FFFFFF_100%)] p-6"
          >
            <div className="w-full overflow-hidden rounded-2xl border border-[#EBEBF0] bg-white shadow-[0_20px_50px_-20px_rgba(20,20,40,0.25)]">
              {/* window chrome */}
              <div className="flex items-center gap-1.5 border-b border-[#F0F1F4] px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
                <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
                <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
              </div>
              <div className="p-4">
                <p className="text-sm font-extrabold tracking-tight text-[#FF5A1F]">
                  AGENTBLUE
                </p>
                <p className="mt-4 text-[10px] font-medium text-[#697386]">Email</p>
                <div className="mt-1 rounded-md border border-[#E3E8EE] px-2.5 py-1.5 text-[10px] text-[#0A2540]">
                  damian.m@example.com
                </div>
                <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md bg-[#1ABF6B] py-2 text-[11px] font-bold text-white">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black/80 text-[7px] text-white">
                    ▶
                  </span>
                  link
                </button>
                <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-md bg-black py-2 text-[11px] font-bold text-white">
                  <Apple className="h-3 w-3" /> Pay
                </button>
                <div className="my-3 flex items-center gap-2">
                  <div className="h-px flex-1 bg-[#EEF0F4]" />
                  <span className="text-[9px] text-[#9AA5B1]">or</span>
                  <div className="h-px flex-1 bg-[#EEF0F4]" />
                </div>
                <p className="text-[10px] font-semibold text-[#0A2540]">
                  Payment method
                </p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 rounded-md border border-[#4F7CFF] px-2.5 py-1.5">
                    <span className="h-2.5 w-2.5 rounded-full border-[3px] border-[#4F7CFF]" />
                    <span className="text-[10px] text-[#0A2540]">Card</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-[#EEF0F4] px-2.5 py-1.5">
                    <span className="h-2.5 w-2.5 rounded-full border border-[#D9DCE3]" />
                    <span className="text-[10px] text-[#425466]">Bank transfer</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Block 3 — usage dashboard over chart */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl border border-[#E6E6E6] bg-[radial-gradient(125%_120%_at_100%_0%,#DCE8FF_0%,#EEF4FF_45%,#FFFFFF_100%)] p-6"
          >
            {/* bar chart sits at the back, anchored to the bottom */}
            <div className="absolute inset-x-6 bottom-6 flex flex-col">
              <div className="flex items-end gap-1.5">
                {[28, 44, 36, 58, 42, 66, 50, 78, 46, 64, 56, 82, 60, 90].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-[3px] bg-gradient-to-t from-[#4F7CFF] to-[#86ABFF]"
                      style={{ height: `${h * 1.4}px` }}
                    />
                  )
                )}
              </div>
              <div className="mt-2 flex justify-between text-[8px] text-[#9AA5B1]">
                <span>Jan</span>
                <span>Apr</span>
                <span>Aug</span>
                <span>Dec</span>
              </div>
            </div>

            {/* Pro Plan dashboard card, floating on top */}
            <div className="relative z-10 w-[88%] rounded-2xl border border-[#EBEBF0] bg-white p-4 shadow-[0_20px_50px_-20px_rgba(20,20,40,0.28)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#8B7BFF] to-[#4F7CFF] text-white">
                    <Zap className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-[12px] font-bold leading-none text-[#0A2540]">
                      Pro Plan
                    </p>
                    <p className="mt-0.5 text-[9px] text-[#9AA5B1]">
                      Billed monthly
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#EAF7F0] px-2 py-0.5 text-[8px] font-semibold text-[#1ABF6B]">
                  Active
                </span>
              </div>
              <div className="mt-3.5 flex items-center justify-between text-[10px]">
                <span className="font-medium text-[#697386]">Tokens</span>
                <span className="font-semibold text-[#0A2540]">
                  70.05 of 1,000 mtd
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="text-[8px] font-medium text-[#9AA5B1]">
                  Usage meter
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EEF0F4]">
                  <div className="h-full w-[7%] rounded-full bg-gradient-to-r from-[#4F7CFF] to-[#86ABFF]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---- WIDE BLOCK: embed in your platform ---- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="relative mb-6 grid items-center gap-8 overflow-hidden rounded-3xl border border-[#E6E6E6] bg-white p-8 md:p-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-0"
        >
          {/* heading */}
          <div className="relative z-30 lg:pr-8">
            <h3 className="text-2xl font-bold leading-tight tracking-tight text-[#0A2540] md:text-[2rem]">
              Embed payments
              <br />
              in your platform
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#425466]">
              Connect AgentBlue to the tools you already use. Sync accounts,
              automate workflows, and route every conversation without leaving
              your stack.
            </p>
          </div>

          {/* artwork: browser window (dashboard) with cards layered in front */}
          <div className="relative min-h-[300px] md:min-h-[340px]">
            {/* ── Browser window: dashboard.zenflow.com ── */}
            <div className="absolute inset-y-0 left-4 right-[-2rem] z-0 hidden overflow-hidden rounded-2xl border border-[#EBEBF0] bg-white shadow-[0_30px_70px_-30px_rgba(20,20,40,0.3)] sm:block md:right-[-3rem] lg:right-[-3.5rem]">
              {/* themed top band with diagonal hatch */}
              <div className="relative h-[88px] bg-gradient-to-br from-[#E9E0FF] via-[#F1ECFF] to-[#FBFAFF]">
                <div className="absolute inset-0 [background-image:repeating-linear-gradient(135deg,rgba(139,123,255,0.28)_0px,rgba(139,123,255,0.28)_1.5px,transparent_1.5px,transparent_9px)] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
                {/* chrome dots */}
                <div className="absolute left-4 top-3.5 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
                  <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
                  <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
                </div>
                {/* url bar */}
                <div className="absolute right-16 top-9 flex w-[58%] items-center gap-1.5 rounded-full border border-[#ECECF2] bg-white/90 px-3 py-1.5 shadow-sm">
                  <Lock className="h-2.5 w-2.5 text-[#9AA5B1]" />
                  <span className="text-[10px] text-[#697386]">
                    dashboard.zenflow.com
                  </span>
                </div>
                {/* expand icon */}
                <span className="absolute right-3 top-7 flex h-9 w-9 items-center justify-center rounded-xl bg-[#4F7CFF] text-white shadow-[0_6px_16px_-4px_rgba(79,124,255,0.6)]">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </div>

              {/* Connected Accounts table */}
              <div className="pl-[42%] pr-5 pt-4">
                <p className="text-base font-bold text-[#0A2540]">
                  Connected Accounts
                </p>
                <div className="mt-3 grid grid-cols-[1.5fr_1fr_1.1fr_1fr] gap-2 border-b border-[#F0F1F4] pb-2 text-[9px] font-semibold text-[#697386]">
                  <span>Accounts</span>
                  <span>Account country</span>
                  <span>Payment balance (INR)</span>
                  <span>Volume (USD)</span>
                </div>
                {[
                  ["Vital Flow", "Canada", "₹793,060.00", "₹6,798,483.10", false],
                  ["Daybreak Yoga", "United States", "₹142,690.00", "₹843,505.00", true],
                  ["Sacred Space", "United States", "₹98,420.00", "₹612,300.00", false],
                  ["Jackson Hot Yoga", "Australia", "₹71,950.00", "₹489,120.00", false],
                  ["Breathing Room", "Canada", "₹52,300.00", "₹354,640.00", false],
                  ["Radiance Studio", "United Kingdom", "₹38,910.00", "₹271,080.00", false],
                ].map(([name, country, bal, vol, active], i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-[1.5fr_1fr_1.1fr_1fr] items-center gap-2 border-b border-[#F4F5F8] py-2 text-[10px] last:border-b-0 ${
                      active ? "" : "opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
                          active
                            ? "bg-gradient-to-br from-[#8B7BFF] to-[#4F7CFF] text-white"
                            : "bg-[#FBE9C9] text-[#C99A3E]"
                        }`}
                      >
                        <Flower2 className="h-2.5 w-2.5" />
                      </span>
                      <span
                        className={`truncate ${
                          active
                            ? "font-bold text-[#0A2540]"
                            : "font-medium text-[#0A2540]"
                        }`}
                      >
                        {name}
                      </span>
                    </div>
                    <span className="text-[#697386]">{country}</span>
                    <span
                      className={
                        active ? "font-semibold text-[#0A2540]" : "text-[#697386]"
                      }
                    >
                      {bal}
                    </span>
                    <span
                      className={
                        active ? "font-semibold text-[#0A2540]" : "text-[#697386]"
                      }
                    >
                      {vol}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Zenflow card (front, left) ── */}
            <div className="absolute left-0 top-[18%] z-10 hidden w-[42%] rounded-2xl border border-[#EBEBF0] bg-white px-4 py-3 shadow-[0_20px_50px_-22px_rgba(20,20,40,0.3)] sm:block">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFE0EC] text-[#4F7CFF]">
                  <Flower2 className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-bold text-[#0A2540]">Zenflow</span>
              </div>
            </div>

            {/* ── Daybreak Yoga invoice card (frontmost, overlaps heading) ── */}
            <div className="relative z-20 w-full max-w-[300px] rounded-2xl border border-[#EBEBF0] bg-white p-5 shadow-[0_30px_70px_-28px_rgba(20,20,40,0.42)] sm:absolute sm:left-[2%] sm:top-[46%] sm:w-[58%] md:left-[-2%]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#8B7BFF] to-[#4F7CFF] text-white">
                  <Flower2 className="h-4 w-4" />
                </span>
                <span className="text-base font-bold text-[#0A2540]">
                  Daybreak Yoga
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#0A2540]">
                Thank you!
              </p>
              <p className="text-[11px] leading-snug text-[#697386]">
                Your unlimited yoga subscription is now active.
              </p>
              <div className="mt-4 space-y-2 border-t border-[#EEF0F4] pt-3 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#697386]">Order number</span>
                  <span className="font-medium text-[#0A2540]">#AB6120201</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#697386]">Date</span>
                  <span className="font-medium text-[#0A2540]">30 Jan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#697386]">Payment method</span>
                  <span className="font-medium text-[#0A2540]">•••• 4242</span>
                </div>
                <div className="flex justify-between border-t border-[#EEF0F4] pt-2">
                  <span className="font-semibold text-[#0A2540]">Total</span>
                  <span className="font-bold text-[#0A2540]">US$900.00</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---- BOTTOM ROW: three tall cards ---- */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 — chat + product thumbnails */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="group relative flex min-h-[460px] flex-col overflow-hidden rounded-3xl border border-[#E6E6E6] bg-white p-8"
          >
            <div className="relative z-10 mb-5 flex items-start justify-between">
              <h3 className="max-w-[78%] text-xl font-bold leading-snug tracking-tight text-[#0A2540]">
                Automate your operations end-to-end
              </h3>
              <ExpandIcon />
            </div>
            {/* particle wash */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] [background-image:radial-gradient(#FF7AA8_1px,transparent_1.6px)] [background-size:13px_13px] opacity-50 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_100%,black,transparent_70%)]" />
            <div className="relative z-10 mt-auto space-y-3">
              {/* chat bubbles */}
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-[#4F7CFF] px-3 py-2 text-[11px] leading-snug text-white">
                Map my busywork and fix the biggest revenue leak first.
              </div>
              <div className="w-fit max-w-[90%] rounded-2xl rounded-tl-sm border border-[#EBEBF0] bg-white px-3 py-2 text-[11px] leading-snug text-[#425466] shadow-sm">
                On it. Here are 3 high-ROI fixes I can ship this week:
              </div>
              {/* product thumbnails */}
              <div className="flex gap-2">
                {[
                  "from-[#9FC2FF] to-[#D6E4FF]",
                  "from-[#FFC2D6] to-[#FFE0EC]",
                ].map((g, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-xl border border-[#EBEBF0] bg-white p-2 shadow-sm"
                  >
                    <div className={`aspect-square rounded-lg bg-gradient-to-br ${g}`} />
                    <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-[#EEF0F4]" />
                    <div className="mt-1 h-1.5 w-1/2 rounded-full bg-[#F3F4F8]" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2 — holographic card */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="group relative flex min-h-[460px] flex-col overflow-hidden rounded-3xl border border-[#E6E6E6] bg-white p-8"
          >
            <div className="relative z-10 mb-5 flex items-start justify-between">
              <h3 className="max-w-[78%] text-xl font-bold leading-snug tracking-tight text-[#0A2540]">
                Launch a voice agent programme
              </h3>
              <ExpandIcon />
            </div>
            <div className="relative z-10 flex flex-1 items-center justify-center">
              {/* holographic card with chip + number */}
              <div className="aspect-[1.586/1] w-full max-w-[270px] rotate-[-7deg] overflow-hidden rounded-2xl bg-[linear-gradient(125deg,#FFD9C2_0%,#FFC2E2_28%,#C9B8FF_58%,#8EE6FF_100%)] p-5 shadow-[0_28px_60px_-18px_rgba(79,124,255,0.5)]">
                {/* sheen */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="h-7 w-9 rounded-md bg-[linear-gradient(135deg,#F4D27A,#E0B24A)]" />
                  <div>
                    <p className="font-mono text-[13px] tracking-[0.12em] text-white/95 drop-shadow">
                      4242 4242 4242 4242
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-[11px] font-semibold tracking-widest text-white/90">
                        SOPHIA AI
                      </p>
                      <p className="text-[11px] font-bold italic text-white/90">
                        VISA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 — world map / borderless */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="group relative flex min-h-[460px] flex-col overflow-hidden rounded-3xl border border-[#E6E6E6] bg-white p-8"
          >
            <div className="relative z-10 mb-5 flex items-start justify-between">
              <h3 className="max-w-[78%] text-xl font-bold leading-snug tracking-tight text-[#0A2540]">
                Scale across every channel and time zone
              </h3>
              <ExpandIcon />
            </div>
            {/* dotted map */}
            <div className="relative z-10 flex flex-1 items-center justify-center">
              <div className="relative h-44 w-full">
                <div className="absolute inset-0 [background-image:radial-gradient(#FF7AA8_1.4px,transparent_1.8px)] [background-size:13px_13px] opacity-70 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,black,transparent_72%)]" />
                {/* connection arc */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 140" fill="none">
                  <path
                    d="M40 95 Q110 10 165 60"
                    stroke="#4F7CFF"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                </svg>
                {/* location pin */}
                <span className="absolute right-[18%] top-[34%] inline-flex items-center gap-1.5 rounded-full border border-[#EBEBF0] bg-white px-2.5 py-1 shadow-md">
                  <MapPin className="h-3 w-3 text-[#4F7CFF]" />
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
