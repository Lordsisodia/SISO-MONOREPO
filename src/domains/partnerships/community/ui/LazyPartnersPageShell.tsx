"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import type { NavigationState } from "@/domains/partnerships/mobile/types/navigation";

const ClientShell = dynamic(() =>
  import("./CommunityPageShell").then((mod) => mod.PartnersPageShell),
{
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-siso-bg-primary text-siso-text-primary flex items-center justify-center">
      <div className="space-y-2 text-center">
        <div className="mx-auto h-6 w-32 rounded-full bg-white/10 animate-pulse" />
        <div className="mx-auto h-6 w-48 rounded-full bg-white/5 animate-pulse" />
      </div>
    </div>
  ),
}
);

interface LazyShellProps {
  children: ReactNode;
  initialState?: Partial<NavigationState>;
  showFloatingNavButton?: boolean;
}

export function LazyPartnersPageShell({ children, initialState, showFloatingNavButton }: LazyShellProps) {
  return (
    <ClientShell initialState={initialState} showFloatingNavButton={showFloatingNavButton}>
      {children}
    </ClientShell>
  );
}

export default LazyPartnersPageShell;
