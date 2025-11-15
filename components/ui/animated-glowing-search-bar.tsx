"use client";

import React, { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/domains/shared/utils/cn";

export type AnimatedGlowingSearchBarProps = ComponentPropsWithoutRef<"input"> & {
  wrapperClassName?: string;
};

const AnimatedGlowingSearchBar = forwardRef<HTMLInputElement, AnimatedGlowingSearchBarProps>(
  ({ placeholder = "Search...", className, wrapperClassName, ...props }, ref) => {
    return (
      <div className={cn("relative flex w-full items-center justify-center", wrapperClassName)}>
        <div className="absolute z-[-1] min-h-screen w-full" />
        <div className="group relative flex w-full items-center justify-center">
          <div className="absolute z-[-1] h-full w-full max-h-[64px] max-w-[20rem] overflow-hidden rounded-[32px] blur-[3px]
                        before:absolute before:z-[-2] before:h-[999px] before:w-[999px] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-60 before:bg-[conic-gradient(#0b0500,var(--siso-red)_6%,#0b0500_35%,#1a0a00_48%,var(--siso-orange)_62%,#0b0500_90%)] before:bg-no-repeat before:content-[''] before:transition-all before:duration-[2000ms]
                        group-hover:before:-rotate-[120deg] group-focus-within:before:rotate-[420deg] group-focus-within:before:duration-[4000ms]" />
          <div className="absolute z-[-1] h-full w-full max-h-[60px] max-w-[19.5rem] overflow-hidden rounded-[30px] blur-[3px]
                        before:absolute before:z-[-2] before:h-[600px] before:w-[600px] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg] before:bg-[conic-gradient(rgba(0,0,0,0),color-mix(in_srgb,var(--siso-red)_75%,var(--siso-black)),rgba(0,0,0,0)_12%,rgba(0,0,0,0)_50%,color-mix(in_srgb,var(--siso-orange)_80%,#ffefc2),rgba(0,0,0,0)_65%)] before:bg-no-repeat before:content-[''] before:transition-all before:duration-[2000ms]
                        group-hover:before:-rotate-[98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]" />
          <div className="absolute z-[-1] h-full w-full max-h-[58px] max-w-[19.1875rem] overflow-hidden rounded-[28px] blur-[2px]
                        before:absolute before:z-[-2] before:h-[600px] before:w-[600px] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg] before:bg-[conic-gradient(rgba(0,0,0,0)_0%,color-mix(in_srgb,var(--siso-orange)_70%,#fff3d2),rgba(0,0,0,0)_12%,rgba(0,0,0,0)_50%,color-mix(in_srgb,var(--siso-red)_65%,var(--siso-orange)),rgba(0,0,0,0)_60%)] before:bg-no-repeat before:content-[''] before:brightness-[1.35] before:transition-all before:duration-[2000ms]
                        group-hover:before:-rotate-[97deg] group-focus-within:before:rotate-[443deg] group-focus-within:before:duration-[4000ms]" />
          <div className="absolute z-[-1] h-full w-full max-h-[54px] max-w-[18.9375rem] overflow-hidden rounded-[26px] blur-[0.5px]
                        before:absolute before:z-[-2] before:h-[600px] before:w-[600px] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-70 before:bg-[conic-gradient(#1a0f05,var(--siso-red)_6%,#1c1206_18%,#1a1308_52%,color-mix(in_srgb,var(--siso-orange)_85%,#fff2c7)_64%,#1a0f05_70%)] before:bg-no-repeat before:content-[''] before:brightness-[1.3] before:transition-all before:duration-[2000ms]
                        group-hover:before:-rotate-[110deg] group-focus-within:before:rotate-[430deg] group-focus-within:before:duration-[4000ms]" />

          <div className="relative w-full max-w-[18.5rem]">
            <input
              ref={ref}
              placeholder={placeholder}
              type="text"
              className={cn(
                "h-10 w-full rounded-[26px] border-none bg-[#010201] px-4 text-sm text-white placeholder:text-gray-400 transition focus:outline-none focus:ring-1 focus:ring-[var(--siso-orange)] focus:ring-offset-0",
                className,
              )}
              {...props}
            />
            <div className="pointer-events-none absolute left-[5px] top-[10px] h-5 w-[30px] bg-[var(--siso-orange)] opacity-80 blur-2xl transition-all duration-[2000ms] group-hover:opacity-0" />
          </div>
        </div>
      </div>
    );
  },
);

AnimatedGlowingSearchBar.displayName = "AnimatedGlowingSearchBar";

export { AnimatedGlowingSearchBar };
