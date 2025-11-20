import { Suspense } from "react";
import { ArrowRight, GraduationCap, LayoutGrid, Sparkles, Briefcase, Presentation } from "lucide-react";
import Link from "next/link";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Waves } from "@/components/ui/wave-background";

export const experimental_ppr = true;

const cards = [
  {
    title: "My Progress",
    description: "Track tiers, XP, and certificates. See exactly how to level up.",
    href: "/partners/academy/my-progress",
    icon: <Sparkles className="h-4 w-4" />,
    stat: "Builder • 71% to next tier",
    widget: {
      type: "progress" as const,
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
      type: "courses" as const,
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
      type: "spotlight" as const,
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

export default function AcademyDashboardPage() {
  return (
    <main className="relative min-h-screen bg-siso-bg-primary text-siso-text-primary">
      <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(5px)", opacity: 0.45, height: "120%" }}>
        <Suspense
          fallback={
            <div
              className="h-full w-full bg-[radial-gradient(circle_at_top,#20140a,#050505)] opacity-60"
              aria-hidden="true"
            />
          }
        >
          <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="transparent" pointerSize={0.25} />
        </Suspense>
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
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

        {cards.map((card) => (
          <SettingsGroupCallout
            key={card.title}
            icon={card.icon}
            title={card.title}
            subtitle={card.description}
            showChevron={false}
          >
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

              {card.widget?.type === "progress" ? (
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
              ) : card.widget?.type === "courses" ? (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-siso-text-muted">
                  <div className="flex items-center justify-between text-xs">
                    <span>Available</span>
                    <span className="text-white font-semibold">{card.widget.available}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>In progress</span>
                    <span className="text-white font-semibold">{card.widget.inProgress}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Completed</span>
                    <span className="text-white font-semibold">{card.widget.completed}</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round(
                            (card.widget.completed / Math.max(card.widget.available, 1)) * 100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-siso-text-muted">
                    {card.widget.completed} of {card.widget.available} complete
                  </p>
                </div>
              ) : card.widget?.type === "spotlight" ? (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-siso-text-muted">
                  <div className="flex items-center justify-between text-xs">
                    <span>Next lesson</span>
                    <span className="text-white font-semibold">{card.widget.lesson}</span>
                  </div>
                  <p className="text-xs text-siso-text-muted">{card.widget.duration}</p>
                </div>
              ) : null}
            </div>
          </SettingsGroupCallout>
        ))}
      </div>
    </main>
  );
}
