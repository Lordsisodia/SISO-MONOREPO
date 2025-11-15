"use client";

import { cn } from "@/domains/shared/utils/cn";

const gradients = {
  orange: "from-[var(--siso-red)] via-[var(--siso-orange)] to-[#ffd166]",
  cyan: "from-[#00f5ff] via-[#00c3ff] to-[#0061ff]",
};

type GlowDividerProps = {
  variant?: keyof typeof gradients;
  className?: string;
  height?: number;
  animated?: boolean | "pulse";
};

export function GlowDivider({ variant = "orange", className, height = 4, animated = false }: GlowDividerProps) {
  const animationClass = animated === "pulse"
    ? "motion-safe:animate-pulse"
    : animated === true
    ? "motion-safe:animate-[glow-wave_8s_ease-in-out_infinite]"
    : "";
  const backgroundSize = animated === true ? "200% 100%" : "100% 100%";

  return (
    <div className={cn("relative overflow-hidden rounded-full", className)} style={{ height }} aria-hidden>
      <span
        className={cn(
          "pointer-events-none absolute inset-0 blur-2xl opacity-60",
          "bg-gradient-to-r",
          gradients[variant],
          animationClass,
        )}
        style={{ backgroundSize }}
      />
      <span
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-gradient-to-r",
          gradients[variant],
          animationClass,
        )}
        style={{ backgroundSize }}
      />
      <span className="relative block h-full w-full bg-gradient-to-r from-white/25 via-transparent to-white/25 mix-blend-screen opacity-70" />
    </div>
  );
}
