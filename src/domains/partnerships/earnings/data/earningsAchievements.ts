export type FeaturedBadge = {
  id: string;
  name: string;
  description: string;
  category: string;
  reward: string;
  criteria: string;
  rarity: string;
};

export type BadgeDetail = FeaturedBadge & {
  status: "earned" | "in-progress" | "locked";
  progress?: number;
  unlockedAt?: string;
  featured?: boolean;
};

export type LeaderboardInsight = {
  label: string;
  value: string;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  metricLabel: string;
  metricValue: string;
  trend: string;
  insights?: LeaderboardInsight[];
  profileId?: string;
};

export type AchievementFeedItem = {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  tag: string;
};

export type CertificateSummary = {
  issued: number;
  inProgress: number;
  nextUnlock: string;
  preview: {
    id: string;
    title: string;
    status: "Issued" | "In progress" | "Unlocked";
    issued?: string;
  }[];
};

export type NextUnlock = {
  id: string;
  label: string;
  requirement: string;
  progress: number;
  eta: string;
  reward: string;
};

const badgeCollectionInternal: BadgeDetail[] = [
  {
    id: "momentum-max",
    name: "Momentum Max",
    description: "Maintain 3 straight months of payout growth.",
    category: "Growth",
    reward: "+5% booster",
    criteria: "Submit 9 verified deals across 3 months",
    rarity: "2% of partners",
    status: "in-progress",
    progress: 72,
    featured: true,
  },
  {
    id: "ops-sentinel",
    name: "Ops Sentinel",
    description: "Zero SLA misses in a quarter.",
    category: "Ops Excellence",
    reward: "Ops concierge",
    criteria: "Complete 12 post-launch audits on time",
    rarity: "5% of partners",
    status: "earned",
    unlockedAt: "Oct 2025",
    featured: true,
  },
  {
    id: "community-guide",
    name: "Community Guide",
    description: "Mentor 4 partners through onboarding.",
    category: "Mentorship",
    reward: "Mentor badge + spotlight",
    criteria: "Log 6 mentor hours and 4 mentee reviews",
    rarity: "8% of partners",
    status: "earned",
    unlockedAt: "Sep 2025",
    featured: true,
  },
  {
    id: "mentor-hall",
    name: "Mentor Hall",
    description: "Coach 10 partners with 4.8+ feedback.",
    category: "Mentorship",
    reward: "Private mastermind invite",
    criteria: "Log 20 mentor hours + NPS 60",
    rarity: "4% of partners",
    status: "locked",
  },
  {
    id: "revenue-surge",
    name: "Revenue Surge",
    description: "Cross $100K trailing three months.",
    category: "Growth",
    reward: "+3% booster",
    criteria: "Close 6 deals above $15K",
    rarity: "6% of partners",
    status: "earned",
    unlockedAt: "Aug 2025",
  },
  {
    id: "activation-ace",
    name: "Activation Ace",
    description: "Launch 5 net-new clients in 45 days.",
    category: "Delivery",
    reward: "Launch concierge",
    criteria: "Launch score 90+ across 5 clients",
    rarity: "10% of partners",
    status: "in-progress",
    progress: 45,
  },
  {
    id: "retention-maven",
    name: "Retention Maven",
    description: "Maintain 98% retention for a quarter.",
    category: "Ops Excellence",
    reward: "Customer advisory seat",
    criteria: "Quarterly retention >= 98%",
    rarity: "3% of partners",
    status: "locked",
  },
  {
    id: "pipeline-pro",
    name: "Pipeline Pro",
    description: "Source 25 qualified opps in a season.",
    category: "Growth",
    reward: "+2% finder",
    criteria: "Submit 25 screened opportunities",
    rarity: "12% of partners",
    status: "earned",
    unlockedAt: "Jul 2025",
  },
  {
    id: "advocacy-champion",
    name: "Advocacy Champion",
    description: "Publish 6 public case studies.",
    category: "Community",
    reward: "Homepage spotlight",
    criteria: "Upload 6 approved win stories",
    rarity: "7% of partners",
    status: "in-progress",
    progress: 30,
  },
  {
    id: "launch-legend",
    name: "Launch Legend",
    description: "Ship 3 launches in under 30 days.",
    category: "Delivery",
    reward: "Launch studio budget",
    criteria: "3 launches avg 4.9 CSAT",
    rarity: "5% of partners",
    status: "locked",
  },
  {
    id: "expansion-architect",
    name: "Expansion Architect",
    description: "Upsell 4 existing clients in a quarter.",
    category: "Growth",
    reward: "Private deal desk",
    criteria: "Closed-won expansions >= 4",
    rarity: "9% of partners",
    status: "earned",
    unlockedAt: "May 2025",
  },
  {
    id: "compliance-guardian",
    name: "Compliance Guardian",
    description: "Maintain policy-perfect audits.",
    category: "Ops Excellence",
    reward: "Dedicated ops analyst",
    criteria: "Pass 4 audits with 0 findings",
    rarity: "11% of partners",
    status: "earned",
    unlockedAt: "Apr 2025",
  },
];

export const badgeCollection = badgeCollectionInternal;
export const featuredBadges: BadgeDetail[] = badgeCollectionInternal.filter((badge) => badge.featured);

export const leaderboardEntries: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Nova Carter",
    profileId: "nova-carter",
    metricLabel: "Bonus pts",
    metricValue: "1,240",
    trend: "+120",
    insights: [
      { label: "Streak", value: "9d" },
      { label: "Wins", value: "12" },
      { label: "Boost", value: "+18%" },
    ],
  },
  {
    rank: 2,
    name: "Leo Summers",
    profileId: "leo-summers",
    metricLabel: "Bonus pts",
    metricValue: "1,110",
    trend: "+60",
    insights: [
      { label: "Streak", value: "6d" },
      { label: "Wins", value: "10" },
      { label: "Boost", value: "+12%" },
    ],
  },
  {
    rank: 3,
    name: "Sienna Rowe",
    profileId: "sienna-rowe",
    metricLabel: "Bonus pts",
    metricValue: "980",
    trend: "+30",
    insights: [
      { label: "Streak", value: "4d" },
      { label: "Wins", value: "9" },
      { label: "Boost", value: "+9%" },
    ],
  },
  {
    rank: 4,
    name: "Aria Kent",
    profileId: "aria-kent",
    metricLabel: "Bonus pts",
    metricValue: "910",
    trend: "+20",
    insights: [
      { label: "Streak", value: "3d" },
      { label: "Wins", value: "7" },
      { label: "Boost", value: "+8%" },
    ],
  },
  {
    rank: 5,
    name: "Mason Wells",
    profileId: "mason-wells",
    metricLabel: "Bonus pts",
    metricValue: "860",
    trend: "+15",
    insights: [
      { label: "Streak", value: "2d" },
      { label: "Wins", value: "6" },
      { label: "Boost", value: "+7%" },
    ],
  },
  {
    rank: 6,
    name: "Priya Lind",
    profileId: "priya-lind",
    metricLabel: "Bonus pts",
    metricValue: "835",
    trend: "+12",
    insights: [
      { label: "Streak", value: "2d" },
      { label: "Wins", value: "6" },
      { label: "Boost", value: "+6%" },
    ],
  },
  {
    rank: 7,
    name: "Rowan Diaz",
    profileId: "rowan-diaz",
    metricLabel: "Bonus pts",
    metricValue: "790",
    trend: "+18",
    insights: [
      { label: "Streak", value: "5d" },
      { label: "Wins", value: "5" },
      { label: "Boost", value: "+10%" },
    ],
  },
  {
    rank: 8,
    name: "You",
    metricLabel: "Bonus pts",
    metricValue: "720",
    trend: "+90",
    insights: [
      { label: "Streak", value: "5d" },
      { label: "Wins", value: "5" },
      { label: "Boost", value: "+14%" },
    ],
  },
  {
    rank: 9,
    name: "Elio Tran",
    profileId: "elio-tran",
    metricLabel: "Bonus pts",
    metricValue: "705",
    trend: "+25",
    insights: [
      { label: "Streak", value: "4d" },
      { label: "Wins", value: "4" },
      { label: "Boost", value: "+9%" },
    ],
  },
  {
    rank: 10,
    name: "Mina Ortiz",
    profileId: "mina-ortiz",
    metricLabel: "Bonus pts",
    metricValue: "680",
    trend: "+10",
    insights: [
      { label: "Streak", value: "3d" },
      { label: "Wins", value: "4" },
      { label: "Boost", value: "+8%" },
    ],
  },
  {
    rank: 11,
    name: "Casper Hsu",
    profileId: "casper-hsu",
    metricLabel: "Bonus pts",
    metricValue: "640",
    trend: "+8",
    insights: [
      { label: "Streak", value: "2d" },
      { label: "Wins", value: "4" },
      { label: "Boost", value: "+6%" },
    ],
  },
  {
    rank: 12,
    name: "Gia Bennett",
    profileId: "gia-bennett",
    metricLabel: "Bonus pts",
    metricValue: "625",
    trend: "+11",
    insights: [
      { label: "Streak", value: "1d" },
      { label: "Wins", value: "3" },
      { label: "Boost", value: "+5%" },
    ],
  },
  {
    rank: 13,
    name: "Omar Bell",
    profileId: "omar-bell",
    metricLabel: "Bonus pts",
    metricValue: "598",
    trend: "+6",
    insights: [
      { label: "Streak", value: "1d" },
      { label: "Wins", value: "3" },
      { label: "Boost", value: "+4%" },
    ],
  },
  {
    rank: 14,
    name: "Lena Cho",
    profileId: "lena-cho",
    metricLabel: "Bonus pts",
    metricValue: "570",
    trend: "+4",
    insights: [
      { label: "Streak", value: "0d" },
      { label: "Wins", value: "3" },
      { label: "Boost", value: "+3%" },
    ],
  },
  {
    rank: 15,
    name: "Hugo Klein",
    profileId: "hugo-klein",
    metricLabel: "Bonus pts",
    metricValue: "545",
    trend: "+2",
    insights: [
      { label: "Streak", value: "0d" },
      { label: "Wins", value: "2" },
      { label: "Boost", value: "+2%" },
    ],
  },
];

export const achievementFeed: AchievementFeedItem[] = [
  {
    id: "a1",
    title: "Earned Ops Sentinel",
    detail: "Zero SLA misses for 90 days",
    timestamp: "2h ago",
    tag: "Ops",
  },
  {
    id: "a2",
    title: "Closed Enterprise Sales 101",
    detail: "$48K recurring booked",
    timestamp: "6h ago",
    tag: "Revenue",
  },
  {
    id: "a3",
    title: "Mentored 4th partner",
    detail: "Community Guide progress 100%",
    timestamp: "Yesterday",
    tag: "Community",
  },
  {
    id: "a4",
    title: "Submitted 20th qualified opp",
    detail: "Pipeline Pro streak",
    timestamp: "2 days ago",
    tag: "Growth",
  },
];

export const certificateSummary: CertificateSummary = {
  issued: 2,
  inProgress: 1,
  nextUnlock: "Enterprise Sales 101",
  preview: [
    { id: "cert-sales", title: "Sales Foundations", status: "Issued", issued: "Jan 2025" },
    { id: "cert-enterprise", title: "Enterprise Sales 101", status: "In progress" },
    { id: "cert-ops", title: "Ops Excellence", status: "Unlocked", issued: "—" },
  ],
};

export const nextUnlocks: NextUnlock[] = [
  {
    id: "growth",
    label: "Momentum Max",
    requirement: "Close 3 verified deals this month",
    progress: 72,
    eta: "Due Nov 30",
    reward: "+5% booster",
  },
  {
    id: "mentor",
    label: "Mentor Hall",
    requirement: "Log 20 mentor hours with 4.8+ rating",
    progress: 45,
    eta: "Due Dec 12",
    reward: "Mastermind invite",
  },
  {
    id: "ops",
    label: "Retention Maven",
    requirement: "Hold 98% retention for Q4",
    progress: 36,
    eta: "Tracking through Jan",
    reward: "Customer advisory seat",
  },
];

export const badgeTotals = {
  earned: 18,
  total: 32,
  nextBadge: "Momentum Max",
  nextBadgeProgress: 72,
  seasonalBooster: "+12%",
};
