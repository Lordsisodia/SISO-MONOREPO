"use client";

import NextLink from "next/link";
import { useState } from "react";
import {
  walletActions,
  walletConnections,
  walletPendingTransfers,
  walletSummaryMetrics,
  walletTransactions,
  walletAnalyticsSnapshot,
  walletSecuritySnapshot,
  type WalletConnectionStatus,
  type WalletPendingTransfer,
} from "./wallet-fixtures";
import { cn } from "@/domains/shared/utils/cn";
import { SettingsDetailLayout } from "@/domains/partnerships/portal-architecture/settings/components/SettingsDetailLayout";
import SectionHeader from "@/domains/shared/ui/settings/SectionHeader";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";
import { HighlightCard } from "@/components/ui/card-5-static";
import { ChevronLeft, Wallet, ArrowUpRight, ArrowDownRight, Clock, Link as LinkIcon, ShieldCheck, Shield, BarChart3 } from "lucide-react";
import { useHydrateOnView } from "@/domains/shared/hooks/useHydrateOnView";
import { FinancialAnalyticsHydrator } from "../components/FinancialAnalyticsHydrator.client";
import { PartnerAlertsHydrator } from "../components/PartnerAlertsHydrator.client";


const trendAccent: Record<"up" | "down", string> = {
  up: "text-emerald-300",
  down: "text-rose-300",
};

const pendingAccent: Record<WalletPendingTransfer["status"], string> = {
  awaiting_clearance: "text-amber-300",
  scheduled: "text-emerald-300",
  needs_review: "text-rose-300",
};

const connectionAccent: Record<WalletConnectionStatus, string> = {
  connected: "text-emerald-300",
  pending: "text-amber-300",
  action_required: "text-rose-300",
};

export function WalletPanel() {
  const { ref, hydrated } = useHydrateOnView<HTMLDivElement>({ rootMargin: "0px 0px -25% 0px" });

  return (
    <SettingsDetailLayout wrapContent={false} compactHeader hideHeader srTitle="Wallet">
      <div ref={ref} className="w-full">
        {hydrated ? <WalletPanelContent /> : <WalletPanelSkeleton />}
      </div>
    </SettingsDetailLayout>
  );
}

function WalletPanelContent() {
  const [security, setSecurity] = useState(walletSecuritySnapshot);

  const handleSecurityUpdate = (updates: Partial<typeof walletSecuritySnapshot>) => {
    setSecurity((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-5">
      {/* Orange hero card (consistent across settings) */}
        <div className="relative min-h-[128px]">
          <NextLink
            href="/partners/settings"
            className="absolute top-1/2 left-3 z-10 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
            aria-label="Back to settings"
          >
            <ChevronLeft className="h-5 w-5" />
          </NextLink>
          <HighlightCard
            color="orange"
            className="w-full pl-12"
            title="Wallet"
            description="Real-time payments, multi-currency support, financial analytics, and more."
            icon={<Wallet className="h-5 w-5" />}
            hideDivider
            hideFooter
            titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
            descriptionClassName="text-xs"
          />
        </div>

      {/* Wallet overview */}
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-4 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
          <SectionHeader icon={<Wallet className="h-5 w-5" />} title="Overview stats" subtitle="Key wallet signals at a glance." />
          <div className="mt-4 grid grid-cols-2 gap-3">
            {walletSummaryMetrics.map((metric) => (
              <article
                key={metric.id}
                className="rounded-3xl border border-white/10 bg-siso-bg-primary/80 p-4 shadow-inner shadow-black/5"
              >
                <div className="text-[11px] uppercase tracking-wide text-siso-text-muted">{metric.label}</div>
                <p className="mt-1 text-xl font-semibold text-siso-text-primary">{metric.amount}</p>
                <p className="text-xs text-siso-text-muted">{metric.descriptor}</p>
                {metric.trendLabel && metric.trendDirection && (
                  <span className={cn("mt-2 flex items-center gap-1 text-xs font-medium", trendAccent[metric.trendDirection])}>
                    {metric.trendDirection === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {metric.trendLabel}
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>

      {/* Cash-out controls (double callout) */}
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
          <SectionHeader icon={<Clock className="h-5 w-5" />} title="Cash-out controls" subtitle="Trigger manual withdrawals or automate thresholds." />
          <ScrimList className="mt-3" ariaLabel="Cash-out actions">
            {walletActions.map((action) => (
              <ScrimList.Row key={action.id}>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-siso-text-primary">{action.title}</p>
                  <p className="text-xs text-siso-text-muted">{action.description}</p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-siso-border px-3 py-1 text-xs font-semibold text-siso-text-primary hover:border-siso-orange hover:text-siso-orange"
                >
                  {action.ctaLabel}
                </button>
              </ScrimList.Row>
            ))}
          </ScrimList>
        </div>

      {/* Connected payout rails (double callout) */}
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
          <SectionHeader icon={<LinkIcon className="h-5 w-5" />} title="Connected payout rails" subtitle="Stripe, banks, and wallets you can cash out to." />
          <ScrimList className="mt-3" ariaLabel="Connected payout rails">
            {walletConnections.map((connection) => (
              <ScrimList.Row key={connection.id}>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-siso-text-primary">{connection.provider}</p>
                  <p className="text-xs text-siso-text-muted">{connection.descriptor}</p>
                  {connection.lastSync && <p className="text-[11px] text-siso-text-muted/80">{connection.lastSync}</p>}
                </div>
                <div className="text-right text-xs">
                  {connection.badge && (
                    <div className="mb-1 inline-flex rounded-full border border-siso-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-siso-text-muted">
                      {connection.badge}
                    </div>
                  )}
                  <span className={cn("font-semibold", connectionAccent[connection.status])}>
                    {connection.status === "connected" && "Connected"}
                    {connection.status === "pending" && "Pending"}
                    {connection.status === "action_required" && "Action required"}
                  </span>
                </div>
              </ScrimList.Row>
            ))}
          </ScrimList>
        </div>

      {/* Pending & holds (double callout) */}
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
          <SectionHeader icon={<ShieldCheck className="h-5 w-5" />} title="Pending & holds" subtitle="See what still needs clearance." />
          <ScrimList className="mt-3" ariaLabel="Pending transfers">
            {walletPendingTransfers.map((transfer) => (
              <ScrimList.Row key={transfer.id}>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-siso-text-primary">{transfer.label}</p>
                  <p className="text-xs text-siso-text-muted">{transfer.eta}</p>
                  {transfer.note && <p className="text-[11px] text-siso-text-muted/85">{transfer.note}</p>}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-siso-text-primary">{transfer.amount}</p>
                  <p className={cn("text-xs font-semibold", pendingAccent[transfer.status])}>
                    {transfer.status === "awaiting_clearance" && "Awaiting clearance"}
                    {transfer.status === "scheduled" && "Scheduled"}
                    {transfer.status === "needs_review" && "Needs review"}
                  </p>
                </div>
              </ScrimList.Row>
            ))}
          </ScrimList>
        </div>

      {/* Recent activity (double callout) */}
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
          <SectionHeader icon={<Wallet className="h-5 w-5" />} title="Recent activity" subtitle="All wallet debits & credits" />
          <ScrimList className="mt-3" ariaLabel="Recent transactions">
            {walletTransactions.slice(0, 4).map((transaction) => (
              <ScrimList.Row key={transaction.id}>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-siso-text-primary">{transaction.label}</p>
                  <p className="text-xs text-siso-text-muted">{transaction.reference} · {transaction.channel}</p>
                  <p className="text-[11px] text-siso-text-muted/80">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className={cn("font-semibold", transaction.direction === "in" ? "text-emerald-300" : "text-rose-300")}>{transaction.amount}</p>
                  <p className="text-xs text-siso-text-muted">{transaction.status}</p>
                </div>
              </ScrimList.Row>
            ))}
          </ScrimList>
          <div className="mt-3 flex justify-end">
            <button type="button" className="text-xs font-semibold text-siso-orange">View ledger</button>
          </div>
        </div>

      {/* Financial analytics */}
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
          <SectionHeader icon={<BarChart3 className="h-5 w-5 text-siso-orange" />} title="Financial analytics" subtitle="Streaming insights, projections, and guidance." />
          <div className="mt-3">
            <FinancialAnalyticsHydrator analytics={walletAnalyticsSnapshot} />
          </div>
        </div>

      {/* Partner security alerts */}
        <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-3 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
          <SectionHeader icon={<Shield className="h-5 w-5 text-siso-orange" />} title="Security & partner alerts" subtitle="Biometrics, trusted devices, and risk notifications." />
          <div className="mt-3">
            <PartnerAlertsHydrator security={security} onSecurityUpdate={handleSecurityUpdate} />
          </div>
        </div>
    </div>
  );
}

function WalletPanelSkeleton() {
  return (
    <div className="space-y-4 px-2 py-4">
      <div className="h-32 rounded-[26px] border border-white/15 bg-white/5 shadow-inner shadow-black/30 animate-pulse" />
      {[0, 1, 2, 3].map((idx) => (
        <div
          key={`wallet-skel-${idx}`}
          className="rounded-[26px] border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/25 animate-pulse space-y-3"
        >
          <div className="h-4 w-1/3 rounded-full bg-white/15" />
          <div className="h-3 w-2/3 rounded-full bg-white/10" />
          <div className="h-24 rounded-2xl bg-white/5" />
        </div>
      ))}
    </div>
  );
}
