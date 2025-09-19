import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  MessageCircle,
  Send,
  Clock,
  CheckCircle
} from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      description: "Speak directly with our AI experts",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      description: "Get detailed responses to your questions",
      contact: "hello@agentblue.com",
      availability: "Response within 24 hours"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Instant support for quick questions",
      contact: "Available on our website",
      availability: "Mon-Fri, 8AM-8PM EST"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Schedule Meeting",
      description: "Book a personalized consultation",
      contact: "Free 30-minute consultation",
      availability: "Flexible scheduling available"
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Innovation Drive, Suite 400",
      phone: "+1 (555) 123-4567",
      email: "sf@agentblue.com"
    },
    {
      city: "New York",
      address: "456 Tech Avenue, Floor 15",
      phone: "+1 (555) 234-5678", 
      email: "ny@agentblue.com"
    },
    {
      city: "Austin",
      address: "789 Startup Boulevard, Building C",
      phone: "+1 (555) 345-6789",
      email: "austin@agentblue.com"
    }
  ];

  const faqs = [
    {
      question: "How long does AI implementation typically take?",
      answer: "Implementation timeframes vary based on complexity, but most projects are completed within 4-12 weeks. We provide detailed timelines during the consultation phase."
    },
    {
      question: "Do you provide training for our team?", 
      answer: "Absolutely! We include comprehensive training and documentation with every implementation, plus ongoing support to ensure your team maximizes the benefits."
    },
    {
      question: "Can you integrate with our existing systems?",
      answer: "Yes, we specialize in seamless integrations with popular business tools like CRM systems, databases, and productivity platforms."
    },
    {
      question: "What kind of ROI can we expect?",
      answer: "Most clients see 3-5x ROI within the first year through time savings, cost reductions, and improved efficiency. We provide detailed ROI projections during consultation."
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
              <Badge variant="outline" className="mb-6">Contact Us</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Let's Transform Your
                <br />Business Together
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Ready to automate your processes and unlock new growth? Get in touch with our 
                AI experts to discuss your specific needs and discover the possibilities.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Choose the method that works best for you. We're here to help and respond quickly.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="border-0 bg-background/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                        {method.icon}
                      </div>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{method.description}</p>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="font-medium mb-2">{method.contact}</p>
                      <p className="text-xs text-muted-foreground">{method.availability}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <Card className="border-0 bg-background/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                    <p className="text-muted-foreground">
                      Tell us about your project and we'll get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@company.com" />
                      </div>
                      
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Your Company Name" />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input id="phone" placeholder="+1 (555) 123-4567" />
                      </div>
                      
                      <div>
                        <Label htmlFor="project">Project Details</Label>
                        <Textarea 
                          id="project" 
                          placeholder="Tell us about your automation needs, current challenges, and goals..."
                          className="min-h-[120px]"
                        />
                      </div>
                      
                      <Button className="w-full" size="lg">
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Office Locations & Info */}
                <div className="space-y-8">
                  <Card className="border-0 bg-background/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Our Offices
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {offices.map((office, index) => (
                          <div key={index} className="border-l-4 border-primary pl-4">
                            <h4 className="font-semibold text-lg">{office.city}</h4>
                            <p className="text-muted-foreground text-sm mb-2">{office.address}</p>
                            <div className="space-y-1 text-sm">
                              <p className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                {office.phone}
                              </p>
                              <p className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {office.email}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-background/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Business Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span>9:00 AM - 6:00 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span>10:00 AM - 2:00 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span>Emergency Support Only</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-muted-foreground">
                  Quick answers to common questions about our AI automation services.
                </p>
              </div>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-0 bg-background/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground text-sm">{faq.answer}</p>
                        </div>
                      </div>
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
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Schedule your free consultation today and discover how AI can transform your business.
              </p>
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                Book Free Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;