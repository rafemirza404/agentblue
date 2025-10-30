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
          <div className="flex items-center gap-6">
            <a href="/contact#contact-methods" className="text-white hover:text-blue-400 transition-smooth">
              Contact
            </a>
            <Button 
              variant="default"
              onClick={() => {
                const chatButton = document.querySelector('[data-chatbot-trigger]') as HTMLElement;
                if (chatButton) chatButton.click();
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Chat With Us
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Video */}
      <section className="pt-24 pb-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Headline */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-white leading-[1.1] tracking-tight">
                The Fastest Way to Build<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                  Expert-Level
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-blue-400 font-bold mb-12">
                No Coding Skills Required
              </p>
            </div>

            {/* Video Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-blue-400/50">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <p className="text-white text-3xl font-bold mb-3">Demo Video Coming Soon</p>
                  <p className="text-gray-300 text-lg">We're currently filming this demo. Check back soon!</p>
                </div>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <div className="text-center p-6 bg-black border border-white/10 rounded-xl">
                <div className="text-3xl mb-3">🧠</div>
                <p className="text-white font-semibold">Master AI & Automation with our <strong className="text-blue-400">In-Depth Courses</strong></p>
              </div>
              <div className="text-center p-6 bg-black border border-white/10 rounded-xl">
                <div className="text-3xl mb-3">📅</div>
                <p className="text-white font-semibold">Multiple <strong className="text-blue-400">Live AI Workshops</strong> Each Week</p>
              </div>
              <div className="text-center p-6 bg-black border border-white/10 rounded-xl">
                <div className="text-3xl mb-3">⚡</div>
                <p className="text-white font-semibold">Jump Start with <strong className="text-blue-400">Ready-to-Use Systems</strong></p>
              </div>
              <div className="text-center p-6 bg-black border border-white/10 rounded-xl">
                <div className="text-3xl mb-3">👥</div>
                <p className="text-white font-semibold">Supportive <strong className="text-blue-400">Community</strong> of AI Builders</p>
              </div>
            </div>

            {/* Main CTA */}
            <div className="text-center mt-12">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl px-12 py-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => {
                  document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Instant Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-xl text-gray-700 leading-relaxed">
                  The AI revolution is here. With it comes <strong className="text-gray-900">massive opportunities</strong> to take your business to the next level.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  But the internet is <em className="italic text-gray-800">full of hyped AI solutions</em> that don't work in practice.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  We're two brothers with a proven track record of success, combining <strong className="text-gray-900">30+ years of experience in tech</strong>.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  We're proven entrepreneurs who have built and scaled <strong className="text-gray-900">multiple six-figure</strong> online businesses.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Many of our workflows are inspired by systems we developed to grow and optimize our own businesses.
                </p>
                <p className="text-xl text-gray-800 italic font-medium mt-8">
                  We've learned a few things along the way...
                </p>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="/api/placeholder/600/600" 
                    alt="AgentBlue Founders"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                    <div className="w-24 h-1 bg-blue-500 mb-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
              Building Effective AI Agents Can be<br />
              <em className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic">A Challenge</em>
            </h2>
            <p className="text-2xl text-gray-300 mb-16 italic">
              It requires you to get good at many things, such as...
            </p>

            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="text-left">
                <p className="text-xl text-gray-300"><strong className="text-white font-bold">Figuring out</strong> the best way to do things</p>
              </div>
              <div className="text-left">
                <p className="text-xl text-gray-300"><strong className="text-white font-bold">Picking</strong> the right tools for the job</p>
              </div>
              <div className="text-left">
                <p className="text-xl text-gray-300"><strong className="text-white font-bold">Mapping out</strong> how everything should flow</p>
              </div>
              <div className="text-left">
                <p className="text-xl text-gray-300"><strong className="text-white font-bold">Wrangling</strong> data without losing your mind</p>
              </div>
              <div className="text-left">
                <p className="text-xl text-gray-300 italic"><strong className="text-white font-bold">Keeping up</strong> with the latest tech</p>
              </div>
              <div className="text-left">
                <p className="text-xl text-gray-300 italic"><strong className="text-white font-bold">Adapting</strong> when things don't go as planned</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                But We've Built a Library of<br />
                <span className="underline decoration-4 decoration-blue-500">Cutting-Edge AI Systems</span>
              </h2>
              <p className="text-2xl text-gray-700 italic max-w-4xl mx-auto leading-relaxed">
                That you can plug into your business. Eliminate the guesswork and automate key areas of your business in a fraction of the time.
              </p>
            </div>

            {/* Demo Mockups */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="relative">
                <div className="bg-gray-100 rounded-2xl p-4 shadow-xl border-4 border-gray-800">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="h-64 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <p className="text-gray-600 font-semibold">AI Automation Dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gray-900 rounded-2xl p-3 shadow-xl border-4 border-gray-800">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="h-64 bg-gradient-to-br from-green-100 to-cyan-100 flex items-center justify-center">
                      <p className="text-gray-600 font-semibold">Voice Agent System</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Build AI Agents Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
                  Build AI & RAG Agents That Actually Work
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-xl text-gray-700">
                      Fully ground your agents in <strong className="text-gray-900">company</strong> and <strong className="text-gray-900">industry knowledge</strong>
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-xl text-gray-700">
                      Automate your <strong className="text-gray-900">customer support</strong>, <strong className="text-gray-900">research</strong>, <strong className="text-gray-900">operations</strong>, and more
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-xl text-gray-700">
                      Implement cutting-edge <strong className="text-gray-900">RAG</strong>, <strong className="text-gray-900">fine-tuning</strong>, and <strong className="text-gray-900">NLQ</strong> techniques for maximum accuracy and performance
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-xl text-gray-700">
                      Use <strong className="text-gray-900">human-in-the-loop</strong> for critical actions
                    </p>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"></div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                  <div className="h-48 bg-gradient-to-br from-green-50 to-cyan-50 rounded-lg"></div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                  <div className="h-48 bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg"></div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                  <div className="h-48 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create AI Apps Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12">
              Create AI Apps Without a Dev Team
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-xl text-gray-700">
                    Package your workflows into <strong className="text-gray-900">web apps without coding</strong>
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-xl text-gray-700">
                    Launch MVPs in days, not months
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-xl text-gray-700">
                    Learn how to deploy your agents and automations both in the <strong className="text-gray-900">cloud</strong> and <strong className="text-gray-900">locally</strong>
                  </p>
                </li>
              </ul>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-xl p-4 shadow-lg">
                  <div className="h-56 bg-gradient-to-br from-slate-50 to-gray-100 rounded-lg"></div>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 shadow-lg">
                  <div className="h-56 bg-gradient-to-br from-gray-800 to-slate-900 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limited Time Offer Section */}
      <section className="py-32 bg-black" id="cta-form">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                <span className="underline decoration-4 decoration-blue-500">Limited Time Offer</span> – Sign up now to lock in<br />
                your price for life
              </h2>
              
              <div className="space-y-6 text-left max-w-3xl mx-auto mb-12">
                <p className="text-xl text-gray-300 leading-relaxed">
                  By joining The AI Automators now, <strong className="text-white">you'll secure your membership at the current price</strong> for as long as you remain an active member.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  As we continue to add more valuable content and features, the price for new members will increase.
                </p>
                <p className="text-xl text-white font-bold">
                  But by acting now, you'll be grandfathered in at today's lower rate.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  This is your chance to get access to a cutting-edge AI automation community at the best possible price.
                </p>
              </div>

              <div className="mb-12">
                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 underline decoration-4 decoration-blue-500">
                  Limited Seats Available
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-4">
                  To maintain the quality of our community and ensure personalized attention, we're placing a limit on the number of members in our community.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  This allows us to provide the best possible experience and <strong className="text-white">support to our members.</strong>
                </p>
              </div>
            </div>

            {/* CTA Form */}
            <Card className="bg-white border-0 shadow-2xl rounded-3xl">
              <CardContent className="p-10">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    Ready to Deploy Your Own AI Voice Agent?
                  </h3>
                  <p className="text-xl text-gray-700">
                    Book a free strategy call to discuss how AI voice agents can transform your business operations.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-900">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="text-lg py-6"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900">
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
                      className="text-lg py-6"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-900">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="text-lg py-6"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-900">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="text-lg py-6"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-900">
                      Tell Us About Your Needs *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your business and how AI voice agents could help..."
                      className="min-h-[120px] text-lg"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-7 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    {isSubmitting ? "Sending..." : "Book Your Free Strategy Call"}
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
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
