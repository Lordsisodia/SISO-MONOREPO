import type { ProspectSummary } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { ProspectDetailBoard } from "./ProspectDetailBoard.client";

export function ProspectDetailWorkspace({ prospect }: { prospect: ProspectSummary }) {
  return <ProspectDetailBoard prospect={prospect} />;
}
