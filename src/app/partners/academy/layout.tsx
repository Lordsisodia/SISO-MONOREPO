"use client";

import type { ReactNode } from "react";
import { MobileShell } from "@/domains/partnerships/mobile/ui/MobileShell";
import { LearningHubResponsive } from "@/domains/partnerships/portal-architecture/academy/ui/LearningHubResponsive";

export default function PartnersAcademyLayout({ children }: { children: ReactNode }) {
  return (
    <MobileShell initialTab="learning" renderViewportContent={() => null}>
      {children}
    </MobileShell>
  );
}
