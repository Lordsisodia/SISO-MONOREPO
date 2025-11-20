"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  colors?: string[];
  animationSpeed?: number;
  className?: string;
}

export function GradientText({ children, colors = ["#f97316", "#facc15", "#fb7185"], animationSpeed = 6, className }: GradientTextProps) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;
  return (
    <span
      className={cn("bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% 200%",
        animation: `gradientShift ${animationSpeed}s ease infinite`,
      }}
    >
      {children}
    </span>
  );
}

if (typeof document !== "undefined" && !document.getElementById("gradient-text-keyframes")) {
  const style = document.createElement("style");
  style.id = "gradient-text-keyframes";
  style.innerHTML = `@keyframes gradientShift {0% {background-position: 0% 50%;}50% {background-position: 100% 50%;}100% {background-position: 0% 50%;}}`;
  document.head.appendChild(style);
}
