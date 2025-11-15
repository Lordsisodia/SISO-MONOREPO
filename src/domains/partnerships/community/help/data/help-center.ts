export type HelpArticleSection = {
  heading?: string;
  body: string[];
};

export type HelpArticle = {
  slug: string;
  title: string;
  summary: string;
  lastUpdated: string;
  sections: HelpArticleSection[];
  tags?: string[];
};

export type HelpCollectionIcon =
  | "life-buoy"
  | "credit-card"
  | "sparkles"
  | "shield-check"
  | "bar-chart"
  | "users";

export type HelpCollection = {
  slug: string;
  title: string;
  description: string;
  icon: HelpCollectionIcon;
  articles: HelpArticle[];
};

const formatDate = (value: string) => new Date(value).toISOString();

const payoutsSections: HelpArticleSection[] = [
  {
    heading: "Deposit cadence",
    body: [
      "We clear available balances every Tuesday and Thursday at 1 PM PT. Transfers hit most US banks within 1 business day.",
      "If you connected Stripe Express, you'll see a push notification inside Wallet → Activity 10 minutes before the transfer starts.",
    ],
  },
  {
    heading: "Fast-track your payout",
    body: [
      "Complete tax verification and connect a realtime payout rail. We pre-authorize instant transfers up to $25k when both are enabled.",
    ],
  },
  {
    heading: "Need to adjust a payout?",
    body: [
      "Submit adjustments from Earnings → Wallet at least 24 hours before cutoff. Late requests may roll into the next cycle.",
    ],
  },
];

const walletDisputeSections: HelpArticleSection[] = [
  {
    body: [
      "Open Wallet → Holds to view the dispute reason and documents we already have on file.",
      "Upload any additional agreements, screenshots, or signed change orders straight from the panel. Our finance team replies within 1 business day.",
    ],
  },
];

const onboardingSections: HelpArticleSection[] = [
  {
    heading: "Checklist",
    body: [
      "Finish your profile, connect a payout method, and complete the 'Say hello' mission. Those unlock badges, Marketplace, and Wins posting.",
    ],
  },
  {
    heading: "Need live help?",
    body: [
      "Join Tuesday office hours or chat with Partner Success from the Help Center contact cards below.",
    ],
  },
];

const growthSections: HelpArticleSection[] = [
  {
    heading: "Predictable pipeline ritual",
    body: [
      "Use the 3×3 habit every Monday: update 3 prospects, log 3 follow-ups, record 3 learnings. Partners who do this grow 46% faster.",
    ],
  },
];

const trustSections: HelpArticleSection[] = [
  {
    heading: "Security posture",
    body: [
      "SISO encrypts data at rest (AES-256) and in transit (TLS 1.3). We run quarterly pen tests with a third party and share summaries under NDA.",
      "Need a data processing addendum? Email security@siso.co and we turn around signed copies within 2 business days.",
    ],
  },
];

const connectionsSections: HelpArticleSection[] = [
  {
    heading: "When to DM vs. start a thread",
    body: [
      "Use DMs for quick coordination or sharing links. For help that others might benefit from, post inside #general-chat or #wins.",
    ],
  },
];

export const helpCollections: HelpCollection[] = [
  {
    slug: "wallet-and-payouts",
    title: "Wallet & payouts",
    description: "Everything about balances, deposits, and compliance.",
    icon: "credit-card",
    articles: [
      {
        slug: "payout-schedule",
        title: "When will my payout arrive?",
        summary: "Understand the SISO payout timetable and how to fast-track it.",
        lastUpdated: formatDate("2025-11-10"),
        sections: payoutsSections,
        tags: ["wallet", "finance"],
      },
      {
        slug: "dispute-a-hold",
        title: "How do I dispute a hold?",
        summary: "Upload proof and get a response within one business day.",
        lastUpdated: formatDate("2025-10-28"),
        sections: walletDisputeSections,
      },
    ],
  },
  {
    slug: "onboarding",
    title: "Onboarding & account",
    description: "Kick off your partnership and unlock badges.",
    icon: "life-buoy",
    articles: [
      {
        slug: "complete-your-checklist",
        title: "Complete your onboarding checklist",
        summary: "The fastest route to publishing offers and receiving leads.",
        lastUpdated: formatDate("2025-09-18"),
        sections: onboardingSections,
      },
    ],
  },
  {
    slug: "growth",
    title: "Growth playbooks",
    description: "Pipeline, proposals, and reusable assets.",
    icon: "bar-chart",
    articles: [
      {
        slug: "predictable-pipeline",
        title: "Run the Predictable Pipeline ritual",
        summary: "A 20-minute weekly cadence to keep deals active.",
        lastUpdated: formatDate("2025-09-01"),
        sections: growthSections,
      },
    ],
  },
  {
    slug: "trust-and-safety",
    title: "Trust & safety",
    description: "Security, privacy, and data-processing basics.",
    icon: "shield-check",
    articles: [
      {
        slug: "security-basics",
        title: "Security basics for partners",
        summary: "Overview of encryption, audits, and who to contact.",
        lastUpdated: formatDate("2025-11-03"),
        sections: trustSections,
      },
    ],
  },
  {
    slug: "connections",
    title: "Community & messaging",
    description: "Using chat, channels, and partner directory.",
    icon: "users",
    articles: [
      {
        slug: "chat-vs-thread",
        title: "DM vs. channel: which one should I use?",
        summary: "Guidelines for picking the right communication surface.",
        lastUpdated: formatDate("2025-07-19"),
        sections: connectionsSections,
      },
    ],
  },
  {
    slug: "product-updates",
    title: "Product updates",
    description: "Release notes and experiment announcements.",
    icon: "sparkles",
    articles: [
      {
        slug: "october-release",
        title: "October 2025 release recap",
        summary: "Highlights from the latest partner platform release.",
        lastUpdated: formatDate("2025-10-30"),
        sections: [
          {
            body: [
              "New Wallet automation, refreshed community navigation, and the beta of Deal Radar shipped in October.",
              "See /partners/community/announcements for the running changelog.",
            ],
          },
        ],
      },
    ],
  },
];

export const getHelpCollections = () => helpCollections;

export const getHelpCollection = (slug: string) =>
  helpCollections.find((collection) => collection.slug === slug);

export const getHelpArticle = (collectionSlug: string, articleSlug: string) => {
  const collection = getHelpCollection(collectionSlug);
  if (!collection) return undefined;
  return {
    collection,
    article: collection.articles.find((article) => article.slug === articleSlug),
  };
};
