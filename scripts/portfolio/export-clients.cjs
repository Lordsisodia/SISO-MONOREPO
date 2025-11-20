#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
process.env.TS_NODE_PROJECT = process.env.TS_NODE_PROJECT || path.resolve(__dirname, '../../tsconfig.json');
process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify({ module: 'commonjs', moduleResolution: 'node' });
process.env.TS_NODE_TRANSPILE_ONLY = 'true';
require('ts-node/register');
const { allClients } = require('../../src/domains/partnerships/portfolio/data/clients');

const outputDir = path.resolve(__dirname, '../../public/data/portfolio-clients');
fs.mkdirSync(outputDir, { recursive: true });

const DEFAULT_THUMB = 'https://via.placeholder.com/512x320/111/fff?text=Portfolio';

const pickCover = (client) => {
  const mobileShots = client.media?.screenshots?.mobile ?? [];
  const desktopShots = client.media?.screenshots?.desktop ?? [];
  if (mobileShots.length) return mobileShots[0];
  if (desktopShots.length) return desktopShots[0];
  return DEFAULT_THUMB;
};

const summaries = allClients.map((client) => ({
  id: client.id,
  name: client.name,
  industry: client.industry,
  tagline: client.tagline,
  description: client.description,
  projectType: client.projectType,
  metadata: client.metadata,
  coverImage: pickCover(client),
  pricing: {
    currency: client.pricing?.currency ?? null,
    min: client.pricing?.min ?? null,
    max: client.pricing?.max ?? null,
    sisoPrice: client.pricing?.sisoPrice ?? null,
  },
  timeline: {
    durationDays: client.timeline?.durationDays ?? null,
  },
  results: {
    clientSatisfaction: client.results?.clientSatisfaction ?? null,
  },
}));

const visible = summaries.filter((c) => c.metadata?.showInPortfolio);
const avg = (total, count) => (count === 0 ? 0 : total / count);
const satisfactionCount = visible.filter((c) => c.results?.clientSatisfaction).length;

const stats = {
  totalProjects: visible.length,
  industriesServed: Array.from(new Set(visible.map((c) => c.industry))).length,
  avgDeliveryDays: Math.round(avg(visible.reduce((sum, c) => sum + (c.timeline?.durationDays ?? 0), 0), visible.length)),
  totalValueDelivered: visible.reduce((sum, c) => sum + (c.pricing?.sisoPrice ?? 0), 0),
  clientSatisfaction: Math.round(avg(
    visible.reduce((sum, c) => sum + (c.results?.clientSatisfaction ?? 0), 0),
    satisfactionCount,
  ) * 10) / 10,
};

const indexPath = path.join(outputDir, 'index.json');
fs.writeFileSync(indexPath, JSON.stringify({ stats, clients: summaries }, null, 2));
console.log(`Wrote summaries -> ${indexPath}`);

for (const client of allClients) {
  const filePath = path.join(outputDir, `${client.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(client, null, 2));
}
console.log(`Wrote ${allClients.length} client detail files to ${outputDir}`);
