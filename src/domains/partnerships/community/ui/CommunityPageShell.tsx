"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { MobileNavigationProvider, useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";
import type { NavigationState } from "@/domains/partnerships/mobile/types/navigation";
import { FloatingNavButton } from "@/domains/partnerships/shared/ui/mobile/FloatingNavButton";
import { CampusSidebarContent } from "@/domains/partnerships/shared/ui/mobile/campus-sidebar/CampusSidebar";

const CampusDrawer = dynamic(
  () => import("@/domains/partnerships/shared/ui/mobile/campus-sidebar/CampusDrawer").then((m) => m.CampusDrawer),
  { ssr: false, loading: () => null },
);

const defaultNavState: Partial<NavigationState> = {
  activeTab: "quick-actions",
  previousTab: "quick-actions",
  isImmersiveMode: false,
};

export function PartnersPageShell({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: Partial<NavigationState>;
}) {
  const mergedState = useMemo(() => ({ ...defaultNavState, ...initialState }), [initialState]);

  return (
    <MobileNavigationProvider initialState={mergedState}>
      <PartnersNavLayer>{children}</PartnersNavLayer>
    </MobileNavigationProvider>
  );
}

export function PartnersNavLayer({ children, showFloatingNavButton = true }: { children: ReactNode; showFloatingNavButton?: boolean }) {
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const { closeDrawer, isDrawerOpen } = useMobileNavigation();

  useEffect(() => {
    if (isDesktop && isDrawerOpen) {
      closeDrawer();
    }
  }, [isDesktop, isDrawerOpen, closeDrawer]);

  const handleNavigate = useCallback(
    (href: string) => {
      router.push(href);
      if (!isDesktop) {
        closeDrawer();
      }
    },
    [router, closeDrawer, isDesktop],
  );

  if (isDesktop) {
    return (
      <div className="flex min-h-screen bg-siso-bg-primary text-siso-text-primary">
        <aside className="hidden lg:flex lg:w-[360px] xl:w-[400px] border-r border-siso-border bg-[#050505]">
          <CampusSidebarContent heightClass="h-screen" onNavigate={handleNavigate} />
        </aside>
        <div className="flex-1 min-h-screen overflow-x-hidden">{children}</div>
      </div>
    );
  }

  return (
    <>
      <CampusDrawer />
      {showFloatingNavButton ? <FloatingNavButton /> : null}
      {children}
    </>
  );
}

function useIsDesktop(query = "(min-width: 1024px)") {
  const getInitial = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const [isDesktop, setIsDesktop] = useState(getInitial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    const update = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    setIsDesktop(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return isDesktop;
}

// Backwards-compatible aliases for community-specific imports
export const CommunityPageShell = PartnersPageShell;
export const CommunityNavLayer = PartnersNavLayer;
