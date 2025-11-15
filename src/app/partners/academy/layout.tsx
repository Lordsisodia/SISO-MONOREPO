"use client";

import type { ReactNode } from "react";
import { MobileShell } from "@/domains/partnerships/mobile/ui/MobileShell";
import { LearningHubResponsive } from "@/domains/partnerships/portal-architecture/academy/ui/LearningHubResponsive";

export default function PartnersAcademyLayout({ children }: { children: ReactNode }) {
  const renderViewportContent = (path: string) => (path === "/partners/academy" ? <LearningHubResponsive /> : null);
  return (
    <MobileShell initialTab="learning" renderViewportContent={renderViewportContent}>
      {children}
    </MobileShell>
  );
}
