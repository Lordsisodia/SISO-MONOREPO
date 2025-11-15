"use client";

import { useMemo, useState } from "react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import { Trophy, Sparkles, UsersRound, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Progress from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  badgeTotals,
  featuredBadges,
  leaderboardEntries,
  shoutouts,
  categorySummaries,
} from "@/domains/partnerships/earnings/data/earningsAchievements";
import { cn } from "@/domains/shared/utils/cn";

const leaderboardTabs = ["overall", "region", "industry", "newcomers"] as const;
type LeaderboardTab = typeof leaderboardTabs[number];

export function EarningsAchievementsScreen() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("overall");

  const filteredLeaderboard = useMemo(() => {
    if (activeTab === "overall") return leaderboardEntries;
    return leaderboardEntries;
  }, [activeTab]);

  return (
    <section className="relative flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] pt-8">
        <HighlightCard
          color="orange"
          className="w-full pr-16"
          title="Achievements"
          description="Track badges, multipliers, and recognition across the program."
          hideDivider
          hideFooter
          titleClassName="uppercase tracking-[0.3em] font-semibold text-[24px] leading-[1.1]"
          descriptionClassName="text-xs"
          icon={<Trophy className="h-5 w-5" />}
          metricValue=""
          metricLabel=""
          buttonText=""
          onButtonClick={() => {}}
        />

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Trophy Case"
          subtitle="Your progress across badges and boosters"
          showChevron={false}
        >
          <div className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
            <ControlStat
              label="Badges earned"
              value={`${badgeTotals.earned}/${badgeTotals.total}`}
              helper={`Next up: ${badgeTotals.nextBadge}`}
            >
              <Progress value={(badgeTotals.earned / badgeTotals.total) * 100} className="mt-3" />
            </ControlStat>
            <ControlStat
              label="Next badge"
              value={badgeTotals.nextBadge}
              helper={`${badgeTotals.nextBadgeProgress}% complete`}
            >
              <Progress value={badgeTotals.nextBadgeProgress} className="mt-3" />
            </ControlStat>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<UsersRound className="h-4 w-4" />}
          title="Featured badges"
          subtitle="Rare unlocks and what it takes"
          showChevron={false}
        >
          <div className="grid gap-3 md:grid-cols-3">
            {featuredBadges.map((badge) => (
              <BadgeTile key={badge.id} badge={badge} />
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Trophy className="h-4 w-4" />}
          title="How you stack up"
          subtitle="Leaderboard refreshed hourly"
          showChevron={false}
        >
          <div className="space-y-3 rounded-[22px] border border-white/10 bg-white/5 p-4">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as LeaderboardTab)}>
            <TabsList className="flex gap-2 overflow-x-auto border-0 bg-transparent p-0 [&::-webkit-scrollbar]:hidden">
              {leaderboardTabs.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-full border border-white/10 px-4 py-1 text-[10px] uppercase tracking-[0.25em] text-white/70 whitespace-nowrap data-[state=active]:border-siso-orange data-[state=active]:bg-siso-orange/20 data-[state=active]:text-white"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            </Tabs>

            <div className="space-y-2">
              {filteredLeaderboard.map((entry) => (
                <LeaderboardRow key={entry.rank} entry={entry} highlight={entry.name.toLowerCase() === "you"} />
              ))}
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Megaphone className="h-4 w-4" />}
          title="Shoutouts"
          subtitle="Auto-posted into #wins every day"
          showChevron={false}
        >
          <div className="space-y-2 rounded-[22px] border border-white/10 bg-white/5 p-3">
            {shoutouts.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl bg-black/20 px-3 py-2 text-sm text-white/80">
                <span>{item.message}</span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/50">{item.timestamp}</span>
              </div>
            ))}
            <Button variant="secondary" className="mt-2 w-full rounded-2xl" asChild>
              <a href="/partners/community/channels/wins">Share a win</a>
            </Button>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<UsersRound className="h-4 w-4" />}
          title="Categories"
          subtitle="Track specific badge tracks"
          showChevron={false}
        >
          <div className="grid gap-3 md:grid-cols-2">
            {categorySummaries.map((category) => (
              <div key={category.id} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{category.label}</p>
                    <p className="text-xs text-siso-text-muted">{category.description}</p>
                  </div>
                  <Badge className="bg-white/10 text-white/70">Next: {category.nextBadge}</Badge>
                </div>
                <Progress value={category.progress} className="mt-3" />
                <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/60">{category.progress}% complete</p>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>
      </div>
    </section>
  );
}

function ControlStat({ label, value, helper, children }: { label: string; value: string; helper?: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-left">
      <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">{label}</p>
      <p className="text-xl font-semibold text-white">{value}</p>
      {helper ? <p className="text-xs text-white/70">{helper}</p> : null}
      {children}
    </div>
  );
}

function BadgeTile({ badge }: { badge: typeof featuredBadges[number] }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">{badge.name}</p>
        <Badge className="bg-white/10 text-white/70">{badge.category}</Badge>
      </div>
      <p className="mt-1 text-xs text-siso-text-muted">{badge.description}</p>
      <div className="mt-3 text-[12px] text-white/80">
        <p>
          <span className="text-white/60">Reward: </span>
          {badge.reward}
        </p>
        <p>
          <span className="text-white/60">Criteria: </span>
          {badge.criteria}
        </p>
        <p className="text-white/60">{badge.rarity}</p>
      </div>
    </div>
  );
}

function LeaderboardRow({ entry, highlight }: { entry: typeof leaderboardEntries[number]; highlight?: boolean }) {
  const medal = getMedal(entry.rank);
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm",
        highlight && "border-siso-orange/60 bg-siso-orange/15 text-white",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
          {medal ? <span className={cn("inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-black", medal.className)}>{medal.label}</span> : entry.rank}
        </span>
        <div>
          <p className="font-semibold text-white">{entry.name}</p>
          <p className="text-xs text-white/70">{entry.metricLabel}</p>
        </div>
      </div>
      <div className="text-right text-xs text-white/80">
        <p className="text-base font-semibold text-white">{entry.metricValue}</p>
        <p className="text-emerald-300">{entry.trend}</p>
      </div>
    </div>
  );
}

function getMedal(rank: number): { label: string; className: string } | null {
  switch (rank) {
    case 1:
      return { label: "1", className: "bg-gradient-to-br from-yellow-300 to-amber-400" };
    case 2:
      return { label: "2", className: "bg-gradient-to-br from-gray-200 to-gray-400" };
    case 3:
      return { label: "3", className: "bg-gradient-to-br from-amber-800 to-orange-600" };
    default:
      return null;
  }
}
