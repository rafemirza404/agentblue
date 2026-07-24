import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroGradient from "@/assets/hero-gradient.webp";

interface HeroSectionProps {
  title?: string;
  highlightText?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  /** Kept for API compatibility; no longer used (gradient is now a static image). */
  colors?: string[];
  distortion?: number;
  swirl?: number;
  speed?: number;
  offsetX?: number;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
  maxWidth?: string;
  veilOpacity?: string;
  fontFamily?: string;
  fontWeight?: number;
  children?: React.ReactNode;
}

export function HeroSection({
  title = "Intelligent AI Agents for",
  highlightText = "Smart Brands",
  description = "Transform your brand and evolve it through AI-driven brand guidelines and always up-to-date core components.",
  buttonText = "Join Waitlist",
  onButtonClick,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  maxWidth = "max-w-6xl",
  veilOpacity = "bg-white/20 dark:bg-black/25",
  fontFamily = "'Libre Caslon Condensed', serif",
  fontWeight = 600,
  children,
}: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: mounted ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full overflow-hidden bg-background flex items-center justify-center py-20 sm:py-24 md:py-32 ${className}`}
    >
      <div className="absolute inset-0 w-full h-full">
        {/* Static snapshot of the original mesh-gradient shader. Swapped in for
            the live WebGL render loop, which was the main source of site-wide
            scroll/animation jank. Pure CSS/image = effectively free to paint. */}
        <img
          src={heroGradient}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className={`absolute inset-0 pointer-events-none ${veilOpacity}`} />
        {/* bottom fade so the gradient melts smoothly into the next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className={`relative z-10 ${maxWidth} mx-auto px-6 w-full`}>
        <div className="text-center">
          {/* Not an <h1> so the global Libre Caslon heading rule doesn't
              override the hero's Inter font. */}
          <div
            role="heading"
            aria-level={1}
            className={`mx-auto max-w-3xl text-balance text-[2rem] sm:text-4xl md:text-6xl leading-[1.08] md:leading-[1.05] mb-6 ${titleClassName}`}
            style={{ fontFamily, fontWeight }}
          >
            {title} {highlightText}
          </div>
          <p
            className={`text-lg sm:text-xl text-pretty max-w-2xl mx-auto leading-relaxed mb-10 px-4 ${descriptionClassName}`}
            style={{ fontFamily }}
          >
            {description}
          </p>
          {children ? (
            children
          ) : (
            <button
              onClick={handleButtonClick}
              className={`px-6 py-4 sm:px-8 sm:py-6 rounded-full bg-[#4F7CFF] text-sm sm:text-base text-white font-semibold shadow-[0_8px_24px_-8px_rgba(79,124,255,0.6)] hover:bg-[#3F6BF0] transition-colors ${buttonClassName}`}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </motion.section>
  );
}
