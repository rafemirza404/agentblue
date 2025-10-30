import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Video and Key Points */}
      <section className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8 leading-tight">
              Watch our AI voice agent qualify leads, handle objections, and book meetings
            </h1>

            <p className="text-xl md:text-2xl text-blue-400 text-center mb-16">
              See how our AI handles real conversations in under 2 minutes
            </p>

            {/* Video Container - Centered */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-purple-600 via-blue-600 to-blue-700 flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="text-white text-xl md:text-2xl font-bold mb-2">Demo Video Coming Soon</p>
                    <p className="text-white/90 text-base">Currently filming. Check back soon!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Points - Below Video */}
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-white text-lg md:text-xl font-semibold">
                Real Customer Conversations
              </div>

              <div className="text-white text-lg md:text-xl font-semibold">
                Natural Language Understanding
              </div>

              <div className="text-white text-lg md:text-xl font-semibold">
                Seamless Appointment Setting
              </div>

              <div className="text-white text-lg md:text-xl font-semibold">
                24/7 Lead Qualification
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-8">
              Most Automation Projects Fail. Here's Why We're Different:
            </h2>
            
            <p className="text-xl text-gray-700 text-center mb-12 leading-relaxed max-w-4xl mx-auto">
              The problem isn't tools—it's strategy. Businesses rush to automate before understanding their operations. We diagnose first, design second, build third. Every engagement starts with a comprehensive audit because you can't fix what you don't understand.
            </p>

            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <span className="text-2xl text-green-600 flex-shrink-0">✓</span>
                <p className="text-xl text-gray-800 pt-1">
                  <strong className="font-bold">Strategy before tools</strong> - We audit your operations before recommending solutions
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="text-2xl text-green-600 flex-shrink-0">✓</span>
                <p className="text-xl text-gray-800 pt-1">
                  <strong className="font-bold">Platform-agnostic</strong> - No vendor bias, no commissions—just what works best for you
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="text-2xl text-green-600 flex-shrink-0">✓</span>
                <p className="text-xl text-gray-800 pt-1">
                  <strong className="font-bold">You own everything</strong> - Blueprints, specs, roadmaps—all yours to implement however you want
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Black CTA Section */}
      <section className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to See How This Works for Your Business?
            </h2>
            
            <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed">
              Book a 30-minute strategy call. We'll diagnose your biggest operational bottleneck and show you exactly how to fix it.
            </p>

            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl px-12 py-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              onClick={() => {
                document.getElementById('assessment-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Schedule Your Free Call →
            </Button>

            <p className="text-gray-400 mt-6 text-lg">
              No sales pitch. Just strategic insights.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section - Get Personalized Assessment */}
      <section className="py-20 md:py-32 bg-white" id="assessment-form">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Get a Personalized Automation Assessment
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Tell us about your biggest operational challenge. We'll send you a custom analysis within 48 hours.
              </p>
            </div>

            {/* Assessment Form */}
            <Card className="bg-white border border-gray-200 shadow-xl rounded-2xl">
              <CardContent className="p-8 md:p-10">

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-base font-medium mb-2 text-gray-900">
                      Name (required)
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="text-base py-4"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-base font-medium mb-2 text-gray-900">
                      Email (required)
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="text-base py-4"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-base font-medium mb-2 text-gray-900">
                      Company (optional)
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="text-base py-4"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-base font-medium mb-2 text-gray-900">
                      Challenge (required)
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your biggest operational challenge..."
                      className="min-h-[120px] text-base"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? "Sending..." : "Get My Free Assessment →"}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    We respond within 48 hours with actionable insights.
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
