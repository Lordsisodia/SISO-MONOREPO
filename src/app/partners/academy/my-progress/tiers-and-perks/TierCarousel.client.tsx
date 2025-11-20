"use client";

import { useState } from "react";

type Tier = {
  level: number;
  name: string;
  points: number;
  requirement: string;
  perks: string[];
};

interface TierCarouselProps {
  tiers: Tier[];
}

export function TierCarousel({ tiers }: TierCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="text-sm text-white">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-inner">
        <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {tiers.map((tier) => (
            <div key={tier.level} className="min-w-full px-4 py-6 space-y-3" style={{ scrollSnapAlign: "start" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-siso-text-muted">Tier {tier.level}</p>
                  <p className="text-2xl font-semibold text-white">{tier.name}</p>
                  <p className="text-xs text-siso-text-muted">
                    Requirement: {tier.requirement} • {tier.points} pts
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-siso-text-muted">{tier.points} pts</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tier.perks.map((perk) => (
                  <span key={perk} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-siso-text-muted">
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 py-3">
          {tiers.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to tier ${idx + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${idx === activeIndex ? "bg-siso-orange" : "bg-white/30"}`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

