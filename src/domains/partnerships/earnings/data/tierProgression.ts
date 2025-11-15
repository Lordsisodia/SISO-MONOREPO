export type TierId = "Starter" | "Active" | "Prime" | "Collective";

export type TierMetric = {
  id: string;
  label: string;
  value: number;
  target: number;
  helper: string;
};

export type TierBenefit = {
  perk: string;
  tiers: Record<TierId, string>;
};

export type UnlockMission = {
  id: string;
  title: string;
  description: string;
  reward: string;
  steps: string[];
};

export type TierHistoryEntry = {
  id: string;
  tier: TierId;
  date: string;
  note: string;
};

export const tierMeta = {
  currentTier: "Active" as TierId,
  nextTier: "Prime" as TierId,
  pointsToNext: 320,
  estUpgradeDate: "Est. Jan 26",
  progressPct: 68,
};

export const tierMetrics: TierMetric[] = [
  { id: "activity", label: "Activity points", value: 680, target: 1000, helper: "Submit 320 more" },
  { id: "nps", label: "Client NPS", value: 4.7, target: 4.8, helper: "Avg of last 5 surveys" },
  { id: "revenue", label: "Revenue contribution", value: 88, target: 100, helper: "% of Prime threshold" },
];

export const tierBenefits: TierBenefit[] = [
  {
    perk: "Commission rate",
    tiers: {
      Starter: "12%",
      Active: "14%",
      Prime: "16%",
      Collective: "18%",
    },
  },
  {
    perk: "Beta feature access",
    tiers: {
      Starter: "Launch previews",
      Active: "+ Ops betas",
      Prime: "Ops + Growth betas",
      Collective: "All betas + roadmap vote",
    },
  },
  {
    perk: "Support SLA",
    tiers: {
      Starter: "72h",
      Active: "48h",
      Prime: "24h",
      Collective: "Dedicated captain",
    },
  },
  {
    perk: "Payout boost",
    tiers: {
      Starter: "—",
      Active: "+2%",
      Prime: "+4%",
      Collective: "+6%",
    },
  },
];

export const unlockMissions: UnlockMission[] = [
  {
    id: "verified-wins",
    title: "Verified wins streak",
    description: "Log 3 verified deals in November with NPS ≥ 4.5.",
    reward: "+160 tier points",
    steps: ["Close 3 deals", "Collect feedback", "Upload retros"],
  },
  {
    id: "mentor-hours",
    title: "Mentor hours",
    description: "Host 4 onboarding sessions for Starter partners.",
    reward: "+80 tier points",
    steps: ["Claim mentees", "Schedule sessions", "Log recap"],
  },
];

export const tierHistory: TierHistoryEntry[] = [
  { id: "h1", tier: "Starter", date: "Jan 2024", note: "Joined program" },
  { id: "h2", tier: "Active", date: "May 2024", note: "Hit activity streak + NPS 4.6" },
];
