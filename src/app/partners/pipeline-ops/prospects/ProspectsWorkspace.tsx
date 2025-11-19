"use client";

import type { ProspectSummary } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { ProspectCardGrid } from "./ProspectCardGrid";

export interface ProspectsWorkspaceProps {
  initialProspects: ProspectSummary[];
}

export function ProspectsWorkspace({ initialProspects }: ProspectsWorkspaceProps) {
  return (
    <main className="min-h-screen text-white">
      <div className="w-full px-4 py-10 lg:px-8">
        <ProspectCardGrid prospects={initialProspects} />
      </div>
    </main>
  );
}
