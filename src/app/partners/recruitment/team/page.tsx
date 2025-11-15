import type { Metadata } from "next";
import { RecruitmentTeamContent } from "./TeamContent";

export const metadata: Metadata = {
  title: "Recruitment Team • SISO Partners",
  description: "See who’s actively selling, onboarding progress, coverage gaps, and recognition.",
};

export default function PartnersRecruitmentTeamPage() {
  return <RecruitmentTeamContent />;
}
