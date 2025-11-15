"use client";

export const dynamic = 'force-dynamic';

import { FallingPattern } from "@/domains/shared/components/falling-pattern";

export default function FallingPatternDemo() {
  return (
    <div className="relative min-h-screen w-full">
      <FallingPattern className="h-screen [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h1 className="font-mono text-4xl font-extrabold tracking-tighter text-white md:text-7xl">
          Falling Pattern
        </h1>
      </div>
    </div>
  );
}
