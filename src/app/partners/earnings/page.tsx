import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const earningsWidgets = [
  { title: "Overview", description: "See payouts, commissions, and cashflow trends.", href: "/partners/earnings/overview" },
  { title: "Wallet", description: "Track deposit dates, available balance, and transfer requests.", href: "/partners/earnings/wallet" },
  { title: "Tier progression", description: "Goals, badges, and deals needed for the next tier.", href: "/partners/earnings/tier-progression" },
];

export default function EarningsDashboardPage() {
  const router = useRouter();
  return (
    <PartnersPageShell>
      <div className="space-y-6 p-4 lg:p-8">
        <HighlightCard
          color="orange"
          title="Earnings Dashboard"
          description="Monitor payouts, commissions, and tier momentum from one place."
          metricValue="$4,200"
          metricLabel="next payout"
          buttonText="Open wallet"
          onButtonClick={() => router.push("/partners/earnings/wallet")}
          icon={<span className="text-xl">💰</span>}
          hideDivider
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <SettingsGroupCallout
          icon={<span className="text-xl">🧭</span>}
          title="Quick links"
          subtitle="Navigate directly to the key earnings screens."
          showChevron={false}
        >
          <div className="space-y-3">
            {earningsWidgets.map((widget) => (
              <div key={widget.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">{widget.title}</p>
                  <p className="text-xs text-siso-text-muted">{widget.description}</p>
                </div>
                <Link href={widget.href} className="text-siso-orange text-[11px] uppercase tracking-[0.4em]">
                  Open
                </Link>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout icon={<span className="text-xl">📈</span>} title="What’s trending" subtitle="Live signals" showChevron={false}>
          <div className="grid gap-3 text-xs text-siso-text-muted">
            <p>Commission rate: 22% (Active tier)</p>
            <p>Payout streak: 5 weeks on time</p>
            <p>Top deals: £48k SaaS + £35k Retail</p>
          </div>
        </SettingsGroupCallout>
      </div>
    </PartnersPageShell>
  );
}
