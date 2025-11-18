import Link from "next/link";
import { notFound } from "next/navigation";
import { getClientBySlug } from "@/domains/partnerships/portfolio/lib/get-client-by-slug";
import { PublicPortfolioAssetView } from "./PublicPortfolioAssetView";

export const dynamic = "force-dynamic";

export default function PublicPortfolioAssetPage({ params }: { params: { slug: string } }) {
  const client = getClientBySlug(params.slug);
  if (!client) return notFound();
  return <PublicPortfolioAssetView client={client} />;
}
