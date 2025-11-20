import type { ReactNode } from "react";
import { LazyMobileShell } from "@/domains/partnerships/mobile/ui/LazyMobileShell";

export default function PartnersMobileLayout({ children }: { children: ReactNode }) {
  return <LazyMobileShell>{children}</LazyMobileShell>;
}
