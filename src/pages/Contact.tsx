import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Mail, Phone, MessageCircle, Globe, Clock, Zap } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                Ready to Fix Operations the Right Way?
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Schedule your free 30-minute diagnostic call and discover what's really holding your business back—no sales pitch, just strategic guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section id="contact-methods" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Choose Your Preferred Way to Connect</h2>
                <p className="text-xl text-muted-foreground">We're a remote-first consultancy serving clients globally</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-accent bg-accent/5">
                  <CardHeader>
                    <Badge className="w-fit mb-2">Most Popular</Badge>
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4 text-white">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl">Schedule Free Consultation</CardTitle>
                    <p className="text-muted-foreground">Book a 30-minute diagnostic call with our strategists</p>
                  </CardHeader>
                  <CardContent>
                    <Button size="lg" className="w-full bg-accent hover:bg-accent/90 mb-2">Book Free Call</Button>
                    <p className="text-sm text-muted-foreground text-center">No sales pitch—just operational insights</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 text-accent">
                      <Mail className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl">Email</CardTitle>
                    <p className="text-muted-foreground">Get detailed responses to your questions</p>
                  </CardHeader>
                  <CardContent>
                    <a href="mailto:sophia@supportagentblue.in">
                      <Button variant="outline" size="lg" className="w-full mb-2">sophia@supportagentblue.in</Button>
                    </a>
                    <p className="text-sm text-muted-foreground text-center">Response within 48 hours</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 text-accent">
                      <Phone className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl">Phone</CardTitle>
                    <p className="text-muted-foreground">Speak directly with our team</p>
                  </CardHeader>
                  <CardContent>
                    <a href="tel:+919934017786">
                      <Button variant="outline" size="lg" className="w-full mb-2">+91 99340 17786</Button>
                    </a>
                    <p className="text-sm text-muted-foreground text-center">Mon-Fri, 9AM-6PM EST</p>
                  </CardContent>
                </Card>

                <Card className="opacity-60">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">Coming Soon</Badge>
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl">Live Chat</CardTitle>
                    <p className="text-muted-foreground">AI-powered instant responses</p>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="lg" className="w-full mb-2" disabled>24/7 automated support</Button>
                    <p className="text-sm text-muted-foreground text-center">Launching soon</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl">Send Us a Message</CardTitle>
                      <p className="text-muted-foreground">Tell us about your operational challenges and we'll get back to you within 48 hours.</p>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input id="firstName" placeholder="John" />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input id="lastName" placeholder="Doe" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" type="email" placeholder="john@company.com" />
                        </div>
                        <div>
                          <Label htmlFor="company">Company *</Label>
                          <Input id="company" placeholder="Your Company Name" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone (optional)</Label>
                          <Input id="phone" placeholder="+1 (555) 123-4567" />
                        </div>
                        <div>
                          <Label htmlFor="details">Project Details *</Label>
                          <Textarea id="details" placeholder="Tell us about your operational challenges..." className="min-h-[120px]" />
                        </div>
                        <Button size="lg" className="w-full">Send Message</Button>
                        <p className="text-xs text-muted-foreground text-center">✓ No spam. We respect your privacy.</p>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Our Approach</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-accent mt-1" />
                        <div>
                          <p className="font-medium">Remote-First Consultancy</p>
                          <p className="text-sm text-muted-foreground">Serving clients globally via remote consultation</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-accent mt-1" />
                        <div>
                          <p className="font-medium">Availability</p>
                          <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
                          <p className="text-sm text-muted-foreground">Sat: Limited | Sun: Closed</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 text-accent mt-1" />
                        <div>
                          <p className="font-medium">Response within 48 hours</p>
                          <p className="text-sm text-muted-foreground">We'll review your inquiry and get back quickly</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Prefer to Schedule Directly?</h2>
            <p className="text-xl mb-8 opacity-90">Book your free 30-minute consultation now</p>
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">Schedule Free Call</Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
