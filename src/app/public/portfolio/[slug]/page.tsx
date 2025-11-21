import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PublicPortfolioAssetView } from "./PublicPortfolioAssetView";
import { getRequestBaseUrl } from "@/domains/shared/utils/request-base-url";
import { fetchPortfolioClient } from "@/domains/partnerships/portfolio/server/data-source";
import path from "node:path";
import { promises as fs } from "node:fs";


const dataDir = path.join(process.cwd(), "public/data/portfolio-clients");

type PortfolioIndexFile = {
  clients: Array<{ slug?: string; id: string }>;
};

export async function generateStaticParams() {
  const indexFile = await fs.readFile(path.join(dataDir, "index.json"), "utf-8");
  const parsed = JSON.parse(indexFile) as PortfolioIndexFile;
  return parsed.clients
    .map((client) => client.slug ?? client.id)
    .filter((maybeSlug): maybeSlug is string => typeof maybeSlug === "string" && maybeSlug.length > 0)
    .map((slug) => ({ slug }));
}

async function PortfolioAssetContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }
  const baseUrl = await getRequestBaseUrl();
  try {
    const client = await fetchPortfolioClient(baseUrl, slug);
    return <PublicPortfolioAssetView client={client} />;
  } catch (error) {
    console.warn("Unable to load portfolio detail", error);
    notFound();
  }
}

export default function PublicPortfolioAssetPage(props: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white p-6">
          <p className="text-neutral-300">Loading portfolio asset…</p>
        </main>
      }
    >
      <PortfolioAssetContent {...props} />
    </Suspense>
  );
}
