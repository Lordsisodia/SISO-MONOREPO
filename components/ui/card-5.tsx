"use client";

import { forwardRef, useEffect, useState } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const colorThemes = {
  default: {
    from: "142 76% 46%",
    to: "160 60% 48%",
    foreground: "0 0% 100%",
  },
  blue: {
    from: "217 91% 60%",
    to: "221 83% 53%",
    foreground: "0 0% 100%",
  },
  violet: {
    from: "262 83% 58%",
    to: "262 70% 50%",
    foreground: "0 0% 100%",
  },
  orange: {
    from: "24 94% 52%",
    to: "35 92% 60%",
    foreground: "0 0% 100%",
  },
};

export interface HighlightCardProps {
  title: string;
  description: string;
  metricValue: string;
  metricLabel: string;
  buttonText: string;
  onButtonClick: () => void;
  icon: React.ReactNode;
  color?: keyof typeof colorThemes;
  className?: string;
  hideDivider?: boolean;
  hideFooter?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const HighlightCard = forwardRef<HTMLDivElement, HighlightCardProps>(
  (
    {
      title,
      description,
      metricValue,
      metricLabel,
      buttonText,
      onButtonClick,
      icon,
      color = "default",
      className,
      hideDivider,
      hideFooter,
      titleClassName,
      descriptionClassName,
    },
    ref,
  ) => {
    const theme = colorThemes[color] ?? colorThemes.default;
    const prefersReducedMotion = useReducedMotion();
    const [idle, setIdle] = useState(false);
    useEffect(() => {
      const idler = ("requestIdleCallback" in window)
        ? (window as any).requestIdleCallback
        : (cb: any) => setTimeout(cb, 200);
      const handle = idler(() => setIdle(true));
      return () => ("cancelIdleCallback" in window) ? (window as any).cancelIdleCallback?.(handle) : clearTimeout(handle as any);
    }, []);
    const shouldAnimate = idle && !prefersReducedMotion;

    return (
      <motion.div
        ref={ref}
        className={cn("relative w-full max-w-md overflow-hidden rounded-2xl p-6 shadow-lg", className)}
        style={{
          ["--card-from-color" as const]: `hsl(${theme.from})`,
          ["--card-to-color" as const]: `hsl(${theme.to})`,
          ["--card-foreground-color" as const]: `hsl(${theme.foreground})`,
          color: "var(--card-foreground-color)",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsla(0,0%,100%,0.15) 1px, transparent 0)," +
            "linear-gradient(to bottom right, var(--card-from-color), var(--card-to-color))",
          backgroundSize: "0.5rem 0.5rem, 100% 100%",
        }}
        variants={shouldAnimate ? cardVariants : undefined}
        initial={shouldAnimate ? "hidden" : false}
        animate={shouldAnimate ? "visible" : undefined}
      >
        <div className="absolute right-6 top-0 h-16 w-12 bg-white/95 backdrop-blur-sm [clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_50%_75%,_0%_100%)] dark:bg-zinc-800/80">
          <div className="absolute inset-0 flex items-center justify-center" style={{ color: "var(--card-from-color)" }}>
            {icon}
          </div>
        </div>

        <div className="flex h-full flex-col justify-between">
          <div>
            <motion.h3
              variants={shouldAnimate ? itemVariants : undefined}
              className={cn("text-2xl font-bold tracking-tight", titleClassName)}
            >
              {title}
            </motion.h3>
            <motion.p
              variants={shouldAnimate ? itemVariants : undefined}
              className={cn("mt-1 max-w-[80%] text-sm opacity-90", descriptionClassName)}
            >
              {description}
            </motion.p>
          </div>

          {!hideDivider && (
            <motion.div variants={shouldAnimate ? itemVariants : undefined} className="my-4 h-px w-full bg-white/20" />
          )}

          {!hideFooter && (
            <div className="flex items-end justify-between">
              <motion.div variants={shouldAnimate ? itemVariants : undefined}>
                <p className="text-4xl font-bold tracking-tighter">{metricValue}</p>
                <p className="text-sm opacity-90">{metricLabel}</p>
              </motion.div>
              <motion.button
                variants={shouldAnimate ? itemVariants : undefined}
                onClick={onButtonClick}
                className="rounded-full bg-white/30 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label={buttonText}
              >
                {buttonText}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    );
  },
);

HighlightCard.displayName = "HighlightCard";
