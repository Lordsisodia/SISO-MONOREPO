"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

import { HighlightCard } from "@/components/ui/card-5-static";
import { CalendarDays, Download, Filter, Flame } from "lucide-react";

interface TrainingHeroProps {
  overallProgress: number;
  stageLabel: string;
  streakDays: number;
}

const heroQuickActions = [
  { icon: Filter, label: "Filters" },
  { icon: Download, label: "Download syllabus" },
  { icon: CalendarDays, label: "Sync calendar" },
] as const;

export function TrainingHero({ overallProgress, stageLabel, streakDays }: TrainingHeroProps) {
  const router = useRouter();

  return (
    <header className="space-y-4">
      <div className="space-y-3">
        <HighlightCard
          color="orange"
          icon={<span />}
          title="Dashboard"
          description="Enablement resources & live training"
          metricValue=""
          metricLabel=""
          buttonText="View courses"
          onButtonClick={() => router.push("/partners/academy/courses")}
          className="w-full !max-w-none text-left"
          titleClassName="text-2xl font-semibold uppercase tracking-[0.2em] whitespace-nowrap"
          descriptionClassName="mt-1 text-sm font-normal tracking-wide text-white/80"
          hideDivider
          hideFooter
          showCornerIcon={false}
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push("/partners/academy/courses")}
            className="inline-flex items-center justify-center rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-siso-bg-primary shadow-md transition hover:bg-white"
          >
            View courses
          </button>
        </div>
      </div>
      <div className="space-y-4 rounded-3xl border border-white/15 bg-white/5 p-4 text-siso-text-primary shadow-inner shadow-black/5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-siso-text-muted">Overall progress</p>
            <p className="text-lg font-semibold text-siso-text-primary">Academy progress</p>
          </div>
          <span className="text-sm font-semibold text-siso-text-primary">{overallProgress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-siso-orange transition-all"
            style={{ width: `${Math.min(Math.max(overallProgress, 0), 100)}%` }}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-siso-text-muted">
          <span className="flex items-center gap-2 text-siso-text-primary">
            <Flame className="h-4 w-4 text-siso-orange" />
            {streakDays}-day streak
          </span>
          <span>Next requirement: Finish Onboarding Path</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {heroQuickActions.map(({ icon: Icon, label }) => (
          <HeroPill key={label} icon={<Icon className="h-3.5 w-3.5" />} label={label} />
        ))}
      </div>
    </header>
  );
}

interface HeroPillProps {
  icon: ReactNode;
  label: string;
}

function HeroPill({ icon, label }: HeroPillProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-full border border-siso-border/70 bg-transparent px-4 py-2 text-siso-text-muted transition hover:border-white/40 hover:text-siso-text-primary"
    >
      {icon}
      {label}
    </button>
  );
}
