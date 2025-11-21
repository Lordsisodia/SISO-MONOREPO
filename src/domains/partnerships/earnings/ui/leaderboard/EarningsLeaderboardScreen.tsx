"use client";

import Link from "next/link";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Waves } from "@/components/ui/wave-background";
import { leaderboardEntries } from "@/domains/partnerships/earnings/data/earningsAchievements";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Sparkles } from "lucide-react";
import { cn } from "@/domains/shared/utils/cn";
import { EarningsHeroBackLink } from "@/domains/partnerships/earnings/ui/components/EarningsHeroBackLink";

const leaderboardHighlights = [
  { label: "Avg boost", value: "+14%" },
  { label: "Win streak leader", value: "9 days" },
  { label: "New entries", value: "3" },
];

export function EarningsLeaderboardScreen() {
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
        <div className="relative min-h-[128px]">
          <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
            <EarningsHeroBackLink />
          </div>
          <HighlightCard
            color="orange"
            className="w-full pr-16 pl-12"
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
        </div>

        <SettingsGroupCallout
          icon={<Medal className="h-4 w-4" />}
          title="Top partners"
          subtitle="Refreshed hourly"
          showChevron={false}
        >
          <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white/80">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Overall standings</p>
                  <p className="text-[11px] text-white/75">Rolling 30-day payouts with booster impact</p>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
                  <Badge variant="outline" className="border-white/20 bg-black/40 px-3 py-1 text-[10px] tracking-[0.2em] text-white">
                    Overall
                  </Badge>
                  <Badge variant="outline" className="border-white/10 bg-white/10 px-3 py-1 text-[10px] tracking-[0.2em] text-white/80">
                    30d window
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {leaderboardHighlights.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs">
                    <Sparkles className="h-3.5 w-3.5 text-siso-orange" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">{item.label}</p>
                      <p className="text-sm font-semibold text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {leaderboardEntries.map((entry) => (
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
  const insights = entry.insights ?? [];
  const streakInsight = insights.find((insight) => insight.label.toLowerCase() === "streak");
  const winsInsight = insights.find((insight) => insight.label.toLowerCase() === "wins");
  const normalizedName = entry.name.toLowerCase();
  const slugFromName = normalizedName.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const targetProfileId = entry.profileId ?? slugFromName;
  const profileHref = normalizedName === "you"
    ? "/partners/(mobile)/profile"
    : `/partners/community/profile/${targetProfileId || "all"}`;
  return (
    <div
      className={cn(
        "space-y-2 rounded-2xl border border-white/10 bg-black/25 px-3 py-2.5 text-sm text-white/80",
        highlight && "border-siso-orange/60 bg-siso-orange/15 text-white",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {medal ? (
            <span className={cn("inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-black", medal.className)}>
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
        <div className="flex items-baseline gap-2 text-white">
          <span className="text-lg font-semibold leading-none">{entry.metricValue}</span>
          <span className="text-xs text-emerald-300">{entry.trend}</span>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        {streakInsight ? <InlineInsight label={streakInsight.label} value={streakInsight.value} highlight={highlight} /> : null}
        {winsInsight ? <InlineInsight label={winsInsight.label} value={winsInsight.value} highlight={highlight} /> : null}
      </div>
      <Link
        href={profileHref}
        className={cn(
          "flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/70 transition-colors",
          "hover:text-white",
        )}
      >
        <span className="h-px w-8 flex-1 bg-white/20" aria-hidden />
        View profile
        <span className="h-px w-8 flex-1 bg-white/20" aria-hidden />
      </Link>
    </div>
  );
}

function InlineInsight({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-center justify-between rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/70",
        highlight && "border-white/40 bg-white/10 text-white",
      )}
    >
      <span className="text-white/55">{label}</span>
      <span className="font-semibold tracking-[0.04em] text-white">{value}</span>
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
