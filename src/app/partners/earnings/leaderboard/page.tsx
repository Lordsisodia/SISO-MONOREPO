import type { Metadata } from "next";
import { EarningsLeaderboardScreen } from "@/domains/partnerships/earnings/ui/leaderboard/EarningsLeaderboardScreen";
import { EarningsPageShell } from "@/domains/partnerships/earnings/ui/components/EarningsPageShell";

export const metadata: Metadata = {
  title: "Leaderboard • Earnings",
  description: "Top partners by payouts, points, and boosters for the current season.",
};

export default function PartnersEarningsLeaderboardPage() {
  return (
    <EarningsPageShell>
      <EarningsLeaderboardScreen />
    </EarningsPageShell>
  );
}
