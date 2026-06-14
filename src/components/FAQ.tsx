"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FAQ = () => {
  const faqs = [
    {
      question: "Do we need to know which automation tools to use before starting?",
      answer:
        "Not at all. That's our job. We assess your needs, evaluate your existing tools, and recommend the best platforms for your specific situation—whether that's maximizing what you already own or adding new capabilities. Platform-agnostic means we're unbiased advisors, not tool vendors.",
    },
    {
      question: "Can we implement the blueprints ourselves, or do we have to use your team?",
      answer:
        "Total flexibility. Our Tier 2 deliverable (Automation Infrastructure Blueprint) is designed so ANY technical team can execute it—your in-house developers, freelancers, or us. You own the blueprints forever. The choice is yours.",
    },
    {
      question: "Our operations are complex and messy. Where do we even start?",
      answer:
        "The messier, the better the ROI. Our Operations Intelligence Audit (Tier 1) is specifically designed for complex operations. We map everything, identify bottlenecks, quantify costs, and give you a clear, prioritized roadmap. Complexity is where we thrive.",
    },
    {
      question: "How long until we see actual ROI from automation?",
      answer:
        "Most mid-complexity automations deliver ROI within 3-6 months. Quick wins can show results in weeks. During our audit, we model expected ROI timelines for each opportunity so you know what to expect before investing.",
    },
    {
      question: "Do you work with our existing tools, or do we need to buy new platforms?",
      answer:
        "We maximize your current stack first. Many businesses already own powerful tools—they just don't know how to connect them properly. Only when there's a genuine gap do we recommend additions. And when we do, we show you exactly why and how it pays for itself.",
    },
    {
      question: "What industries do you specialize in?",
      answer:
        "Operational bottlenecks follow similar patterns regardless of industry—missed opportunities, repetitive admin work, slow response times, and manual data entry. We focus specifically on residential solar and HVAC companies because speed-to-lead and call capture are make-or-break in these industries.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4 md:py-28">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left — sticky heading */}
          <motion.div
            className="lg:sticky lg:top-28 lg:self-start"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease }}
          >
            <span className="mb-4 block text-sm font-semibold text-[#635BFF]">
              FAQ
            </span>
            <h2 className="text-3xl leading-[1.1] tracking-tight text-[#0A2540] md:text-[2.5rem]">
              Questions?
              <br />
              We've got answers.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-[#425466]">
              Still unsure how automation fits your operation? Reach out—we'll map
              it out with you, no pitch attached.
            </p>
            <a
              href="#contact-form-section"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-[#E6E6E6] bg-white px-4 py-2 text-sm font-semibold text-[#0A2540] shadow-sm transition-colors hover:border-[#635BFF] hover:text-[#635BFF]"
            >
              Ask us anything <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Right — accordion */}
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05, ease }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="overflow-hidden rounded-2xl border border-[#E6E6E6] bg-white px-5 shadow-[0_10px_30px_-18px_rgba(20,20,40,0.18)] transition-colors data-[state=open]:border-[#635BFF]/40 data-[state=open]:bg-[#FAF9FF]"
                >
                  <AccordionTrigger className="py-5 text-left text-[15px] font-semibold tracking-tight text-[#0A2540] no-underline hover:no-underline [&>svg]:text-[#635BFF]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[14px] leading-relaxed text-[#425466]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
