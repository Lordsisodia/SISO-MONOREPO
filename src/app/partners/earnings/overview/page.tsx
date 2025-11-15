import type { Metadata } from "next";
import { EarningsOverviewScreen } from "@/domains/partnerships/earnings/ui/overview/EarningsOverviewScreen";
import { EarningsPageShell } from "@/domains/partnerships/earnings/ui/components/EarningsPageShell";

export const metadata: Metadata = {
  title: "Earnings Overview",
  description: "Pulse of payouts, pipeline to cash, and quick actions.",
};

export default function PartnersEarningsOverviewPage() {
  return (
    <EarningsPageShell>
      <EarningsOverviewScreen />
    </EarningsPageShell>
  );
}
