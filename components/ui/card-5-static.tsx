"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const colorThemes = {
  default: { from: "142 76% 46%", to: "160 60% 48%", foreground: "0 0% 100%" },
  blue: { from: "217 91% 60%", to: "221 83% 53%", foreground: "0 0% 100%" },
  violet: { from: "262 83% 58%", to: "262 70% 50%", foreground: "0 0% 100%" },
  orange: { from: "24 94% 52%", to: "35 92% 60%", foreground: "0 0% 100%" },
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
  showCornerIcon?: boolean;
}

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
      showCornerIcon = true,
    },
    ref,
  ) => {
    const theme = colorThemes[color] ?? colorThemes.default;

    return (
      <div
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
      >
        {showCornerIcon ? (
          <div className="absolute right-6 top-0 h-16 w-12 bg-white/95 backdrop-blur-sm [clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_50%_75%,_0%_100%)] dark:bg-zinc-800/80">
            <div className="absolute inset-0 flex items-center justify-center" style={{ color: "var(--card-from-color)" }}>
              {icon}
            </div>
          </div>
        ) : null}

        <div className="flex h-full flex-col justify-between">
          <div>
            <h3 className={cn("text-2xl font-bold tracking-tight", titleClassName)}>{title}</h3>
            <p className={cn("mt-1 max-w-[80%] text-sm opacity-90", descriptionClassName)}>{description}</p>
          </div>

          {!hideDivider && <div className="my-4 h-px w-full bg-white/20" />}

          {!hideFooter && (
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold tracking-tighter">{metricValue}</p>
                <p className="text-sm opacity-90">{metricLabel}</p>
              </div>
              <button
                onClick={onButtonClick}
                className="rounded-full bg-white/30 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label={buttonText}
              >
                {buttonText}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  },
);

HighlightCard.displayName = "HighlightCardStatic";
