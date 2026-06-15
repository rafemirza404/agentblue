import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
  // Pause the WebGL render loop whenever the hero is scrolled out of view —
  // this is the main perf win, since the shader otherwise renders forever.
  const [inView, setInView] = useState(true);
  // Also pause while a global overlay (chatbot / voice modal) is open, so the
  // shader doesn't fight the overlay for the GPU/main thread and make it open
  // janky while the user is still in the hero.
  const [overlayOpen, setOverlayOpen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  // Cap pixel ratio so the shader doesn't render at 2x/3x on retina screens.
  const dpr =
    typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;

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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      // Negative bottom margin shrinks the "in view" zone so the shader stops
      // rendering once most of the hero has scrolled past the top — instead of
      // only when it's 100% gone. This keeps scroll light through the hero and
      // the section right below it, where the WebGL loop was still running.
      { threshold: 0, rootMargin: "0px 0px -55% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Listen for global overlay open/close events (dispatched by the chatbot and
  // voice-call widgets) and freeze the shader while one is open.
  useEffect(() => {
    const onOpen = () => setOverlayOpen(true);
    const onClose = () => setOverlayOpen(false);
    window.addEventListener("overlay:open", onOpen);
    window.addEventListener("overlay:close", onClose);
    return () => {
      window.removeEventListener("overlay:open", onOpen);
      window.removeEventListener("overlay:close", onClose);
    };
  }, []);

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: mounted ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full overflow-hidden bg-background flex items-center justify-center py-20 sm:py-24 md:py-32 ${className}`}
    >
      <div className="absolute inset-0 w-full h-full transform-gpu [contain:strict]">
        {mounted && (
          <>
            <MeshGradient
              width={Math.round(dimensions.width * dpr)}
              height={Math.round(dimensions.height * dpr)}
              colors={colors}
              distortion={distortion}
              swirl={swirl}
              grainMixer={0}
              grainOverlay={0}
              speed={inView && !overlayOpen ? speed : 0}
              offsetX={offsetX}
              style={{ width: "100%", height: "100%" }}
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
