import type { Metadata } from "next";
import { EarningsWalletScreen } from "@/domains/partnerships/earnings/ui/wallet/EarningsWalletScreen";
import { EarningsPageShell } from "@/domains/partnerships/earnings/ui/components/EarningsPageShell";

export const metadata: Metadata = {
  title: "Wallet & Payouts • Earnings",
  description: "Manage partner balances, payout schedules, and compliance.",
};

export default function PartnersEarningsWalletPage() {
  return (
    <EarningsPageShell>
      <EarningsWalletScreen />
    </EarningsPageShell>
  );
}
