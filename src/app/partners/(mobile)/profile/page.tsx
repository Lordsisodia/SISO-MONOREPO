import { LazyMobileShell } from "@/domains/partnerships/mobile/ui/LazyMobileShell";
import type { QuickActionId } from "@/domains/partnerships/mobile/types/navigation";

export default function PartnersProfilePage() {
  return (
    <LazyMobileShell initialTab="quick-actions" initialQuickAction={"profile" as QuickActionId} />
  );
}
