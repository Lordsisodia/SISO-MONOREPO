"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Progress from "@/components/ui/progress";
import { Waves } from "@/components/ui/wave-background";
import { cn } from "@/domains/shared/utils/cn";
import type { EarningsChallenge } from "@/domains/partnerships/earnings/data/earningsChallenges";
import { ArrowLeft, CheckCircle2, Clock3, Trophy, UsersRound } from "lucide-react";

type ChallengeDetailScreenProps = {
  challenge: EarningsChallenge;
};

const statusLabel: Record<EarningsChallenge["status"], string> = {
  active: "Active now",
  upcoming: "Coming soon",
  completed: "Completed",
};

export function ChallengeDetailScreen({ challenge }: ChallengeDetailScreenProps) {
  const isTeam = challenge.type === "team";
  const showTeam = Boolean(challenge.teamName || challenge.teammates?.length);

  return (
    <section className="relative flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
      <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(6px)", opacity: 0.9 }}>
        <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="#0b0b0f" pointerSize={0.35} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] pt-6">
        <Link
          href="/partners/earnings/challenges"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 transition hover:border-siso-orange/60 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to challenges
        </Link>

        <div className="mt-6 space-y-5">
          <div className="rounded-[28px] border border-siso-border bg-siso-bg-secondary/90 p-6 text-white shadow-[0_30px_70px_rgba(0,0,0,0.55)] backdrop-blur">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex-1 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Challenge</p>
                <h1 className="text-3xl font-semibold text-white">{challenge.name}</h1>
                <p className="text-sm text-white/80">{challenge.description}</p>
              </div>
              <Badge className="bg-white/10 text-white/80">{statusLabel[challenge.status]}</Badge>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="bg-siso-orange/20 text-siso-orange">{challenge.reward}</Badge>
              <Badge className="bg-white/10 text-white/80">{challenge.points} pts</Badge>
              <Badge className="bg-white/10 text-white/80 flex items-center gap-1">
                {isTeam ? <UsersRound className="h-3.5 w-3.5" /> : <Trophy className="h-3.5 w-3.5" />}
                {isTeam ? "Team mission" : "Solo mission"}
              </Badge>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <DetailStat label="Deadline" value={challenge.deadline} helper={statusLabel[challenge.status]} />
              <DetailStat label="Region" value={challenge.region ?? "All territories"} helper="Eligible markets" />
              <DetailStat
                label="Reward details"
                value={challenge.rewardDetails ?? challenge.reward}
                helper="Applies after verification"
              />
            </div>
          </div>

          <div className="space-y-5 rounded-[28px] border border-siso-border/80 bg-siso-bg-primary/70 p-6 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Progress</p>
                <p className="text-lg font-semibold text-white">{challenge.progress}% complete</p>
              </div>
              <Button size="sm" className="rounded-2xl">
                Update progress
              </Button>
            </div>
            <Progress value={challenge.progress} />
            <div className="grid gap-3 sm:grid-cols-2">
              {challenge.actions.map((action) => (
                <div
                  key={action.id}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border border-siso-border/60 bg-siso-bg-primary/60 px-4 py-3 text-sm",
                    action.completed && "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
                  )}
                >
                  <span>{action.label}</span>
                  {action.completed ? <CheckCircle2 className="h-4 w-4" /> : null}
                </div>
              ))}
            </div>
          </div>

          {showTeam ? (
            <div className="rounded-[28px] border border-dashed border-siso-border/70 bg-siso-bg-secondary/80 p-6">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Squad</p>
              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <p className="text-lg font-semibold text-white">{challenge.teamName ?? "Solo focus"}</p>
                {challenge.teammates?.length ? (
                  <span className="text-xs text-white/70">{challenge.teammates.length} teammates</span>
                ) : null}
              </div>
              {challenge.teammates?.length ? (
                <ul className="mt-3 flex flex-wrap gap-2 text-sm text-white/80">
                  {challenge.teammates.map((mate) => (
                    <li
                      key={mate}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em]"
                    >
                      {mate}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          <div className="rounded-[28px] border border-siso-border/80 bg-siso-bg-secondary/85 p-6">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">How to finish</p>
            <ol className="mt-3 space-y-2 text-sm text-white/80">
              <li className="flex gap-2">
                <Clock3 className="mt-1 h-4 w-4 text-siso-orange" />
                Submit proof before {challenge.deadline} to lock bonuses.
              </li>
              <li className="flex gap-2">
                <UsersRound className="mt-1 h-4 w-4 text-siso-orange" />
                Tag ops in #wins with recap + attachments.
              </li>
              <li className="flex gap-2">
                <Trophy className="mt-1 h-4 w-4 text-siso-orange" />
                Bonuses hit Wallet once ops verifies checklist items.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailStat({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <div className="rounded-2xl border border-siso-border/60 bg-siso-bg-primary/60 px-4 py-3 text-left">
      <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
      {helper ? <p className="text-xs text-white/70">{helper}</p> : null}
    </div>
  );
}
