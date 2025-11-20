import { notFound } from "next/navigation";
import { PublicPortfolioAssetView } from "./PublicPortfolioAssetView";
import { getRequestBaseUrl } from "@/domains/shared/utils/request-base-url";
import { fetchPortfolioClient } from "@/domains/partnerships/portfolio/server/data-source";
import path from "node:path";
import { promises as fs } from "node:fs";

type PageParams = {
  params: {
    slug: string;
  };
};

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

export default async function PublicPortfolioAssetPage({ params }: PageParams) {
  if (!params?.slug) {
    notFound();
  }
  const baseUrl = getRequestBaseUrl();
  try {
    const client = await fetchPortfolioClient(baseUrl, params.slug);
    return <PublicPortfolioAssetView client={client} />;
  } catch (error) {
    console.warn("Unable to load portfolio detail", error);
    notFound();
  }
}
