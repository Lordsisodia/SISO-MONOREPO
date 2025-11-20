#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const TARGET_DIR = process.argv[2] ?? 'lighthouse';
const LCP_LIMIT_MS = 2500;
const INP_LIMIT_MS = 200;
const CLS_LIMIT = 0.1;

function formatMs(value) {
  return `${(value / 1000).toFixed(2)}s`;
}

function loadJsonFiles(dir) {
  const fullDir = path.resolve(dir);
  if (!fs.existsSync(fullDir)) {
    console.error(`[lighthouse-budgets] directory not found: ${fullDir}`);
    process.exit(1);
  }
  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => path.join(fullDir, file));
}

const files = loadJsonFiles(TARGET_DIR).filter((file) => !/mobile\.report\.json$/.test(file));
if (files.length === 0) {
  console.error(`[lighthouse-budgets] no Lighthouse JSON reports found in ${TARGET_DIR}`);
  process.exit(1);
}

const failures = [];

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const audits = data.audits ?? {};
  const label = data.finalDisplayedUrl ?? data.requestedUrl ?? path.basename(file);

  const lcp = audits['largest-contentful-paint']?.numericValue;
  const inp = audits['experimental-interaction-to-next-paint']?.numericValue;
  const cls = audits['cumulative-layout-shift']?.numericValue;

  if (typeof lcp === 'number' && lcp > LCP_LIMIT_MS) {
    failures.push({ label, metric: 'LCP', value: formatMs(lcp), limit: formatMs(LCP_LIMIT_MS) });
  }
  if (typeof inp === 'number' && inp > INP_LIMIT_MS) {
    failures.push({ label, metric: 'INP', value: `${Math.round(inp)}ms`, limit: `${INP_LIMIT_MS}ms` });
  }
  if (typeof cls === 'number' && cls > CLS_LIMIT) {
    failures.push({ label, metric: 'CLS', value: cls.toFixed(3), limit: CLS_LIMIT.toFixed(3) });
  }
}

if (failures.length) {
  console.error('[lighthouse-budgets] CWV thresholds exceeded:');
  for (const failure of failures) {
    console.error(`  • ${failure.label} -> ${failure.metric} ${failure.value} (limit ${failure.limit})`);
  }
  process.exit(1);
}

console.log('[lighthouse-budgets] All Lighthouse audits within CWV thresholds');
