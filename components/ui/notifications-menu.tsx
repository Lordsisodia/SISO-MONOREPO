"use client";

import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/domains/shared/utils/cn";

export type NotificationsMenuItem = {
  id: number;
  type: string;
  user: {
    name: string;
    avatar: string;
    fallback: string;
  };
  action: string;
  target?: string;
  content?: string;
  timestamp: string;
  timeAgo: string;
  isRead: boolean;
  hasActions?: boolean;
};

export type NotificationFilter = "all" | "verified" | "mentions";

const defaultNotifications: NotificationsMenuItem[] = [
  {
    id: 1,
    type: "comment",
    user: {
      name: "Amélie",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Amélie",
      fallback: "A",
    },
    action: "commented in",
    target: "Dashboard 2.0",
    content: "Really love this approach. I think this is the best solution for the document sync UX issue.",
    timestamp: "Friday 3:12 PM",
    timeAgo: "2 hours ago",
    isRead: false,
  },
  {
    id: 2,
    type: "follow",
    user: {
      name: "Sienna",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sienna",
      fallback: "S",
    },
    action: "followed you",
    timestamp: "Friday 3:04 PM",
    timeAgo: "2 hours ago",
    isRead: false,
  },
  {
    id: 3,
    type: "invitation",
    user: {
      name: "Ammar",
      avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ammar",
      fallback: "A",
    },
    action: "invited you to",
    target: "Blog design",
    timestamp: "Friday 2:22 PM",
    timeAgo: "3 hours ago",
    isRead: true,
    hasActions: true,
  },
];

type NotificationItemProps = {
  notification: NotificationsMenuItem;
};

function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex gap-3">
        <Avatar className="h-11 w-11">
          <AvatarImage src={notification.user.avatar || "/placeholder.svg"} alt={notification.user.name} />
          <AvatarFallback>{notification.user.fallback}</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-2">
          <div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">{notification.user.name}</span>
                <span className="text-siso-text-muted"> {notification.action} </span>
                {notification.target && <span className="font-medium">{notification.target}</span>}
              </div>
              {!notification.isRead && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
            </div>
            <div className="flex items-center justify-between text-xs text-siso-text-muted">
              <span>{notification.timestamp}</span>
              <span>{notification.timeAgo}</span>
            </div>
          </div>

          {notification.content && (
            <div className="rounded-lg bg-siso-bg-secondary/70 p-2.5 text-sm">{notification.content}</div>
          )}

          {notification.hasActions && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Decline
              </Button>
              <Button size="sm" className="h-7 text-xs">
                Accept
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const pillBase =
  "group flex min-w-[120px] flex-shrink-0 items-center justify-center rounded-2xl border border-siso-border/40 bg-siso-bg-secondary/40 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.05em] text-siso-text-muted transition hover:border-siso-border/60 data-[state=active]:border-siso-orange data-[state=active]:bg-siso-bg-secondary/70 data-[state=active]:text-siso-text-primary data-[state=active]:shadow-[0_0_18px_rgba(255,138,0,0.35)]";

type NotificationsFilterTabsProps = {
  value: NotificationFilter;
  onValueChange: (value: NotificationFilter) => void;
  counts: Record<NotificationFilter, number>;
  className?: string;
};

export function NotificationsFilterTabs({ value, onValueChange, counts, className }: NotificationsFilterTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className={cn("w-full", className)}>
      <TabsList className="flex w-full gap-2 overflow-x-auto bg-transparent p-0">
        <TabsTrigger value="all" className={pillBase}>
          <span>View all</span>
        </TabsTrigger>
        <TabsTrigger value="verified" className={pillBase}>
          <span>Verified</span>
        </TabsTrigger>
        <TabsTrigger value="mentions" className={pillBase}>
          <span>Mentions</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export type NotificationsMenuProps = {
  items?: NotificationsMenuItem[];
  className?: string;
  defaultTab?: NotificationFilter;
  activeTab?: NotificationFilter;
  onTabChange?: (tab: NotificationFilter) => void;
  showFilters?: boolean;
};

export function NotificationsMenu({
  items,
  className,
  defaultTab = "all",
  activeTab,
  onTabChange,
  showFilters = true,
}: NotificationsMenuProps) {
  const notifications = items ?? defaultNotifications;
  const verifiedCount = notifications.filter((n) => n.type === "follow" || n.type === "like").length;
  const mentionCount = notifications.filter((n) => n.type === "mention").length;

  const [internalTab, setInternalTab] = React.useState<NotificationFilter>(defaultTab);
  const resolvedTab = activeTab ?? internalTab;

  const handleTabChange = (next: NotificationFilter) => {
    if (!activeTab) {
      setInternalTab(next);
    }
    onTabChange?.(next);
  };

  const filteredNotifications = React.useMemo(() => {
    if (!showFilters) return notifications;
    switch (resolvedTab) {
      case "verified":
        return notifications.filter((n) => n.type === "follow" || n.type === "like");
      case "mentions":
        return notifications.filter((n) => n.type === "mention");
      default:
        return notifications;
    }
  }, [notifications, resolvedTab, showFilters]);

  const counts: Record<NotificationFilter, number> = {
    all: notifications.length,
    verified: verifiedCount,
    mentions: mentionCount,
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {showFilters ? (
        <NotificationsFilterTabs value={resolvedTab} onValueChange={handleTabChange} counts={counts} />
      ) : null}

      <div className="space-y-0 divide-y divide-dashed divide-border/60">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2.5 py-12 text-center">
            <div className="rounded-full bg-muted p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="m13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <p className="text-sm font-medium tracking-[-0.006em] text-muted-foreground">No notifications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
