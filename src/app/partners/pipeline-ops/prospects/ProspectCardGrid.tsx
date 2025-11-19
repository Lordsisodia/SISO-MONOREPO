"use client";

import type { ProspectSummary } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { ProspectCard } from "./ProspectCard";
import { Sparkles } from "lucide-react";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";

export function ProspectCardGrid({ prospects }: { prospects: ProspectSummary[] }) {
  return (
    <section className="mt-4">
      <SettingsGroupCallout
        icon={<Sparkles className="h-4 w-4 text-siso-orange" />}
        title="Prospect List"
        subtitle="Tap into each prospect card for next steps and owner context."
        showChevron={false}
      >
        <div className="mt-3 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {prospects.length ? (
            prospects.map((prospect) => <ProspectCard key={prospect.id} prospect={prospect} />)
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center text-sm text-white/60">
              No prospects logged yet.
            </div>
          )}
        </div>
      </SettingsGroupCallout>
    </section>
  );
}
