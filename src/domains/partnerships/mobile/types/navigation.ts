export type MobileTabId = "campus" | "learning" | "notifications" | "messages" | "quick-actions";

export type QuickActionId =
  | "settings"
  | "settings-general"
  | "settings-account"
  | "settings-notifications"
  | "settings-profile"
  | "settings-devices"
  | "settings-membership"
  | "settings-affiliate"
  | "settings-refer"
  | "settings-feedback"
  | "settings-whats-new"
  | "checklist"
  | "wallet"
  | "submit-client"
  | "messages-new";

export interface NavigationState {
  activeTab: MobileTabId;
  previousTab: MobileTabId;
  isQuickActionsOpen: boolean;
  isDrawerOpen: boolean;
  activeQuickAction: QuickActionId | null;
  contextualQuickActions?: QuickActionId[];
  /** Used to hide bottom bar when true (e.g., message detail, profile modal). */
  isImmersiveMode: boolean;
  /** Remembers which section of the campus drawer was last expanded. */
  activeDrawerSection: string;
}
