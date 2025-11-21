import { Suspense } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import SubmitClientExperience from "../../pipeline-ops/submit-client/SubmitClientExperience.client";
import type { PipelineOpsConfig } from "../../pipeline-ops/submit-client/types";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { getRequestBaseUrl } from "@/domains/shared/utils/request-base-url";
import { submitPartner } from "@/domains/partnerships/recruitment/application/recruitmentIntakeService";

const configFilePath = path.join(process.cwd(), "public/data/recruitment-submit-config.json");

const loadConfigFromDisk = async (): Promise<PipelineOpsConfig> => {
  const file = await fs.readFile(configFilePath, "utf-8");
  return JSON.parse(file) as PipelineOpsConfig;
};

const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

const fetchRecruitmentConfig = async (baseUrl: string): Promise<PipelineOpsConfig> => {
  if (isBuildPhase) {
    return loadConfigFromDisk();
  }
  try {
    const response = await fetch(`${baseUrl}/data/recruitment-submit-config.json`, {
      next: { revalidate: 60 * 15 },
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.warn("Failed to fetch recruitment submit config from", baseUrl, error);
  }
  return loadConfigFromDisk();
};

async function SubmitPartnerExperienceBoundary() {
  const baseUrl = getRequestBaseUrl();
  const config = await fetchRecruitmentConfig(baseUrl);
  return (
    <SubmitClientExperience
      config={config}
      experience={{
        experienceId: "submit-partner",
        directoryVariant: "client-submissions",
        threadName: "Submit Partner",
        threadAvatarLabel: "SP",
        headerTitle: "Submit Partner Intake",
        headerSubtitle: "Chat-first submission to fast-track recruitment reviews",
        helperText: "Share the recruit's name, channel, and reach. We'll prep invites while you answer prompts.",
        submitHandler: submitPartner,
        successMessage: (response) => `Partner intake ${response.intakeId} received • Recruitment review`,
        statusIdleLabel: "Recruitment review SLA",
        statusSubmittedLabel: "Submitted · Recruitment review",
      }}
    />
  );
}

export default function PartnersRecruitmentSubmitPartnerPage() {
  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "recruitment" }} showFloatingNavButton={false}>
      <Suspense fallback={<div className="p-8 text-center text-white">Loading partner intake…</div>}>
        <SubmitPartnerExperienceBoundary />
      </Suspense>
    </LazyPartnersPageShell>
  );
}
