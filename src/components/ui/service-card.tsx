import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

// Brand-adapted card variants (navy / blue / light).
const cardVariants = cva(
  "relative flex flex-col justify-between w-full p-6 overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 ease-in-out group hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-white text-[#0A2540] border border-[#E6E6E6]",
        navy: "bg-[#0A2540] text-white",
        blue: "bg-[#4F7CFF] text-white",
        light: "bg-[#EEF4FF] text-[#0A2540]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ServiceCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, variant, title, href, imgSrc, imgAlt, ...props }, ref) => {
    const cardAnimation = {
      hover: { scale: 1.02, transition: { duration: 0.3 } },
    };

    const imageAnimation = {
      hover: {
        scale: 1.1,
        rotate: 3,
        x: 10,
        transition: { duration: 0.4, ease: "easeInOut" },
      },
    };

    const arrowAnimation = {
      hover: {
        x: 5,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse" as const,
        },
      },
    };

    return (
      <motion.div
        className={cn(cardVariants({ variant, className }))}
        ref={ref}
        variants={cardAnimation}
        whileHover="hover"
        {...props}
      >
        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-2xl tracking-tight">{title}</h3>
          <a
            href={href}
            aria-label={`Learn more about ${title}`}
            className="mt-auto flex items-center text-sm font-semibold group-hover:underline"
          >
            LEARN MORE
            <motion.div variants={arrowAnimation}>
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </a>
        </div>

        <motion.img
          src={imgSrc}
          alt={imgAlt}
          loading="lazy"
          className="absolute -right-8 -bottom-8 w-40 h-40 object-contain opacity-90 group-hover:opacity-100"
          variants={imageAnimation}
        />
      </motion.div>
    );
  }
);
ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
