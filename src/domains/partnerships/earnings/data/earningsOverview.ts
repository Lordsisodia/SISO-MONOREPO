export type TimelineStage = {
  id: string;
  label: string;
  count: number;
  sla: string;
};

export type Opportunity = {
  id: string;
  title: string;
  description: string;
  reward: string;
  deadline: string;
};

export type PayoutHistoryEntry = {
  id: string;
  date: string;
  source: string;
  amount: string;
  status: "paid" | "hold" | "processing";
};

export const overviewSummary = {
  monthToDatePayouts: "$24,800",
  qoqDelta: "+12% QoQ",
  nextPayoutDate: "Nov 25",
  projectedCycle: "$32,000",
  pendingReviews: "3 clients in audit",
  avgDealSize: "$8.4k",
};

export const timelineStages: TimelineStage[] = [
  { id: "submitted", label: "Submitted", count: 5, sla: "<24h" },
  { id: "verified", label: "Verified", count: 4, sla: "48h" },
  { id: "audit", label: "In audit", count: 2, sla: "72h" },
  { id: "paid", label: "Paid", count: 12, sla: "—" },
];

export const opportunities: Opportunity[] = [
  {
    id: "double-commission",
    title: "Double commission on LATAM deals",
    description: "Activate LATAM pitch kit to earn +100% on first close this month.",
    reward: "+100% on first LATAM close",
    deadline: "Ends Nov 30",
  },
  {
    id: "ops-promo",
    title: "Ops sprint bonus",
    description: "Complete 4 post-launch audits to unlock $600 bonus.",
    reward: "+$600",
    deadline: "Ends Dec 5",
  },
  {
    id: "referral",
    title: "Referral surge",
    description: "Invite two partners to earn $400 each after activation.",
    reward: "+$800",
    deadline: "Rolling",
  },
];

export const payoutHistory: PayoutHistoryEntry[] = [
  { id: "ph1", date: "Nov 10", source: "Deal • Alpha Labs", amount: "$4,200", status: "paid" },
  { id: "ph2", date: "Nov 4", source: "Bonus • Ops sprint", amount: "$600", status: "paid" },
  { id: "ph3", date: "Oct 28", source: "Deal • Acme Retail", amount: "$3,900", status: "paid" },
  { id: "ph4", date: "Oct 21", source: "Referral", amount: "$400", status: "paid" },
];

export const quickActions = [
  { id: "submit-proof", label: "Submit proof" },
  { id: "share-tax", label: "Share tax details" },
  { id: "connect-wallet", label: "Connect wallet" },
];
