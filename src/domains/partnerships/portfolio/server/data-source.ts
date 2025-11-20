import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { PortfolioClient } from "../types";
import type { PortfolioClientSummary } from "../types/client.types";
import type { PortfolioStats } from "../types/stats.types";

const dataDir = path.join(process.cwd(), "public", "data", "portfolio-clients");

const readJson = cache(async <T>(fileName: string): Promise<T> => {
  const filePath = path.join(dataDir, fileName);
  const file = await fs.readFile(filePath, "utf-8");
  return JSON.parse(file) as T;
});

export type PortfolioIndexPayload = {
  stats: PortfolioStats;
  clients: PortfolioClientSummary[];
};

export function fetchPortfolioIndex(baseUrl: string): Promise<PortfolioIndexPayload> {
  void baseUrl; // preserved for backwards compatibility
  return readJson<PortfolioIndexPayload>("index.json");
}

export function fetchPortfolioClient(baseUrl: string, id: string): Promise<PortfolioClient> {
  void baseUrl;
  return readJson<PortfolioClient>(`${id}.json`);
}
