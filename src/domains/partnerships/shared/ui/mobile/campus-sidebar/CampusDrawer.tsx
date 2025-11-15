"use client";

import { cn } from "@/domains/shared/utils/cn";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";
import { CampusSidebarSurface } from "@/domains/partnerships/shared/ui/mobile/campus-sidebar/CampusSidebar";
import { useRouter } from "next/navigation";

export function CampusDrawer() {
  const { isDrawerOpen, closeDrawer } = useMobileNavigation();
  const router = useRouter();

  const handleNavigate = (href: string) => {
    router.push(href);
    closeDrawer();
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-full transform bg-transparent p-0 shadow-siso transition-transform duration-200",
        isDrawerOpen ? "translate-x-0" : "-translate-x-full",
      )}
      role="dialog"
      aria-modal="true"
    >
      <CampusSidebarSurface onClose={closeDrawer} onNavigate={handleNavigate} />
    </aside>
  );
}
