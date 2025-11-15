import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";
import { BarChart3, Copy, Link2, ShieldCheck, Wallet } from "lucide-react";

const overviewStats = [
  { label: "Revenue", value: "$0", meta: "last 30 days" },
  { label: "Sales", value: "0", meta: "last 30 days" },
  { label: "Clicks", value: "0", meta: "last 30 days" },
  { label: "Total commissions", value: "$0", meta: "all time" },
];

export function AffiliateDashboardView() {
  return (
    <SettingsDetailLayout
      title="Affiliate Dashboard"
      description="Snapshots of performance, payouts, and partner tasks."
      icon={<BarChart3 className="h-6 w-6 text-siso-orange" />}
    >
      <section className="space-y-4">
        <div className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/70 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-siso-bg-tertiary/70 text-2xl">🏅</div>
            <div className="space-y-1">
              <p className="text-base font-semibold tracking-[0.1em] text-siso-text-primary">Affiliate Dashboard</p>
              <p className="text-xs text-siso-text-muted">sam.geracitano19@gmail.com</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-2xl border border-dashed border-siso-border/70 px-3 py-2 text-xs text-siso-text-muted">
            <Wallet className="h-3.5 w-3.5" />
            Wallet not set — add a payout address to unlock commissions.
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-siso-text-muted">
            <span>Overview</span>
            <button className="flex items-center gap-1 rounded-full border border-siso-border/80 px-3 py-1 text-[11px] tracking-[0.2em] text-siso-text-primary">
              Last 30 days
            </button>
          </div>
          <div className="space-y-3">
            {overviewStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/60 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">{stat.label}</p>
                <p className="text-2xl font-semibold text-siso-text-primary">{stat.value}</p>
                <p className="text-[11px] text-siso-text-muted">{stat.meta}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/70 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-siso-text-primary">Affiliate rewards</p>
              <p className="text-xs text-siso-text-muted">24% commission on first-order referrals.</p>
            </div>
            <ShieldCheck className="h-5 w-5 text-siso-orange" />
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">Referral link</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Link2 className="h-3.5 w-3.5 text-siso-orange" />
                <span className="text-xs text-siso-text-muted">Landing page</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-siso-border/80 bg-siso-bg-primary px-3 py-2">
                <span className="flex-1 truncate text-sm text-siso-text-primary">https://join.thesiso.co/ref/partner123</span>
                <button aria-label="Copy" className="rounded-full border border-siso-border/70 p-2 text-siso-text-muted">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/60 p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-siso-text-muted">
            <span>Sales</span>
            <button className="rounded-full border border-siso-border/70 px-3 py-1 text-[11px] tracking-[0.2em] text-siso-text-primary">
              Export CSV
            </button>
          </div>
          <div className="rounded-2xl border border-dashed border-siso-border/70 px-3 py-6 text-center text-xs text-siso-text-muted">
            No sales found yet.
          </div>
        </div>
      </section>
    </SettingsDetailLayout>
  );
}
