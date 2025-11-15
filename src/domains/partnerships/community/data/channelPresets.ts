import { type LucideIcon, Hash, Megaphone, Sparkles, Trophy } from "lucide-react";

export type ChannelAccessMode = "read-only" | "post";

export interface ChannelQuickLink {
  label: string;
  description: string;
  href: string;
}

export interface ChannelGuideline {
  title: string;
  description: string;
}

export interface ChannelStat {
  label: string;
  value: string;
  change?: string;
}

export interface ChannelReaction {
  emoji: string;
  count: number;
  highlighted?: boolean;
}

export interface ChannelMessage {
  id: string;
  author: {
    name: string;
    role?: string;
    tier?: string;
    avatarInitials: string;
    isTeam?: boolean;
  };
  timestamp: string;
  content: string;
  pinned?: boolean;
  tags?: string[];
  reactions?: ChannelReaction[];
  replies?: number;
}

export interface ChannelPinnedCard {
  id: string;
  title: string;
  summary: string;
  author: string;
  timestamp: string;
  tags?: string[];
}

export interface CommunityChannelPreset {
  id: string;
  label: string;
  icon: LucideIcon;
  access: ChannelAccessMode;
  description: string;
  highlights: ChannelStat[];
  guidelines: ChannelGuideline[];
  quickLinks: ChannelQuickLink[];
  pinned: ChannelPinnedCard[];
  messages: ChannelMessage[];
  announcement?: {
    title: string;
    body: string;
    pill?: string;
  };
  composer: {
    placeholder: string;
    lockedCopy?: string;
    helperText?: string;
  };
}

const now = new Date();
const minutesAgo = (minutes: number) => new Date(now.getTime() - minutes * 60 * 1000).toISOString();

export const communityChannels: Record<string, CommunityChannelPreset> = {
  general: {
    id: "general",
    label: "# general-chat",
    icon: Hash,
    access: "post",
    description: "Program-wide channel for quick wins, questions, and daily stand-ups.",
    highlights: [
      { label: "Active Today", value: "82 partners", change: "+11 vs yesterday" },
      { label: "Threads Started", value: "24", change: "+6" },
      { label: "Avg. Response", value: "7m", change: "SLA amber" },
    ],
    guidelines: [
      {
        title: "Stay actionable",
        description: "Lead with your question, context, or learning in the first sentence.",
      },
      {
        title: "Tag the right squad",
        description: "Use @Design, @Deals, or @Support so the right people jump in.",
      },
      {
        title: "Add a takeaway",
        description: "Close the thread with what you tried or learned to unlock badges.",
      },
    ],
    quickLinks: [
      {
        label: "Community Guidelines",
        description: "Tone, moderation rules, and unlock paths",
        href: "/partners/community/help#community-guidelines",
      },
      {
        label: "Ask SISO Anything",
        description: "Live office hours schedule",
        href: "/partners/workspace/calendar/office-hours",
      },
      {
        label: "Conversation Search",
        description: "Archive of solved questions",
        href: "/partners/community/all-channels",
      },
    ],
    pinned: [
      {
        id: "pin-general-1",
        title: "Kickoff your week with the Monday 10/10 challenge",
        summary:
          "Share 1 focus, 1 obstacle, and what you need help with. We'll feature top answers in the Hub.",
        author: "SISO Team",
        timestamp: minutesAgo(480),
        tags: ["challenge", "habits"],
      },
      {
        id: "pin-general-2",
        title: "Sales clinic replay: handling procurement delays",
        summary: "Recording and playbook from yesterday's live session.",
        author: "Partnership Enablement",
        timestamp: minutesAgo(1440),
        tags: ["replay", "sales"],
      },
    ],
    messages: [
      {
        id: "msg-general-1",
        author: {
          name: "Jordan Estevez",
          role: "Partner | SaaS",
          tier: "Active",
          avatarInitials: "JE",
        },
        timestamp: minutesAgo(12),
        content:
          "Has anyone bundled paid discovery into their first call? Thinking of testing a £1.2k strategy sprint before full build.",
        reactions: [
          { emoji: "🔥", count: 7, highlighted: true },
          { emoji: "💡", count: 2 },
        ],
        replies: 5,
      },
      {
        id: "msg-general-2",
        author: {
          name: "SISO Ops",
          role: "Team",
          avatarInitials: "SO",
          isTeam: true,
        },
        timestamp: minutesAgo(30),
        content:
          "Heads up: new marketing collateral just dropped in the pitch kit. Includes updated pricing one-pager + manufacturing vertical case study.",
        reactions: [{ emoji: "📎", count: 3 }],
        replies: 1,
        tags: ["update"],
      },
      {
        id: "msg-general-3",
        author: {
          name: "Harper Quinn",
          role: "Partner | Retail",
          tier: "Starter",
          avatarInitials: "HQ",
        },
        timestamp: minutesAgo(55),
        content:
          "Win share: booked a discovery call with a boutique fitness chain using the 7-slide deck from the Academy 👊",
        reactions: [
          { emoji: "👏", count: 11 },
          { emoji: "🚀", count: 4 },
        ],
      },
    ],
    announcement: {
      title: "Say hello, earn your first badge",
      body: "Drop an intro + what you’re building. Completing this unlocks the Social Kickoff badge and #wins posting access faster.",
      pill: "Starter Mission",
    },
    composer: {
      placeholder: "Share an update, question, or resource for the crew...",
      helperText: "Pro tip: paste a Loom to auto-generate a rich preview.",
    },
  },
  wins: {
    id: "wins",
    label: "# wins",
    icon: Trophy,
    access: "read-only",
    description: "Celebrate partner deal flow and give others a playbook to replicate.",
    highlights: [
      { label: "Deals Celebrated", value: "12 this week" },
      { label: "Avg. Deal Size", value: "£38k" },
      { label: "Auto-posts", value: "Enabled" },
    ],
    guidelines: [
      {
        title: "Share the numbers",
        description: "Budget range + service focus help the community learn quickly.",
      },
      {
        title: "Link assets",
        description: "Attach deck/loom snippets if they helped close the deal.",
      },
    ],
    quickLinks: [
      {
        label: "Win Template",
        description: "Copy the partner-tested format",
        href: "/partners/community/channels/wins#template",
      },
      {
        label: "Leaderboard",
        description: "See who’s closing this month",
        href: "/partners/leaderboard",
      },
    ],
    pinned: [
      {
        id: "pin-wins-1",
        title: "How to post a win that unlocks badges",
        summary:
          "3-line format, what to highlight, and when automation posts for you.",
        author: "Community Team",
        timestamp: minutesAgo(720),
      },
    ],
    messages: [
      {
        id: "msg-wins-1",
        author: {
          name: "Cam Rivera",
          role: "Partner | Real Estate",
          tier: "Performer",
          avatarInitials: "CR",
        },
        timestamp: minutesAgo(90),
        content:
          "Closed £62k SaaS build for PropTech client. Hook: white-labeling our smart-leasing accelerators. Demo deck + pricing sheet in thread.",
        reactions: [{ emoji: "🏆", count: 23 }],
      },
    ],
    composer: {
      placeholder: "Wins post unlocks after Active tier or intro challenge.",
      lockedCopy: "Post access unlocks at Active. Finish ‘Say hello’ challenge to fast-track.",
    },
  },
  announcements: {
    id: "announcements",
    label: "# announcements",
    icon: Megaphone,
    access: "read-only",
    description: "Official SISO updates, release notes, and program alerts.",
    highlights: [
      { label: "Last Update", value: "2 hours ago" },
      { label: "Upcoming Maint.", value: "Nov 18 • 30m" },
    ],
    guidelines: [
      {
        title: "Single thread replies",
        description: "Keep acknowledgement + follow-up in the announcement thread.",
      },
      {
        title: "Feedback loop",
        description: "Use /help or #questions for deeper conversations.",
      },
    ],
    quickLinks: [
      { label: "Release Notes", description: "Full changelog", href: "/partners/settings/whats-new" },
      {
        label: "Roadmap",
        description: "See upcoming drops",
        href: "/partners/community/all-channels?tab=roadmap",
      },
    ],
    pinned: [
      {
        id: "pin-annc-1",
        title: "Read receipt pilot",
        summary: "We now auto-ack every announcement so you don’t lose context. Toggle in Settings → Notifications.",
        author: "Program Ops",
        timestamp: minutesAgo(90),
      },
    ],
    messages: [
      {
        id: "msg-annc-1",
        author: {
          name: "SISO Product",
          role: "Team",
          avatarInitials: "SP",
          isTeam: true,
        },
        timestamp: minutesAgo(45),
        content:
          "📣 Rolling out the Partner Deal Radar beta this Friday. Expect smarter alerts inside the Hub + optional CRM sync.",
        tags: ["product", "beta"],
      },
      {
        id: "msg-annc-2",
        author: {
          name: "Finance Ops",
          role: "Team",
          avatarInitials: "FO",
          isTeam: true,
        },
        timestamp: minutesAgo(210),
        content:
          "Reminder: November commission statements lock on the 21st. Submit adjustments via Earnings → Wallet.",
      },
    ],
    composer: {
      placeholder: "Announcements are team-only.",
      lockedCopy: "Only SISO staff can post here. Follow up in #general-chat if you need clarity.",
    },
  },
  channels: {
    id: "channels",
    label: "All Channels",
    icon: Sparkles,
    access: "read-only",
    description: "Browse regional, industry, and experiment channels.",
    highlights: [
      { label: "Live Channels", value: "37" },
      { label: "Beta Spaces", value: "4" },
    ],
    guidelines: [],
    quickLinks: [],
    pinned: [],
    messages: [],
    composer: {
      placeholder: "",
      lockedCopy: "",
    },
  },
};

export type CommunityChannelId = keyof typeof communityChannels;
