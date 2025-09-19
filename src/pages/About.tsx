import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Zap, Award } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Alex Chen",
      role: "CEO & AI Strategist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Former Google AI researcher with 10+ years in enterprise automation."
    },
    {
      name: "Sarah Johnson", 
      role: "CTO & Lead Developer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Built AI systems for Fortune 500 companies, expert in machine learning."
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Operations", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Process optimization specialist with expertise in business transformation."
    }
  ];

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Innovation First",
      description: "We stay ahead of AI trends to deliver cutting-edge solutions."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Client Success",
      description: "Your business growth is our primary measure of success."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Speed & Efficiency",
      description: "Fast implementation with maximum impact on your operations."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description: "We deliver premium quality in every project we undertake."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-6">About AgentBlue</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Pioneering the Future of
                <br />Business Automation
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're a team of AI specialists, automation experts, and business strategists 
                dedicated to transforming how companies operate through intelligent technology.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    At AgentBlue, we believe every business deserves to harness the power of AI. 
                    Our mission is to democratize artificial intelligence by making it accessible, 
                    practical, and transformative for companies of all sizes.
                  </p>
                  <p className="text-lg text-muted-foreground mb-8">
                    We don't just implement technology—we partner with you to reimagine your 
                    business processes, eliminate inefficiencies, and unlock new possibilities 
                    for growth and innovation.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">500+</div>
                      <div className="text-muted-foreground">Projects Completed</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">95%</div>
                      <div className="text-muted-foreground">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" 
                    alt="Team collaboration"
                    className="rounded-2xl shadow-elegant"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  These principles guide everything we do and shape how we approach every client relationship.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="border-0 bg-background/50 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our diverse team of experts brings together decades of experience in AI, 
                  automation, and business strategy.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {team.map((member, index) => (
                  <Card key={index} className="border-0 bg-gradient-subtle">
                    <CardContent className="p-6 text-center">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-accent text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Let's discuss how AI automation can revolutionize your operations and drive unprecedented growth.
              </p>
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Your Transformation
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