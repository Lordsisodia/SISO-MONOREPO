import type { MobileTabId, QuickActionId } from "../types/navigation";

export interface MobileTabMeta {
  id: MobileTabId;
  label: string;
  icon: string;
  supportsImmersive: boolean;
}

export const mobileTabs: MobileTabMeta[] = [
  { id: "campus", label: "Campus", icon: "sidebar", supportsImmersive: true },
  { id: "learning", label: "Learning", icon: "play", supportsImmersive: false },
  { id: "notifications", label: "Inbox", icon: "inbox", supportsImmersive: false },
  { id: "messages", label: "Messages", icon: "users", supportsImmersive: true },
  { id: "quick-actions", label: "Quick", icon: "dots", supportsImmersive: false },
];

export interface QuickActionEntry {
  id: QuickActionId;
  label: string;
  description: string;
  icon: string;
}

export const quickActionEntries: QuickActionEntry[] = [
  { id: "settings", label: "Settings Hub", description: "All partner preferences", icon: "settings" },
  { id: "settings-account", label: "Account", description: "Login, username, security", icon: "user" },
  { id: "settings-notifications", label: "Notifications", description: "Email & push preferences", icon: "bell" },
  { id: "settings-profile", label: "Profile", description: "Public profile & bio", icon: "id" },
  { id: "settings-devices", label: "Devices", description: "Connected hardware security", icon: "devices" },
  { id: "settings-membership", label: "Membership", description: "Tier perks & upgrades", icon: "medal" },
  { id: "settings-affiliate", label: "Affiliate", description: "Commission analytics", icon: "coins" },
  { id: "settings-refer", label: "Refer a Friend", description: "Share invite link", icon: "share" },
  { id: "settings-feedback", label: "Feedback", description: "Report bugs & ideas", icon: "message" },
  { id: "settings-whats-new", label: "What's New", description: "Recent product drops", icon: "sparkles" },
  { id: "checklist", label: "Checklist", description: "Automation tasks and onboarding", icon: "check" },
  { id: "wallet", label: "Wallet", description: "Payouts and balances", icon: "wallet" },
  { id: "submit-client", label: "Submit Client", description: "Log a potential client", icon: "send" },
  { id: "messages-new", label: "New Message", description: "Start a direct message", icon: "message" },
];
