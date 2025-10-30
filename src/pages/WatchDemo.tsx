import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Target, MessageSquare, Calendar, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WatchDemo = () => {
  const { toast } = useToast();

  // Update page title and meta description for SEO
  useEffect(() => {
    document.title = "Watch Demo - AgentBlue AI Voice Agents in Action";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Watch a live 2-minute demo of our AI voice agent handling customer conversations, qualifying prospects, and booking meetings—24/7 without human intervention.');
    }
    
    return () => {
      document.title = "AgentBlue - AI Automation Solutions for Modern Businesses";
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || formData.name.length < 2) {
      toast({
        title: "Validation Error",
        description: "Please enter your full name (at least 2 characters)",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.email || !formData.email.includes('@')) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.message || formData.message.length < 10) {
      toast({
        title: "Validation Error",
        description: "Please enter a message (at least 10 characters)",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://n8nlocal.supportagentblue.com/webhook/69731dc5-5d13-451a-a880-ff44ff2e0e35', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'watch-demo-page'
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Thanks for your interest! We'll be in touch within 24 hours.",
        });
        setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try emailing us directly at sophia@supportagentblue.in",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-white text-2xl font-bold">AgentBlue</span>
          </a>
          <a href="/contact#contact-methods" className="text-white hover:text-accent transition-smooth">
            Contact
          </a>
        </div>
      </header>

      {/* Live Banner */}
      <div className="bg-red-600 py-2.5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white text-sm font-bold uppercase tracking-wide">
            🔴 LIVE DEMO | See AI Voice Agents in Action
          </p>
        </div>
      </div>

      {/* Hero Section with Video - Moved Up */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Headline */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                IT'S NOT JUST AUTOMATION.
                <br />
                <span className="text-gray-300">IT'S 24/7 OPERATIONAL LEVERAGE.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                Watch how our AI voice agents handle real customer conversations with human-like intelligence
              </p>
            </div>

            {/* Video Container - Prominent Position */}
            <div className="relative rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(255,255,255,0.08)] mb-16">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📹</div>
                  <p className="text-white text-xl font-medium mb-2">Demo Video Coming Soon</p>
                  <p className="text-gray-400">We're currently filming this demo. Check back soon!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll See */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              What You'll See in This Demo:
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-0">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-4">Lead Qualification</h3>
                  <p className="text-muted-foreground">
                    Watch how the AI asks strategic questions to identify high-intent prospects and gather key information.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-0">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">💬</div>
                  <h3 className="text-xl font-bold mb-4">Objection Handling</h3>
                  <p className="text-muted-foreground">
                    See natural responses to common concerns, pushback, and hesitation—just like a trained sales rep would handle.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-0">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">📅</div>
                  <h3 className="text-xl font-bold mb-4">Meeting Booking</h3>
                  <p className="text-muted-foreground">
                    Experience seamless calendar integration as the AI handles scheduling without human intervention.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Real Results from AI Voice Agents
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                <p className="text-gray-300">Always Available</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">90%</div>
                <p className="text-gray-300">Cost Reduction</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">3x</div>
                <p className="text-gray-300">More Conversations</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">0</div>
                <p className="text-gray-300">Missed Opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section className="py-20 bg-gradient-to-r from-accent to-accent/90">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Deploy Your Own AI Voice Agent?
              </h2>
              <p className="text-xl text-white/90">
                Book a free strategy call to discuss how AI voice agents can transform your business operations.
              </p>
            </div>

            <Card className="bg-white border-0">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Tell Us About Your Needs *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your business and how AI voice agents could help..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-6 text-lg"
                  >
                    {isSubmitting ? "Sending..." : "Book Your Free Strategy Call"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to receive communications from AgentBlue.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WatchDemo;
