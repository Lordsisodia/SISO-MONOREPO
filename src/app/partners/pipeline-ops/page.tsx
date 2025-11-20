import Link from "next/link";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Button } from "@/components/ui/button";
import { Waves } from "@/components/ui/wave-background";
import { ArrowUpRight, LifeBuoy, Send, Users2, CheckCircle2, Circle, Sparkles } from "lucide-react";

const submitClientStats = {
  currentDraft: {
    name: "Aurora Mobility",
    stage: "Commercials",
    progress: 72,
    updatedAt: "Updated 3h ago",
    checklist: [
      { id: "terms", label: "Commercial terms", done: true },
      { id: "pricing", label: "Pricing breakdown", done: false },
      { id: "sow", label: "Attach SOW PDF", done: false },
    ],
    nextRequirement: "Add pricing breakdown & attach SOW PDF",
  },
};

const prospectsStats = {
  total: 48,
  new24h: 3,
  unattended: 7,
  stageBreakdown: [
    { label: "Prospecting", count: 14, color: "bg-orange-300" },
    { label: "Qualified", count: 11, color: "bg-amber-300" },
    { label: "Proposal", count: 9, color: "bg-yellow-300" },
    { label: "Negotiation", count: 8, color: "bg-lime-300" },
    { label: "Won", count: 4, color: "bg-emerald-300" },
    { label: "Lost", count: 2, color: "bg-white/30" },
  ],
  topAction: {
    company: "Northwind Retail",
    action: "Send pricing breakdown + demo invite",
    due: "Today",
  },
};

type SubmitCallout = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: typeof Send;
  type: "submit";
  cta: string;
};

type ProspectsCallout = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: typeof Users2;
  type: "prospects";
  cta: string;
  cards: Array<{ label: string; heading: string; description: string; meta?: string }>;
};

const pipelineCallouts: Array<SubmitCallout | ProspectsCallout> = [
  {
    id: "submit",
    title: "Submit client",
    subtitle: "Route new opportunities to SISO with full commercial context.",
    href: "/partners/pipeline-ops/submit-client",
    icon: Send,
    type: "submit" as const,
    cta: "Open submit client",
  },
  {
    id: "prospects",
    title: "Prospects",
    subtitle: "Work your queue, log nudges, and move leads into motion.",
    href: "/partners/pipeline-ops/prospects",
    icon: Users2,
    type: "prospects" as const,
    cta: "Open prospects",
    cards: [
      {
        label: "Total in funnel",
        heading: `${prospectsStats.total}`,
        description: "Prospects actively tracked",
        meta: `+${prospectsStats.new24h} new in 24h`,
      },
      {
        label: "Untouched",
        heading: `${prospectsStats.unattended}`,
        description: "Haven't been nudged in 7d",
      },
      {
        label: prospectsStats.stageBreakdown[0].label,
        heading: `${prospectsStats.stageBreakdown[0].count}`,
        description: "Largest stage volume",
      },
      {
        label: "Win rate",
        heading: "63%",
        description: "Rolling 30d win rate",
      },
    ],
  },
];

export default function PipelineOpsDashboardPage() {
  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "pipeline" }}>
      <main className="relative min-h-screen overflow-hidden bg-siso-bg-primary text-siso-text-primary">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(5px)", opacity: 0.4, height: "120%" }}>
          <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="transparent" pointerSize={0.25} />
        </div>
        <div className="relative z-10 space-y-6 p-4 lg:p-8">
          <HighlightCard
            color="orange"
            title={"Client\u00A0Pipeline Dashboard"}
            description="Centralize your client pipeline, referrals, and deal health in one place."
            icon={<span className="sr-only">Client Pipeline</span>}
            showCornerIcon={false}
            hideDivider
            titleClassName="uppercase tracking-[0.3em] text-white text-[1.15rem] leading-6 sm:text-[1.35rem]"
            descriptionClassName="text-sm"
          />

          {pipelineCallouts.map((callout) => {
            const Icon = callout.icon;
            if (callout.type === "submit") {
              return (
                <SettingsGroupCallout
                  key={callout.id}
                  icon={<Icon className="h-4 w-4" />}
                  title={callout.title}
                  subtitle={callout.subtitle}
                  showChevron={false}
                >
                  <article className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white">
                    <div className="flex flex-col gap-1">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">Current draft</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-semibold">{submitClientStats.currentDraft.name}</span>
                        <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-white/70">
                          {submitClientStats.currentDraft.stage}
                        </span>
                        <span className="text-[11px] text-white/60">{submitClientStats.currentDraft.updatedAt}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/60">
                        <span>Form completion</span>
                        <span>{submitClientStats.currentDraft.progress}%</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10" aria-label="Current draft completion" role="img">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500"
                          style={{ width: `${submitClientStats.currentDraft.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      {submitClientStats.currentDraft.checklist.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 text-xs text-white/80">
                          {item.done ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <Circle className="h-4 w-4 text-white/40" />}
                          <span className={item.done ? "line-through text-white/60" : undefined}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-siso-text-muted">Next up: {submitClientStats.currentDraft.nextRequirement}</p>
                  </article>
                  <Button asChild size="sm" className="mt-4 w-full rounded-full bg-white/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-white/30">
                    <Link href={callout.href} aria-label="Resume current submit client draft">
                      Resume draft
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </SettingsGroupCallout>
              );
            }

            if (callout.type === "prospects") {
              return (
                <SettingsGroupCallout
                  key={callout.id}
                  icon={<Icon className="h-4 w-4" />}
                  title={callout.title}
                  subtitle={callout.subtitle}
                  showChevron={false}
                >
                  <article className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white">
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[{ label: "Total", value: prospectsStats.total }, { label: "New (24h)", value: `+${prospectsStats.new24h}` }, { label: "Untouched 7d", value: prospectsStats.unattended }].map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-center">
                          <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">{stat.label}</p>
                          <p className="text-2xl font-semibold leading-tight">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/60">
                        <span>Stage mix</span>
                        <span>{prospectsStats.stageBreakdown[0].label}</span>
                      </div>
                      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                        {prospectsStats.stageBreakdown.map((stage) => (
                          <div
                            key={stage.label}
                            className={stage.color}
                            style={{ width: `${(stage.count / prospectsStats.total) * 100}%` }}
                          />
                        ))}
                      </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-white/70">
                      {prospectsStats.stageBreakdown.map((stage) => (
                        <div key={stage.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-2.5 py-1.5">
                          <span className="flex items-center gap-1.5">
                            <span className={`h-1.5 w-1.5 rounded-full ${stage.color}`} />
                            <span className="text-[9px] uppercase tracking-[0.25em] text-white/60">{stage.label}</span>
                          </span>
                          <span className="text-sm font-semibold text-white/90">{stage.count}</span>
                        </div>
                      ))}
                    </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Top next action</p>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-white">{prospectsStats.topAction.company}</span>
                        <span className="text-xs text-siso-text-muted">Due {prospectsStats.topAction.due}</span>
                      </div>
                      <p className="text-sm text-white/80">{prospectsStats.topAction.action}</p>
                    </div>
                  </article>
                  <Button asChild size="sm" className="mt-4 w-full rounded-full bg-white/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-white/30">
                    <Link href={callout.href} aria-label="Open prospects table">
                      Open prospects
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </SettingsGroupCallout>
              );
            }

            return null;
          })}

          <SettingsGroupCallout
            icon={<Sparkles className="h-4 w-4" />}
            title="App Plan Generator"
            subtitle="Draft custom scopes and pitches automatically."
            showChevron={false}
          >
            <article className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">Coming soon</p>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70">
                  Q1 launch
                </span>
              </div>
              <p className="text-xs text-white/70">
                Answer a few prompts—goals, timeline, budget—and we’ll return a pitch-ready plan with recommended
                features, timelines, and next steps you can drop into prospects.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-white/70">
                <span className="rounded-full border border-white/15 px-3 py-1">Auto-scoped features</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Shareable plan links</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Workspace sync</span>
              </div>
            </article>
          </SettingsGroupCallout>

          <Link
            href="/partners/community/help"
            className="group flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition hover:border-siso-orange/60"
          >
            <span className="flex items-center gap-3">
              <LifeBuoy className="h-5 w-5 text-siso-orange" />
              <span>
                Need more guidance? <span className="text-white/70">Visit the Help Center</span>
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-white/60 group-hover:text-white" />
          </Link>
        </div>
      </main>
    </LazyPartnersPageShell>
  );
}
