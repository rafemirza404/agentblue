import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      title: "CEO, TechFlow Solutions",
      avatar: "SC",
      content: "AgentBlue transformed our customer service. We went from 24-hour response times to instant AI-powered support that handles 85% of inquiries automatically.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      title: "Operations Director, Scale Dynamics",
      avatar: "MR", 
      content: "The workflow automation saved us 40 hours per week. What used to take our team days now happens automatically with perfect accuracy.",
      rating: 5,
    },
    {
      name: "Emily Parker",
      title: "Marketing Lead, Growth Co",
      avatar: "EP",
      content: "Our lead qualification process is now completely automated. We're converting 3x more prospects with personalized AI interactions.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "500%", label: "Average ROI Increase" },
    { number: "40hrs", label: "Weekly Time Saved" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "30min", label: "Implementation Start" },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Proven Results That Speak
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Don't just take our word for it. See the measurable impact of AI automation.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            What Our Clients Say
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <Quote className="w-8 h-8 text-accent mb-4 opacity-60" />
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center">
          <p className="text-muted-foreground mb-2">Join 100+ companies already automating with AgentBlue</p>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-foreground font-semibold ml-2">5.0 out of 5</span>
            <span className="text-muted-foreground ml-1">(127 reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;