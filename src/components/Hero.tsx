import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Bot } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6 border border-accent/20">
            <Sparkles className="w-4 h-4" />
            Transforming Business with AI
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your{" "}
            <span className="text-gradient">straight-line path</span>{" "}
            to AI-powered{" "}
            <span className="text-accent">automation</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            We build & deploy intelligent automation solutions that eliminate repetitive tasks, 
            boost productivity, and scale your business operations effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="xl" className="group">
              Start Your Automation Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl">
              View Case Studies
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">50+ Successful Implementations</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">90% Cost Reduction Average</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;