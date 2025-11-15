import type { ReactNode } from "react";

import { CalendarDays, Download, Filter, Flame, GraduationCap, MoreHorizontal } from "lucide-react";

import { GlowDivider } from "@/domains/shared/components/GlowDivider";

interface TrainingHeroProps {
  overallProgress: number;
  stageLabel: string;
  streakDays: number;
}

export function TrainingHero({ overallProgress, stageLabel, streakDays }: TrainingHeroProps) {
  return (
    <header className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6 text-siso-orange" />
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-siso-text-muted">{stageLabel}</p>
            <h1 className="text-xl font-semibold uppercase tracking-[0.35em] text-siso-text-primary">Training Hub</h1>
          </div>
        </div>
        <button
          type="button"
          aria-label="Training hub menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-siso-border text-siso-text-muted"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      <GlowDivider />
      <div className="flex flex-col gap-4 rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-siso-text-muted">Overall progress</p>
            <p className="text-3xl font-semibold text-siso-text-primary">{overallProgress}%</p>
          </div>
          <div className="flex flex-col items-end text-right text-sm text-siso-text-muted">
            <span className="flex items-center gap-1 text-siso-text-primary">
              <Flame className="h-4 w-4 text-siso-orange" />
              {streakDays} day streak
            </span>
            <span>Next requirement: Finish Onboarding Path</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <HeroPill icon={<Filter className="h-3.5 w-3.5" />} label="Filters" />
          <HeroPill icon={<Download className="h-3.5 w-3.5" />} label="Download syllabus" />
          <HeroPill icon={<CalendarDays className="h-3.5 w-3.5" />} label="Sync calendar" />
        </div>
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
      className="flex items-center gap-2 rounded-full border border-siso-border px-4 py-2 text-siso-text-muted"
    >
      {icon}
      {label}
    </button>
  );
}
