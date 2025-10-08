import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import MiniCaseStudies from "@/components/MiniCaseStudies";
import WhoItsFor from "@/components/WhoItsFor";
import WhyNotDIY from "@/components/WhyNotDIY";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="problem-section">
          <ProblemSection />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="how-we-work">
          <HowItWorks />
        </section>
        <Testimonials />
        <section id="case-studies">
          <MiniCaseStudies />
        </section>
        <WhoItsFor />
        <WhyNotDIY />
        <FAQ />
        <section id="contact-form-section">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
