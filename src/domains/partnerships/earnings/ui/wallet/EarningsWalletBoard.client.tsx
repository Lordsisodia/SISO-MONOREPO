"use client";

import { HighlightCard } from "@/components/ui/card-5-static";
import { Waves } from "@/components/ui/wave-background";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import Progress from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { walletSummary, paymentMethods, complianceChecklist } from "@/domains/partnerships/earnings/data/walletData";
import { payoutHistory } from "@/domains/partnerships/earnings/data/earningsOverview";
import { Filter, Wallet, Shield, HelpCircle, Sparkles } from "lucide-react";
import { cn } from "@/domains/shared/utils/cn";
import { EarningsHeroBackLink } from "@/domains/partnerships/earnings/ui/components/EarningsHeroBackLink";

const primaryActionButtonClass =
  "rounded-2xl !bg-siso-orange !text-black shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition-colors hover:!bg-siso-orange/90 focus-visible:ring-2 focus-visible:ring-siso-orange/40";

export function EarningsWalletBoard() {
  return (
    <section className="relative flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ filter: "blur(6px)", opacity: 0.9 }}
      >
        <Waves
          className="h-full w-full"
          strokeColor="#f8a75c"
          backgroundColor="#0b0b0f"
          pointerSize={0.35}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] pt-8">
        <div className="relative min-h-[128px]">
          <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
            <EarningsHeroBackLink />
          </div>
          <HighlightCard
            color="orange"
            className="w-full pr-16 pl-12"
            title="Wallet & payouts"
            description="Manage balances, payout cadence, and compliance in one place."
            hideDivider
            hideFooter
            titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
            descriptionClassName="text-xs"
            icon={<Wallet className="h-5 w-5" />}
            metricValue=""
            metricLabel=""
            buttonText=""
            onButtonClick={() => {}}
            showCornerIcon={false}
          />
        </div>

        <SettingsGroupCallout
          icon={<Wallet className="h-4 w-4" />}
          title="Overview"
          subtitle="Balance visibility plus quick actions"
          showChevron={false}
        >
          <div className="grid gap-4 rounded-[22px] border border-white/10 bg-white/5 p-4 md:grid-cols-2">
            <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">Balance</p>
              <p className="text-4xl font-semibold text-white">{walletSummary.balance}</p>
              <p className="text-xs text-white/70">Next payout {walletSummary.nextPayoutDate}</p>
              <div className="mt-4 space-y-2">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">Connected rails</p>
                <div className="flex flex-wrap gap-2 text-white/90">
                  {walletSummary.connected.map((method) => (
                    <Badge key={method} className="bg-white/5 text-white/90">
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>
            </section>
            <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">Quick actions</p>
              <p className="text-xs text-white/70">Move funds or wire payouts instantly.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className={primaryActionButtonClass}>Withdraw</Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-white/30 bg-transparent text-white/90 hover:bg-white/5 hover:text-white"
                >
                  Transfer
                </Button>
              </div>
            </section>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Wallet className="h-4 w-4" />}
          title="Payment methods"
          subtitle="Set defaults, sync accounts, add new methods"
          showChevron={false}
        >
          <div className="grid gap-3 md:grid-cols-3">
            {paymentMethods.map((method) => (
              <PaymentMethodCard key={method.id} method={method} />
            ))}
            <button
              type="button"
              className="rounded-[22px] border border-dashed border-white/20 bg-white/5 p-4 text-center text-sm text-white/70"
            >
              + Add method
            </button>
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

        <SettingsGroupCallout
          icon={<Shield className="h-4 w-4" />}
          title="Compliance checklist"
          subtitle="Keep payouts flowing by staying compliant"
          showChevron={false}
        >
          <div className="space-y-3 rounded-[22px] border border-white/10 bg-white/5 p-4">
            {complianceChecklist.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-white/70">{item.description}</p>
                  </div>
                  <Badge className="bg-white/10 text-white/80">{item.progress}%</Badge>
                </div>
                <Progress value={item.progress} className="mt-3" />
                {item.actionLabel ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 rounded-2xl border-white/30 bg-transparent text-white/80 hover:bg-white/5"
                  >
                    {item.actionLabel}
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<HelpCircle className="h-4 w-4" />}
          title="Need help with a payout?"
          subtitle="Our payouts team replies within 24h"
          showChevron={false}
        >
          <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/80">
              Open a ticket or browse the help center for troubleshooting steps on Stripe Connect, bank transfers, and tax documents.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Button className={primaryActionButtonClass}>Open ticket</Button>
              <Button variant="outline" className="rounded-2xl border-white/30 bg-transparent text-white/80 hover:bg-white/5">
                Visit Help Center
              </Button>
            </div>
          </div>
        </SettingsGroupCallout>
      </div>
    </section>
  );
}

function PaymentMethodCard({ method }: { method: (typeof paymentMethods)[number] }) {
  const statusLabel = method.status === "active" ? "Active" : method.status === "needs_sync" ? "Needs sync" : "Draft";
  const statusClass = method.status === "active"
    ? "bg-emerald-500/20 text-emerald-200"
    : method.status === "needs_sync"
      ? "bg-amber-500/20 text-amber-200"
      : "bg-white/10 text-white/70";

  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{method.label}</p>
          <p className="text-xs text-white/70">Ending {method.ending}</p>
        </div>
        <span className={cn("rounded-full px-2 py-0.5 text-[11px] uppercase tracking-[0.3em]", statusClass)}>
          {statusLabel}
        </span>
      </div>
      <p className="mt-3 text-xs text-white/70">Last sync {method.lastSync}</p>
      <div className="mt-3 flex gap-2">
        <Button size="sm" className={primaryActionButtonClass}>Set default</Button>
        <Button
          size="sm"
          variant="outline"
          className="rounded-2xl border-white/30 bg-transparent text-white/80 hover:bg-white/5"
        >
          Sync
        </Button>
      </div>
    </div>
  );
}
