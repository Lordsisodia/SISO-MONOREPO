import type { Metadata } from "next";
import { RecruitmentPerformanceContent } from "./PerformanceContent";

export const metadata: Metadata = {
  title: "Referral Performance • SISO Partners",
  description: "Monitor invite conversion, approvals, and revenue across the partner funnel.",
};

export default function PartnersRecruitmentPerformancePage() {
  return <RecruitmentPerformanceContent />;
}
