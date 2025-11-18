"use client";

import { HighlightCard } from "@/components/ui/card-5-static";
import Image from "next/image";
import { useState } from "react";
import { Waves } from "@/components/ui/wave-background";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { tierHistory, tierMeta, unlockMissions } from "@/domains/partnerships/earnings/data/tierProgression";
import Progress from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Target, History } from "lucide-react";

export function EarningsTierProgressionScreen() {
  return (
    <section className="relative flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ filter: "blur(6px)", opacity: 0.9 }}
      >
        <Waves
          className="h-full w-full"
          strokeColor="#f8a75c"
          backgroundColor="#0b0b0f"
          pointerSize={0.35}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] pt-8">
        <TierHero />

        <TierBadges />

        <SettingsGroupCallout
          icon={<Target className="h-4 w-4" />}
          title="Upcoming unlock missions"
          subtitle="Complete these to fast-track your next tier"
          showChevron={false}
        >
          <div className="space-y-4">
            {unlockMissions.slice(0, 3).map((mission) => (
              <div key={mission.id} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-base font-semibold text-white">{mission.title}</p>
                    <p className="text-xs text-siso-text-muted">{mission.description}</p>
                  </div>
                  <Badge className="bg-siso-orange/20 text-siso-orange">{mission.reward}</Badge>
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/80">
                  {mission.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="rounded-2xl">Start mission</Button>
                  <Button size="sm" variant="outline" className="rounded-2xl border-white/20 text-white/80">
                    View rules
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Button
                size="sm"
                variant="outline"
                className="rounded-2xl border-white/20 text-white/80"
                onClick={() => {
                  // TODO: route to real missions page once built
                  window.location.href = "/partners/earnings/missions";
                }}
              >
                View all missions
              </Button>
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<History className="h-4 w-4" />}
          title="Tier history"
          subtitle="Every upgrade since joining"
          showChevron={false}
        >
          <div className="space-y-4 rounded-[22px] border border-white/10 bg-white/5 p-4">
            {tierHistory.map((entry) => (
              <div key={entry.id} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black/20 text-xs font-semibold text-white">
                  {entry.tier}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{entry.date}</p>
                  <p className="text-xs text-siso-text-muted">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <div className="rounded-[26px] border border-siso-orange/60 bg-siso-orange/10 px-4 py-5 text-sm text-white/90">
          <p className="font-semibold uppercase tracking-[0.3em]">Need a review?</p>
          <p className="text-xs text-white/80">If you’ve met the requirements, request a manual tier review and we’ll respond in 48 hours.</p>
          <Button className="mt-3 rounded-2xl">Ask for review</Button>
        </div>
      </div>
    </section>
  );
}

function TierHero() {
  return (
    <HighlightCard
      color="orange"
      className="w-full pr-16"
      title="Tier progression"
      description={`Current tier: ${tierMeta.currentTier}`}
      hideDivider
      hideFooter
      titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
      descriptionClassName="text-xs"
      icon={<Trophy className="h-5 w-5" />}
      metricValue=""
      metricLabel=""
      buttonText=""
      onButtonClick={() => {}}
      showCornerIcon={false}
    >
      <div className="mt-4 space-y-2">
        <Progress value={tierMeta.progressPct} className="h-3" />
        <p className="text-sm text-white/90">{tierMeta.progressPct}% of the way to {tierMeta.nextTier}</p>
        <p className="text-xs text-white/70">{tierMeta.pointsToNext} pts to go • {tierMeta.estUpgradeDate}</p>
      </div>
      <div className="mt-4 flex gap-3">
        <Button className="rounded-2xl">View benefits</Button>
        <Button variant="outline" className="rounded-2xl border-white/30 text-white/80">
          Ask for review
        </Button>
      </div>
    </HighlightCard>
  );
}

function TierBadges() {
  const tiers = [
    {
      name: "Trailblazer",
      commission: 20,
      xpRequired: 0,
      src: "/tiers/Trailblazer.svg",
      perks: ["Launch previews", "Weekly learn boost", "Standard SLA"],
      description: "Kickstart your journey with core access and faster learning boosts.",
      unlockHint: "Default tier. Start earning XP to unlock Builder at 1,000 XP.",
    },
    {
      name: "Builder",
      commission: 23,
      xpRequired: 1000,
      src: "/tiers/Builder.svg",
      perks: ["+2% payout boost", "Ops betas", "Quarterly coaching"],
      description: "Solidify your fundamentals with payouts and ops betas.",
      unlockHint: "Reach 3,000 XP to hit Vanguard. Close 2 wins or finish 3 courses to bridge the gap faster.",
    },
    {
      name: "Vanguard",
      commission: 26,
      xpRequired: 3000,
      src: "/tiers/Vanguard.svg",
      perks: ["+4% payout boost", "Growth betas", "Co-marketing"],
      description: "Lead the pack with growth betas and co-marketing eligibility.",
      unlockHint: "Target 10,000 XP for Apex. Stack verified wins and growth missions.",
    },
    {
      name: "Apex",
      commission: 28,
      xpRequired: 10000,
      src: "/tiers/Apex.svg",
      perks: ["+5% payout boost", "Roadmap vote", "Priority launches"],
      description: "Influence the roadmap and get priority launches.",
      unlockHint: "Push to 25,000 XP for Sovereign. Large deals + mentorship hours move you fastest.",
    },
    {
      name: "Sovereign",
      commission: 30,
      xpRequired: 25000,
      src: "/tiers/Sovereign.svg",
      perks: ["+6% payout boost", "Rev-share pilots", "Concierge"],
      description: "Top-tier privileges with revenue-share pilots and concierge help.",
      unlockHint: "You’ve reached the summit. Maintain activity to keep the crown.",
    },
  ];

  const [index, setIndex] = useState(0);
  const current = tiers[index];
  // TODO: replace with real user XP once wired to API
  const userXp = 1250;
  const nextTier = tiers[index + 1];
  const xpToNext = nextTier ? Math.max(0, nextTier.xpRequired - userXp) : 0;

  const canPrev = index > 0;
  const canNext = index < tiers.length - 1;

  return (
    <SettingsGroupCallout
      icon={<Trophy className="h-4 w-4" />}
      title="Tier badges"
      subtitle="Current artwork for each tier"
      showChevron={false}
    >
      <div className="flex flex-col gap-3">
        <div className="relative h-56 w-full overflow-hidden rounded-2xl">
          <Image
            src={current.src}
            alt={`${current.name} badge`}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2 text-[11px] text-siso-text-muted">
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-white">{current.xpRequired.toLocaleString()} XP+</span>
            <span className="rounded-full bg-siso-orange/15 px-2.5 py-1 text-siso-orange">{current.commission}% commission</span>
            {nextTier ? (
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-white">
                {xpToNext.toLocaleString()} XP to {nextTier.name}
              </span>
            ) : (
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-white">Top tier unlocked</span>
            )}
          </div>
          <div className="text-xs text-siso-text-muted">{index + 1} / {tiers.length}</div>
        </div>

        {current.description && (
          <p className="text-sm text-white/85">{current.description}</p>
        )}
        {current.unlockHint && (
          <p className="text-xs text-siso-text-muted">{current.unlockHint}</p>
        )}

        {current.perks.length ? (
          <div className="flex flex-wrap gap-2 text-[11px] text-siso-text-muted">
            {current.perks.slice(0, 2).map((perk) => (
              <span key={perk} className="rounded-full border border-white/15 px-3 py-1">
                {perk}
              </span>
            ))}
          </div>
        ) : null}

        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-2xl border-white/20 text-white/80"
            disabled={!canPrev}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            Previous
          </Button>
          <Button
            size="sm"
            className="rounded-2xl"
            disabled={!canNext}
            onClick={() => setIndex((i) => Math.min(tiers.length - 1, i + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </SettingsGroupCallout>
  );
}
