import type { SubmitClientPayload, SubmitClientResponse } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { submitClient } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";

/**
 * Temporary shim that reuses the pipeline intake endpoint for partner submissions until
 * a recruitment-specific intake API is delivered.
 */
export async function submitPartner(payload: SubmitClientPayload): Promise<SubmitClientResponse> {
  return submitClient(payload);
}
