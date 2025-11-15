"use client";

export const dynamic = 'force-dynamic';

import Frame760 from "@/domains/partnerships/shared/ui/mobile/campus-sidebar/CampusSidebar";
import { MobileNavigationProvider } from "@/domains/partnerships/mobile/application/navigation-store";

export default function SidebarDemoPage() {
  return (
    <MobileNavigationProvider>
      <main className="min-h-screen bg-black text-neutral-50 flex items-center justify-center p-4">
        <Frame760 />
      </main>
    </MobileNavigationProvider>
  );
}
