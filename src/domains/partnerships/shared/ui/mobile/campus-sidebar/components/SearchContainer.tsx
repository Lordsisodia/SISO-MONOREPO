import { Info as InfoIcon } from "lucide-react";

import { sidebarCallouts } from "../config/callouts";
import { SettingsTitleCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";

interface SearchContainerProps {
  activeSection: string;
}

export function SearchContainer({ activeSection }: SearchContainerProps) {
  const copy = sidebarCallouts[activeSection];

  if (!copy) return null;

  if (activeSection === "academy") {
    return (
      <SettingsTitleCallout
        icon={<InfoIcon className="h-4 w-4" />}
        title="Academy"
        subtitle="Train up, polish your portfolio, and unlock pitch materials."
      />
    );
  }

  return (
    <div className="w-full rounded-lg border border-[rgba(255,167,38,0.4)] bg-[rgba(255,167,38,0.10)] p-4 text-[14px] text-neutral-200">
      <div className="flex items-start gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full" style={{ color: "var(--siso-orange)" }}>
          <InfoIcon size={18} />
        </span>
        <p className="leading-snug">{copy}</p>
      </div>
    </div>
  );
}
