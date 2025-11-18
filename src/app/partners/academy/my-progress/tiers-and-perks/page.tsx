"use client";

"use client";

import { ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

const tiers = [
  {
    level: 1,
    name: "Starter",
    points: 0,
    requirement: "Sign up + complete onboarding",
    perks: ["Help Center access", "Community messages", "Office hours booking"],
  },
  {
    level: 2,
    name: "Active",
    points: 500,
    requirement: "500 pts + 1 course complete",
    perks: ["Priority office hours", "Saved Docs sync", "Portfolio share links"],
  },
  {
    level: 3,
    name: "Prime",
    points: 1200,
    requirement: "1200 pts + 3 courses complete",
    perks: ["Lead routing access", "Enhanced commission rate", "Early access to pitch kits"],
  },
  {
    level: 4,
    name: "Elite",
    points: 2500,
    requirement: "2500 pts + 5 courses complete",
    perks: ["Priority leads", "Custom pitch kit support", "Achievement celebrations"],
  },
];

export default function TierPerksPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const total = tiers.length;
  const activeTier = useMemo(() => tiers[activeIndex], [activeIndex]);

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <div className="relative">
          <HighlightCard
            color="orange"
            title="Tiers & perks"
            description="Understand every tier, what it unlocks, and how to level up."
            metricValue="4 tiers"
            metricLabel="Starter → Elite"
            icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
            hideDivider
            hideFooter
            showCornerIcon={false}
            titleClassName="uppercase tracking-[0.35em] text-white"
            descriptionClassName="text-sm"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-1 top-1/2 -translate-y-1/2 text-white"
            onClick={() => router.push("/partners/academy/my-progress")}
          >
            ←
          </Button>
        </div>

        <SettingsGroupCallout
          icon={<ShieldCheck className="h-4 w-4" />}
          title="All tiers"
          subtitle="Requirements and perks"
          showChevron={false}
        >
          <div className="text-sm text-white">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-inner">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {tiers.map((tier) => (
                  <div
                    key={tier.level}
                    className="min-w-full px-4 py-6 space-y-3"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-siso-text-muted">
                          Tier {tier.level}
                        </p>
                        <p className="text-2xl font-semibold text-white">{tier.name}</p>
                        <p className="text-xs text-siso-text-muted">
                          Requirement: {tier.requirement} • {tier.points} pts
                        </p>
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-siso-text-muted">
                        {tier.points} pts
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tier.perks.map((perk) => (
                        <span
                          key={perk}
                          className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-siso-text-muted"
                        >
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
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      idx === activeIndex ? "bg-siso-orange" : "bg-white/30"
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="How to level up"
          subtitle="Quick reminders"
          showChevron={false}
        >
          <div className="space-y-2 text-sm text-siso-text-muted">
            <p>• Complete courses to earn the bulk of your points.</p>
            <p>• Share assets and engage to pick up small XP boosts.</p>
            <p>• Certificates typically unlock at higher tiers—keep progressing.</p>
            <Button
              variant="ghost"
              size="sm"
              className="border border-white/10 mt-2"
              onClick={() => router.push("/partners/academy/xp-breakdown")}
            >
              View XP activity
            </Button>
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
