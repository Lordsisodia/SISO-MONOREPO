"use client";

import dynamic from "next/dynamic";
import Loader from "@/domains/partnerships/portal-architecture/settings/shared/loader-15";
import { useEffect, useMemo } from "react";
import { useMobileNavigation } from "../../application/navigation-store";
import { settingsRouteRegistry } from "@/domains/partnerships/portal-architecture/settings/settings-route-registry";
const Loading = () => <Loader />;

const ComingSoonView = dynamic(
  () => import("@/domains/partnerships/portal-architecture/settings/components/ComingSoonView"),
  { loading: Loading },
);

const SettingsPanel = dynamic(
  () => import("@/domains/partnerships/portal-architecture/settings/menu/SettingsPanel").then(m => m.SettingsPanel),
  { loading: Loading },
);
const AccountSettingsView = dynamic(
  () => import("@/domains/partnerships/portal-architecture/settings/account/ui/AccountSettingsView").then(m => m.AccountSettingsView),
  { loading: Loading },
);
const AccountNotificationsView = dynamic(
  () => import("@/domains/partnerships/portal-architecture/settings/general/sections/notifications/ui/AccountNotificationsView").then(m => m.AccountNotificationsView),
  { loading: Loading },
);
const ProfileSettingsView = dynamic(
  () => import("@/domains/partnerships/portal-architecture/settings/profile/ui/ProfileSettingsView").then(m => m.ProfileSettingsView),
  { loading: Loading },
);
const ConnectedDevicesView = dynamic(
  () => import("@/domains/partnerships/portal-architecture/settings/devices/ui/ConnectedDevicesView").then(m => m.ConnectedDevicesView),
  { loading: Loading },
);
const TierListScreen = dynamic(
  () => import("@/domains/partnerships/settings/ui/mobile/screens/tiers/TierListScreen").then(m => m.TierListScreen),
  { loading: Loading },
);
const AffiliateDashboardView = dynamic(
  () => import("@/domains/partnerships/portal-architecture/recruitment/invite-partners/ui/AffiliateDashboardView").then(m => m.AffiliateDashboardView),
  { loading: Loading },
);
const InvitePartnersScreen = dynamic(
  () => import("@/domains/partnerships/portal-architecture/recruitment/invite-partners/ui/InvitePartnersScreen").then(m => m.InvitePartnersScreen),
  { loading: Loading },
);
const ProvideFeedbackView = dynamic(
  () => import("@/domains/partnerships/portal-architecture/partnership-hub/support/ui/ProvideFeedbackView").then(m => m.ProvideFeedbackView),
  { loading: Loading },
);
const WhatsNewView = dynamic(
  () => import("@/domains/partnerships/portal-architecture/community/announcements/ui/WhatsNewView").then(m => m.WhatsNewView),
  { loading: Loading },
);
const ChecklistPanel = dynamic(
  () => import("@/domains/partnerships/checklist/ui/mobile").then(m => m.ChecklistPanel),
  { loading: Loading },
);
const WalletPanel = dynamic(
  () => import("@/domains/partnerships/wallet/ui/mobile").then(m => m.WalletPanel),
  { loading: Loading },
);
const GeneralSettingsScreen = dynamic(
  () => import("@/domains/partnerships/portal-architecture/settings/general/ui/GeneralSettingsScreen").then(m => m.GeneralSettingsScreen),
  { loading: Loading },
);

export function QuickActionsContent() {
  const { activeQuickAction } = useMobileNavigation();

  // Gentle prefetch for most-used settings when the hub is open
  useEffect(() => {
    if (activeQuickAction === "settings") {
      const idle = ("requestIdleCallback" in window)
        ? (window as any).requestIdleCallback
        : (cb: any) => setTimeout(cb, 300);
      const handle = idle(() => {
        void Promise.allSettled([
          import("@/domains/partnerships/portal-architecture/settings/account/ui/AccountSettingsView"),
          import("@/domains/partnerships/portal-architecture/settings/profile/ui/ProfileSettingsView"),
        ]);
      });
      return () => ("cancelIdleCallback" in window) ? (window as any).cancelIdleCallback?.(handle) : clearTimeout(handle as any);
    }
  }, [activeQuickAction]);

  // Non-settings quick actions remain as adapters
  if (activeQuickAction === "checklist") return <ChecklistPanel />;
  if (activeQuickAction === "wallet") return <WalletPanel />;
  if (!activeQuickAction || activeQuickAction === "settings") return <SettingsPanel />;

  // Resolve settings views from the registry by quickActionId
  const target = useMemo(
    () => settingsRouteRegistry.find((r) => r.quickActionId === activeQuickAction),
    [activeQuickAction],
  );

  if (!target) return <SettingsPanel />;

  if (target.status === "planned" || !target.component) {
    return <ComingSoonView title={target.title} description={target.description} />;
  }

  const LazyResolved = dynamic(async () => {
    const mod = await target.component!();
    return mod;
  }, { loading: Loading });

  return <LazyResolved />;
}
