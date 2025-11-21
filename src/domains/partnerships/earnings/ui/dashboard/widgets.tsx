"use client";

import type { ReactNode } from "react";
import { Award, CheckCircle2, Flag, Target, TrendingUp } from "lucide-react";
import Progress from "@/components/ui/progress";
import { cn } from "@/domains/shared/utils/cn";

import type { EarningsChallenge } from "@/domains/partnerships/earnings/data/earningsChallenges";
import type { LeaderboardEntry, BadgeDetail } from "@/domains/partnerships/earnings/data/earningsAchievements";
import type { TierMetric } from "@/domains/partnerships/earnings/data/tierProgression";
import type { ComplianceItem, LedgerEntry } from "@/domains/partnerships/earnings/data/walletData";

export type ChallengeWidgetProps = {
  featured?: EarningsChallenge;
  activeCount: number;
  upcomingCount: number;
};

export type LeaderboardWidgetProps = {
  leaders: LeaderboardEntry[];
};

export type AchievementsWidgetProps = {
  earnedBadges: BadgeDetail[];
  inProgressBadges: BadgeDetail[];
};

export type TierWidgetProps = {
  tierMeta: {
    currentTier: string;
    nextTier: string;
    pointsToNext: number;
    estUpgradeDate: string;
    progressPct: number;
  };
  metrics: TierMetric[];
};

export type WalletWidgetProps = {
  balance: string;
  nextPayout: string;
  connectedRails: string[];
  ledgerPreview: LedgerEntry[];
  compliance: ComplianceItem[];
};

export function ChallengesWidget({ featured, activeCount, upcomingCount }: ChallengeWidgetProps) {
  return (
    <WidgetShell
      statLabel={featured ? "Active mission" : "Challenges"}
      statValue={featured ? featured.name : `${activeCount} live missions`}
      meta={featured ? `${featured.progress}% done • ${featured.deadline}` : `${upcomingCount} upcoming drops`}
    >
      {featured ? (
        <div className="space-y-3">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-orange-500/20 via-orange-400/20 to-orange-300/10 px-4 py-3">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="inline-flex items-center gap-1 text-white">
                <Flag className="h-3.5 w-3.5" /> {featured.reward}
              </span>
              <span>{featured.deadline}</span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/15" aria-label="Challenge progress">
              <div className="h-full rounded-full bg-gradient-to-r from-siso-orange to-orange-200" style={{ width: `${featured.progress}%` }} />
            </div>
            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/60">{featured.progress}% complete</p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-white/60">
            <Chip label={`${activeCount} active`} />
            <Chip label={`${upcomingCount} upcoming`} />
            {featured.type === "team" ? <Chip label="Team play" /> : <Chip label="Solo sprint" />}
          </div>
        </div>
      ) : (
        <p className="text-sm text-white/70">No active missions. New drops land weekly—check back soon.</p>
      )}
    </WidgetShell>
  );
}

export function LeaderboardWidget({ leaders }: LeaderboardWidgetProps) {
  const topThree = leaders.slice(0, 3);
  return (
    <WidgetShell statLabel="Current leaders" statValue="Top 3" meta="Updated hourly">
      <div className="grid gap-2">
        {topThree.map((entry) => (
          <div key={entry.rank} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
            <div className="flex items-center gap-3">
              <span className={cn("text-lg font-semibold", entry.rank === 1 ? "text-siso-orange" : "text-white/80")}>#{entry.rank}</span>
              <div>
                <p className="text-sm font-semibold text-white">{entry.name}</p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">{entry.metricValue} {entry.metricLabel}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" /> {entry.trend}
            </span>
          </div>
        ))}
      </div>
    </WidgetShell>
  );
}

export function AchievementsWidget({ earnedBadges, inProgressBadges }: AchievementsWidgetProps) {
  return (
    <WidgetShell
      statLabel="Badge stack"
      statValue={`${earnedBadges.length} earned`}
      meta={`${inProgressBadges.length} in progress`}
    >
      <div className="flex flex-wrap gap-3">
        {earnedBadges.slice(0, 3).map((badge) => (
          <div key={badge.id} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
            <Award className="h-4 w-4 text-siso-orange" />
            <div>
              <p className="text-sm text-white">{badge.name}</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Unlocked {badge.unlockedAt ?? "—"}</p>
            </div>
          </div>
        ))}
      </div>
      {inProgressBadges.length ? (
        <div className="mt-3 rounded-2xl border border-dashed border-white/15 bg-white/5 px-3 py-2 text-xs text-white/70">
          {inProgressBadges[0].name} at {inProgressBadges[0].progress ?? 0}% • {inProgressBadges[0].reward}
        </div>
      ) : null}
    </WidgetShell>
  );
}

export function TierWidget({ tierMeta, metrics }: TierWidgetProps) {
  return (
    <WidgetShell
      statLabel="Current tier"
      statValue={tierMeta.currentTier}
      meta={`${tierMeta.progressPct}% to ${tierMeta.nextTier}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <div className="relative h-20 w-20 shrink-0">
            <svg viewBox="0 0 36 36" className="h-20 w-20">
              <path
                className="text-white/10"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845
 a 15.9155 15.9155 0 0 1 0 31.831
 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-siso-orange"
                strokeWidth="3"
                strokeDasharray={`${tierMeta.progressPct}, 100`}
                stroke="currentColor"
                fill="none"
                d="M18 2.0845
 a 15.9155 15.9155 0 0 1 0 31.831
 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
              {tierMeta.progressPct}%
            </div>
          </div>
          <div className="w-full min-w-0 space-y-2">
            {metrics.map((metric) => (
              <div key={metric.id}>
                <p className="text-xs text-white/70">{metric.label}</p>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-siso-orange to-orange-200"
                    style={{ width: `${Math.min(100, Math.round((metric.value / metric.target) * 100))}%` }}
                  />
                </div>
                <p className="text-[11px] text-white/60">{metric.helper}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}

export function WalletWidget({ balance, nextPayout, connectedRails, ledgerPreview, compliance }: WalletWidgetProps) {
  return (
    <WidgetShell statLabel="Balance" statValue={balance} meta={`Next payout ${nextPayout}`}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-white/60">
            {connectedRails.map((rail) => (
              <Chip key={rail} label={rail} />
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">Recent ledger</p>
            {ledgerPreview.slice(0, 2).map((entry) => (
              <div key={entry.id} className="mt-2 flex items-center justify-between text-xs">
                <span>{entry.description}</span>
                <span className={entry.amount.startsWith("-") ? "text-rose-300" : "text-emerald-300"}>{entry.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {compliance.slice(0, 2).map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>{item.label}</span>
                <span className="inline-flex items-center gap-1 text-white">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" /> {item.progress}%
                </span>
              </div>
              <Progress value={item.progress} className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    </WidgetShell>
  );
}

function WidgetShell({ statLabel, statValue, meta, children }: WidgetShellProps) {
  return (
    <article className="rounded-[22px] border border-white/10 bg-white/5 p-5 text-white shadow-[0_12px_28px_rgba(0,0,0,0.3)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          {statLabel ? <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">{statLabel}</p> : null}
          <p className="text-2xl font-semibold text-white">{statValue}</p>
          {meta ? <p className="text-xs text-white/70">{meta}</p> : null}
        </div>
      </div>
      <div className="mt-4 space-y-3 text-sm text-white/80">{children}</div>
    </article>
  );
}

type WidgetShellProps = {
  statLabel?: string;
  statValue: string;
  meta?: string;
  children: ReactNode;
};

function Chip({ label }: { label: string }) {
  return <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70">{label}</span>;
}
