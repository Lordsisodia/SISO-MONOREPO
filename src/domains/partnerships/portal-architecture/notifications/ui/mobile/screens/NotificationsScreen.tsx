"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { NotificationsMenu } from "@/components/ui/notifications-menu";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { mockNotifications } from "../fixtures/notification-fixtures";
import { Bell, Inbox, Menu } from "lucide-react";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";

const FallingPattern = dynamic(
  () => import("@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern").then((m) => m.FallingPattern),
  { ssr: false, loading: () => null },
);

function useShouldShowBackground() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const idle = "requestIdleCallback" in window
      ? (window as any).requestIdleCallback
      : (cb: FrameRequestCallback) => window.setTimeout(cb, 250);
    const handle = idle(() => setReady(media.matches));
    return () => {
      if ("cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback?.(handle);
      } else {
        window.clearTimeout(handle as number);
      }
    };
  }, []);
  return ready;
}

export function NotificationsScreen() {
  const { openDrawer } = useMobileNavigation();
  const showBg = useShouldShowBackground();

  const stats = useMemo(() => {
    const unread = mockNotifications.filter((n) => !n.isRead).length;
    return {
      total: mockNotifications.length,
      unread,
    };
  }, []);
  const allNotifications = mockNotifications;

  return (
    <section className="settings-panel-scope relative flex flex-1 flex-col gap-6 px-4 pt-8 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] text-sm text-siso-text-secondary min-h-screen">
      {showBg ? (
        <div className="pointer-events-none absolute inset-0 z-0">
          <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
        </div>
      ) : null}

      <div className="relative z-10 flex flex-col gap-6">
        <header className="relative">
          <HighlightCard
            color="orange"
            className="w-full"
            title="Notifications"
            description="Partner pulse—updates, invites, and shoutouts."
            hideDivider
            hideFooter
            titleClassName="uppercase tracking-[0.22em] font-semibold text-[20px] leading-tight"
            descriptionClassName="text-[11px]"
            icon={<Bell className="h-5 w-5" />}
            metricValue=""
            metricLabel=""
            buttonText=""
            onButtonClick={() => {}}
          />
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open menu"
            className="absolute z-20 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 bg-black/70 text-white transition hover:bg-black/80 hover:border-neutral-600"
            style={{ top: "-1rem", right: "calc(env(safe-area-inset-right, 0px) + 0.25rem)" }}
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        <SettingsGroupCallout
          icon={<Inbox className="h-4 w-4" />}
          title="All activity"
          subtitle={`Latest partner shoutouts across the network • ${stats.total} updates • ${stats.unread} unread`}
          showChevron={false}
        >
          <div className="rounded-[20px] border border-white/10 bg-white/5 p-3">
            <NotificationsMenu items={allNotifications} showFilters={false} />
          </div>
        </SettingsGroupCallout>
      </div>
    </section>
  );
}
