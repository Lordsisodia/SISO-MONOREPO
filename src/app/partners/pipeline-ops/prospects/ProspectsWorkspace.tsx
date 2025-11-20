import type { ProspectSummary } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { ProspectCardGrid } from "./ProspectCardGrid";

export interface ProspectsWorkspaceProps {
  initialProspects: ProspectSummary[];
}

export function ProspectsWorkspace({ initialProspects }: ProspectsWorkspaceProps) {
  return (
    <section className="w-full text-white">
      <ProspectCardGrid prospects={initialProspects} />
    </section>
  );
}
