import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Scale, FileText, BarChart3, Linkedin } from "lucide-react";
import sadiqueImage from "@/assets/sadique.jpeg";
import rafeImage from "@/assets/rafe.png";

const About = () => {
  const beliefs = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Diagnosis Before Prescription",
      description: "You wouldn't want surgery without a diagnosis. Why automate without understanding what's actually broken? Every client starts with our Operations Intelligence Audit—no exceptions."
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Zero Vendor Bias",
      description: "We don't earn commissions from software vendors. We're not certified resellers. We recommend what's genuinely best for your business, even if it means using tools you already own."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "You Own Everything",
      description: "The blueprints, roadmaps, and documentation we create are yours forever. Implement with your team, hire freelancers, or let us build it. Total flexibility. Zero lock-in."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "ROI-Accountable, Always",
      description: "Every automation is tied to measurable outcomes: time saved, costs reduced, revenue enabled. No vanity metrics. Just quantified business impact."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                We're Not Your Typical Automation Agency
              </h1>
              <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
                We're strategic consultants who happen to be excellent at automation. The difference? We diagnose before we prescribe, recommend what's best for you (not us), and ensure every dollar you invest delivers measurable ROI.
              </p>
              <p className="text-lg font-medium text-foreground">Strategy first. Always.</p>
            </div>
          </div>
        </section>

        {/* Why We Exist */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-4 text-center">Why AgentBlue Exists</h2>
              <p className="text-xl text-muted-foreground mb-8 text-center">Born from frustration with an industry that sells tools first and asks questions later</p>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We've seen it too many times: businesses buy automation platforms after watching a flashy demo, then struggle for months trying to make them work. They hire freelancers who build whatever's easiest, not what actually matters. They work with 'consultants' who recommend tools they're certified in—not what's genuinely best.
                </p>
                <p>
                  The result? Expensive software sitting unused. Automations that solve the wrong problems. And operations teams more frustrated than before.
                </p>
                <p>
                  AgentBlue was founded on a different principle: strategy before tools. Every engagement starts with diagnosis—understanding your actual workflows, quantifying real costs, and prioritizing opportunities based on ROI. We're platform-agnostic, we don't earn vendor commissions, and we ensure you own everything we create. No lock-in. No vendor bias. Just honest, strategic guidance that delivers measurable business outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">What We Believe</h2>
                <p className="text-xl text-muted-foreground">The principles that guide every client engagement</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {beliefs.map((belief, index) => (
                  <Card key={index} className="border-0 bg-background/50">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6 text-white">
                        {belief.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{belief.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{belief.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">The Team Behind AgentBlue</h2>
                <p className="text-xl text-muted-foreground">Two co-founders with complementary expertise</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <Card className="border-0 bg-background">
                  <CardContent className="p-8 text-center">
                    <img 
                      src={sadiqueImage} 
                      alt="Sadique Mirza"
                      className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
                    />
                    <h3 className="text-2xl font-bold mb-2">Sadique Mirza</h3>
                    <p className="text-accent font-medium mb-4">Co-Founder & Strategic Lead</p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Marketing strategist and automation consultant. Specializes in operational diagnosis, ROI modeling, and client-facing strategy. Ensures every automation delivers measurable business impact.
                    </p>
                    <a 
                      href="https://www.linkedin.com/in/sadique-mirza" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#0077B5] hover:opacity-80 transition-opacity"
                    >
                      <Linkedin className="w-5 h-5" />
                      Connect on LinkedIn
                    </a>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-background">
                  <CardContent className="p-8 text-center">
                    <img 
                      src={rafeImage} 
                      alt="Rafe Mirza"
                      className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
                    />
                    <h3 className="text-2xl font-bold mb-2">Rafe Mirza</h3>
                    <p className="text-accent font-medium mb-4">Co-Founder & Technical Lead</p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Technical architect and development specialist. Builds custom automation solutions, integrations, and AI implementations. Turns strategic blueprints into production-ready systems.
                    </p>
                    <a 
                      href="https://www.linkedin.com/in/rafe-mirza" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#0077B5] hover:opacity-80 transition-opacity"
                    >
                      <Linkedin className="w-5 h-5" />
                      Connect on LinkedIn
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-accent text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Transform Your Operations?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Let's start with an honest conversation about your business challenges.
              </p>
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                Schedule Free Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
