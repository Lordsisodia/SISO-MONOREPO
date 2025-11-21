import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Wallet & Payouts • Earnings",
  description: "This route now redirects to Wallet & Payouts.",
};

export default function PartnersEarningsOverviewPage() {
  redirect("/partners/earnings/wallet");
  return null;
}
