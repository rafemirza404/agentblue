import Navigation from "@/components/Navigation";
import NewHero from "@/components/NewHero";
import IntegrationCarousel from "@/components/IntegrationCarousel";
import LaunchVideo from "@/components/LaunchVideo";
import OperationsTiers from "@/components/OperationsTiers";
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
    <div className="min-h-screen home-inter-headings">
      <Navigation />
      <main>
        {/* 1 — Hero: the promise */}
        <section id="hero">
          <NewHero />
        </section>

        {/* 2 — Outcomes: lead with benefits (recover revenue / save hours / always-on) */}
        <section id="feature-tabs">
          <FeatureTabs />
        </section>

        {/* 3 — Proof: case studies / results, high on the page */}
        <section id="case-studies">
          <Gallery />
        </section>

        {/* 4 — See it real: launch video */}
        <section id="launch-video">
          <LaunchVideo />
        </section>

        {/* 5 — Product suite: what they actually get */}
        <section id="modular-solutions" className="cv-auto">
          <ModularSolutions />
        </section>

        {/* 6 — Capability depth (picture-driven carousel) */}
        <section id="capabilities" className="px-4 py-16 md:py-24 cv-auto">
          <FeatureCarousel />
        </section>

        {/* 7 — How we work: Diagnose → Design → Deploy */}
        <section id="how-we-work" className="cv-auto">
          <OperationsTiers />
        </section>

        {/* 8 — Differentiation: objection-crusher before the ask */}
        <section id="why-different" className="cv-auto">
          <WhyDifferent />
        </section>

        {/* 9 — Reassurance: fits your stack (handled low, as last objection) */}
        <section id="integrations" className="cv-auto">
          <IntegrationCarousel />
        </section>

        {/* Conditional VSL */}
        {SHOW_VIDEO_DEMO && (
          <section id="video-demo">
            <VideoDemo />
          </section>
        )}

        {/* 10 — Remaining objections */}
        <section id="faq" className="cv-auto">
          <FAQ />
        </section>

        {/* 11 — Convert */}
        <section id="contact-form-section">
          <AssessmentForm />
        </section>

        {/* 12 — The close: blends into the footer */}
        <section id="final-cta" className="cv-auto">
          <FinalCTA />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
