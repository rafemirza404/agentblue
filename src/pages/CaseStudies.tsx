import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Clock, 
  Users, 
  DollarSign,
  ArrowRight,
  Quote,
  Building2,
  ShoppingCart,
  Stethoscope,
  Briefcase
} from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      company: "TechCorp Solutions",
      industry: "Technology",
      icon: <Building2 className="w-6 h-6" />,
      challenge: "Manual customer support processes leading to 24-hour response times and customer dissatisfaction.",
      solution: "Implemented AI chatbot with natural language processing for instant customer support and automated ticket routing.",
      results: [
        { metric: "Response Time", value: "< 1 minute", improvement: "95% faster" },
        { metric: "Customer Satisfaction", value: "94%", improvement: "+40%" },
        { metric: "Support Costs", value: "$45K saved", improvement: "60% reduction" }
      ],
      testimonial: "AgentBlue transformed our customer support completely. We now provide instant, accurate responses 24/7, and our customers love it.",
      author: "Sarah Johnson, CTO",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
    },
    {
      company: "RetailMax",
      industry: "E-commerce", 
      icon: <ShoppingCart className="w-6 h-6" />,
      challenge: "Inventory management chaos with frequent stockouts and overstock situations affecting profitability.",
      solution: "Deployed predictive analytics system for demand forecasting and automated inventory optimization.",
      results: [
        { metric: "Stockouts Reduced", value: "85%", improvement: "Better availability" },
        { metric: "Inventory Costs", value: "$2.1M saved", improvement: "30% reduction" },
        { metric: "Sales Increase", value: "22%", improvement: "Better stock levels" }
      ],
      testimonial: "The AI system predicts our inventory needs with incredible accuracy. We've eliminated most stockouts while reducing excess inventory.",
      author: "Mike Chen, Operations Director",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    },
    {
      company: "HealthFirst Clinic",
      industry: "Healthcare",
      icon: <Stethoscope className="w-6 h-6" />,
      challenge: "Administrative burden with appointment scheduling, patient communications, and follow-up processes.",
      solution: "Automated appointment scheduling system with AI-powered patient communication and reminder system.",
      results: [
        { metric: "Admin Time Saved", value: "35 hours/week", improvement: "Staff efficiency" },
        { metric: "No-show Rate", value: "12%", improvement: "65% reduction" },
        { metric: "Patient Satisfaction", value: "96%", improvement: "+28%" }
      ],
      testimonial: "Our staff can now focus on patient care instead of administrative tasks. The automated system handles everything seamlessly.",
      author: "Dr. Amanda Rodriguez, Practice Manager",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop"
    },
    {
      company: "FinanceFlow",
      industry: "Financial Services",
      icon: <Briefcase className="w-6 h-6" />,
      challenge: "Manual document processing for loan applications taking weeks and causing customer frustration.",
      solution: "AI document processing system for automatic data extraction, verification, and approval workflows.",
      results: [
        { metric: "Processing Time", value: "2 days", improvement: "90% faster" },
        { metric: "Accuracy Rate", value: "99.2%", improvement: "+15%" },
        { metric: "Customer Approval", value: "89%", improvement: "Faster decisions" }
      ],
      testimonial: "What used to take weeks now takes days. Our customers get loan decisions faster, and our team is more productive than ever.",
      author: "Robert Kim, VP Operations", 
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
    }
  ];

  const metrics = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "40%",
      label: "Average Revenue Increase",
      description: "Across all client implementations"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: "65%", 
      label: "Time Savings",
      description: "On repetitive tasks and processes"
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "500+",
      label: "Projects Completed",
      description: "For companies worldwide"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      value: "$50M+",
      label: "Client Savings Generated",
      description: "Through automation solutions"
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
              <Badge variant="outline" className="mb-6">Case Studies</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Real Results from
                <br />Real Businesses
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover how companies across industries have transformed their operations 
                and achieved remarkable growth with our AI automation solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {metrics.map((metric, index) => (
                  <Card key={index} className="border-0 bg-background/50 backdrop-blur-sm text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                        {metric.icon}
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                      <div className="text-lg font-semibold mb-1">{metric.label}</div>
                      <p className="text-muted-foreground text-sm">{metric.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  See how our AI automation solutions have delivered transformative results for businesses like yours.
                </p>
              </div>
              
              <div className="space-y-16">
                {caseStudies.map((study, index) => (
                  <Card key={index} className="border-0 bg-background/80 backdrop-blur-sm overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="relative h-64 lg:h-auto">
                        <img 
                          src={study.image} 
                          alt={study.company}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-accent/20"></div>
                      </div>
                      
                      <div className="p-8 lg:p-12">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center text-white">
                            {study.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{study.company}</h3>
                            <Badge variant="secondary">{study.industry}</Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-4 mb-6">
                          <div>
                            <h4 className="font-semibold text-destructive mb-2">Challenge</h4>
                            <p className="text-muted-foreground text-sm">{study.challenge}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-primary mb-2">Solution</h4>
                            <p className="text-muted-foreground text-sm">{study.solution}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {study.results.map((result, idx) => (
                            <div key={idx} className="text-center p-3 bg-secondary/50 rounded-lg">
                              <div className="text-lg font-bold text-primary">{result.value}</div>
                              <div className="text-xs text-muted-foreground">{result.metric}</div>
                              <div className="text-xs text-green-600 mt-1">{result.improvement}</div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-secondary/50 p-4 rounded-lg">
                          <Quote className="w-6 h-6 text-primary mb-2" />
                          <p className="text-sm italic mb-3">"{study.testimonial}"</p>
                          <p className="text-xs font-medium">— {study.author}</p>
                        </div>
                      </div>
                    </div>
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
                Ready to Write Your Success Story?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join hundreds of companies that have transformed their operations with AI automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                  Start Your Transformation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Schedule Consultation
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

export default CaseStudies;