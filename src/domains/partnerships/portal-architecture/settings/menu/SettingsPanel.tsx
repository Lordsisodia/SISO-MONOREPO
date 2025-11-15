"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Cog, LogOut, Menu as MenuIcon, Shield, Plug } from "lucide-react";
import { SETTINGS_MENU_ITEMS, type SettingsMenuItem } from "./settings-menu.config";
import { SettingsGroupCallout } from "./SettingsGroupCallout";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingMenuItem } from "./SettingMenuItem";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";

const FallingPattern = dynamic(
  () => import("@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern").then(m => m.FallingPattern),
  { ssr: false, loading: () => null },
);

function useShouldShowBackground() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const idle = ("requestIdleCallback" in window)
      ? (window as any).requestIdleCallback
      : (cb: any) => setTimeout(cb, 250);
    const handle = idle(() => setReady(media.matches));
    return () => ("cancelIdleCallback" in window) ? (window as any).cancelIdleCallback?.(handle) : clearTimeout(handle as any);
  }, []);
  return ready;
}

export function SettingsPanel() {
  const showBg = useShouldShowBackground();
  const { openDrawer } = useMobileNavigation();
  const byId = useMemo(() => Object.fromEntries(SETTINGS_MENU_ITEMS.map(i => [i.id, i] as const)), []);
  const pick = useMemo(() => (ids: string[]): SettingsMenuItem[] => ids.map(id => byId[id]).filter(Boolean), [byId]);
  const basicsAndAccount = useMemo(() => pick(["settings-general","settings-account","settings-profile","settings-devices"]), [pick]);
  const safetyCompliance = useMemo(() => pick(["settings-security","settings-privacy","settings-legal"]), [pick]);
  const toolsAndMoney   = useMemo(() => pick(["settings-integrations","wallet","checklist"]), [pick]);
  return (
    <section className="settings-panel-scope relative flex flex-1 flex-col gap-6 px-4 pt-8 pb-[calc(env(safe-area-inset-bottom,0px)+96px)] text-sm text-siso-text-secondary min-h-screen">
      <style jsx global>{``}</style>
      {showBg ? (
        <div className="pointer-events-none absolute inset-0 z-0">
          <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
        </div>
      ) : null}
      <div className="relative z-10">
      <header className="relative">
        <HighlightCard
          color="orange"
          className="w-full"
          title="Settings"
          description="Workspace essentials in one place."
          hideDivider
          hideFooter
          titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
          descriptionClassName="text-xs"
          icon={<Cog className="h-5 w-5" />}
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
          <MenuIcon className="h-5 w-5" />
        </button>
      </header>

      <div className="flex flex-col gap-5 mt-8">
        {/* Basics & Account */}
        {basicsAndAccount.length > 0 && (
          <SettingsGroupCallout
            icon={<Cog className="h-4 w-4" />}
            title="Basics & Account"
            subtitle="General preferences, identity and devices"
          >
            <div className="flex flex-col divide-y divide-white/5 rounded-[20px] border border-white/10 bg-white/5">
              {basicsAndAccount.map((item) => (
                <div
                  key={`basics-${item.id}`}
                  onPointerEnter={() => {
                    if (item.id === "settings-account") {
                      void import("@/domains/partnerships/portal-architecture/settings/account/ui/AccountSettingsView");
                    } else if (item.id === "settings-profile") {
                      void import("@/domains/partnerships/portal-architecture/settings/profile/ui/ProfileSettingsView");
                    } else if (item.id === "settings-devices") {
                      void import("@/domains/partnerships/portal-architecture/settings/devices/ui/ConnectedDevicesView");
                    }
                  }}
                  onTouchStart={() => {
                    if (item.id === "settings-account") {
                      void import("@/domains/partnerships/portal-architecture/settings/account/ui/AccountSettingsView");
                    } else if (item.id === "settings-profile") {
                      void import("@/domains/partnerships/portal-architecture/settings/profile/ui/ProfileSettingsView");
                    } else if (item.id === "settings-devices") {
                      void import("@/domains/partnerships/portal-architecture/settings/devices/ui/ConnectedDevicesView");
                    }
                  }}
                >
                  <SettingMenuItem label={item.label} icon={item.icon} href={item.path} meta={item.meta} />
                </div>
              ))}
            </div>
          </SettingsGroupCallout>
        )}

        {/* Safety & Compliance */}
        {safetyCompliance.length > 0 && (
          <SettingsGroupCallout
            icon={<Shield className="h-4 w-4" />}
            title="Safety & Compliance"
            subtitle="Security, privacy and legal policies"
          >
            <div className="flex flex-col divide-y divide-white/5 rounded-[20px] border border-white/10 bg-white/5">
              {safetyCompliance.map((item) => (
                <SettingMenuItem key={`safety-${item.id}`} label={item.label} icon={item.icon} href={item.path} meta={item.meta} />
              ))}
            </div>
          </SettingsGroupCallout>
        )}

        {/* Tools & Money */}
        {toolsAndMoney.length > 0 && (
          <SettingsGroupCallout
            icon={<Plug className="h-4 w-4" />}
            title="Tools & Money"
            subtitle="Connected apps and payouts"
          >
            <div className="flex flex-col divide-y divide-white/5 rounded-[20px] border border-white/10 bg-white/5">
              {toolsAndMoney.map((item) => (
                <SettingMenuItem key={`tools-${item.id}`} label={item.label} icon={item.icon} href={item.path} meta={item.meta} />
              ))}
            </div>
          </SettingsGroupCallout>
        )}
      </div>

      <button
        type="button"
        className="mt-4 flex items-center justify-center gap-2 rounded-3xl border border-siso-red/60 bg-siso-bg-secondary px-4 py-3 text-center text-sm font-semibold text-siso-red transition hover:border-siso-red hover:bg-siso-red/5"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>
      </div>
    </section>
  );
}
