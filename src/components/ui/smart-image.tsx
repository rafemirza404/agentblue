import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * SmartImage — a drop-in <img> replacement with performance-safe defaults.
 *
 * Why use this instead of a raw <img>:
 *  - `loading="lazy"` + `decoding="async"` by default, so off-screen images
 *    never block scroll or first paint.
 *  - Encourages passing `width`/`height` (or an `aspectRatio`) so the browser
 *    reserves space and you don't get layout shift / scroll jank when the
 *    real image loads. This is the #1 cause of "the site lags once I add
 *    photos."
 *
 * For an above-the-fold hero/LCP image, pass `priority` so it loads eagerly.
 */
export interface SmartImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Load eagerly (use for the single largest above-the-fold image). */
  priority?: boolean;
  /** CSS aspect-ratio (e.g. "16/9") to reserve space without fixed px size. */
  aspectRatio?: string;
}

export const SmartImage = forwardRef<HTMLImageElement, SmartImageProps>(
  ({ priority = false, aspectRatio, className, style, alt = "", ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetchpriority={priority ? "high" : "auto" as any}
        decoding="async"
        className={cn(className)}
        style={aspectRatio ? { aspectRatio, ...style } : style}
        {...props}
      />
    );
  }
);

SmartImage.displayName = "SmartImage";

export default SmartImage;
