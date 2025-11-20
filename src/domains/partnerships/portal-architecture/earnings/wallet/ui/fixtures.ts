import type { WalletAnalytics, WalletSecurity } from "../types/enhanced-wallet.types";

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

export const walletAnalyticsSnapshot: WalletAnalytics = {
  spending: {
    total: 4500,
    byCategory: [
      { category: "software", amount: 1200, percentage: 27, trend: { direction: "up", change: 15, period: "month" } },
      { category: "marketing", amount: 800, percentage: 18, trend: { direction: "down", change: -5, period: "month" } },
      { category: "operations", amount: 600, percentage: 13, trend: { direction: "stable", change: 2, period: "month" } },
      { category: "professional", amount: 400, percentage: 9, trend: { direction: "up", change: 4, period: "month" } },
    ],
    byTimePeriod: [],
    trends: [],
    averageTransaction: 145,
    frequency: { perWeek: 12, perMonth: 46, perYear: 260 },
  },
  income: {
    total: 15200,
    sources: [],
    trends: [],
    projections: [],
    growth: { monthly: 8.5, quarterly: 12.3, yearly: 45.6 },
  },
  projections: {
    weekly: [{ date: new Date("2025-11-07"), projected: 2600, confidence: "high", factors: [] }],
    monthly: [{ date: new Date("2025-12-01"), projected: 10500, confidence: "medium", factors: [] }],
    yearly: [{ date: new Date("2026-11-01"), projected: 125000, confidence: "high", factors: [] }],
    confidence: "high",
    factors: [],
  },
  health: {
    score: 78,
    grade: "B",
    factors: [
      { name: "Income Stability", score: 85, weight: 30, description: "Consistent retainer revenue", trend: "stable" },
      { name: "Expense Management", score: 72, weight: 25, description: "Room to trim SaaS and ops", trend: "improving" },
      { name: "Savings Rate", score: 68, weight: 20, description: "Target 20% savings", trend: "declining" },
      { name: "Investment Growth", score: 82, weight: 25, description: "Strong pipeline reinvestment", trend: "improving" },
    ],
    recommendations: [
      "Increase emergency fund to 6 months", "Review software stack quarterly", "Maximize tax-advantaged contributions",
    ],
    lastCalculated: new Date("2025-11-05"),
  },
  insights: [
    {
      id: "insight-1",
      title: "Software spending up 15% MoM",
      description: "Audit subscriptions and sunset unused seats to recover £320/mo.",
      priority: "medium",
      category: "spending",
      status: "new",
      actions: [
        { label: "Review stack" },
        { label: "Consolidate tools" },
      ],
      lastUpdated: new Date("2025-11-02"),
    },
    {
      id: "insight-2",
      title: "Income trending +12% QoQ",
      description: "Maintain upsell cadence with top accounts to lock the run-rate.",
      priority: "high",
      category: "earnings",
      status: "new",
      actions: [{ label: "Schedule exec reviews" }],
      lastUpdated: new Date("2025-10-28"),
    },
  ],
  recommendations: [
    {
      id: "rec-1",
      title: "Automate tax set-asides",
      description: "Route 25% of new commissions into the safeguarded tax wallet.",
      category: "compliance",
      impact: "high",
    },
    {
      id: "rec-2",
      title: "Negotiate FX fees",
      description: "Switch EUR payouts to Wise to cut settlement fees by 1.1%",
      category: "expense",
      impact: "medium",
    },
  ],
};

export const walletSecuritySnapshot: WalletSecurity = {
  biometricAuth: {
    enabled: true,
    fallbackRequired: true,
    lastUsed: new Date("2025-11-07T09:20:00Z"),
    setupComplete: true,
    methods: [
      {
        type: "face_id",
        enabled: true,
        name: "iPhone Face ID",
        deviceFingerprint: "ios-13-pro",
        enrollmentDate: new Date("2024-01-15"),
        lastUsed: new Date("2025-11-07"),
      },
      {
        type: "fingerprint",
        enabled: false,
        name: "Studio Laptop",
        deviceFingerprint: "win-hello",
        enrollmentDate: new Date("2023-09-02"),
      },
    ],
  },
  transactionLimits: {
    daily: { amount: 20000, currency: "GBP", used: 8200, remaining: 11800, resetDate: new Date("2025-11-09") },
    weekly: { amount: 80000, currency: "GBP", used: 54000, remaining: 26000, resetDate: new Date("2025-11-13") },
    monthly: { amount: 250000, currency: "GBP", used: 162000, remaining: 88000, resetDate: new Date("2025-11-30") },
    perTransaction: { amount: 15000, currency: "GBP", used: 0, remaining: 15000, resetDate: new Date("2025-11-09") },
    requiresAuthentication: { above: 5000, method: "multi_factor" },
  },
  securityAlerts: [
    {
      id: "alert-1",
      type: "unusual_login",
      severity: "high",
      message: "New login from Berlin — review activity",
      timestamp: new Date("2025-11-08T06:42:00Z"),
      acknowledged: false,
      actionRequired: true,
      actions: [{ id: "ack", label: "Acknowledge", type: "acknowledge" }],
    },
    {
      id: "alert-2",
      type: "large_transaction",
      severity: "medium",
      message: "£12.4k withdrawal pending review",
      timestamp: new Date("2025-11-07T14:10:00Z"),
      acknowledged: false,
      actionRequired: false,
      actions: [{ id: "details", label: "View details", type: "link", href: "/partners/earnings/wallet" }],
    },
    {
      id: "alert-3",
      type: "security_update",
      severity: "low",
      message: "Biometric fallback disabled on MacBook",
      timestamp: new Date("2025-11-05T11:10:00Z"),
      acknowledged: true,
      actionRequired: false,
      actions: [],
    },
  ],
  trustedDevices: [
    {
      id: "device-1",
      name: "iPhone 15 Pro",
      type: "mobile",
      deviceFingerprint: "ios-15-pro",
      lastUsed: new Date("2025-11-08T22:11:00Z"),
      trustedUntil: new Date("2026-01-08T22:11:00Z"),
      restrictions: [],
    },
    {
      id: "device-2",
      name: "MacBook Studio",
      type: "desktop",
      deviceFingerprint: "mac-studio",
      lastUsed: new Date("2025-11-07T17:33:00Z"),
      trustedUntil: new Date("2025-12-31T23:59:00Z"),
      restrictions: [],
    },
  ],
  loginSessions: [],
  securityScore: 82,
  lastSecurityCheck: new Date("2025-11-07T08:00:00Z"),
};

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
