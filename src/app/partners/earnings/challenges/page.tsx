import type { Metadata } from "next";
import { EarningsChallengesScreen } from "@/domains/partnerships/earnings/ui/challenges/EarningsChallengesScreen";
import { EarningsPageShell } from "@/domains/partnerships/earnings/ui/components/EarningsPageShell";

export const metadata: Metadata = {
  title: "Challenges • Earnings",
  description: "Track seasonal boosts, team missions, and payout multipliers.",
};

export default function PartnersEarningsChallengesPage() {
  return (
    <EarningsPageShell>
      <EarningsChallengesScreen />
    </EarningsPageShell>
  );
}
