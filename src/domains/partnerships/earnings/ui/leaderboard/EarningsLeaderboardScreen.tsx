"use client";

import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import { leaderboardEntries } from "@/domains/partnerships/earnings/data/earningsAchievements";
import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal } from "lucide-react";
import { cn } from "@/domains/shared/utils/cn";

const leaderboardTabs = ["overall", "region", "industry", "newcomers"] as const;
type LeaderboardTab = typeof leaderboardTabs[number];

export function EarningsLeaderboardScreen() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("overall");

  const filtered = useMemo(() => leaderboardEntries, [activeTab]);

  return (
    <section className="relative flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] pt-8">
        <HighlightCard
          color="orange"
          className="w-full pr-16"
          title="Leaderboard"
          description="See who’s leading payouts, points, and boosters this season."
          hideDivider
          hideFooter
          titleClassName="uppercase tracking-[0.32em] font-semibold text-[24px] leading-[1.1]"
          descriptionClassName="text-xs"
          icon={<Trophy className="h-5 w-5" />}
          metricValue=""
          metricLabel=""
          buttonText=""
          onButtonClick={() => {}}
          showCornerIcon={false}
        />

        <SettingsGroupCallout
          icon={<Medal className="h-4 w-4" />}
          title="Top partners"
          subtitle="Refreshed hourly"
          showChevron={false}
        >
          <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 space-y-3">
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
              {filtered.map((entry) => (
                <LeaderboardRow key={entry.rank} entry={entry} highlight={entry.name.toLowerCase() === "you"} />
              ))}
            </div>
          </div>
        </SettingsGroupCallout>
      </div>
    </section>
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
        {medal ? (
          <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-black", medal.className)}>
            {medal.label}
          </span>
        ) : (
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">{entry.rank}</span>
        )}
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

function getMedal(rank: number) {
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
