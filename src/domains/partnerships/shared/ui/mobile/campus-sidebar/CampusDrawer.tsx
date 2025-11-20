"use client";

import { cn } from "@/domains/shared/utils/cn";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { CampusSidebarSurface } from "@/domains/partnerships/shared/ui/mobile/campus-sidebar/CampusSidebar";
import { useRouter } from "next/navigation";

const LazySidebarSurface = dynamic(() => import("@/domains/partnerships/shared/ui/mobile/campus-sidebar/CampusSidebar").then((mod) => mod.CampusSidebarSurface), {
  ssr: false,
});

export function CampusDrawer() {
  const { isDrawerOpen, closeDrawer } = useMobileNavigation();
  const router = useRouter();

  const handleNavigate = (href: string) => {
    router.push(href);
    closeDrawer();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-200",
        isDrawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!isDrawerOpen}
      onClick={closeDrawer}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex" role="dialog" aria-modal="true">
        <aside
          className={cn(
            "h-full max-w-[420px] w-[88%] transform transition-transform duration-200",
            isDrawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Suspense fallback={<div className="h-full w-full bg-[#050505]" role="presentation" />}>
            <LazySidebarSurface onClose={closeDrawer} onNavigate={handleNavigate} />
          </Suspense>
        </aside>
        <button
          type="button"
          aria-label="Dismiss campus navigation"
          onClick={closeDrawer}
          className="flex-1 h-full"
        />
      </div>
    </div>
  );
}
