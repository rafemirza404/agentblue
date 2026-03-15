"use client";

import { motion } from "framer-motion";
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
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Questions? We've Got Answers.
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.06, ease }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 shadow-card"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:text-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
