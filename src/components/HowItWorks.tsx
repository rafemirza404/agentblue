"use client";

import { Search, Ruler, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const HowItWorks = () => {
  const tiers = [
    {
      number: "1",
      icon: Search,
      title: "Diagnose",
      service: "Operations Intelligence Audit",
      description:
        "We map your operational chaos, quantify the true cost of manual work, and identify high-ROI automation opportunities.",
      features: [
        "Complete process audit & bottleneck analysis",
        "ROI projections for each opportunity",
        "Prioritized automation roadmap",
        "Technology stack recommendations",
      ],
    },
    {
      number: "2",
      icon: Ruler,
      title: "Design",
      service: "Automation Infrastructure Blueprint",
      description:
        "Detailed technical blueprints that any developer can execute—your team, freelancers, or ours.",
      features: [
        "Complete workflow diagrams & data architecture",
        "Integration specifications & API mappings",
        "Security & compliance framework",
        "Implementation playbook with timelines",
      ],
    },
    {
      number: "3",
      icon: Rocket,
      title: "Deploy",
      service: "Turnkey Implementation",
      description:
        "Full-service build, test, train, and stabilize. We handle everything—you see the results.",
      features: [
        "Platform setup & workflow development",
        "Rigorous testing & optimization",
        "Team training & documentation",
        "30-day post-launch support",
      ],
      optional: true,
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Three Tiers. One Mission: Operational Excellence.
          </h2>
          <p className="text-base text-muted-foreground">
            Choose your entry point—all paths start with strategy
          </p>
        </motion.div>

        {/* Mobile: Horizontal scroll */}
        <ScrollIndicator />
        <div className="relative">
          <HorizontalScrollGradient />
          <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-6 min-w-max">
              {tiers.map((tier, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                >
                  <Card className="bg-gradient-to-b from-background to-secondary/30 border-border shadow-elegant hover-lift relative w-[320px] flex-shrink-0">
                    <CardContent className="p-8">
                      {tier.optional && (
                        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                          Optional
                        </Badge>
                      )}
                      <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
                          <span className="text-3xl font-bold text-white">{tier.number}</span>
                        </div>
                        <tier.icon className="w-12 h-12 text-accent mb-4" />
                        <h3 className="text-lg font-bold text-foreground mb-2">{tier.title}</h3>
                        <p className="text-sm font-semibold text-accent mb-3">{tier.service}</p>
                        <p className="text-muted-foreground mb-6">{tier.description}</p>
                      </div>
                      <div className="space-y-3">
                        {tier.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start text-left">
                            <span className="text-accent mr-2 flex-shrink-0">✓</span>
                            <span className="text-sm text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <Card className="bg-gradient-to-b from-background to-secondary/30 border-border shadow-elegant hover-lift relative h-full">
                <CardContent className="p-8">
                  {tier.optional && (
                    <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                      Optional
                    </Badge>
                  )}
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-white">{tier.number}</span>
                    </div>
                    <tier.icon className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">{tier.title}</h3>
                    <p className="text-sm font-semibold text-accent mb-3">{tier.service}</p>
                    <p className="text-muted-foreground mb-6">{tier.description}</p>
                  </div>
                  <div className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start text-left">
                        <span className="text-accent mr-2 flex-shrink-0">✓</span>
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
