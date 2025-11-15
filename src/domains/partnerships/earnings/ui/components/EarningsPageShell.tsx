"use client";

import type { ReactNode } from "react";
import type { NavigationState } from "@/domains/partnerships/mobile/types/navigation";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";

const earningsNavPreset: Partial<NavigationState> = {
  activeDrawerSection: "growth",
  activeTab: "quick-actions",
  previousTab: "quick-actions",
};

export function EarningsPageShell({ children }: { children: ReactNode }) {
  return <PartnersPageShell initialState={earningsNavPreset}>{children}</PartnersPageShell>;
}
