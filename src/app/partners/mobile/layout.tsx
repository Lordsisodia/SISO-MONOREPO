import type { ReactNode } from "react";
import { MobileShell } from "@/domains/partnerships/mobile/ui/MobileShell";

export default function PartnersMobileLayout({ children }: { children: ReactNode }) {
  return <MobileShell>{children}</MobileShell>;
}
