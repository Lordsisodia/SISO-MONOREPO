"use client";

import { HighlightCard } from "@/components/ui/card-5-static";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { tierBenefits, tierHistory, tierMeta, tierMetrics, unlockMissions } from "@/domains/partnerships/earnings/data/tierProgression";
import Progress from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Target, History } from "lucide-react";

const tiers: Array<"Starter" | "Active" | "Prime" | "Collective"> = ["Starter", "Active", "Prime", "Collective"];

export function EarningsTierProgressionScreen() {
  return (
    <section className="relative flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] pt-8">
        <TierHero />

        <SettingsGroupCallout
          icon={<Target className="h-4 w-4" />}
          title="Progress breakdown"
          subtitle="Each gauge must hit its target to unlock Prime"
          showChevron={false}
        >
          <div className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 sm:grid-cols-3">
            {tierMetrics.map((metric) => (
              <div key={metric.id} className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">{metric.label}</p>
                <p className="text-2xl font-semibold text-white">{metric.value}</p>
                <p className="text-xs text-white/70">Target {metric.target}</p>
                <Progress value={(metric.value / metric.target) * 100} className="mt-3" />
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">{metric.helper}</p>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Trophy className="h-4 w-4" />}
          title="Benefits by tier"
          subtitle="Everything that unlocks as you climb"
          showChevron={false}
        >
          <div className="overflow-x-auto rounded-[22px] border border-white/10 bg-white/5">
            <table className="w-full min-w-[640px] text-left text-sm text-white/80">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-[0.3em] text-white/60">Perk</th>
                  {tiers.map((tier) => (
                    <th key={tier} className="px-4 py-3 text-[11px] uppercase tracking-[0.3em] text-white/60">
                      {tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tierBenefits.map((benefit) => (
                  <tr key={benefit.perk} className="border-t border-white/5">
                    <td className="px-4 py-3 font-semibold text-white">{benefit.perk}</td>
                    {tiers.map((tier) => (
                      <td key={`${benefit.perk}-${tier}`} className="px-4 py-3">
                        {benefit.tiers[tier]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Target className="h-4 w-4" />}
          title="Upcoming unlock missions"
          subtitle="Complete these to fast-track Prime"
          showChevron={false}
        >
          <div className="space-y-4">
            {unlockMissions.map((mission) => (
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
