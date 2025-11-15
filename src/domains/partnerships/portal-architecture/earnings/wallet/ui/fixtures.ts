export type WalletConnectionStatus = "connected" | "pending" | "action_required";

export interface WalletSummaryMetric {
  id: string;
  label: string;
  amount: string;
  descriptor: string;
  trendLabel?: string;
  trendDirection?: "up" | "down";
}

export interface WalletAction {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
}

export interface WalletConnectionMethod {
  id: string;
  provider: string;
  descriptor: string;
  status: WalletConnectionStatus;
  badge?: string;
  lastSync?: string;
}

export interface WalletPendingTransfer {
  id: string;
  label: string;
  amount: string;
  eta: string;
  status: "awaiting_clearance" | "scheduled" | "needs_review";
  note?: string;
}

export interface WalletTransactionEntry {
  id: string;
  label: string;
  reference: string;
  date: string;
  channel: string;
  amount: string;
  direction: "in" | "out";
  status: "paid" | "pending" | "failed";
}

export interface WalletBalanceSnapshot {
  available: string;
  pending: string;
  onHold: string;
  autopayout: {
    amount: string;
    date: string;
  };
  lastPayout: string;
  rewardPoints: string;
}

export const walletSummaryMetrics: WalletSummaryMetric[] = [
  {
    id: "available",
    label: "Available Balance",
    amount: "£18,420",
    descriptor: "Ready to withdraw",
    trendDirection: "up",
    trendLabel: "+12% vs last month",
  },
  {
    id: "pending",
    label: "Pending Clearance",
    amount: "£6,180",
    descriptor: "Scheduled over next 7 days",
    trendDirection: "down",
    trendLabel: "-4% week over week",
  },
  {
    id: "lifetime",
    label: "Lifetime Earned",
    amount: "£212,940",
    descriptor: "Across 146 commissions",
  },
  {
    id: "autopayout",
    label: "Next Auto-Payout",
    amount: "£4,500",
    descriptor: "Runs Nov 15, 2025",
  },
];

export const walletActions: WalletAction[] = [
  {
    id: "withdraw",
    title: "Request Withdrawal",
    description: "Move funds to any connected payout rail instantly or schedule later today.",
    ctaLabel: "Start transfer",
  },
  {
    id: "automate",
    title: "Automate Payouts",
    description: "Set thresholds, pick a cadence, and let cash-outs run in the background.",
    ctaLabel: "Configure",
  },
];

export const walletConnections: WalletConnectionMethod[] = [
  {
    id: "stripe-connect",
    provider: "Stripe Connect",
    descriptor: "Instant payouts · GBP Wallet",
    status: "connected",
    badge: "Primary",
    lastSync: "Synced 2m ago",
  },
  {
    id: "phantom",
    provider: "Phantom Wallet",
    descriptor: "Solana • 4E8C…9F1A",
    status: "connected",
    badge: "Web3",
    lastSync: "Synced today",
  },
  {
    id: "wise",
    provider: "Wise Business",
    descriptor: "Awaiting identity verification",
    status: "pending",
    badge: "KYC",
    lastSync: "Submitted 6h ago",
  },
  {
    id: "hsbc",
    provider: "HSBC Business Account",
    descriptor: "Sort 40-51-62 • •8420",
    status: "action_required",
    badge: "Bank",
    lastSync: "Link to enable same-day wires",
  },
];

export const walletPendingTransfers: WalletPendingTransfer[] = [
  {
    id: "pending-1",
    label: "October performance bonus",
    amount: "£2,300",
    eta: "Releases Nov 10",
    status: "awaiting_clearance",
    note: "Finance reviewing upsell split",
  },
  {
    id: "pending-2",
    label: "Weekly auto-withdrawal",
    amount: "£1,750",
    eta: "Scheduled Nov 8 · Stripe",
    status: "scheduled",
    note: "Will batch with referral payouts",
  },
  {
    id: "pending-3",
    label: "Charge dispute hold",
    amount: "£520",
    eta: "Awaiting client response",
    status: "needs_review",
    note: "Expected resolution within 48h",
  },
];

export const walletTransactions: WalletTransactionEntry[] = [
  {
    id: "tx-5412",
    label: "Agency retainer",
    reference: "Invoice INV-5412",
    date: "Nov 01, 2025",
    channel: "Stripe",
    amount: "+£4,200",
    direction: "in",
    status: "paid",
  },
  {
    id: "tx-5404",
    label: "Auto payout",
    reference: "Stripe Connect",
    date: "Oct 29, 2025",
    channel: "Bank",
    amount: "-£3,750",
    direction: "out",
    status: "paid",
  },
  {
    id: "tx-5381",
    label: "Marketplace sale",
    reference: "Deal SP-883",
    date: "Oct 27, 2025",
    channel: "Wise",
    amount: "+£2,180",
    direction: "in",
    status: "pending",
  },
  {
    id: "tx-5340",
    label: "Manual withdrawal",
    reference: "HSBC",
    date: "Oct 21, 2025",
    channel: "Wire",
    amount: "-£5,000",
    direction: "out",
    status: "paid",
  },
  {
    id: "tx-5308",
    label: "Chargeback reserve",
    reference: "Case CB-209",
    date: "Oct 19, 2025",
    channel: "Stripe",
    amount: "-£520",
    direction: "out",
    status: "failed",
  },
];

export const walletBalanceSnapshot: WalletBalanceSnapshot = {
  available: "£18,420",
  pending: "£6,180",
  onHold: "£1,040",
  autopayout: {
    amount: "£4,500",
    date: "Nov 15, 2025",
  },
  lastPayout: "Oct 29, 2025",
  rewardPoints: "18,900 pts",
};
