import type { Metadata } from "next";
import { EarningsBadgesScreen } from "@/domains/partnerships/earnings/ui/badges/EarningsBadgesScreen";
import { EarningsPageShell } from "@/domains/partnerships/earnings/ui/components/EarningsPageShell";

export const metadata: Metadata = {
  title: "Badges • Earnings",
  description: "Browse every badge you've earned plus what's left to unlock.",
};

export default function PartnersEarningsBadgesPage() {
  return (
    <EarningsPageShell>
      <EarningsBadgesScreen />
    </EarningsPageShell>
  );
}
