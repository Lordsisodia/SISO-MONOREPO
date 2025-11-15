import type { Metadata } from "next";
import { EarningsTierProgressionScreen } from "@/domains/partnerships/earnings/ui/tier-progression/EarningsTierProgressionScreen";
import { EarningsPageShell } from "@/domains/partnerships/earnings/ui/components/EarningsPageShell";

export const metadata: Metadata = {
  title: "Tier Progression • Earnings",
  description: "Track requirements, benefits, and history for your partner tier.",
};

export default function PartnersEarningsTierProgressionPage() {
  return (
    <EarningsPageShell>
      <EarningsTierProgressionScreen />
    </EarningsPageShell>
  );
}
