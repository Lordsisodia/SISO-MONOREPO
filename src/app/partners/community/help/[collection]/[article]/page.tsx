import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpArticleScreen } from "@/domains/partnerships/community/ui/help";
import {
  helpCollections,
  getHelpArticle,
} from "@/domains/partnerships/community/help/data/help-center";
import { MobileNavigationProvider } from "@/domains/partnerships/mobile/application/navigation-store";

export const metadata: Metadata = {
  title: "Help Article • SISO Partner Community",
};

export function generateStaticParams() {
  return helpCollections.flatMap((collection) =>
    collection.articles.map((article) => ({
      collection: collection.slug,
      article: article.slug,
    })),
  );
}

export default async function PartnersCommunityHelpArticlePage({ params }: { params: Promise<{ collection: string; article: string }> }) {
  const { collection, article } = await params;
  const result = getHelpArticle(collection, article);
  if (!result || !result.collection || !result.article) {
    notFound();
  }

  return (
    <MobileNavigationProvider
      initialState={{ activeTab: "messages", previousTab: "messages", isImmersiveMode: true }}
    >
      <HelpArticleScreen collection={result.collection} article={result.article} />
    </MobileNavigationProvider>
  );
}
