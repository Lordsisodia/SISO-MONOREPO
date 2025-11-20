import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

const baseUrl = process.env.PARTNERS_BASE_URL || 'http://localhost:3003';
const baselineSlug = process.env.BASELINE_DIR || '2025-11-19';
const outputDir = path.resolve(`docs/partners/perf/baselines/${baselineSlug}`);
const routes = [
  { name: 'academy', path: '/partners/academy' },
  { name: 'pipeline-ops', path: '/partners/pipeline-ops' },
  { name: 'recruitment', path: '/partners/recruitment' },
  { name: 'community', path: '/partners/community' },
  { name: 'messages', path: '/partners/community/messages' },
  { name: 'settings', path: '/partners/settings' },
  { name: 'settings-notifications', path: '/partners/settings/account/notifications' },
  { name: 'workspace', path: '/partners/workspace' }
];

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const metrics = {};
  try {
    for (const route of routes) {
      const page = await browser.newPage();
      const tracePath = path.join(outputDir, `trace-${route.name}.json`);
      console.log(`[trace] ${route.path} -> ${tracePath}`);
      await page.tracing.start({
        path: tracePath,
        screenshots: true,
        categories: [
          'devtools.timeline',
          'v8.execute',
          'blink.user_timing',
          'loading',
          'disabled-by-default-v8.cpu_profiler',
          'disabled-by-default-devtools.screenshot',
        ],
      });
      try {
        await page.goto(`${baseUrl}${route.path}`, {
          waitUntil: 'networkidle0',
          timeout: 180000,
        });
        await new Promise((resolve) => setTimeout(resolve, 4000));
      } catch (error) {
        console.error(`[trace] Failed to load ${route.path}: ${error.message}`);
      } finally {
        await page.tracing.stop();
      }
      try {
        const perf = await page.evaluate(() => {
          const nav = performance.getEntriesByType('navigation')[0];
          const paintEntries = performance.getEntriesByType('paint');
          const paintMap = Object.fromEntries(paintEntries.map((entry) => [entry.name, entry.startTime]));
          return {
            url: location.href,
            domContentLoaded: nav ? nav.domContentLoadedEventEnd : null,
            loadEventEnd: nav ? nav.loadEventEnd : null,
            firstPaint: paintMap['first-paint'] ?? null,
            firstContentfulPaint: paintMap['first-contentful-paint'] ?? null,
            timestamp: new Date().toISOString(),
          };
        });
        metrics[route.name] = perf;
      } catch (metricError) {
        console.error(`[trace] Failed to read metrics for ${route.path}: ${metricError.message}`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
  const metricsPath = path.join(outputDir, 'trace-metrics.json');
  fs.writeFileSync(
    metricsPath,
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        baseUrl,
        routes,
        metrics,
      },
      null,
      2,
    ),
  );
  console.log(`[trace] Saved metrics -> ${metricsPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
