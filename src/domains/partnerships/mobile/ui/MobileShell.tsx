"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, type MouseEvent, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MobileNavigationProvider, useMobileNavigation } from "../application/navigation-store";
import { QUICK_ACTION_PATH_LOOKUP, QUICK_ACTION_DEFAULT_PATH } from "../application/quick-action-routes";
import { ScreenViewport } from "./components/ScreenViewport";
import { QuickActionsContent } from "./quick-actions/QuickActionsContent";
import { CampusHubScreen } from "@/domains/partnerships/workspace/ui/mobile";
import dynamic from "next/dynamic";
const CampusDrawer = dynamic(
  () => import("@/domains/partnerships/shared/ui/mobile/campus-sidebar/CampusDrawer").then(m => m.CampusDrawer),
  { ssr: false, loading: () => null },
);
import { LearningHubResponsive } from "@/domains/partnerships/portal-architecture/academy/ui";
import { MessagesScreen } from "@/domains/partnerships/communications/ui/mobile";
import { NotificationsScreen } from "@/domains/partnerships/notifications/ui/mobile";
import { LimelightNav, type NavItem } from "@/components/ui/limelight-nav";
import { Home, GraduationCap, Bell, MessagesSquare, MoreHorizontal } from "lucide-react";
import type { MobileTabId, QuickActionId } from "../types/navigation";

const MESSAGES_CANONICAL_PATH = "/partners/community/messages";
const LEGACY_MESSAGES_PATH = "/partners/messages";

const TAB_ROUTE_MAP: Record<MobileTabId, string> = {
  campus: "/partners",
  learning: "/partners/academy",
  notifications: "/partners/inbox",
  messages: MESSAGES_CANONICAL_PATH,
  "quick-actions": QUICK_ACTION_DEFAULT_PATH,
};

const DEFAULT_QUICK_ACTION: QuickActionId = "settings";

const normalizePartnersPath = (pathname: string): string => {
  if (!pathname) return "/partners";
  const noTrailing = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const cleaned = noTrailing.replace(/\/\([^/]+\)/g, "");
  return cleaned || "/partners";
};

const getTabFromPath = (pathname: string): MobileTabId => {
  const normalized = normalizePartnersPath(pathname);

  if (normalized === "/partners" || normalized === "/partners/campus") {
    return "campus";
  }

  if (normalized.startsWith("/partners/learning") || normalized.startsWith("/partners/academy")) {
    return "learning";
  }

  if (normalized.startsWith("/partners/inbox") || normalized.startsWith("/partners/notifications")) {
    return "notifications";
  }

  if (normalized.startsWith(MESSAGES_CANONICAL_PATH) || normalized.startsWith(LEGACY_MESSAGES_PATH)) {
    return "messages";
  }

  if (normalized.startsWith("/partners/quick")
      || normalized.startsWith("/partners/settings")
      || normalized.startsWith("/partners/profile")
      || normalized.startsWith("/partners/wallet")
      || normalized.startsWith("/partners/checklist")) {
    return "quick-actions";
  }

  return "campus";
};

const getQuickActionFromPath = (pathname: string): QuickActionId | null => {
  const normalized = normalizePartnersPath(pathname);
  return QUICK_ACTION_PATH_LOOKUP[normalized] ?? null;
};

function ShellContent({ children }: { children?: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() ?? "/partners";
  const normalizedPath = useMemo(() => normalizePartnersPath(pathname), [pathname]);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const {
    activeTab,
    isImmersiveMode,
    setActiveTab,
    closeQuickActions,
    closeDrawer,
    isDrawerOpen,
    activeQuickAction,
    selectQuickAction,
  } = useMobileNavigation();

  const targetQuickAction = useMemo(() => getQuickActionFromPath(pathname), [pathname]);

  useEffect(() => {
    const nextTab = getTabFromPath(pathname);
    const defaultImmersive = nextTab === "messages";

    if (nextTab !== activeTab) {
      setActiveTab(nextTab, { immersive: defaultImmersive });
    }

    if (nextTab === "quick-actions") {
      const desiredQuickAction = targetQuickAction ?? activeQuickAction ?? DEFAULT_QUICK_ACTION;
      if (activeQuickAction !== desiredQuickAction) {
        selectQuickAction(desiredQuickAction);
      }
    } else if (activeTab === "quick-actions") {
      closeQuickActions();
    }

    // Allow the drawer to remain open on selected tabs (campus, notifications, quick-actions, messages)
    const drawerSafeTabs: MobileTabId[] = ["campus", "quick-actions", "notifications", "messages"];
    if (!drawerSafeTabs.includes(nextTab) && isDrawerOpen) {
      closeDrawer();
    }
  }, [
    pathname,
    activeTab,
    setActiveTab,
    activeQuickAction,
    selectQuickAction,
    closeQuickActions,
    isDrawerOpen,
    closeDrawer,
    targetQuickAction,
  ]);

  const navigateToTab = (tab: MobileTabId) => {
    const target = TAB_ROUTE_MAP[tab];
    if (!target) return;

    const normalizedTarget = normalizePartnersPath(target);
    if (normalizedTarget === normalizedPath && tab !== "quick-actions") {
      return;
    }

    if (tab !== "quick-actions") {
      closeQuickActions();
    }

    if (tab !== activeTab) {
      setActiveTab(tab, { immersive: tab === "messages" });
    }

    router.push(target);
  };

  const handleTabClick = (event: MouseEvent<HTMLAnchorElement>, tab: MobileTabId) => {
    event.preventDefault();
    navigateToTab(tab);
  };

  const handleQuickMenuClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateToTab("quick-actions");
  };

  const shouldShowNav = false; // Bottom nav removed - all navigation now in side nav

  useLayoutEffect(() => {
    const measure = () => {
      if (navContainerRef.current) {
        const height = navContainerRef.current.offsetHeight;
        document.documentElement.style.setProperty("--mobile-nav-height", `${height}`);
      } else {
        document.documentElement.style.removeProperty("--mobile-nav-height");
      }
    };
    if (shouldShowNav) {
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    document.documentElement.style.removeProperty("--mobile-nav-height");
    return () => undefined;
  }, [shouldShowNav]);


  const renderActiveTab = () => {
    switch (activeTab) {
      case "campus":
        return <CampusHubScreen />;
      case "learning":
        return <LearningHubResponsive />;
      case "notifications":
        return <NotificationsScreen />;
      case "messages":
        return <MessagesScreen />;
      case "quick-actions":
      default:
        return <QuickActionsContent />;
    }
  };

  return (
    <>
      {isDrawerOpen ? <CampusDrawer /> : null}
      <ScreenViewport isImmersive={isImmersiveMode} hasBottomNav={shouldShowNav}>
        {renderActiveTab()}
      </ScreenViewport>
      {children}
    </>
  );
}
export type MobileShellProps = {
  children?: ReactNode;
  initialTab?: MobileTabId;
  initialQuickAction?: QuickActionId | null;
  initialImmersiveMode?: boolean;
};

export function MobileShell({
  children,
  initialTab = "campus",
  initialQuickAction = null,
  initialImmersiveMode,
}: MobileShellProps) {
  const initialState = useMemo(
    () => ({
      activeTab: initialTab,
      previousTab: initialTab,
      isQuickActionsOpen: initialTab === "quick-actions" && Boolean(initialQuickAction),
      isDrawerOpen: false,
      activeQuickAction: initialQuickAction,
      isImmersiveMode: initialImmersiveMode ?? (initialTab === "messages"),
    }),
    [initialImmersiveMode, initialQuickAction, initialTab],
  );

  return (
      <MobileNavigationProvider initialState={initialState}>
        <ShellContent>{children}</ShellContent>
      </MobileNavigationProvider>
    );
}
