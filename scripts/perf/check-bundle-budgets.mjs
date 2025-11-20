import fs from 'node:fs';
import path from 'node:path';

function readStats() {
  const jsonPath = path.join('.next', 'static', 'analyze', 'client.json');
  if (fs.existsSync(jsonPath)) {
    return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  }

  const htmlPath = path.join('.next', 'analyze', 'client.html');
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const match = html.match(/window\.chartData\s*=\s*(\[[^;]+\])/);
    if (match) {
      return { chunks: JSON.parse(match[1]) };
    }
  }

  console.error('[bundle-budget] Missing .next/analyze client stats. Run with ANALYZE=true first.');
  process.exit(1);
}

const stats = readStats();
const threshold = 120 * 1024; // 120 KB parsed
const oversized = [];
for (const chunk of stats.chunks || []) {
  if (!chunk.names) continue;
  const route = chunk.names.find((name) => name.startsWith('app/partners'));
  if (!route) continue;
  const size = chunk.stats?.parsedSize ?? chunk.parsedSize ?? chunk.size;
  if (size > threshold) {
    oversized.push({ route, size });
  }
}
if (oversized.length) {
  console.error('[bundle-budget] routes exceeded 120 KB parsed:');
  oversized.forEach(({ route, size }) =>
    console.error(`  • ${route}: ${(size / 1024).toFixed(1)} KB`) );
  process.exit(1);
}
console.log('[bundle-budget] all partner routes within budget');
