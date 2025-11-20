"use client";

import { MobileShell } from "@/domains/partnerships/mobile/ui/MobileShell";

export function AcademyShell() {
  return <MobileShell initialTab="learning" renderViewportContent={() => null} showFloatingNavButton={false} />;
}
