export type FeaturedBadge = {
  id: string;
  name: string;
  description: string;
  category: string;
  reward: string;
  criteria: string;
  rarity: string;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  metricLabel: string;
  metricValue: string;
  trend: string;
};

export type AchievementCategorySummary = {
  id: string;
  label: string;
  description: string;
  progress: number;
  nextBadge: string;
};

export type Shoutout = {
  id: string;
  message: string;
  timestamp: string;
};

export const featuredBadges: FeaturedBadge[] = [
  {
    id: "momentum-max",
    name: "Momentum Max",
    description: "Maintain 3 straight months of payout growth.",
    category: "Growth",
    reward: "+5% booster",
    criteria: "Submit 9 verified deals across 3 months",
    rarity: "2% of partners",
  },
  {
    id: "ops-sentinel",
    name: "Ops Sentinel",
    description: "Zero SLA misses in a quarter.",
    category: "Ops Excellence",
    reward: "Ops concierge",
    criteria: "Complete 12 post-launch audits on time",
    rarity: "5% of partners",
  },
  {
    id: "community-guide",
    name: "Community Guide",
    description: "Mentor 4 partners through onboarding.",
    category: "Mentorship",
    reward: "Mentor badge + spotlight",
    criteria: "Log 6 mentor hours and 4 mentee reviews",
    rarity: "8% of partners",
  },
];

export const leaderboardEntries: LeaderboardEntry[] = [
  { rank: 1, name: "Nova Carter", metricLabel: "Bonus pts", metricValue: "1,240", trend: "+120" },
  { rank: 2, name: "Leo Summers", metricLabel: "Bonus pts", metricValue: "1,110", trend: "+60" },
  { rank: 3, name: "Sienna Rowe", metricLabel: "Bonus pts", metricValue: "980", trend: "+30" },
  { rank: 8, name: "You", metricLabel: "Bonus pts", metricValue: "720", trend: "+90" },
];

export const categorySummaries: AchievementCategorySummary[] = [
  {
    id: "growth",
    label: "Growth",
    description: "Revenue milestones & streaks",
    progress: 68,
    nextBadge: "Momentum Max",
  },
  {
    id: "community",
    label: "Community",
    description: "Contributions to community programs",
    progress: 54,
    nextBadge: "Community Guide",
  },
  {
    id: "ops",
    label: "Ops Excellence",
    description: "Delivery & QA rituals",
    progress: 36,
    nextBadge: "Ops Sentinel",
  },
  {
    id: "mentorship",
    label: "Mentorship",
    description: "Peer support & coaching",
    progress: 72,
    nextBadge: "Mentor Hall",
  },
];

export const shoutouts: Shoutout[] = [
  { id: "s1", message: "Nova unlocked Momentum Max by closing 3 verified deals", timestamp: "2h ago" },
  { id: "s2", message: "Leo earned Ops Sentinel with zero SLA misses", timestamp: "6h ago" },
  { id: "s3", message: "Sienna completed Community Guide mentoring", timestamp: "Yesterday" },
];

export const badgeTotals = {
  earned: 18,
  total: 32,
  nextBadge: "Momentum Max",
  nextBadgeProgress: 72,
  seasonalBooster: "+12%",
};
