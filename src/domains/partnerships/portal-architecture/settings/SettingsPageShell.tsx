"use client";

import type { ReactNode } from "react";
import type { NavigationState } from "@/domains/partnerships/mobile/types/navigation";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";

const settingsNavPreset: Partial<NavigationState> = {
  activeDrawerSection: "settings",
  activeTab: "quick-actions",
  previousTab: "quick-actions",
};

export function SettingsPageShell({ children }: { children: ReactNode }) {
  return <PartnersPageShell initialState={settingsNavPreset}>{children}</PartnersPageShell>;
}
