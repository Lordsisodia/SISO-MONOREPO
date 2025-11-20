import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpCollectionScreen } from "@/domains/partnerships/community/ui/help";
import {
  getHelpCollection,
  getHelpCollections,
} from "@/domains/partnerships/community/help/data/help-center";
import { MobileNavigationProvider } from "@/domains/partnerships/mobile/application/navigation-store";

export const metadata: Metadata = {
  title: "Help Collection • SISO Partner Community",
};

export function generateStaticParams() {
  return getHelpCollections().map((collection) => ({ collection: collection.slug }));
}

export default async function PartnersCommunityHelpCollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: collectionSlug } = await params;
  const collection = getHelpCollection(collectionSlug);
  if (!collection) {
    notFound();
  }

  return (
    <MobileNavigationProvider
      initialState={{ activeTab: "messages", previousTab: "messages", isImmersiveMode: true }}
    >
      <HelpCollectionScreen collection={collection} />
    </MobileNavigationProvider>
  );
}
