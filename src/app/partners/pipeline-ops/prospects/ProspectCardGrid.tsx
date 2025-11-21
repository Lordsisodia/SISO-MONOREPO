"use client";

import type { ProspectSummary } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { ProspectCard } from "./ProspectCard";
import { Sparkles } from "lucide-react";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";

interface ProspectCardGridProps {
  prospects: ProspectSummary[];
  activeFilterLabel: string;
}

export function ProspectCardGrid({ prospects, activeFilterLabel }: ProspectCardGridProps) {
  const hasProspects = prospects.length > 0;
  const filterCopy =
    activeFilterLabel.toLowerCase() === "all prospects"
      ? "Tap into each prospect card for next steps and owner context."
      : `Filtered by ${activeFilterLabel.toLowerCase()}.`;
  const subtitle = hasProspects ? filterCopy : `No ${activeFilterLabel.toLowerCase()} prospects yet.`;

  return (
    <section className="mt-4">
      <SettingsGroupCallout
        icon={<Sparkles className="h-4 w-4 text-siso-orange" />}
        title="Prospect List"
        subtitle={subtitle}
        showChevron={false}
      >
        <div className="mt-3 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {hasProspects ? (
            prospects.map((prospect) => <ProspectCard key={prospect.id} prospect={prospect} />)
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-sm text-white/60">
              {activeFilterLabel.toLowerCase() === "all prospects"
                ? "No prospects logged yet."
                : `No ${activeFilterLabel.toLowerCase()} prospects yet.`}
            </div>
          )}
        </div>
      </SettingsGroupCallout>
    </section>
  );
}
