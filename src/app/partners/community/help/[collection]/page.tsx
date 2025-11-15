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

type PartnersCommunityHelpCollectionPageProps = {
  params: Promise<{ collection: string }>;
};

export default async function PartnersCommunityHelpCollectionPage({
  params,
}: PartnersCommunityHelpCollectionPageProps) {
  const { collection: collectionSlug } = await params;
  const collection = getHelpCollection(collectionSlug);
  if (!collection) {
    notFound();
  }

  return (
    <MobileNavigationProvider
      initialState={{ activeTab: "community", previousTab: "community", isImmersiveMode: true }}
    >
      <HelpCollectionScreen collection={collection} />
    </MobileNavigationProvider>
  );
}
