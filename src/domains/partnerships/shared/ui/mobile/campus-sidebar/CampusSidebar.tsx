"use client";

import { IconNavigation } from "./components/IconNavigation";
import { DetailSidebar } from "./components/DetailSidebar";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";

interface CampusSidebarContentProps {
  heightClass?: string;
  onNavigate?: (href: string) => void;
}

export function CampusSidebarContent({ heightClass = "h-[800px]", onNavigate }: CampusSidebarContentProps = {}) {
  const { activeDrawerSection, setActiveDrawerSection } = useMobileNavigation();
  const activeSection = activeDrawerSection ?? "home";

  return (
    <div className="flex w-full h-full flex-row">
      <IconNavigation activeSection={activeSection} onSectionChange={setActiveDrawerSection} heightClass={heightClass} />
      <DetailSidebar activeSection={activeSection} heightClass={heightClass} onNavigate={onNavigate} />
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
