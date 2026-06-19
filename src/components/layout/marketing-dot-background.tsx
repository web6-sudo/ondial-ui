import { cn } from "@/lib/utils";

import styles from "./marketing-dot-background.module.css";

type MarketingDotBackgroundProps = {
  className?: string;
  /** Dot grid step in px. Default 14. */
  size?: number;
  /** Dot opacity via text color alpha. Default foreground/10. */
  dotClassName?: string;
  /** Slow drifting dot grid animation. Respects prefers-reduced-motion. */
  animated?: boolean;
  /** Second parallax layer for depth when animated. */
  layered?: boolean;
};

/** Full-bleed radial dot grid with soft edge fade — matches industry/blog pattern. */
export function MarketingDotBackground({
  className,
  size = 14,
  dotClassName = "text-foreground/10",
  animated = false,
  layered = false,
}: MarketingDotBackgroundProps) {
  const style = { ["--dot-size" as string]: `${size}px` };

  return (
    <>
      <div
        aria-hidden
        className={cn(
          styles.dotGrid,
          animated && styles.dotGridAnimated,
          !animated && "-z-10",
          dotClassName,
          className,
        )}
        style={style}
      />
      {animated && layered ? (
        <div
          aria-hidden
          className={cn(
            styles.dotGrid,
            styles.dotGridAnimatedSecondary,
            dotClassName,
            className,
          )}
          style={style}
        />
      ) : null}
    </>
  );
}
