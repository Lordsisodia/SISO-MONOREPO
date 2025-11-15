import type { Metadata } from "next";
import { RecruitmentPerformanceContent } from "./PerformanceContent";

export const metadata: Metadata = {
  title: "Referral Performance • SISO Partners",
  description: "Measure referral volume, conversion health, and override payouts.",
};

export default function PartnersRecruitmentPerformancePage() {
  return <RecruitmentPerformanceContent />;
}
