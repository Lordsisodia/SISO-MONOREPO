import type { QuickActionId } from "@/domains/partnerships/mobile/types/navigation";
import { getPathForQuickAction } from "@/domains/partnerships/mobile/application/quick-action-routes";
import { ClipboardList, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { settingsRouteRegistry, type SettingsRouteGroup } from "../settings-route-registry";

export type SettingsMenuItem = {
  id: string; // allow non-quick-action ids for planned pages
  label: string;
  icon: LucideIcon;
  path: string;
  meta?: string;
};

const settingsGroupOrder: SettingsRouteGroup[] = ["Basics", "Account", "Integrations", "Privacy", "Growth", "Support"];
export const SETTINGS_GROUP_ORDER = settingsGroupOrder;
export const SETTINGS_GROUP_LABELS: Record<SettingsRouteGroup, string> = {
  Basics: "Basics",
  Account: "Account",
  Integrations: "Integrations",
  Privacy: "Privacy & Legal",
  Growth: "Growth",
  Support: "Support",
};

const registryMenuItems: SettingsMenuItem[] = (() => {
  const grouped = new Map<SettingsRouteGroup, SettingsMenuItem[]>();

  settingsRouteRegistry
    .filter((route) => (route.status === "live" || route.status === "planned") && !route.menuHidden)
    .forEach((route) => {
      const item: SettingsMenuItem = {
        id: (route.quickActionId ?? route.id) as string,
        label: route.menuLabel ?? route.title,
        icon: route.icon,
        path: route.path,
        meta: route.menuMeta ?? (route.status !== "live" ? "Coming soon" : undefined),
      };
      const group = route.group;
      if (!grouped.has(group)) grouped.set(group, []);
      grouped.get(group)!.push(item);
    });

  const orderedGroups = Array.from(grouped.entries()).sort((a, b) => {
    const ai = settingsGroupOrder.indexOf(a[0]);
    const bi = settingsGroupOrder.indexOf(b[0]);
    return (ai === -1 ? Number.MAX_SAFE_INTEGER : ai) - (bi === -1 ? Number.MAX_SAFE_INTEGER : bi);
  });

  return orderedGroups.flatMap(([, items]) => items.sort((a, b) => a.label.localeCompare(b.label)));
})();

export const SETTINGS_MENU_ITEMS: SettingsMenuItem[] = [
  ...registryMenuItems,
  // Shortcuts appended at the end
  {
    id: "checklist",
    label: "Checklist",
    icon: ClipboardList,
    path: getPathForQuickAction("checklist"),
    meta: "6 tasks",
  },
  {
    id: "wallet",
    label: "Wallet",
    icon: Wallet,
    path: "/partners/settings/wallet",
    meta: "£18k",
  },
];

export type SettingsMenuGroup = {
  key: SettingsRouteGroup | "Shortcuts" | "Financial";
  title: string;
  items: SettingsMenuItem[];
};

export function getGroupedSettingsMenuItems(): SettingsMenuGroup[] {
  const grouped = new Map<SettingsRouteGroup, SettingsMenuItem[]>();
  settingsRouteRegistry
    .filter((route) => (route.status === "live" || route.status === "planned") && !route.menuHidden)
    .forEach((route) => {
      const item: SettingsMenuItem = {
        id: (route.quickActionId ?? route.id) as string,
        label: route.menuLabel ?? route.title,
        icon: route.icon,
        path: route.path,
        meta: route.menuMeta ?? (route.status !== "live" ? "Coming soon" : undefined),
      };
      const group = route.group;
      if (!grouped.has(group)) grouped.set(group, []);
      grouped.get(group)!.push(item);
    });

  const ordered: SettingsMenuGroup[] = Array.from(grouped.entries())
    .sort((a, b) => {
      const ai = settingsGroupOrder.indexOf(a[0]);
      const bi = settingsGroupOrder.indexOf(b[0]);
      return (ai === -1 ? Number.MAX_SAFE_INTEGER : ai) - (bi === -1 ? Number.MAX_SAFE_INTEGER : bi);
    })
    .map(([key, items]) => ({
      key,
      title: SETTINGS_GROUP_LABELS[key] ?? key,
      items: items.sort((a, b) => a.label.localeCompare(b.label)),
    }));

  const wallet = SETTINGS_MENU_ITEMS.find((i) => i.id === "wallet");
  if (wallet) {
    ordered.push({ key: "Financial", title: "Financial", items: [wallet] });
  }
  const checklist = SETTINGS_MENU_ITEMS.find((i) => i.id === "checklist");
  if (checklist) {
    ordered.push({ key: "Shortcuts", title: "Shortcuts", items: [checklist] });
  }
  return ordered;
}
