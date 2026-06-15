import Navigation from "@/components/Navigation";
import NewHero from "@/components/NewHero";
import IntegrationCarousel from "@/components/IntegrationCarousel";
import LaunchVideo from "@/components/LaunchVideo";
import HowItWorks from "@/components/HowItWorks";
import WhyDifferent from "@/components/WhyDifferent";
import ModularSolutions from "@/components/ModularSolutions";
import { FeatureCarousel } from "@/components/ui/feature-carousel";
import { FeatureTabs } from "@/components/FeatureTabs";
import { Gallery } from "@/components/Gallery";
import VideoDemo from "@/components/VideoDemo";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import AssessmentForm from "@/components/AssessmentForm";
import Footer from "@/components/Footer";

// Toggle this to show/hide the VideoDemo section (set to true when VSL is ready)
const SHOW_VIDEO_DEMO = false;

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Section 1: Hero Section */}
        <section id="hero">
          <NewHero />
        </section>

        {/* Section 2: Integrations */}
        <section id="integrations">
          <IntegrationCarousel />
        </section>

        {/* Section 3: Launch Video */}
        <section id="launch-video">
          <LaunchVideo />
        </section>

        {/* Section 3: Three Tiers - PRESERVED */}
        <section id="how-we-work">
          <HowItWorks />
        </section>

        {/* Section 3: Why We're Different */}
        <section id="why-different">
          <WhyDifferent />
        </section>

        {/* Feature showcase — picture-driven capabilities carousel */}
        <section id="capabilities" className="px-4 py-16 md:py-24">
          <FeatureCarousel />
        </section>

        {/* Section 3b: Modular Solutions (Stripe-style bento) */}
        <section id="modular-solutions">
          <ModularSolutions />
        </section>

        {/* Tabbed feature spotlight */}
        <section id="feature-tabs">
          <FeatureTabs />
        </section>

        {/* Case-study gallery carousel */}
        <section id="case-studies">
          <Gallery />
        </section>

        {/* Section 4: Video/Demo Section with Gradient - CONDITIONAL */}
        {SHOW_VIDEO_DEMO && (
          <section id="video-demo">
            <VideoDemo />
          </section>
        )}

        {/* Section 5: FAQ - PRESERVED */}
        <section id="faq">
          <FAQ />
        </section>

        {/* Section 6: Final CTA */}
        <section id="final-cta">
          <FinalCTA />
        </section>

        {/* Section 7: Assessment Form */}
        <section id="contact-form-section">
          <AssessmentForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
