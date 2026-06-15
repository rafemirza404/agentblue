"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout, Pointer, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface FeatureTabsProps {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

// Brand-adapted tabbed feature section. Images are placeholders.
const FeatureTabs = ({
  badge = "Why AgentBlue",
  heading = "Automation built around your operations",
  description = "Pick the outcome you care about — we handle the rest.",
  tabs = [
    {
      value: "tab-1",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "Recover Revenue",
      content: {
        badge: "Revenue Leaks",
        title: "Plug the leaks draining your revenue.",
        description:
          "We find where money slips through — slow lead response, missed follow-ups, manual data entry — and automate the fix so it never happens again.",
        buttonText: "Book a strategy call",
        imageSrc:
          "https://placehold.co/800x600/4F7CFF/FFFFFF/png?text=Revenue+Recovered",
        imageAlt: "Revenue dashboard placeholder",
      },
    },
    {
      value: "tab-2",
      icon: <Pointer className="h-auto w-4 shrink-0" />,
      label: "Save Hours",
      content: {
        badge: "Time Back",
        title: "Hand the busywork to automation.",
        description:
          "Custom workflows run your repetitive tasks end to end, freeing your team to focus on the work that actually moves the business.",
        buttonText: "See how it works",
        imageSrc:
          "https://placehold.co/800x600/6E97FF/FFFFFF/png?text=Hours+Saved",
        imageAlt: "Workflow placeholder",
      },
    },
    {
      value: "tab-3",
      icon: <Layout className="h-auto w-4 shrink-0" />,
      label: "Always On",
      content: {
        badge: "Voice Agents",
        title: "Never miss a lead again.",
        description:
          "Sophia handles real conversations around the clock, qualifies leads in under 90 seconds, and books calls straight into your calendar.",
        buttonText: "Talk to Sophia",
        imageSrc:
          "https://placehold.co/800x600/3F6BF0/FFFFFF/png?text=Voice+Agents",
        imageAlt: "Voice agent placeholder",
      },
    },
  ],
}: FeatureTabsProps) => {
  return (
    <section className="py-14 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{badge}</Badge>
          <h2 className="max-w-2xl text-3xl md:text-4xl text-[#0A2540]">
            {heading}
          </h2>
          <p className="text-[#425466]">{description}</p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10 bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[#697386] data-[state=active]:bg-[#EEF4FF] data-[state=active]:text-[#4F7CFF]"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-[#F7F8FA] p-6 lg:p-16">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-white">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl lg:text-5xl text-[#0A2540]">
                    {tab.content.title}
                  </h3>
                  <p className="text-[#425466] lg:text-lg">
                    {tab.content.description}
                  </p>
                  <Button className="mt-2.5 w-fit gap-2 bg-[#4F7CFF] hover:bg-[#3F6BF0]" size="lg">
                    {tab.content.buttonText}
                  </Button>
                </div>
                <img
                  src={tab.content.imageSrc}
                  alt={tab.content.imageAlt}
                  loading="lazy"
                  className="rounded-xl"
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { FeatureTabs };
