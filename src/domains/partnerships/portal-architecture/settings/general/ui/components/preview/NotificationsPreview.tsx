"use client";

import { Bell, BellOff } from "lucide-react";

interface NotificationsPreviewProps {
  unreadCount: number;
  enabledCategories: number;
  totalCategories: number;
}

export function NotificationsPreview({
  unreadCount,
  enabledCategories,
  totalCategories
}: NotificationsPreviewProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {unreadCount > 0 ? (
          <Bell className="h-4 w-4 text-siso-orange" />
        ) : (
          <BellOff className="h-4 w-4 text-siso-text-muted" />
        )}
        <span className="text-xs text-siso-text-muted">Unread:</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          unreadCount > 0
            ? 'bg-siso-orange text-white'
            : 'bg-siso-bg-tertiary text-siso-text-muted'
        }`}>
          {unreadCount || '0'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-siso-text-muted">Active:</span>
        <span className={`text-xs font-medium ${
          enabledCategories > 0 ? 'text-green-500' : 'text-siso-text-muted'
        }`}>
          {enabledCategories}/{totalCategories} categories
        </span>
      </div>
    </div>
  );
}