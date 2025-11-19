export type Lesson = {
  id: string;
  title: string;
  duration: string;
  summary: string;
  relatedAssets: { label: string; href: string }[];
};

export type CourseCategory =
  | "siso-essentials"
  | "sales-foundations"
  | "lead-gen"
  | "recruit-partners"
  | "new-trending";

export type Course = {
  id: string;
  title: string;
  overview: string;
  longDescription?: string;
  level: "beginner" | "intermediate" | "advanced";
  industry: string;
  tags: string[];
  duration: string;
  progress: number;
  focus: string;
  legend: string;
  lessons: Lesson[];
  relatedAssets: { label: string; href: string }[];
  category: CourseCategory;
  order?: number;
  trending?: boolean;
  videoUrl?: string;
  comingSoon?: boolean;
  exampleComments?: { author: string; role?: string; body: string; timestamp: string }[];
  moduleOf?: string; // if set, module belongs to a program course id
};

export const courses: Course[] = [
  {
    id: "siso-essentials-program",
    title: "Essentials Program",
    overview: "Guided steps to learn the app fast: navigation, pipeline, recruitment, earnings, community, workspace, settings.",
    longDescription: "Your full orientation to the Partner Hub. Watch the intro, then drill into Academy, Pipeline, Recruitment, Earnings, Community, Workspace, and Settings.",
    level: "beginner",
    industry: "SaaS",
    tags: ["onboarding", "navigation"],
    duration: "90m",
    progress: 0,
    focus: "Get productive with SISO in under 90 minutes",
    legend: "8 modules",
    category: "siso-essentials",
    order: 1,
    trending: true,
    videoUrl: "https://www.youtube.com/embed/-Zjn76sMXs8",
    lessons: [],
  },
  // Essentials modules (belong to SISO Essentials Program)
  {
    id: "siso-introduction",
    title: "Introduction",
    overview: "Tour the Partner Hub, Academy, and Support.",
    longDescription: "Learn where everything lives: navigation, notifications, and where to find deals, courses, portfolio, and support.",
    level: "beginner",
    industry: "SaaS",
    tags: ["onboarding"],
    duration: "18m",
    progress: 0,
    focus: "Learn the app surface in under 20 minutes",
    legend: "2 lessons",
    category: "siso-essentials",
    order: 1,
    videoUrl: "https://www.youtube.com/embed/-Zjn76sMXs8",
    moduleOf: "siso-essentials-program",
    lessons: [
      { id: "intro-1", title: "Workspace tour", duration: "6m", summary: "Navigation, search, notifications, and where everything lives.", relatedAssets: [] },
      { id: "intro-2", title: "Finding support", duration: "5m", summary: "Help center, live support, and community guidelines.", relatedAssets: [] },
    ],
  },
  {
    id: "siso-academy",
    title: "Academy",
    overview: "Navigate courses, progress, and achievements.",
    longDescription: "See how progress, levels, and badges work, and how to resume where you left off.",
    level: "beginner",
    industry: "SaaS",
    tags: ["academy"],
    duration: "15m",
    progress: 0,
    focus: "Learn how learning works in SISO",
    legend: "2 lessons",
    category: "siso-essentials",
    order: 2,
    videoUrl: "https://www.youtube.com/embed/-Zjn76sMXs8",
    moduleOf: "siso-essentials-program",
    lessons: [
      { id: "academy-1", title: "Progress & tiers", duration: "7m", summary: "How XP, tiers, badges, and certificates are tracked.", relatedAssets: [] },
      { id: "academy-2", title: "Resuming courses", duration: "6m", summary: "Jump back into lessons and download certificates.", relatedAssets: [] },
    ],
  },
  {
    id: "siso-client-pipeline",
    title: "Client Pipeline",
    overview: "Track leads, deals, and updates.",
    longDescription: "Walk through adding leads, updating stages, and posting deal updates that sync to reporting.",
    level: "beginner",
    industry: "SaaS",
    tags: ["pipeline"],
    duration: "20m",
    progress: 0,
    focus: "Manage deals in one place",
    legend: "3 lessons",
    category: "siso-essentials",
    order: 3,
    videoUrl: "https://www.youtube.com/embed/-Zjn76sMXs8",
    moduleOf: "siso-essentials-program",
    lessons: [
      { id: "pipeline-1", title: "Add a lead", duration: "5m", summary: "Create leads, owners, and next steps.", relatedAssets: [] },
      { id: "pipeline-2", title: "Stage updates", duration: "7m", summary: "Move deals, add notes, and notify stakeholders.", relatedAssets: [] },
      { id: "pipeline-3", title: "Posting updates", duration: "6m", summary: "Share updates that sync to reporting and payouts.", relatedAssets: [] },
    ],
  },
  {
    id: "siso-recruitment",
    title: "Recruitment",
    overview: "Invite and manage your recruitment flow.",
    longDescription: "Add candidates, move them through recruiting stages, and trigger enablement.",
    level: "beginner",
    industry: "SaaS",
    tags: ["recruitment"],
    duration: "18m",
    progress: 0,
    focus: "Stand up recruitment fast",
    legend: "2 lessons",
    category: "siso-essentials",
    order: 4,
    videoUrl: "https://www.youtube.com/embed/-Zjn76sMXs8",
    moduleOf: "siso-essentials-program",
    lessons: [
      { id: "recruit-1", title: "Add candidates", duration: "6m", summary: "Capture candidate details and assign owners.", relatedAssets: [] },
      { id: "recruit-2", title: "Move stages", duration: "7m", summary: "Advance candidates and trigger enablement tasks.", relatedAssets: [] },
    ],
  },
  {
    id: "siso-earnings",
    title: "Earnings",
    overview: "Understand payouts and commissions.",
    longDescription: "See commissions, payout schedules, and what milestones unlock higher percentages.",
    level: "beginner",
    industry: "SaaS",
    tags: ["earnings"],
    duration: "16m",
    progress: 0,
    focus: "See how you get paid",
    legend: "2 lessons",
    category: "siso-essentials",
    order: 5,
    videoUrl: "https://www.youtube.com/embed/-Zjn76sMXs8",
    moduleOf: "siso-essentials-program",
    lessons: [
      { id: "earnings-1", title: "Payout timelines", duration: "6m", summary: "See payout schedule and thresholds.", relatedAssets: [] },
      { id: "earnings-2", title: "Boosting commissions", duration: "6m", summary: "What raises your percentage and how to track it.", relatedAssets: [] },
    ],
  },
  {
    id: "siso-community",
    title: "Community",
    overview: "Post wins, get answers, join spotlights.",
    longDescription: "How to post, react, join live spotlights, and community etiquette.",
    level: "beginner",
    industry: "SaaS",
    tags: ["community"],
    duration: "12m",
    progress: 0,
    focus: "Engage with peers",
    legend: "2 lessons",
    category: "siso-essentials",
    order: 6,
    videoUrl: "https://www.youtube.com/embed/-Zjn76sMXs8",
    moduleOf: "siso-essentials-program",
    lessons: [
      { id: "community-1", title: "Posting wins", duration: "5m", summary: "Share wins, react, and drive visibility.", relatedAssets: [] },
      { id: "community-2", title: "Joining spotlights", duration: "6m", summary: "Attend live spotlights and etiquette.", relatedAssets: [] },
    ],
  },
  {
    id: "siso-workspace",
    title: "Workspace",
    overview: "Organize assets, docs, and links.",
    longDescription: "Create folders, pin key docs, and keep pitch assets synced for your team.",
    level: "beginner",
    industry: "SaaS",
    tags: ["workspace"],
    duration: "14m",
    progress: 0,
    focus: "Keep your materials tidy",
    legend: "2 lessons",
    category: "siso-essentials",
    order: 7,
    videoUrl: "https://www.youtube.com/embed/-Zjn76sMXs8",
    moduleOf: "siso-essentials-program",
    lessons: [
      { id: "workspace-1", title: "Organize assets", duration: "6m", summary: "Folders, pins, and shared docs.", relatedAssets: [] },
      { id: "workspace-2", title: "Share pitch assets", duration: "6m", summary: "Keep decks, proof, and links synced.", relatedAssets: [] },
    ],
  },
  {
    id: "siso-settings",
    title: "Settings",
    overview: "Manage profile, notifications, security basics.",
    longDescription: "Profile, notifications, and security defaults so you stay compliant and up to date.",
    level: "beginner",
    industry: "SaaS",
    tags: ["settings"],
    duration: "10m",
    progress: 0,
    focus: "Configure your account quickly",
    legend: "2 lessons",
    category: "siso-essentials",
    order: 8,
    videoUrl: "https://www.youtube.com/embed/-Zjn76sMXs8",
    moduleOf: "siso-essentials-program",
    lessons: [
      { id: "settings-1", title: "Profile & notifications", duration: "5m", summary: "Set profile, notifications, and devices.", relatedAssets: [] },
      { id: "settings-2", title: "Security basics", duration: "5m", summary: "MFA, sessions, and data preferences.", relatedAssets: [] },
    ],
  },
  {
    id: "sales-foundations-coming-soon",
    title: "Sales Foundations (Coming Soon)",
    overview: "Core enterprise and SaaS sales plays are on the way.",
    level: "intermediate",
    industry: "SaaS",
    tags: ["sales"],
    duration: "Coming soon",
    progress: 0,
    focus: "Placeholder",
    legend: "Coming soon",
    category: "sales-foundations",
    order: 1,
    lessons: [],
    trending: true,
    comingSoon: true,
  },
  {
    id: "lead-gen-coming-soon",
    title: "Lead Gen & Pipeline (Coming Soon)",
    overview: "Prospecting, messaging, and cadences arriving shortly.",
    level: "intermediate",
    industry: "SaaS",
    tags: ["lead-gen"],
    duration: "Coming soon",
    progress: 0,
    focus: "Placeholder",
    legend: "Coming soon",
    category: "lead-gen",
    order: 1,
    lessons: [],
    comingSoon: true,
  },
  {
    id: "recruit-partners-coming-soon",
    title: "Recruit Partners (Coming Soon)",
    overview: "Partner sourcing and activation playbooks in progress.",
    level: "intermediate",
    industry: "SaaS",
    tags: ["recruit-partners"],
    duration: "Coming soon",
    progress: 0,
    focus: "Placeholder",
    legend: "Coming soon",
    category: "recruit-partners",
    order: 1,
    lessons: [],
    comingSoon: true,
  },
];
