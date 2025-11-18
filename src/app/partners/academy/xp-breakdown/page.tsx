"use client";

import { ArrowLeft, Clock3, ListFilter, Sparkles } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const FallingPattern = dynamic(
  () =>
    import("@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern").then(
      (m) => m.FallingPattern,
    ),
  { ssr: false, loading: () => null },
);

type XPType = "Course" | "Engagement" | "Assessment" | "Onboarding";

type XPItem = { title: string; source: XPType; xp: number; when: string; dateLabel: string };

const xpFeed: XPItem[] = [
  { title: "Finished Discovery Basics", source: "Course", xp: 120, when: "2h ago", dateLabel: "Today" },
  { title: "Shared portfolio link", source: "Engagement", xp: 40, when: "4h ago", dateLabel: "Today" },
  { title: "Completed quiz: Discovery Basics", source: "Assessment", xp: 60, when: "2d ago", dateLabel: "Nov 16" },
  { title: "Watched welcome intro", source: "Onboarding", xp: 25, when: "3d ago", dateLabel: "Nov 15" },
  { title: "Saved pitch kit", source: "Engagement", xp: 15, when: "6d ago", dateLabel: "Nov 12" },
];

const levelProgress = {
  currentLevel: 3,
  percentToNext: 62,
  xpRemaining: 180,
};

export default function XPBreakdownPage() {
  const router = useRouter();

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full opacity-60 [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <div className="relative min-h-[128px]">
          <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
            <button
              onClick={() => router.back()}
              aria-label="Back"
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
          <HighlightCard
            color="orange"
            title="XP Activity"
            description="Review every action that earned you points."
            metricValue={`${xpFeed.reduce((sum, item) => sum + item.xp, 0)} XP`}
            metricLabel="last 7 days"
            icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
            className="w-full pl-12"
            hideDivider
            hideFooter
            showCornerIcon={false}
            titleClassName="uppercase tracking-[0.35em] text-white"
            descriptionClassName="text-sm"
          />
        </div>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="All XP entries"
          subtitle="Lifetime view of your earned points"
          showChevron={false}
        >
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] text-siso-text-muted">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1">
              <Clock3 className="h-3 w-3" />
              Past 7 days
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1">
              Level {levelProgress.currentLevel} • {levelProgress.xpRemaining} XP to next
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1">
              <ListFilter className="h-3 w-3" />
              All types
            </span>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-white/5 divide-y divide-white/10">
            {xpFeed.map((item, idx) => {
              const prevDate = idx > 0 ? xpFeed[idx - 1].dateLabel : null;
              const showDate = item.dateLabel !== prevDate;
              return (
                <div key={`${item.title}-${item.when}`}>
                  {showDate ? (
                    <div className="px-3 pt-3 pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-siso-text-muted">
                      {item.dateLabel}
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between px-3 py-3">
                    <div className="space-y-1">
                      <p className="font-semibold text-white">{item.title}</p>
                      <div className="flex items-center gap-2 text-[12px] text-siso-text-muted">
                        <span className="rounded-full bg-white/[0.07] px-2 py-[2px] uppercase tracking-[0.08em]">
                          {item.source}
                        </span>
                        <span>{item.when}</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-siso-orange">+{item.xp} XP</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 space-y-1 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <div className="flex items-center justify-between text-xs text-siso-text-muted">
              <span>
                Level {levelProgress.currentLevel} • {levelProgress.percentToNext}% to next
              </span>
              <span className="text-white">{levelProgress.xpRemaining} XP remaining</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500"
                style={{ width: `${levelProgress.percentToNext}%` }}
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border border-white/15 text-white/90"
              onClick={() => router.push("/partners/academy/xp-rules")}
            >
              See XP rules →
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="border border-white/15 text-white/90"
              onClick={() => router.push("/partners/academy/xp-breakdown")}
            >
              Export summary
            </Button>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="How XP works"
          subtitle="See the rules for earning points"
          showChevron={false}
        >
          <div className="space-y-2 text-sm text-siso-text-muted">
            <p>Courses and quizzes grant the most XP.</p>
            <p>Engagement (shares, saves) adds small boosts.</p>
            <p>Certificates and milestones may include bonus XP.</p>
            <Button
              variant="ghost"
              size="sm"
              className="border border-white/10"
              onClick={() => router.push("/partners/academy/xp-rules")}
            >
              View XP rules
            </Button>
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
