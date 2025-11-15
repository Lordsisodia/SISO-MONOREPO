import type { QuickActionId } from "../types/navigation";
import { settingsRouteRegistry } from "@/domains/partnerships/portal-architecture/settings/settings-route-registry";

export const QUICK_ACTION_DEFAULT_PATH = "/partners/settings";

const SETTINGS_QUICK_ACTION_PATHS = settingsRouteRegistry.reduce<Partial<Record<QuickActionId, string>>>((acc, route) => {
  if (route.quickActionId && route.status === "live") {
    acc[route.quickActionId] = route.path;
  }
  return acc;
}, {});

export const QUICK_ACTION_PATHS: Record<QuickActionId, string> = {
  settings: QUICK_ACTION_DEFAULT_PATH,
  ...(SETTINGS_QUICK_ACTION_PATHS as Record<string, string>),
  "settings-notifications": "/partners/settings/general#notifications",
  checklist: "/partners/checklist",
  wallet: "/partners/settings/wallet",
  "submit-client": "/partners/pipeline-ops/submit-client",
  // Route messages quick action to the live messages screen
  // Old path was "/partners/community/messages/new" which doesn't exist.
  // We send users to the canonical messages hub.
  "messages-new": "/partners/community/messages",
};

export const QUICK_ACTION_PATH_LOOKUP: Record<string, QuickActionId> = {
  [QUICK_ACTION_DEFAULT_PATH]: "settings",
  "/partners/quick": "settings",
  "/partners/messages": "messages-new",
  ...Object.entries(QUICK_ACTION_PATHS).reduce<Record<string, QuickActionId>>((acc, [action, path]) => {
    acc[path] = action as QuickActionId;
    return acc;
  }, {}),
};

export const getPathForQuickAction = (action: QuickActionId) =>
  QUICK_ACTION_PATHS[action] ?? QUICK_ACTION_DEFAULT_PATH;
