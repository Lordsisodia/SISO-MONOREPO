import { ArrowRight, Briefcase, GraduationCap, LayoutGrid, Presentation, Sparkles } from "lucide-react";
import Link from "next/link";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import type { DashboardCard } from "./types";

export const academyDashboardCards: DashboardCard[] = [
  {
    title: "My Progress",
    description: "Track tiers, XP, and certificates. See exactly how to level up.",
    href: "/partners/academy/my-progress",
    icon: <Sparkles className="h-4 w-4" />,
    stat: "Builder • 71% to next tier",
    widget: {
      type: "progress",
      tier: "Builder",
      percent: 71,
      ptsToNext: 500,
      nextTier: "Vanguard",
    },
  },
  {
    title: "Courses",
    description: "Full catalog with filters; resume where you left off.",
    href: "/partners/academy/courses",
    icon: <GraduationCap className="h-4 w-4" />,
    stat: "3 in progress • 12 available",
    widget: {
      type: "courses",
      available: 12,
      inProgress: 3,
      completed: 1,
    },
  },
  {
    title: "Portfolio",
    description: "Proofs and case studies to share with prospects.",
    href: "/partners/academy/portfolio",
    icon: <Briefcase className="h-4 w-4" />,
    stat: "12 proofs live",
  },
  {
    title: "Training Spotlight",
    description: "This week’s high-impact lesson picked for you.",
    href: "/partners/academy/training-spotlight",
    icon: <Sparkles className="h-4 w-4" />,
    stat: "18 min to complete",
    widget: {
      type: "spotlight",
      lesson: "SISO Induction",
      duration: "18 min",
    },
  },
  {
    title: "Pitch Kit",
    description: "Industry-ready decks and scripts. Share or download instantly.",
    href: "/partners/academy/pitch-kit",
    icon: <Presentation className="h-4 w-4" />,
    stat: "4 kits live",
  },
];

export function AcademyDashboardHero() {
  return (
    <HighlightCard
      color="orange"
      title="Academy dashboard"
      description="Your learning, proofs, and pitches in one place."
      metricValue=""
      metricLabel=""
      icon={<LayoutGrid className="h-5 w-5 text-siso-orange" />}
      hideDivider
      hideFooter
      showCornerIcon={false}
      titleClassName="uppercase tracking-[0.35em] text-white"
      descriptionClassName="text-sm"
    />
  );
}

export function AcademyDashboardCard(card: DashboardCard) {
  return (
    <SettingsGroupCallout icon={card.icon} title={card.title} subtitle={card.description} showChevron={false}>
      <div className="rounded-2xl border border-white/10 siso-inner-card p-4 shadow-[0_12px_28px_rgba(0,0,0,0.3)] flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/80">
            {card.stat}
          </span>
          <Link
            href={card.href}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white transition hover:border-siso-orange hover:text-white"
          >
            Open <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        {renderWidget(card)}
      </div>
    </SettingsGroupCallout>
  );
}

function renderWidget(card: DashboardCard) {
  if (!card.widget) return null;
  switch (card.widget.type) {
    case "progress":
      return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-siso-text-muted space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span>Current tier</span>
            <span className="text-white font-semibold">{card.widget.tier}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500"
              style={{ width: `${card.widget.percent}%` }}
            />
          </div>
          <p className="text-[11px] text-siso-text-muted">
            {card.widget.ptsToNext} pts to {card.widget.nextTier} ({card.widget.percent}%)
          </p>
        </div>
      );
    case "courses":
      return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-siso-text-muted space-y-2">
          {(
            [
              { label: "Available", value: card.widget.available },
              { label: "In progress", value: card.widget.inProgress },
              { label: "Completed", value: card.widget.completed },
            ] as const
          ).map((row) => (
            <div key={row.label} className="flex items-center justify-between text-xs">
              <span>{row.label}</span>
              <span className="text-white font-semibold">{row.value}</span>
            </div>
          ))}
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500"
              style={{
                width: `${Math.min(
                  100,
                  Math.round((card.widget.completed / Math.max(card.widget.available, 1)) * 100),
                )}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-siso-text-muted">
            {card.widget.completed} of {card.widget.available} complete
          </p>
        </div>
      );
    case "spotlight":
      return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-siso-text-muted">
          <div className="flex items-center justify-between text-xs">
            <span>Next lesson</span>
            <span className="text-white font-semibold">{card.widget.lesson}</span>
          </div>
          <p className="text-xs text-siso-text-muted">{card.widget.duration}</p>
        </div>
      );
    default:
      return null;
  }
}
