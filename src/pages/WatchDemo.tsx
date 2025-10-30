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

      {/* Hero Section with Video */}
      <section className="pt-16 pb-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Headline */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-white leading-tight tracking-tight">
                IT'S NOT JUST AUTOMATION.
                <br />
                <span className="bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                  IT'S 24/7 OPERATIONAL LEVERAGE.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                Watch how our AI voice agents handle real customer conversations with human-like intelligence
              </p>
            </div>

            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(255,255,255,0.1)] mb-12 border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <div className="text-5xl">📹</div>
                  </div>
                  <p className="text-white text-2xl font-semibold mb-3">Demo Video Coming Soon</p>
                  <p className="text-gray-400 text-lg">We're currently filming this demo. Check back soon!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll See */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              What You'll See in This Demo
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-4xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Lead Qualification</h3>
                <p className="text-gray-600 leading-relaxed">
                  Watch how the AI asks strategic questions to identify high-intent prospects and gather key information.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-4xl">💬</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Objection Handling</h3>
                <p className="text-gray-600 leading-relaxed">
                  See natural responses to common concerns, pushback, and hesitation—just like a trained sales rep would handle.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-4xl">📅</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Meeting Booking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Experience seamless calendar integration as the AI handles scheduling without human intervention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-gradient-to-b from-black via-gray-950 to-black border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
              Real Results from AI Voice Agents
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
              Stop losing leads to slow response times and missed calls. Our AI voice agents deliver measurable impact.
            </p>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-4 group-hover:border-white/20 transition-all duration-300">
                  <div className="text-6xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">24/7</div>
                  <p className="text-gray-300 text-lg font-medium">Always Available</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-4 group-hover:border-white/20 transition-all duration-300">
                  <div className="text-6xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3">90%</div>
                  <p className="text-gray-300 text-lg font-medium">Cost Reduction</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-4 group-hover:border-white/20 transition-all duration-300">
                  <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">3x</div>
                  <p className="text-gray-300 text-lg font-medium">More Conversations</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-4 group-hover:border-white/20 transition-all duration-300">
                  <div className="text-6xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-3">0</div>
                  <p className="text-gray-300 text-lg font-medium">Missed Opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Deploy Your Own AI Voice Agent?
              </h2>
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-2xl mx-auto">
                Book a free strategy call to discuss how AI voice agents can transform your business operations.
              </p>
            </div>

            <Card className="bg-white border-0 shadow-2xl rounded-2xl">
              <CardContent className="p-10">
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
