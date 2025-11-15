import type { Metadata } from "next";
import { EarningsAchievementsScreen } from "@/domains/partnerships/earnings/ui/achievements/EarningsAchievementsScreen";
import { EarningsPageShell } from "@/domains/partnerships/earnings/ui/components/EarningsPageShell";

export const metadata: Metadata = {
  title: "Achievements • Earnings",
  description: "Badge progress, leaderboards, and shoutouts for the partner program.",
};

export default function PartnersEarningsAchievementsPage() {
  return (
    <EarningsPageShell>
      <EarningsAchievementsScreen />
    </EarningsPageShell>
  );
}
