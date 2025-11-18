"use client";

import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { PortfolioMobileScreen } from "@/domains/partnerships/portal-architecture/academy/portfolio/ui/PortfolioMobileScreen";

export default function AcademyPortfolioPage() {
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "academy" }}>
      <PortfolioMobileScreen />
    </PartnersPageShell>
  );
}
