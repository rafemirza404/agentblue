import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/rafe.png";

const NewHero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Column - Text Content (60%) */}
          <div className="lg:col-span-3 space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight">
              Stop automating without strategy. Start fixing what's actually broken.
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              We diagnose your operations, design the blueprint, and show you exactly what to automate—before you waste another dollar on tools that don't solve real problems.
            </p>

            <div className="space-y-4">
              <Button
                onClick={() => navigate('/watch-demo')}
                className="bg-[#4F7CFF] hover:bg-[#4F7CFF] text-white text-lg font-semibold px-8 py-7 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(79,124,255,0.4)] hover:shadow-[0_0_40px_rgba(79,124,255,0.6)]"
              >
                Talk to Sophia <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Button>

              <p className="text-sm text-gray-600">
                2-minute AI consultation. See how our voice agent handles real conversations.
              </p>
            </div>
          </div>

          {/* Right Column - Professional Image (40%) */}
          <div className="lg:col-span-2">
            <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl shadow-lg overflow-hidden">
              <img
                src={heroImage}
                alt="Rafe Mirza - AgentBlue Founder"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHero;
