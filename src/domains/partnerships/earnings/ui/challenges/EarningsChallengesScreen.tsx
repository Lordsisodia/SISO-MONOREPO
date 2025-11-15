"use client";

import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Progress from "@/components/ui/progress";
import { earningsChallenges } from "@/domains/partnerships/earnings/data/earningsChallenges";
import { cn } from "@/domains/shared/utils/cn";
import { Trophy, UsersRound, Zap, CheckCircle2 } from "lucide-react";

export function EarningsChallengesScreen() {
  const active = earningsChallenges.filter((c) => c.status === "active");
  const upcoming = earningsChallenges.filter((c) => c.status === "upcoming");
  const completed = earningsChallenges.filter((c) => c.status === "completed");

  const seasonName = "Q4 Momentum Series";
  const seasonDeadline = "Ends Dec 20";
  const seasonReward = "+12% payout booster";

  return (
    <section className="relative flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
        <div className="pointer-events-none absolute inset-0 z-0">
          <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] pt-8">
          <HighlightCard
            color="orange"
            className="w-full pr-16"
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

        <SettingsGroupCallout
          icon={<Zap className="h-4 w-4" />}
          title="Challenge Control Room"
          subtitle="Season status, rewards, and rules at a glance"
          showChevron={false}
        >
          <div className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
            <ControlStat label="Season" value={seasonName} helper={seasonDeadline} />
            <ControlStat label="Reward" value={seasonReward} helper="Applies to all verified closes" />
            <ControlStat label="Active players" value={`${active.length}`} helper="Enrolled this week" />
            <ControlStat label="Points available" value="1,250" helper="Across all missions" />
          </div>
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

function ControlStat({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-left">
      <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">{label}</p>
      <p className="text-xl font-semibold text-white">{value}</p>
      {helper ? <p className="text-xs text-white/70">{helper}</p> : null}
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
        {!isCompleted ? (
          <Button size="sm" className="rounded-2xl">
            Update progress
          </Button>
        ) : null}
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
