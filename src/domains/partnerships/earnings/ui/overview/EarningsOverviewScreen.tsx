"use client";

import { HighlightCard } from "@/components/ui/card-5-static";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { overviewSummary, timelineStages, opportunities, payoutHistory, quickActions } from "@/domains/partnerships/earnings/data/earningsOverview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Progress from "@/components/ui/progress";
import { Sparkles, Rocket } from "lucide-react";
import { cn } from "@/domains/shared/utils/cn";

export function EarningsOverviewScreen() {
  return (
    <section className="relative flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] pt-8">
        <HighlightCard
          color="orange"
          className="w-full pr-16"
          title="Earnings overview"
          description="Current payouts, upcoming releases, and quick actions."
          hideDivider
          hideFooter
          titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
          descriptionClassName="text-xs"
          icon={<Sparkles className="h-5 w-5" />}
          metricValue=""
          metricLabel=""
          buttonText=""
          onButtonClick={() => {}}
          showCornerIcon={false}
        >
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <SummaryStat label="MTD payouts" value={overviewSummary.monthToDatePayouts} helper={overviewSummary.qoqDelta} />
            <SummaryStat label="Next payout" value={overviewSummary.nextPayoutDate} helper={overviewSummary.pendingReviews} />
            <SummaryStat label="Projected cycle" value={overviewSummary.projectedCycle} helper="Based on verified deals" />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button className="rounded-2xl">View payout calendar</Button>
            <Button variant="outline" className="rounded-2xl border-white/30 text-white/80">
              Export statement
            </Button>
          </div>
        </HighlightCard>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Snapshot"
          subtitle="Key stats driving your payouts"
          showChevron={false}
        >
          <div className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 sm:grid-cols-3">
            <StatCard label="Projected this cycle" value={overviewSummary.projectedCycle} helper="Based on current pipeline" />
            <StatCard label="Pending reviews" value={overviewSummary.pendingReviews} helper="Clients still in audit" />
            <StatCard label="Average deal size" value={overviewSummary.avgDealSize} helper="Last 6 deals" />
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Pipeline to payout"
          subtitle="Track each stage and SLA"
          showChevron={false}
        >
          <div className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 md:grid-cols-4">
            {timelineStages.map((stage) => (
              <div key={stage.id} className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-center">
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">{stage.label}</p>
                <p className="text-2xl font-semibold text-white">{stage.count}</p>
                <p className="text-xs text-white/70">SLA {stage.sla}</p>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Rocket className="h-4 w-4" />}
          title="Opportunities"
          subtitle="Activate promos from SISO Ops"
          showChevron={false}
        >
          <div className="grid gap-3 md:grid-cols-3">
            {opportunities.map((item) => (
              <div key={item.id} className="rounded-[22px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <Badge className="bg-siso-orange/20 text-siso-orange">{item.reward}</Badge>
                </div>
                <p className="mt-2 text-sm text-white/80">{item.description}</p>
                <p className="text-xs text-white/60">{item.deadline}</p>
                <Button size="sm" className="mt-3 rounded-2xl">
                  Activate
                </Button>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Recent payout history"
          subtitle="Last 4 releases"
          showChevron={false}
        >
          <div className="overflow-x-auto rounded-[22px] border border-white/10 bg-white/5">
            <table className="w-full min-w-[600px] text-left text-sm text-white/80">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-[0.3em] text-white/60">Date</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-[0.3em] text-white/60">Source</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-[0.3em] text-white/60">Amount</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-[0.3em] text-white/60">Status</th>
                </tr>
              </thead>
              <tbody>
                {payoutHistory.map((entry) => (
                  <tr key={entry.id} className="border-t border-white/5">
                    <td className="px-4 py-3">{entry.date}</td>
                    <td className="px-4 py-3">{entry.source}</td>
                    <td className="px-4 py-3 font-semibold text-white">{entry.amount}</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-emerald-500/20 text-emerald-200">{entry.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SettingsGroupCallout>

        <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Quick actions</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Button key={action.id} variant="outline" className="rounded-2xl border-white/30 text-white/80">
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryStat({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
      {helper ? <p className="text-xs text-white/70">{helper}</p> : null}
    </div>
  );
}

function StatCard({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">{label}</p>
      <p className="text-xl font-semibold text-white">{value}</p>
      {helper ? <p className="text-xs text-white/70">{helper}</p> : null}
    </div>
  );
}
