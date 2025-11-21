import Link from "next/link";
import type { ReactNode } from "react";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Waves } from "@/components/ui/wave-background";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Button } from "@/components/ui/button";
import { Compass, KanbanSquare, Users2, BarChart3, ArrowRight } from "lucide-react";

const heroCard = {
  title: "Recruitment dashboard",
  description: "Watch invite flow, team activation, and overall performance in one glance.",
};

type RecruitmentWidget =
  | {
      type: "pipeline";
      total: number;
      stalled: number;
      segments: Array<{ label: string; value: number; color: string }>;
      helper: string;
    }
  | {
      type: "team";
      metrics: Array<{ label: string; value: string; helper?: string }>;
      coverage: string;
    }
  | {
      type: "performance";
      payoutQueued: string;
      approvalRate: number;
      months: Array<{ label: string; value: number }>;
    };

type DashboardTile = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  ctaLabel: string;
  icon: ReactNode;
  stat: string;
  widget: RecruitmentWidget;
};

const dashboardTiles: DashboardTile[] = [
  {
    id: "prospects",
    title: "Prospects",
    subtitle: "Stage mix, SLA breaches, and next outreach.",
    href: "/partners/recruitment/prospects",
    ctaLabel: "Open prospects",
    icon: <KanbanSquare className="h-4 w-4" aria-hidden />,
    stat: "32 in pipeline · 6 stalled",
    widget: {
      type: "pipeline",
      total: 32,
      stalled: 6,
      helper: "Reset SLAs on anything paused >7d",
      segments: [
        { label: "Sourcing", value: 12, color: "bg-orange-300" },
        { label: "Interview", value: 9, color: "bg-amber-300" },
        { label: "Compliance", value: 7, color: "bg-emerald-300" },
        { label: "Approved", value: 4, color: "bg-sky-300" },
      ],
    },
  },
  {
    id: "team",
    title: "Sales Team",
    subtitle: "Roster health, coverage, and coaching needs.",
    href: "/partners/recruitment/team",
    ctaLabel: "Review team",
    icon: <Users2 className="h-4 w-4" aria-hidden />,
    stat: "18 live · 3 coaching touches",
    widget: {
      type: "team",
      metrics: [
        { label: "On track", value: "12", helper: "Submitted activity in last 72h" },
        { label: "Light activity", value: "6", helper: "Needs reminder" },
        { label: "Coaching queue", value: "3", helper: "Shadow call scheduled" },
      ],
      coverage: "Healthcare + Manufacturing unassigned",
    },
  },
  {
    id: "performance",
    title: "Performance",
    subtitle: "Approval velocity and payout momentum.",
    href: "/partners/recruitment/performance",
    ctaLabel: "View performance",
    icon: <BarChart3 className="h-4 w-4" aria-hidden />,
    stat: "62% invite → approval",
    widget: {
      type: "performance",
      payoutQueued: "$48K queued",
      approvalRate: 62,
      months: [
        { label: "Aug", value: 18 },
        { label: "Sep", value: 24 },
        { label: "Oct", value: 26 },
        { label: "Nov", value: 30 },
      ],
    },
  },
];

export function RecruitmentDashboardContent() {
  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "recruitment" }}>
      <section className="relative min-h-screen overflow-hidden bg-siso-bg-primary text-siso-text-primary">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(5px)", opacity: 0.4, height: "120%" }}>
          <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="transparent" pointerSize={0.25} />
        </div>

        <div className="relative z-10 space-y-6 p-4 lg:p-8">
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
              <SettingsGroupCallout key={tile.id} icon={tile.icon} title={tile.title} subtitle={tile.subtitle} showChevron={false}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white shadow-[0_12px_28px_rgba(0,0,0,0.28)]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/80">{tile.stat}</span>
                  </div>
                  <div className="mt-4">{renderWidget(tile.widget)}</div>
                </div>
                <CalloutButton href={tile.href} label={tile.ctaLabel} />
              </SettingsGroupCallout>
            ))}
          </div>
        </div>
      </section>
    </LazyPartnersPageShell>
  );
}

function CalloutButton({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      size="sm"
      className="mt-4 w-full rounded-full bg-white/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-white/30"
    >
      <Link href={href} className="inline-flex items-center justify-center gap-2">
        {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  );
}

function renderWidget(widget: RecruitmentWidget) {
  switch (widget.type) {
    case "pipeline": {
      const total = widget.segments.reduce((sum, seg) => sum + seg.value, 0);
      return (
        <div className="space-y-3 text-sm text-white/70">
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div className="flex h-full w-full">
              {widget.segments.map((segment) => (
                <span
                  key={segment.label}
                  className={`${segment.color} block h-full`}
                  style={{ width: `${(segment.value / Math.max(total, 1)) * 100}%` }}
                />
              ))}
            </div>
          </div>
          <div className="grid gap-2 text-xs text-white/60 sm:grid-cols-2">
            {widget.segments.map((segment) => (
              <div key={segment.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-3 py-2">
                <span className="flex items-center gap-2 text-white">
                  <span className={`h-2 w-2 rounded-full ${segment.color}`} aria-hidden="true" />
                  {segment.label}
                </span>
                <span className="font-semibold text-white">{segment.value}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">{widget.helper}</p>
        </div>
      );
    }
    case "team":
      return (
        <div className="space-y-3 text-sm text-white/70">
          {widget.metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">
              <div className="flex items-center justify-between text-xs text-white">
                <span>{metric.label}</span>
                <span className="text-lg font-semibold">{metric.value}</span>
              </div>
              {metric.helper ? <p className="text-[11px] text-white/60">{metric.helper}</p> : null}
            </div>
          ))}
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">{widget.coverage}</p>
        </div>
      );
    case "performance":
      return (
        <div className="space-y-3 text-sm text-white/70">
          <div className="flex items-center justify-between text-xs text-white">
            <span>{widget.payoutQueued}</span>
            <span className="text-white font-semibold">{widget.approvalRate}% approval</span>
          </div>
          <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-black/30 px-3 py-3">
            {widget.months.map((month) => (
              <div key={month.label} className="flex flex-col items-center gap-1 text-[11px] text-white/70">
                <span
                  className="w-4 rounded-full bg-gradient-to-t from-orange-500/20 to-orange-300"
                  style={{ height: `${Math.max(month.value, 8)}px` }}
                />
                <p>{month.label}</p>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default RecruitmentDashboardContent;
