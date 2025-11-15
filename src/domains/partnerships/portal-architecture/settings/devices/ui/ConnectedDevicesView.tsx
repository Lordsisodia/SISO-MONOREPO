"use client";

import Link from "next/link";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5-static";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";
import SectionHeader from "@/domains/shared/ui/settings/SectionHeader";
import { ChevronLeft, Link2, Monitor, Smartphone, Tablet, LogOut } from "lucide-react";

type DeviceType = "desktop" | "phone" | "tablet";

type ConnectedDevice = {
  id: string;
  label: string; // e.g., "MacBook Pro"
  type: DeviceType;
  browser: string; // e.g., "Chrome"
  lastActive: string; // e.g., "2 hours ago" or "Active now"
  isCurrent?: boolean;
};

const deviceIcon = (type: DeviceType) => {
  switch (type) {
    case "desktop":
      return <Monitor className="h-6 w-6" aria-hidden />;
    case "phone":
      return <Smartphone className="h-6 w-6" aria-hidden />;
    case "tablet":
      return <Tablet className="h-6 w-6" aria-hidden />;
  }
};

const devices: ConnectedDevice[] = [
  { id: "current", label: "iPhone 15 Pro", type: "phone", browser: "Safari", lastActive: "Active now", isCurrent: true },
  { id: "mac", label: "MacBook Pro", type: "desktop", browser: "Chrome", lastActive: "2 hours ago" },
  { id: "ipad", label: "iPad", type: "tablet", browser: "Safari", lastActive: "1 week ago" },
];

export function ConnectedDevicesView() {
  const current = devices.find((d) => d.isCurrent);
  const others = devices.filter((d) => !d.isCurrent);

  return (
    <SettingsDetailLayout
      title=""
      description=""
      wrapContent={false}
      backHref={null}
      compactHeader
      hideHeader
      srTitle="Connected Devices"
    >
      <div className="space-y-5 pb-32 text-siso-text-primary">
        {/* Header Card */}
        <div className="relative min-h-[128px]">
          <div className="pointer-events-none absolute inset-y-0 left-4 z-10 flex items-center">
            <Link
              href="/partners/settings"
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
              aria-label="Back to settings"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </div>
          <HighlightCard
            color="orange"
            className="w-full pl-12"
            title="Devices"
            description="See where you're signed in and sign out if needed"
            icon={<Link2 className="h-5 w-5" />}
            metricValue=""
            metricLabel=""
            buttonText=""
            onButtonClick={() => {}}
            hideDivider
            hideFooter
            titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
            descriptionClassName="text-xs"
          />
        </div>

        {/* Double callout: outer solid callout + inner ScrimList */}
        <section className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
          <div className="px-4 pt-4">
            <SectionHeader
              title="Your Devices"
              subtitle="Current device first, then other sessions."
              icon={<Link2 className="h-6 w-6" />}
            />
          </div>

          <ScrimList className="m-3" ariaLabel="Signed-in devices list">
            {/* Current Device */}
            {current ? (
              <ScrimList.Row className="items-start">
                <div className="h-10 w-10 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                  {deviceIcon(current.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-siso-text-primary">Current Device</p>
                  <p
                    className="text-xs text-siso-text-muted whitespace-normal break-words"
                    style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  >
                    {current.label} • {current.browser} • {current.lastActive}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-siso-text-muted self-start mt-0.5">Current</span>
              </ScrimList.Row>
            ) : null}

            {/* Other Devices */}
            {others.map((d) => (
              <ScrimList.Row key={d.id} className="items-start">
                <div className="h-10 w-10 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                  {deviceIcon(d.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-siso-text-primary">{d.label}</p>
                  <p
                    className="text-xs text-siso-text-muted whitespace-normal break-words"
                    style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  >
                    {d.browser} • Last active {d.lastActive}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-white/10 p-2 text-siso-text-muted transition hover:border-red-500/60 hover:text-red-400 self-start mt-0.5"
                  aria-label={`Sign out ${d.label}`}
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                </button>
              </ScrimList.Row>
            ))}
          </ScrimList>

          {/* Primary action */}
          {others.length ? (
            <div className="px-4 pb-4">
              <button
                type="button"
                className="w-full rounded-full bg-siso-orange/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0d0d10] shadow-[0_8px_18px_rgba(0,0,0,0.35)] transition hover:bg-siso-orange"
              >
                Sign out all other devices
              </button>
            </div>
          ) : null}
        </section>
      </div>
    </SettingsDetailLayout>
  );
}
