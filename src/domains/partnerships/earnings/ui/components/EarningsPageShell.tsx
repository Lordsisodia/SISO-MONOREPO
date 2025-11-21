"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import type { NavigationState } from "@/domains/partnerships/mobile/types/navigation";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";

const earningsNavPreset: Partial<NavigationState> = {
  activeDrawerSection: "growth",
  activeTab: "quick-actions",
  previousTab: "quick-actions",
};

export function EarningsPageShell({ children }: { children: ReactNode }) {
  useEnsureFloatingNavButton();
  return <PartnersPageShell initialState={earningsNavPreset}>{children}</PartnersPageShell>;
}

function useEnsureFloatingNavButton() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const previous = root.dataset.hideFloatingNavButton;

    if (previous === "true") {
      delete root.dataset.hideFloatingNavButton;
    }

    return () => {
      if (previous === "true") {
        root.dataset.hideFloatingNavButton = previous;
      }
    };
  }, []);
}
