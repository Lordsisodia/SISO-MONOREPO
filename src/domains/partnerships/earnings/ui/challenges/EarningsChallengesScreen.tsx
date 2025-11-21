"use client";

import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Waves } from "@/components/ui/wave-background";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Progress from "@/components/ui/progress";
import { earningsChallenges } from "@/domains/partnerships/earnings/data/earningsChallenges";
import { cn } from "@/domains/shared/utils/cn";
import { Trophy, UsersRound, Zap, CheckCircle2, Clock3 } from "lucide-react";
import Link from "next/link";
import { EarningsHeroBackLink } from "@/domains/partnerships/earnings/ui/components/EarningsHeroBackLink";

export function EarningsChallengesScreen() {
  const active = earningsChallenges.filter((c) => c.status === "active");
  const upcoming = earningsChallenges.filter((c) => c.status === "upcoming");
  const completed = earningsChallenges.filter((c) => c.status === "completed");

  const seasonName = "Q4 Momentum Series";
  const seasonDeadline = "Ends Dec 20";
  const seasonCountdown = "28 days left";

  const seasonRules = [
    "Active tier required; squads auto-enrolled when 3+ verified reps",
    "Boost applies to verified closes between Nov 15–Dec 20",
    "Stackable with Wallet boosts up to +20% cap",
  ];

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
              title="Challenges"
              description="Weekly and seasonal pushes to boost commissions."
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
            />
          </div>

        <SettingsGroupCallout
          icon={<Zap className="h-4 w-4" />}
          title="Challenge Control Room"
          subtitle="Season status, rewards, and rules at a glance"
          showChevron={false}
        >
          <SeasonSnapshot
            seasonName={seasonName}
            seasonDeadline={seasonDeadline}
            countdown={seasonCountdown}
            activePlayers={active.length}
            totalPoints="1,250"
            rules={seasonRules}
          />
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Trophy className="h-4 w-4" />}
          title="Active challenges"
          subtitle="Complete these to lock in bonuses"
          showChevron={false}
        >
          <div className="space-y-4">
            {active.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} variant="active" />
            ))}
            {active.length === 0 ? <EmptyState message="No active challenges right now." /> : null}
          </div>
        </SettingsGroupCallout>

        {upcoming.length ? (
          <SettingsGroupCallout
            icon={<UsersRound className="h-4 w-4" />}
            title="Coming soon"
            subtitle="Preview what unlocks next"
            showChevron={false}
          >
            <div className="space-y-3">
              {upcoming.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} variant="upcoming" />
              ))}
            </div>
          </SettingsGroupCallout>
        ) : null}

        {completed.length ? (
          <SettingsGroupCallout
            icon={<CheckCircle2 className="h-4 w-4" />}
            title="Completed"
            subtitle="Recent wins and archived boosts"
            showChevron={false}
          >
            <div className="space-y-3">
              {completed.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} variant="completed" />
              ))}
            </div>
          </SettingsGroupCallout>
        ) : null}
        </div>
      </section>
  );
}

type SeasonSnapshotProps = {
  seasonName: string;
  seasonDeadline: string;
  countdown: string;
  activePlayers: number;
  totalPoints: string;
  rules: string[];
};

function SeasonSnapshot({
  seasonName,
  seasonDeadline,
  countdown,
  activePlayers,
  totalPoints,
  rules,
}: SeasonSnapshotProps) {
  return (
    <div className="space-y-4 rounded-[26px] border border-white/10 bg-black/20 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      <div className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Season</p>
          <p className="text-2xl font-semibold text-white">{seasonName}</p>
          <p className="text-xs text-white/70">{seasonDeadline}</p>
        </div>
        <CountdownChip label={countdown} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SnapshotStat label="Active players" value={`${activePlayers}`} helper="Enrolled this week" />
        <SnapshotStat label="Points pool" value={totalPoints} helper="Across open missions" />
      </div>

      <div className="space-y-2 rounded-[24px] border border-dashed border-white/20 bg-black/30 p-4">
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Rules & eligibility</p>
        <ul className="space-y-1 text-sm text-white/80">
          {rules.map((rule) => (
            <li key={rule} className="flex gap-2">
              <span className="text-siso-orange">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SnapshotStat({
  label,
  value,
  helper,
  accent,
}: {
  label: string;
  value: string;
  helper?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-black/30 p-4">
      <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">{label}</p>
      <p className={cn("text-2xl font-semibold text-white", accent)}>{value}</p>
      {helper ? <p className="text-xs text-white/70">{helper}</p> : null}
    </div>
  );
}

function CountdownChip({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-siso-orange">
      <Clock3 className="h-3.5 w-3.5" />
      {label}
    </div>
  );
}

type ChallengeCardVariant = "active" | "upcoming" | "completed";

type ChallengeCardProps = {
  challenge: typeof earningsChallenges[number];
  variant: ChallengeCardVariant;
};

function ChallengeCard({ challenge, variant }: ChallengeCardProps) {
  const isCompleted = variant === "completed";
  const isUpcoming = variant === "upcoming";

  return (
    <div className={cn(
      "rounded-[24px] border border-white/10 bg-white/5 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)]",
      isUpcoming && "opacity-75",
      isCompleted && "opacity-70",
    )}>
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-base font-semibold text-white">{challenge.name}</p>
            <Badge className="bg-siso-orange/20 text-siso-orange">{challenge.reward}</Badge>
            <Badge variant="secondary" className="bg-white/10 text-white/80">
              {challenge.type === "team" ? "Team" : "Solo"}
            </Badge>
          </div>
          <p className="text-xs text-siso-text-muted">{challenge.description}</p>
        </div>
        <div className="text-right text-xs text-siso-text-muted">
          <p>{challenge.deadline}</p>
          <p className="text-white/70">{challenge.points} pts</p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <Progress value={challenge.progress} />
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
          {challenge.progress}% complete
        </p>
      </div>

      <div className="mt-4 grid gap-2">
        {challenge.actions.map((action) => (
          <div
            key={action.id}
            className={cn(
              "flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm",
              action.completed && "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
            )}
          >
            <span>{action.label}</span>
            {action.completed ? <CheckCircle2 className="h-4 w-4" /> : null}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button asChild size="sm" className="rounded-2xl">
          <Link href={`/partners/earnings/challenges/${challenge.id}`}>
            View challenge
          </Link>
        </Button>
        {challenge.teamName ? (
          <Badge className="bg-white/10 text-white/80">{challenge.teamName}</Badge>
        ) : null}
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 px-4 py-10 text-center text-sm text-siso-text-muted">
      {message}
    </div>
  );
}
