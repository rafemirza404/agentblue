import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Calendar, Mail, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact-form-section" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ready to Automate Your Success?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how AI automation can transform your business. 
            Get started with a free consultation today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Options */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  Book a Call
                </CardTitle>
                <CardDescription>
                  Schedule a 30-minute strategy session to discuss your automation needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="accent" className="w-full">
                  Schedule Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  Email Us
                </CardTitle>
                <CardDescription>
                  Send us your project details and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a href="mailto:sophia@supportagentblue.in">
                  <Button variant="outline" className="w-full">
                    sophia@supportagentblue.in
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  Live Chat
                </CardTitle>
                <CardDescription>
                  Chat with our AI specialist for instant answers to your questions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Start Chat
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl">Get Your Free Automation Assessment</CardTitle>
                <CardDescription className="text-base">
                  Tell us about your current processes and we'll identify the best automation opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </label>
                  <Input id="email" type="email" placeholder="john@company.com" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company Name
                  </label>
                  <Input id="company" placeholder="Your Company" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Tell us about your automation needs *
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Describe your current processes, pain points, and what you'd like to automate..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  Get Free Assessment
                  <ArrowRight className="w-5 h-5" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to receive communications from AgentBlue. 
                  We respect your privacy and will never share your information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;