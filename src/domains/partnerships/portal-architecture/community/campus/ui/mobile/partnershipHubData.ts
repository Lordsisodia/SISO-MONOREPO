"use client";

import type { LucideIcon } from "lucide-react";
import {
  GraduationCap,
  Briefcase,
  Layers,
  Bookmark,
  Bell,
  MessagesSquare,
  LayoutDashboard,
  Wallet2,
  Sparkles,
  LifeBuoy,
  Clock3,
} from "lucide-react";

export type HubNavCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export type HubMetric = {
  id: string;
  label: string;
  value: string;
  helper: string;
  intent?: string;
};

export type HubAnnouncement = {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  ctaLabel: string;
  href: string;
};

export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
};

export type SupportLink = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  actionLabel: string;
};

export const hubNavCards: HubNavCard[] = [
  {
    id: "academy",
    title: "Academy",
    description: "Courses and certifications built for partners.",
    href: "/partners/academy",
    icon: GraduationCap,
    badge: "Learning",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "Proof decks and case studies by industry.",
    href: "/partners/academy/portfolio",
    icon: Briefcase,
    badge: "Proof",
  },
  {
    id: "pitch-kit",
    title: "Pitch Kit",
    description: "Decks, scripts, pricing calculators, and Looms.",
    href: "/partners/academy/pitch-kit",
    icon: Layers,
    badge: "Sales",
  },
  {
    id: "saved-docs",
    title: "Saved Docs",
    description: "Your bookmarked lessons and assets.",
    href: "/partners/academy/saved",
    icon: Bookmark,
    badge: "Bookmarks",
  },
  {
    id: "inbox",
    title: "Inbox",
    description: "Alerts, approvals, and workflow nudges.",
    href: "/partners/inbox",
    icon: Bell,
    badge: "Notifications",
  },
  {
    id: "messages",
    title: "Messages",
    description: "1:1 chats with Partner Success & peers.",
    href: "/partners/community/messages",
    icon: MessagesSquare,
    badge: "Support",
  },
  {
    id: "workspace",
    title: "Workspace",
    description: "Tasks, deliverables, and shared files.",
    href: "/partners/workspace",
    icon: LayoutDashboard,
    badge: "Execution",
  },
  {
    id: "wallet",
    title: "Wallet",
    description: "Track commissions and payouts in real time.",
    href: "/partners/wallet",
    icon: Wallet2,
    badge: "Revenue",
  },
];

export const hubMetrics: HubMetric[] = [
  {
    id: "certifications",
    label: "Certifications",
    value: "2 / 4",
    helper: "Academy checkpoints complete",
    intent: "progress",
  },
  {
    id: "opportunities",
    label: "Opportunities",
    value: "3",
    helper: "Active in Partner Workspace",
    intent: "success",
  },
  {
    id: "alerts",
    label: "Notifications",
    value: "5",
    helper: "Awaiting your review",
    intent: "alert",
  },
];

export const hubAnnouncements: HubAnnouncement[] = [
  {
    id: "broadcast",
    title: "Partner Broadcast • Nov 18",
    body: "Join the 20-min live rundown of the new margin toolkit and ask questions.",
    timestamp: "Goes live Monday 1:00 PM CT",
    ctaLabel: "Save my seat",
    href: "/partners/community/messages?thread=broadcast",
  },
  {
    id: "pitch-kit",
    title: "New pitch kit drops",
    body: "Manufacturing and Retail playbooks now include refreshed ROI calculators.",
    timestamp: "Updated 2 hours ago",
    ctaLabel: "View updates",
    href: "/partners/academy/pitch-kit",
  },
];

export const onboardingSteps: OnboardingStep[] = [
  {
    id: "connect-workspace",
    title: "Connect your workspace",
    description: "Link deliverables + tasks so we can sync progress automatically.",
    actionLabel: "Open Workspace",
    href: "/partners/workspace",
  },
  {
    id: "first-lesson",
    title: "Start your first lesson",
    description: "Kick off the Discovery Basics module to unlock certification.",
    actionLabel: "Launch Lesson",
    href: "/partners/academy/my-progress",
  },
  {
    id: "save-docs",
    title: "Bookmark key docs",
    description: "Add the pitch assets you’ll reference most often.",
    actionLabel: "Open Saved Docs",
    href: "/partners/academy/saved",
  },
  {
    id: "schedule-office-hours",
    title: "Schedule office hours",
    description: "Grab a 20-minute slot with Partner Success this week.",
    actionLabel: "Book time",
    href: "/partners/workspace?modal=office-hours",
  },
  {
    id: "meet-success",
    title: "Say hi to Partner Success",
    description: "Drop your intro so we can tailor enablement to your pipeline.",
    actionLabel: "Message team",
    href: "/partners/community/messages?thread=success",
  },
];

export const supportLinks: SupportLink[] = [
  {
    id: "office-hours",
    title: "Office hours",
    description: "Live Zoom with Partner Success • 20 min daily slots.",
    href: "/partners/workspace?modal=office-hours",
    icon: Clock3,
    actionLabel: "Book session",
  },
  {
    id: "help-center",
    title: "Help Center",
    description: "Policies, billing, escalation playbooks, and API docs.",
    href: "/partners/community/help",
    icon: LifeBuoy,
    actionLabel: "Open docs",
  },
  {
    id: "success-chat",
    title: "Partner Success chat",
    description: "DM the Success pod for blockers, reviews, or co-selling help.",
    href: "/partners/community/messages?thread=success",
    icon: MessagesSquare,
    actionLabel: "Send message",
  },
];

export const heroCopy = {
  title: "Welcome to Partnership Hub",
  description: "Your launchpad for onboarding, proof, and live enablement.",
  metricLabel: "steps complete",
  primaryCta: {
    label: "Resume onboarding",
    href: "/partners/academy/my-progress",
  },
  secondaryCta: {
    label: "Chat with Partner Success",
    href: "/partners/community/messages?thread=success",
  },
  icon: Sparkles,
};
