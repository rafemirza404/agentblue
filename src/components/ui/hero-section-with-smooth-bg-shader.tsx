import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  title?: string;
  highlightText?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
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
  // AgentBlue brand: blues + soft warm peach accent
  colors = ["#4F7CFF", "#6E97FF", "#B5D0FF", "#FFD8C2", "#EEF4FF", "#FFFFFF"],
  distortion = 0.8,
  swirl = 0.6,
  speed = 0.42,
  offsetX = 0.08,
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
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <section
      className={`relative w-full overflow-hidden bg-background flex items-center justify-center py-28 md:py-32 ${className}`}
    >
      <div className="absolute inset-0 w-full h-full">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={colors}
              distortion={distortion}
              swirl={swirl}
              grainMixer={0}
              grainOverlay={0}
              speed={speed}
              offsetX={offsetX}
            />
            <div className={`absolute inset-0 pointer-events-none ${veilOpacity}`} />
          </>
        )}
        {/* bottom fade so the gradient melts smoothly into the next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className={`relative z-10 ${maxWidth} mx-auto px-6 w-full`}>
        <div className="text-center">
          {/* Not an <h1> so the global Libre Caslon heading rule doesn't
              override the hero's Helvetica Neue font. */}
          <div
            role="heading"
            aria-level={1}
            className={`text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] leading-[1.1] mb-6 ${titleClassName}`}
            style={{ fontFamily, fontWeight }}
          >
            {title} <span className="block">{highlightText}</span>
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
    </section>
  );
}
