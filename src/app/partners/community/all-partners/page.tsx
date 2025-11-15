import type { Metadata } from "next";
import { AllPartnersScreen } from "@/domains/partnerships/community/ui/all-partners";

export const metadata: Metadata = {
  title: "All Partners • SISO Partner Community",
  description: "Search the full partner roster, find mentors, and start conversations.",
};

export default function PartnersCommunityAllPartnersPage() {
  return <AllPartnersScreen />;
}
