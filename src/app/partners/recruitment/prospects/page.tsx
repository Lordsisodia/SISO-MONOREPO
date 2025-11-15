import type { Metadata } from "next";
import { RecruitmentProspectsContent } from "./ProspectsContent";

export const metadata: Metadata = {
  title: "Recruitment Prospects • SISO Partners",
  description: "Manage the full pipeline of recruitment prospects and their next steps.",
};

export default function PartnersRecruitmentProspectsPage() {
  return <RecruitmentProspectsContent />;
}
