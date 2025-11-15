"use client";

import { useState } from "react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import Progress from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { walletSummary, ledgerEntries, paymentMethods, payoutSchedule, complianceChecklist } from "@/domains/partnerships/earnings/data/walletData";
import { Filter, Wallet, Shield, HelpCircle } from "lucide-react";
import { cn } from "@/domains/shared/utils/cn";

const ledgerFilters = ["all", "earnings", "bonus", "deduction"] as const;
type LedgerFilter = typeof ledgerFilters[number];

export function EarningsWalletScreen() {
  const [filter, setFilter] = useState<LedgerFilter>("all");

  const filteredLedger = ledgerEntries.filter((entry) => (filter === "all" ? true : entry.type === filter));

  return (
    <section className="relative flex min-h-screen flex-col bg-siso-bg-primary text-siso-text-primary">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] pt-8">
        <HighlightCard
          color="orange"
          className="w-full pr-16"
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
        >
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">Balance</p>
              <p className="text-4xl font-semibold text-white">{walletSummary.balance}</p>
              <p className="text-xs text-white/70">Next payout {walletSummary.nextPayoutDate}</p>
            </div>
            <div className="flex gap-2">
              {walletSummary.connected.map((method) => (
                <Badge key={method} className="bg-white/10 text-white/80">{method}</Badge>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button className="rounded-2xl">Withdraw</Button>
            <Button variant="outline" className="rounded-2xl border-white/30 text-white/80">Transfer</Button>
          </div>
        </HighlightCard>

        <SettingsGroupCallout
          icon={<Filter className="h-4 w-4" />}
          title="Ledger"
          subtitle="Filter earnings, bonuses, and deductions"
          showChevron={false}
        >
          <div className="space-y-4 rounded-[22px] border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap gap-2">
              {ledgerFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em]",
                    filter === item ? "border-siso-orange bg-siso-orange/20 text-white" : "border-white/20 text-white/70",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {filteredLedger.map((entry) => (
                <LedgerRow key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Wallet className="h-4 w-4" />}
          title="Payout scheduling"
          subtitle="Cadence, thresholds, and pending withdrawals"
          showChevron={false}
        >
          <div className="grid gap-4 rounded-[22px] border border-white/10 bg-white/5 p-4 md:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Cadence</p>
              <p className="text-2xl font-semibold text-white">{payoutSchedule.cadence}</p>
              <p className="text-xs text-white/70">Next cutoff {payoutSchedule.nextCutoff}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Threshold</p>
              <p className="text-2xl font-semibold text-white">{payoutSchedule.threshold}</p>
              <p className="text-xs text-white/70">{payoutSchedule.pending}</p>
            </div>
            <Button className="rounded-2xl">Edit schedule</Button>
            <Button variant="outline" className="rounded-2xl border-white/30 text-white/80">
              Update tax/KYC
            </Button>
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
                  <Button size="sm" variant="outline" className="mt-3 rounded-2xl border-white/30 text-white/80">
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
              <Button className="rounded-2xl">Open ticket</Button>
              <Button variant="outline" className="rounded-2xl border-white/30 text-white/80">
                Visit Help Center
              </Button>
            </div>
          </div>
        </SettingsGroupCallout>
      </div>
    </section>
  );
}

function LedgerRow({ entry }: { entry: (typeof ledgerEntries)[number] }) {
  const badgeVariant = entry.status === "released" ? "bg-emerald-500/20 text-emerald-200" : entry.status === "hold"
    ? "bg-amber-500/20 text-amber-200"
    : "bg-white/10 text-white/70";
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{entry.description}</p>
          <p className="text-xs text-white/70">{entry.date}</p>
        </div>
        <div className="text-right">
          <p className="text-base font-semibold text-white">{entry.amount}</p>
          <span className={cn("rounded-full px-2 py-0.5 text-[11px] uppercase tracking-[0.3em]", badgeVariant)}>
            {entry.status}
          </span>
        </div>
      </div>
      {entry.note ? <p className="mt-2 text-xs text-amber-200">{entry.note}</p> : null}
    </div>
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
        <Button size="sm" className="rounded-2xl">Set default</Button>
        <Button size="sm" variant="outline" className="rounded-2xl border-white/30 text-white/80">
          Sync
        </Button>
      </div>
    </div>
  );
}
