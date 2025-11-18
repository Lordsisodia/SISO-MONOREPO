import type { Metadata } from "next";
"use client";

import { EarningsTierProgressionScreen } from "@/domains/partnerships/earnings/ui/tier-progression/EarningsTierProgressionScreen";
import { EarningsPageShell } from "@/domains/partnerships/earnings/ui/components/EarningsPageShell";

export default function PartnersEarningsTierProgressionPage() {
  return (
    <EarningsPageShell>
      <EarningsTierProgressionScreen />
    </EarningsPageShell>
  );
}
