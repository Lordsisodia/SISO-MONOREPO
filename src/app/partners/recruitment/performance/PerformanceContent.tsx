import { Suspense } from "react";
import Link from "next/link";

import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Waves } from "@/components/ui/wave-background";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BarChart3, TrendingUp, DollarSign, Clock3, Target, Layers, Gauge, PieChart } from "lucide-react";

const heroCard = {
  title: "Partner performance",
  description: "Invite flow, approvals, and revenue momentum in one view.",
};

const performanceTrend = [
  { label: "Oct 21", month: "Oct", day: "21", revenue: 24000, payouts: 11000, approvals: 11 },
  { label: "Oct 28", month: "Oct", day: "28", revenue: 27500, payouts: 13000, approvals: 13 },
  { label: "Nov 04", month: "Nov", day: "04", revenue: 26000, payouts: 14800, approvals: 12 },
  { label: "Nov 11", month: "Nov", day: "11", revenue: 31000, payouts: 16200, approvals: 15 },
  { label: "Nov 18", month: "Nov", day: "18", revenue: 35500, payouts: 18000, approvals: 18 },
];

const keyMetrics = [
  {
    label: "Revenue booked (30d)",
    value: "$182K",
    delta: "+18% vs prior 30d",
    helper: "18 approvals closed",
    icon: <DollarSign className="h-4 w-4" aria-hidden />,
  },
  {
    label: "Payout queue",
    value: "$52K",
    delta: "12 pending overrides",
    helper: "Avg 4.3d to clear",
    icon: <Gauge className="h-4 w-4" aria-hidden />,
  },
  {
    label: "Invite → approval rate",
    value: "62%",
    delta: "+4pp vs Oct",
    helper: "Goal ≥60%",
    icon: <TrendingUp className="h-4 w-4" aria-hidden />,
  },
  {
    label: "Avg invite → approval time",
    value: "9.2 days",
    delta: "-1.1d vs goal",
    helper: "Target 10d",
    icon: <Clock3 className="h-4 w-4" aria-hidden />,
  },
];

const insightItems = [
  {
    title: "Top source",
    detail: "Member referrals drove 58% of approvals; paid social fell to 17%.",
  },
  {
    title: "Revenue per approval",
    detail: "$10.1K avg first-year overrides; +6% after playbook refresh.",
  },
  {
    title: "Aging payouts",
    detail: "3 approvals pending payout >7 days — nudge finance to clear queue.",
  },
];

const conversionStack = [
  { title: "Invites", value: 190, helper: "+12% WoW" },
  { title: "Applications", value: 142, helper: "75% of invites" },
  { title: "Approved", value: 118, helper: "62% conversion" },
  { title: "Revenue", value: "$355K", helper: "In-flight 30d" },
];

const channelMix = [
  { label: "Member referrals", percent: 58, helper: "72 approvals • $205K rev", color: "bg-orange-400" },
  { label: "Paid social", percent: 17, helper: "18 approvals • $42K rev", color: "bg-emerald-400" },
  { label: "Events", percent: 15, helper: "16 approvals • $38K rev", color: "bg-sky-400" },
  { label: "Communities", percent: 10, helper: "12 approvals • $30K rev", color: "bg-purple-400" },
];

export function RecruitmentPerformanceContent() {
  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "recruitment" }}>
      <section className="relative min-h-screen bg-siso-bg-primary text-siso-text-primary">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(5px)", opacity: 0.4, height: "120%" }}>
          <Suspense
            fallback={
              <div className="h-full w-full bg-[radial-gradient(circle_at_top,#20140a,#050505)] opacity-60" aria-hidden="true" />
            }
          >
            <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="transparent" pointerSize={0.25} />
          </Suspense>
        </div>

        <div className="relative z-10 space-y-6 p-4 lg:p-8">
          <div className="relative min-h-[128px]">
            <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
              <Link
                href="/partners/recruitment"
                aria-label="Back to recruitment dashboard"
                className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
            <HighlightCard
              color="orange"
              title={heroCard.title}
              description={heroCard.description}
              icon={<BarChart3 className="h-5 w-5" aria-hidden />}
              hideDivider
              showCornerIcon={false}
              titleClassName="uppercase tracking-[0.35em] text-white"
              descriptionClassName="text-sm"
              fullWidth
              className="pl-12"
            />
          </div>

          <SettingsGroupCallout
            icon={<TrendingUp className="h-4 w-4" />}
            title="Revenue & approvals"
            subtitle="Four-week trend across invites, approvals, and payout-ready revenue"
            showChevron={false}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
              <PerformanceChart />
            </div>
          </SettingsGroupCallout>

          <SettingsGroupCallout icon={<Target className="h-4 w-4" />} title="Key analytics" subtitle="Conversion, payout, and timing signals to monitor" showChevron={false}>
            <div className="grid gap-4 lg:grid-cols-2">
              {keyMetrics.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-[28px] border border-siso-border bg-siso-bg-secondary/80 p-4 text-sm text-white/80"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 text-white">
                      <span className="rounded-2xl bg-white/10 p-2 text-siso-orange">{metric.icon}</span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-white/60">{metric.label}</p>
                        <p className="text-[11px] text-white/50">{metric.helper}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-semibold text-white">{metric.value}</p>
                      <p className="text-xs text-white/60">{metric.delta}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </SettingsGroupCallout>

          <div className="grid gap-4 lg:grid-cols-2">
            <SettingsGroupCallout icon={<Layers className="h-4 w-4" />} title="Insights" subtitle="Signals to share with sales leadership" showChevron={false}>
              <div className="space-y-3 text-sm text-white/80">
                {insightItems.map((item) => (
                  <div key={item.title} className="rounded-[28px] border border-siso-border bg-siso-bg-secondary/80 p-4">
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-xs text-white/60">{item.detail}</p>
                  </div>
                ))}
              </div>
            </SettingsGroupCallout>

            <SettingsGroupCallout icon={<PieChart className="h-4 w-4" />} title="Channel mix" subtitle="Where approvals and revenue originated" showChevron={false}>
              <div className="space-y-3 text-sm text-white/80">
                {channelMix.map((channel) => (
                  <div key={channel.label} className="rounded-[28px] border border-siso-border bg-siso-bg-secondary/80 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${channel.color}`} aria-hidden />
                        <p className="text-white font-semibold">{channel.label}</p>
                      </div>
                      <p className="text-white text-base font-semibold">{channel.percent}%</p>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div className={`h-full ${channel.color}`} style={{ width: `${channel.percent}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-white/60">{channel.helper}</p>
                  </div>
                ))}
              </div>
            </SettingsGroupCallout>
          </div>
        </div>
      </section>
    </LazyPartnersPageShell>
  );
}

function PerformanceChart() {
  const maxRevenue = Math.max(...performanceTrend.map((point) => point.revenue), 1);
  const chartHeight = 160;

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        {performanceTrend.map((point) => {
          const revenueHeight = Math.max((point.revenue / maxRevenue) * chartHeight, 20);
          const payoutHeight = Math.max((point.payouts / maxRevenue) * chartHeight, 12);
          return (
            <div key={point.label} className="flex flex-1 flex-col items-center gap-2 text-xs text-white/70">
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white">{point.approvals}</span>
              <div className="flex items-end gap-1">
                <span
                  className="w-6 rounded-full bg-gradient-to-t from-orange-500/20 to-orange-300"
                  style={{ height: `${revenueHeight}px` }}
                />
                <span
                  className="w-3 rounded-full bg-gradient-to-t from-emerald-600/30 to-emerald-300"
                  style={{ height: `${payoutHeight}px` }}
                />
              </div>
              <div className="text-center text-sm text-white">
                <p className="text-lg font-semibold leading-none">{point.day}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">{point.month}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-white/70">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-gradient-to-t from-orange-500/60 to-orange-200" aria-hidden />
          <span>Revenue booked</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-gradient-to-t from-emerald-600/60 to-emerald-200" aria-hidden />
          <span>Payout-ready overrides</span>
        </div>
      </div>
    </div>
  );
}
