import type { Metadata } from "next";
import { HelpCenterScreen } from "@/domains/partnerships/community/ui/help";
import { getHelpCollections } from "@/domains/partnerships/community/help/data/help-center";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";

export const metadata: Metadata = {
  title: "Help Center • SISO Partner Community",
  description: "Search guides, browse collections, or reach Partner Success.",
};

export default function PartnersCommunityHelpPage() {
  const collections = getHelpCollections();
  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "community" }}>
      <HelpCenterScreen collections={collections} />
    </LazyPartnersPageShell>
  );
}
