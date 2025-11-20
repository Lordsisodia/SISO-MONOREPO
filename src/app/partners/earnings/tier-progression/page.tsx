import type { Metadata } from "next";
import { EarningsPageShell } from "@/domains/partnerships/earnings/ui/components/EarningsPageShell";
import { EarningsTierProgressionScreen } from "@/domains/partnerships/earnings/ui/tier-progression/EarningsTierProgressionScreen";

export const metadata: Metadata = {
  title: "Tier Progression • Earnings",
  description: "Track partner tier progress and unlock missions.",
};

export default function PartnersEarningsTierProgressionPage() {
  return (
    <EarningsPageShell>
      <EarningsTierProgressionScreen />
    </EarningsPageShell>
  );
}
