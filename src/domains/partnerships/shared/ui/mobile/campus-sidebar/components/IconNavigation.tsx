import type { ReactNode } from "react";
import { Bell, Settings as SettingsIcon } from "lucide-react";
import { User as UserIcon } from "@carbon/icons-react";
import { useRouter } from "next/navigation";

import { getTopLevelIconSummaries } from "@/config/partner-nav-config";
import { getIconComponent } from "@/config/icon-registry";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";

import { softSpringEasing } from "../constants";

function InterfacesLogoSquare() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <img
        src="/branding/siso-logo.svg"
        alt="SISO"
        className="block h-full w-full object-contain"
        style={{ transform: "scale(1.1)" }}
      />
    </div>
  );
}

function AvatarCircle() {
  return (
    <div className="relative rounded-full shrink-0 size-8 bg-black">
      <div className="flex items-center justify-center size-8">
        <UserIcon size={16} className="text-neutral-50" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 rounded-full border border-neutral-800 pointer-events-none" />
    </div>
  );
}

interface IconNavButtonProps {
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  badge?: number | "dot";
  onLongPress?: () => void;
}

function IconNavButton({ children, isActive = false, onClick, badge, onLongPress }: IconNavButtonProps) {
  let pressTimer: NodeJS.Timeout | undefined;

  const startPress = () => {
    if (!onLongPress) return;
    pressTimer = setTimeout(() => onLongPress?.(), 550);
  };

  const cancelPress = () => {
    if (pressTimer) clearTimeout(pressTimer);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={`flex items-center justify-center rounded-lg size-10 min-w-10 transition-colors duration-500 backdrop-blur-sm ${
          isActive ? "" : "hover:bg-neutral-800 text-neutral-400 hover:text-neutral-300"
        }`}
        style={{
          transitionTimingFunction: softSpringEasing,
          ...(isActive
            ? {
                color: "var(--siso-orange)",
                backgroundColor: "rgba(255, 167, 38, 0.14)",
                border: "1px solid rgba(255, 167, 38, 0.32)",
                boxShadow: "var(--siso-glow-orange)",
              }
            : {}),
        }}
        onClick={onClick}
        onPointerDown={startPress}
        onPointerUp={cancelPress}
        onPointerLeave={cancelPress}
      >
        {children}
      </button>
      {badge && badge !== 0 && (
        <span
          className={`absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full text-[10px] leading-none font-semibold ${
            badge === "dot" ? "h-2 w-2" : "h-4 min-w-[16px] px-[4px]"
          }`}
          style={{
            backgroundColor: "var(--siso-red)",
            color: "white",
            boxShadow: "var(--siso-glow-red)",
          }}
        >
          {badge === "dot" ? "" : badge}
        </span>
      )}
    </div>
  );
}

interface IconNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  heightClass?: string;
}

export function IconNavigation({ activeSection, onSectionChange, heightClass = "h-[800px]" }: IconNavigationProps) {
  const router = useRouter();
  const { openQuickActionsWith, closeDrawer } = useMobileNavigation();
  const summaries = getTopLevelIconSummaries();

  const labelOverride: Record<string, string> = { pipeline: "Deals", growth: "Earnings" };
  const counts: Record<string, number | "dot" | undefined> = {
    pipeline: 3,
    tasks: 2,
    growth: 1,
    community: "dot",
  };

  const navItems = summaries.map((summary) => {
    const IconCmp = getIconComponent(summary.icon);
    const fallback = (
      <div className="rounded bg-neutral-800 text-neutral-200 px-1 text-[10px] leading-none">
        {summary.label[0] ?? "?"}
      </div>
    );

    return {
      id: summary.id,
      icon: IconCmp ? <IconCmp size={16} /> : fallback,
      label: labelOverride[summary.id] ?? summary.label,
      order: summary.order,
      badge: counts[summary.id],
    };
  });

  const FIXED_ORDER = ["home", "academy", "pipeline", "growth", "community", "workspace", "settings"];
  const sorted = [...navItems].filter((item) => item.id !== "settings").sort((a, b) => {
    const aIdx = FIXED_ORDER.indexOf(a.id);
    const bIdx = FIXED_ORDER.indexOf(b.id);
    return (aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx) - (bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx);
  });

  return (
    <aside
      className={`bg-black flex flex-col items-center overflow-hidden px-2 py-3 w-16 flex-shrink-0 ${heightClass} h-screen sticky top-0 border-r border-neutral-800 rounded-l-2xl`}
    >
      <div className="mb-2 size-12 flex items-center justify-center overflow-hidden">
        <div className="size-9">
          <InterfacesLogoSquare />
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full items-center flex-1 overflow-y-auto overscroll-contain px-1 pb-10" style={{ overflowX: "hidden" }}>
        {sorted.map((item) => (
          <IconNavButton
            key={item.id}
            isActive={activeSection === item.id}
            onClick={() => {
              if (item.id === "settings") {
                router.push("/partners/settings");
                closeDrawer();
              } else {
                onSectionChange(item.id);
              }
            }}
            badge={item.badge}
            onLongPress={() => {
              if (item.id === "pipeline") {
                openQuickActionsWith(["submit-client", "checklist"]);
                return;
              }
              if (item.id === "growth") {
                openQuickActionsWith(["wallet"]);
                return;
              }
              if (item.id === "community") {
                openQuickActionsWith(["messages-new", "settings-feedback"]);
                return;
              }
              if (item.id === "settings") {
                openQuickActionsWith(["settings", "settings-notifications", "settings-profile"]);
              }
            }}
          >
            {item.icon}
          </IconNavButton>
        ))}
      </div>

      <div className="flex flex-col gap-3 w-full items-center pt-3 border-t border-neutral-800 pb-5">
        <IconNavButton
          onPointerEnter={() => {
            // Warm notifications screen chunk only on intent
            void import("@/domains/partnerships/portal-architecture/notifications/ui/mobile/screens/NotificationsScreen");
          }}
          onTouchStart={() => {
            void import("@/domains/partnerships/portal-architecture/notifications/ui/mobile/screens/NotificationsScreen");
          }}
          onClick={() => {
            router.push("/partners/inbox");
            closeDrawer();
          }}
          badge={3}
        >
          <Bell size={16} />
        </IconNavButton>
        <IconNavButton
          onPointerEnter={() => {
            // Warm messages screen chunk only on intent
            void import("@/domains/partnerships/portal-architecture/community/messages/ui/mobile/screens/MessagesScreen");
          }}
          onTouchStart={() => {
            void import("@/domains/partnerships/portal-architecture/community/messages/ui/mobile/screens/MessagesScreen");
          }}
          onClick={() => {
            router.push("/partners/settings");
            closeDrawer();
          }}
          onLongPress={() => {
            openQuickActionsWith(["settings", "settings-notifications", "settings-profile"]);
          }}
        >
          <SettingsIcon size={16} />
        </IconNavButton>
        <button
          type="button"
          onClick={() => {
            router.push("/partners/settings/profile");
            closeDrawer();
          }}
          className="size-8 rounded-full hover:ring-2 hover:ring-neutral-700 transition-all"
          aria-label="View profile"
        >
          <AvatarCircle />
        </button>
      </div>
    </aside>
  );
}
