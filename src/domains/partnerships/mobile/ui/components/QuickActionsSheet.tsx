"use client";

import { useRouter } from "next/navigation";
import { quickActionEntries, type QuickActionEntry } from "../../application/tab-registry";
import { useMobileNavigation } from "../../application/navigation-store";
import { getPathForQuickAction } from "../../application/quick-action-routes";
import { cn } from "@/domains/shared/utils/cn";
import type { JSX } from "react";
import type { QuickActionId } from "../../types/navigation";

const defaultIcon = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
    <path d="M4.93 6.93 6.34 5.5" strokeLinecap="round" />
    <path d="M19.07 6.93 17.66 5.5" strokeLinecap="round" />
    <path d="M4.93 17.07 6.34 18.5" strokeLinecap="round" />
    <path d="M19.07 17.07 17.66 18.5" strokeLinecap="round" />
    <path d="M12 4v2" strokeLinecap="round" />
    <path d="M12 18v2" strokeLinecap="round" />
  </svg>
);

const ActionIcons: Partial<Record<QuickActionId, JSX.Element>> = {
  settings: defaultIcon,
  "settings-profile": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 19c0-3.3 3.1-5 7-5s7 1.7 7 5" />
    </svg>
  ),
  checklist: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8h.01" />
      <path d="M8 16h.01" />
    </svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M17 11.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    </svg>
  ),
};

export function QuickActionsSheet() {
  const { isQuickActionsOpen, closeQuickActions, launchQuickAction, contextualQuickActions } = useMobileNavigation();
  const router = useRouter();

  if (!isQuickActionsOpen) {
    return null;
  }

  const entries: QuickActionEntry[] = (contextualQuickActions && contextualQuickActions.length)
    ? quickActionEntries.filter(e => contextualQuickActions.includes(e.id))
    : quickActionEntries;

  return (
    <>
      <div className="fixed inset-0 z-[95] bg-black/55 backdrop-blur-[2px]" onClick={closeQuickActions} />
      <div
        className={cn(
          "fixed inset-x-4 bottom-[120px] z-[100] rounded-3xl border border-siso-border bg-siso-bg-secondary/95 p-3 shadow-siso backdrop-blur",
          "animate-in fade-in slide-in-from-bottom-6",
        )}
        aria-hidden={!isQuickActionsOpen}
      >
        <ul className="divide-y divide-siso-border/60">
          {entries.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-2 py-3 text-left"
                onClick={() => {
                  launchQuickAction(entry.id);
                  router.push(getPathForQuickAction(entry.id));
                }}
              >
                <span className="flex items-center gap-3 text-siso-text-primary">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-siso-bg-tertiary text-siso-text-primary">
                    {ActionIcons[entry.id] ?? defaultIcon}
                  </span>
                  <span className="text-sm font-medium">{entry.label}</span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-siso-text-muted"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
