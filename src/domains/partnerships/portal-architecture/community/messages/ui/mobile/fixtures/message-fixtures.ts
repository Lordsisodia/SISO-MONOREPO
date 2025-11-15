export interface MessageThread {
  id: string;
  name: string;
  badge?: string;
  preview: string;
  unreadCount?: number;
  lastMessageAt: string;
  category: "Pinned" | "Recent";
  presence?: "online" | "idle" | "offline";
}

export const mockThreads: MessageThread[] = [
  {
    id: "saved",
    name: "Saved Messages",
    preview: "Your personal space",
    category: "Pinned",
    lastMessageAt: "Now",
    presence: "online",
  },
  {
    id: "captain",
    name: "Rauzas | Captain",
    preview: "Check the new mission briefs",
    unreadCount: 3,
    category: "Pinned",
    lastMessageAt: "Today · 9:12 AM",
    badge: "Captain",
    presence: "online",
  },
  {
    id: "guide",
    name: "HQ Guide",
    badge: "BOT",
    preview: "Ready for questions",
    category: "Recent",
    lastMessageAt: "Today · 8:44 AM",
    presence: "idle",
  },
  {
    id: "ops",
    name: "Operations Desk",
    preview: "Sync complete. Uploads processed.",
    unreadCount: 1,
    category: "Recent",
    lastMessageAt: "Yesterday · 6:30 PM",
    presence: "offline",
  },
  {
    id: "coach",
    name: "Mentor Lia",
    preview: "Drop your wins for review.",
    category: "Recent",
    lastMessageAt: "Yesterday · 2:10 PM",
    presence: "idle",
  },
];
