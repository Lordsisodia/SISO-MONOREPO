import { Suspense } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import SubmitClientExperience from "./SubmitClientExperience.client";
import type { PipelineOpsConfig } from "./types";
import { getRequestBaseUrl } from "@/domains/shared/utils/request-base-url";

const configFilePath = path.join(process.cwd(), "public/data/pipeline-ops-config.json");

const loadConfigFromDisk = async (): Promise<PipelineOpsConfig> => {
  const file = await fs.readFile(configFilePath, "utf-8");
  return JSON.parse(file) as PipelineOpsConfig;
};

const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

const fetchPipelineOpsConfig = async (baseUrl: string): Promise<PipelineOpsConfig> => {
  if (isBuildPhase) {
    return loadConfigFromDisk();
  }
  try {
    const response = await fetch(`${baseUrl}/data/pipeline-ops-config.json`, {
      next: { revalidate: 60 * 15 },
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.warn("Failed to fetch pipeline ops config from", baseUrl, error);
  }
  return loadConfigFromDisk();
};

async function SubmitClientExperienceBoundary() {
  const baseUrl = getRequestBaseUrl();
  const config = await fetchPipelineOpsConfig(baseUrl);
  return <SubmitClientExperience config={config} />;
}

export default function PartnersPipelineOpsSubmitClientPage() {
  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "pipeline" }} showFloatingNavButton={false}>
      <Suspense fallback={<div className="p-8 text-center text-white">Loading intake…</div>}>
        {/* Streaming boundary to fetch pipeline config via cached fetch */}
        <SubmitClientExperienceBoundary />
      </Suspense>
    </LazyPartnersPageShell>
  );
}
