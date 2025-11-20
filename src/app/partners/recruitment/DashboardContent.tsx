import Link from "next/link";
import type { ReactNode } from "react";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Compass, KanbanSquare, Users2, BarChart3 } from "lucide-react";

const heroCard = {
  title: "Recruitment dashboard",
  description: "Watch invite flow, team activation, and overall performance in one glance.",
};

type DashboardTile = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  ctaLabel: string;
  icon: ReactNode;
  stats: { label: string; value: string; description?: string }[];
  note?: string;
};

const dashboardTiles: DashboardTile[] = [
  {
    id: "prospects",
    title: "Prospects",
    subtitle: "Stage mix, SLA breaches, and next outreach.",
    href: "/partners/recruitment/prospects",
    ctaLabel: "Open prospects",
    icon: <KanbanSquare className="h-4 w-4" aria-hidden />,
    stats: [
      { label: "Active pipeline", value: "32", description: "Need outreach or interviews" },
      { label: "Stalled >7d", value: "6", description: "Flagged for review" },
    ],
    note: "Next action: send compliance pack to Sasha Bennett.",
  },
  {
    id: "team",
    title: "Sales Team",
    subtitle: "Roster health, coverage, and coaching needs.",
    href: "/partners/recruitment/team",
    ctaLabel: "Review team",
    icon: <Users2 className="h-4 w-4" aria-hidden />,
    stats: [
      { label: "Live partners", value: "18", description: "Cleared to sell" },
      { label: "Needs coaching", value: "3", description: "Action this week" },
    ],
    note: "Coverage gap: Healthcare segment unassigned.",
  },
  {
    id: "performance",
    title: "Performance",
    subtitle: "Approval velocity and payout momentum.",
    href: "/partners/recruitment/performance",
    ctaLabel: "View performance",
    icon: <BarChart3 className="h-4 w-4" aria-hidden />,
    stats: [
      { label: "Referrals YTD", value: "126", description: "62% invite -> approval" },
      { label: "Payout queued", value: "$48K", description: "Clearing Friday" },
    ],
    note: "Momentum: +18% approvals vs last quarter.",
  },
];

export function RecruitmentDashboardContent() {
  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "recruitment" }}>
      <div className="space-y-6 p-4 lg:p-8">
        <HighlightCard
          color="orange"
          title={heroCard.title}
          description={heroCard.description}
          icon={<Compass className="h-5 w-5" aria-hidden />}
          hideDivider
          showCornerIcon={false}
          className="w-full"
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
          fullWidth
        />

        <div className="space-y-4">
          {dashboardTiles.map((tile) => (
            <section key={tile.id} className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              <div className="flex items-start justify-between gap-3 px-4 py-4">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-siso-orange">{tile.icon}</span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white">{tile.title}</p>
                    <p className="text-xs text-white/70 leading-snug max-w-[60ch]">{tile.subtitle}</p>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {tile.stats.map((stat) => (
                    <article key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">{stat.label}</p>
                      <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
                      {stat.description ? <p className="text-xs text-white/70">{stat.description}</p> : null}
                    </article>
                  ))}
                </div>
                {tile.note ? <p className="mt-4 text-sm text-white/70">{tile.note}</p> : null}
                <Link
                  href={tile.href}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:border-siso-orange hover:text-white"
                >
                  {tile.ctaLabel}
                </Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    </LazyPartnersPageShell>
  );
}

export default RecruitmentDashboardContent;
