"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { webhookService } from "@/services/api/webhooks";

const AssessmentForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    challenge: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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

    if (!formData.challenge || formData.challenge.length < 10) {
      toast({
        title: "Validation Error",
        description: "Please describe your challenge (at least 10 characters)",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await webhookService.submitContactForm({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: "",
        message: formData.challenge,
        source: 'homepage-assessment-form'
      });

      if (response.data || response.status === 200) {
        toast({
          title: "Success!",
          description: "Thanks! We'll send your custom analysis within 48 hours.",
        });
        setFormData({ name: "", email: "", company: "", challenge: "" });
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

  const inputClass =
    "w-full rounded-xl border border-[#E3E8EE] bg-white px-4 py-3.5 text-base text-[#0A2540] placeholder:text-[#9AA5B1] transition-all focus:border-[#4F7CFF] focus:ring-4 focus:ring-[#4F7CFF]/10";

  return (
    <section className="bg-white py-12 md:py-24" id="assessment-form">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          {/* Card on a soft pastel wash */}
          <div className="relative overflow-hidden rounded-[2rem] border border-[#E6E6E6] bg-[radial-gradient(125%_120%_at_50%_0%,#FFE7D6_0%,#FFF1F6_38%,#FFFFFF_72%)] p-6 shadow-[0_30px_70px_-32px_rgba(20,20,40,0.3)] md:p-10">
            {/* Eyebrow + heading */}
            <div className="mb-8 text-center md:mb-10">
              <span className="mb-3 block text-sm font-semibold text-[#4F7CFF]">
                Free assessment
              </span>
              <h2 className="text-2xl tracking-tight text-[#0A2540] md:text-[2.25rem] md:leading-[1.1]">
                Get a personalized automation assessment
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#425466]">
                Tell us about your biggest operational challenge. We'll send a
                custom analysis within 48 hours.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email side by side on larger screens */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#0A2540]">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#0A2540]">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Company Field */}
              <div>
                <label htmlFor="company" className="mb-2 block text-sm font-semibold text-[#0A2540]">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company"
                  className={inputClass}
                />
              </div>

              {/* Challenge Field */}
              <div>
                <label htmlFor="challenge" className="mb-2 block text-sm font-semibold text-[#0A2540]">
                  Challenge *
                </label>
                <Textarea
                  id="challenge"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  placeholder="Briefly, what is the primary operational challenge you're hoping to solve?"
                  rows={5}
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-[#4F7CFF] px-6 py-3.5 text-base font-semibold text-white shadow-[0_0_20px_rgba(79,124,255,0.4)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#4F7CFF] hover:shadow-[0_0_30px_rgba(79,124,255,0.6)] md:py-5 md:text-lg"
                >
                  {isSubmitting ? "Sending..." : "Get Your Assessment"}{" "}
                  <ArrowRight className="ml-2 inline h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentForm;
