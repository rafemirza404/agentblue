import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Workflow, 
  BarChart3, 
  MessageSquare, 
  FileText, 
  Shield,
  Clock,
  Users,
  TrendingUp,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Chatbots & Virtual Assistants",
      description: "Intelligent conversational AI that handles customer service, lead qualification, and support 24/7.",
      features: ["Natural Language Processing", "Multi-channel Integration", "Custom Training", "Analytics Dashboard"],
      pricing: "From $299/month"
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      title: "Process Automation",
      description: "Streamline repetitive tasks and workflows with intelligent automation solutions.",
      features: ["Workflow Design", "API Integrations", "Task Automation", "Performance Monitoring"],
      pricing: "From $499/month"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Predictive Analytics",
      description: "Harness AI to forecast trends, predict customer behavior, and make data-driven decisions.",
      features: ["Machine Learning Models", "Real-time Analytics", "Custom Dashboards", "Predictive Insights"],
      pricing: "From $799/month"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Document Processing",
      description: "Automate document analysis, data extraction, and content generation with AI.",
      features: ["OCR Technology", "Data Extraction", "Content Generation", "Document Classification"],
      pricing: "From $399/month"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Customer Communication",
      description: "AI-powered email marketing, social media management, and customer engagement.",
      features: ["Email Automation", "Social Media AI", "Personalization", "Engagement Analytics"],
      pricing: "From $249/month"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "AI Security & Monitoring",
      description: "Protect your business with AI-driven threat detection and automated security responses.",
      features: ["Threat Detection", "Automated Responses", "Security Analytics", "Compliance Monitoring"],
      pricing: "From $699/month"
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Save 40+ Hours Weekly",
      description: "Automate repetitive tasks and focus on strategic initiatives."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Increase Revenue by 30%",
      description: "Optimize processes and improve customer experiences."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Scale Without Limits",
      description: "Handle increased workload without proportional staff increases."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Faster Decision Making",
      description: "Get real-time insights and predictive analytics for better decisions."
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "We analyze your current processes and identify automation opportunities."
    },
    {
      step: "02", 
      title: "Strategy & Planning",
      description: "Develop a customized AI automation roadmap aligned with your goals."
    },
    {
      step: "03",
      title: "Implementation",
      description: "Build and deploy your AI solutions with minimal disruption to operations."
    },
    {
      step: "04",
      title: "Training & Support",
      description: "Comprehensive training and ongoing support to ensure maximum ROI."
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
              <Badge variant="outline" className="mb-6">Our Services</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                AI Solutions That Drive
                <br />Real Business Results
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                From intelligent chatbots to predictive analytics, we deliver AI automation 
                solutions that transform how you work and accelerate your growth.
              </p>
              <Button variant="hero" size="lg">
                Get Your Free Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AI Automation?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our AI solutions deliver measurable results that transform your business operations.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="border-0 bg-background/50 backdrop-blur-sm text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                        {benefit.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI Services</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive AI solutions tailored to your specific business needs and objectives.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <Card key={index} className="border-0 bg-background/80 backdrop-blur-sm hover:shadow-elegant transition-all duration-300">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mb-4 text-white">
                        {service.icon}
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-primary">{service.pricing}</span>
                        <Button variant="outline" size="sm">
                          Learn More <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Implementation Process</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  A proven methodology that ensures successful AI implementation with minimal disruption.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {process.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
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
                Ready to Automate Your Business?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Schedule a free consultation to discover how AI automation can transform your operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                  Get Free Consultation
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  View Case Studies
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;