import type { Metadata } from "next";

import { RecruitmentDashboardContent } from "./DashboardContent";

export const metadata: Metadata = {
  title: "Recruitment Dashboard • SISO Partners",
  description: "Track invites, approvals, and the partners powering recruitment.",
};

export default function PartnersRecruitmentIndexPage() {
  return <RecruitmentDashboardContent />;
}
