"use client";

import { ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

type Variant = "swirl" | "hue";

export type ElectricCardShellProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: Variant;
  color?: string;
};

export function ElectricCardShell({
  children,
  className,
  contentClassName,
  variant = "swirl",
  color = "#dd8448",
}: ElectricCardShellProps) {
  const reactId = useId().replace(/:/g, "");
  const ids = { swirl: `shell-swirl-${reactId}`, hue: `shell-hue-${reactId}` };
  const filterURL = variant === "hue" ? `url(#${ids.hue})` : `url(#${ids.swirl})`;

  return (
    <div className={cn("electric-shell", className)}>
      <svg className="shell-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <filter id={ids.swirl} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="noise2" in2="noise1" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>

          <filter id={ids.hue} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="7" />
            <feColorMatrix type="hueRotate" result="pt1">
              <animate attributeName="values" values="0;360;" dur="0.6s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feComposite />
            <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="7" seed="5" />
            <feColorMatrix type="hueRotate" result="pt2">
              <animate attributeName="values" values="0; 333; 199; 286; 64; 168; 256; 157; 360;" dur="5s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feBlend in="pt1" in2="pt2" mode="normal" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      <div
        className="shell-container"
        style={{ ["--electric-border-color" as any]: color, ["--f" as any]: filterURL }}
      >
        <div className="shell-border" />
        <div className="shell-glow-one" />
        <div className="shell-glow-two" />
        <div className="shell-overlay" />
        <div className="shell-overlay-two" />
        <div className="shell-bg-glow" />

        <div className={cn("shell-inner", contentClassName)}>{children}</div>
      </div>

      <style jsx>{`
        .electric-shell { position: relative; width: 100%; }
        .shell-svg { position: absolute; width: 0; height: 0; overflow: hidden; }
        .shell-container {
          position: relative;
          padding: 2px;
          border-radius: 30px;
          --electric-light-color: oklch(from var(--electric-border-color) l c h);
          --gradient-color: oklch(from var(--electric-border-color) 0.3 calc(c / 2) h / 0.4);
          background: linear-gradient(-30deg, var(--gradient-color), transparent, var(--gradient-color)),
            linear-gradient(to bottom, oklch(0.185 0 0), oklch(0.185 0 0));
        }
        .shell-border {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 2px solid oklch(from var(--electric-border-color) l c h / 0.45);
          mix-blend-mode: screen;
        }
        .shell-glow-one,
        .shell-glow-two,
        .shell-overlay,
        .shell-overlay-two,
        .shell-bg-glow {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
        }
        .shell-glow-one {
          border: 2px solid oklch(from var(--electric-border-color) l c h / 0.8);
          filter: blur(1px);
        }
        .shell-glow-two {
          border: 2px solid var(--electric-light-color);
          filter: blur(4px);
        }
        .shell-overlay,
        .shell-overlay-two {
          transform: scale(1.05);
          filter: blur(16px);
          mix-blend-mode: overlay;
          background: linear-gradient(-30deg, white, transparent 35%, transparent 70%, white);
        }
        .shell-overlay { opacity: 0.9; }
        .shell-overlay-two { opacity: 0.4; }
        .shell-bg-glow {
          filter: blur(32px);
          transform: scale(1.08);
          opacity: 0.35;
          background: linear-gradient(
            -30deg,
            var(--electric-light-color),
            transparent,
            var(--electric-border-color)
          );
        }
        .shell-inner {
          position: relative;
          z-index: 2;
          border-radius: 26px;
          background: rgba(6, 6, 8, 0.85);
          padding: 1.5rem;
        }
      `}</style>
    </div>
  );
}
