export type LedgerEntry = {
  id: string;
  date: string;
  description: string;
  type: "earnings" | "bonus" | "deduction";
  amount: string;
  status: "released" | "hold" | "processing";
  note?: string;
};

export type PaymentMethod = {
  id: string;
  label: string;
  type: "stripe" | "bank" | "crypto";
  ending: string;
  status: "active" | "needs_sync" | "draft";
  lastSync: string;
};

export type ComplianceItem = {
  id: string;
  label: string;
  description: string;
  progress: number;
  actionLabel?: string;
};

export const walletSummary = {
  balance: "$18,420",
  currency: "USD",
  nextPayoutDate: "Nov 25",
  pendingWithdrawal: "$2,400",
  connected: ["Stripe", "Bank", "Crypto"],
};

export const ledgerEntries: LedgerEntry[] = [
  { id: "l1", date: "Nov 14", description: "Deal payout • Alpha Labs", type: "earnings", amount: "+$4,200", status: "released" },
  { id: "l2", date: "Nov 12", description: "Ops bonus • Q3 sprint", type: "bonus", amount: "+$800", status: "released" },
  { id: "l3", date: "Nov 9", description: "Compliance hold • Tax review", type: "deduction", amount: "-$300", status: "hold", note: "Pending W-9" },
  { id: "l4", date: "Nov 7", description: "Deal payout • Acme Retail", type: "earnings", amount: "+$3,600", status: "released" },
];

export const paymentMethods: PaymentMethod[] = [
  { id: "stripe", label: "Stripe Connect", type: "stripe", ending: "acct_3J9…", status: "active", lastSync: "Today • 9:10 AM" },
  { id: "bank", label: "Bank • Wells Fargo", type: "bank", ending: "•••4521", status: "needs_sync", lastSync: "Nov 8" },
  { id: "crypto", label: "USDC Wallet", type: "crypto", ending: "0x94a…e5", status: "active", lastSync: "Nov 10" },
];

export const payoutSchedule = {
  cadence: "Bi-weekly",
  threshold: "$1,000",
  nextCutoff: "Nov 20",
  pending: "$2,400 in queue",
};

export const complianceChecklist: ComplianceItem[] = [
  { id: "kyc", label: "KYC verification", description: "Photo ID + proof of address", progress: 100 },
  { id: "tax", label: "Tax documents", description: "Upload W-9 before Dec 1", progress: 60, actionLabel: "Complete W-9" },
  { id: "invoice", label: "Invoice requirements", description: "Add legal entity + invoice notes", progress: 40, actionLabel: "Update entity" },
];
