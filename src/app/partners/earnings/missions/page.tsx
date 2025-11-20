import { EarningsPageShell } from "@/domains/partnerships/earnings/ui/components/EarningsPageShell";
import { EarningsMissionsScreen } from "@/domains/partnerships/earnings/ui/missions/EarningsMissionsScreen";

export default function EarningsMissionsPage() {
  return (
    <EarningsPageShell>
      <EarningsMissionsScreen />
    </EarningsPageShell>
  );
}
