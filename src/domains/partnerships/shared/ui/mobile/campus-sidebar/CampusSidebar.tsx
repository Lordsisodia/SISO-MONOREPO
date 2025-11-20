"use client";

import { Suspense, lazy } from "react";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";

const LazyIconNavigation = lazy(() =>
  import("./components/IconNavigation").then((mod) => ({ default: mod.IconNavigation })),
);
const LazyDetailSidebar = lazy(() =>
  import("./components/DetailSidebar").then((mod) => ({ default: mod.DetailSidebar })),
);

interface CampusSidebarContentProps {
  heightClass?: string;
  onNavigate?: (href: string) => void;
}

export function CampusSidebarContent({ heightClass = "h-[800px]", onNavigate }: CampusSidebarContentProps = {}) {
  const { activeDrawerSection, setActiveDrawerSection } = useMobileNavigation();
  const activeSection = activeDrawerSection ?? "home";

  return (
    <div className="flex w-full h-full flex-row">
      <Suspense
        fallback={
          <div
            className={`bg-black flex flex-col items-center overflow-hidden px-2 py-3 w-16 flex-shrink-0 ${heightClass} h-screen sticky top-0 border-r border-neutral-900 rounded-l-2xl`}
          >
            <div className="h-full w-full animate-pulse rounded-lg bg-neutral-900" aria-hidden="true" />
          </div>
        }
      >
        <LazyIconNavigation activeSection={activeSection} onSectionChange={setActiveDrawerSection} heightClass={heightClass} />
      </Suspense>
      <Suspense
        fallback={
          <div
            className={`flex-1 min-w-0 ${heightClass} h-screen rounded-r-2xl border border-white/10 bg-white/5 animate-pulse`}
            aria-hidden="true"
          />
        }
      >
        <LazyDetailSidebar activeSection={activeSection} heightClass={heightClass} onNavigate={onNavigate} />
      </Suspense>
    </div>
  );
}

export function Frame760() {
  return (
    <div className="bg-[#050505] min-h-screen flex items-start justify-start p-4">
      <CampusSidebarContent heightClass="h-[800px]" />
    </div>
  );
}

interface CampusSidebarSurfaceProps {
  onClose?: () => void;
  onNavigate?: (href: string) => void;
}

export function CampusSidebarSurface({ onClose, onNavigate }: CampusSidebarSurfaceProps) {
  return (
    <div className="flex h-full w-full items-stretch justify-start bg-transparent text-neutral-50">
      <div className="flex h-full w-[88%] min-w-[320px] items-start justify-start bg-[#050505] px-1 pb-4 pt-4 shadow-[16px_0_48px_rgba(0,0,0,0.6)]">
        <div className="h-full w-full overflow-hidden pr-1">
          <CampusSidebarContent heightClass="h-full" onNavigate={onNavigate} />
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="h-full w-[12%] min-w-[40px] cursor-pointer bg-transparent"
          aria-label="Dismiss campus navigation"
        >
          <span className="sr-only">Close</span>
        </button>
      )}
    </div>
  );
}

export function CampusSidebarPreview() {
  return <CampusSidebarContent heightClass="h-full" />;
}

export default Frame760;
