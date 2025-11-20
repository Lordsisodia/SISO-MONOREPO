#!/usr/bin/env node
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const port = process.env.BASELINE_PORT || process.env.PORT || '3003';
const slug = process.env.BASELINE_DIR || new Date().toISOString().slice(0, 10);
const baselineDir = path.resolve(`docs/perf/baselines/${slug}`);

async function ensureBaselineDir() {
  await fs.mkdir(baselineDir, { recursive: true });
}

function startDevServer() {
  return spawn('npm', ['run', 'dev'], {
    env: { ...process.env, PORT: port },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function waitForReady(proc, timeoutMs = 20000) {
  return new Promise((resolve, reject) => {
    let ready = false;
    const timer = setTimeout(() => {
      if (!ready) {
        reject(new Error('Dev server did not become ready within timeout.'));
      }
    }, timeoutMs);

    const handleOutput = (chunk) => {
      const text = chunk.toString();
      process.stdout.write(`[dev] ${text}`);
      if (!ready && /Local:\s*http:\/\//i.test(text)) {
        ready = true;
        clearTimeout(timer);
        resolve();
      }
    };

    proc.stdout.on('data', handleOutput);
    proc.stderr.on('data', (data) => process.stderr.write(`[dev] ${data}`));
    proc.on('exit', (code) => {
      if (!ready) {
        clearTimeout(timer);
        reject(new Error(`Dev server exited early (code ${code ?? 'null'})`));
      }
    });
  });
}

function runCapture() {
  return new Promise((resolve, reject) => {
    const capture = spawn('node', ['scripts/perf/capture-partner-traces.mjs'], {
      env: {
        ...process.env,
        PARTNERS_BASE_URL: `http://localhost:${port}`,
        BASELINE_DIR: slug,
      },
      stdio: 'inherit',
    });
    capture.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Trace capture failed (code ${code})`));
    });
  });
}

async function copyDirRecursive(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDirRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function copyAnalyzerArtifacts() {
  const analyzerSrc = path.resolve('.next/analyze');
  try {
    await fs.access(analyzerSrc);
  } catch {
    console.warn('No .next/analyze artifacts found; skipping analyzer copy.');
    return;
  }
  const dest = path.join(baselineDir, 'analyzer');
  await fs.rm(dest, { recursive: true, force: true });
  if (typeof fs.cp === 'function') {
    await fs.cp(analyzerSrc, dest, { recursive: true });
  } else {
    await copyDirRecursive(analyzerSrc, dest);
  }
  console.log(`Copied analyzer reports to ${dest}`);
}

async function main() {
  console.log(`Baseline capture -> ${baselineDir}`);
  await ensureBaselineDir();

  const devProcess = startDevServer();
  try {
    await waitForReady(devProcess);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await runCapture();
  } finally {
    devProcess.kill('SIGINT');
  }

  await copyAnalyzerArtifacts();
  console.log('Baseline capture complete. Artifacts stored under docs/perf/baselines/' + slug);
}

main().catch((err) => {
  console.error('perf:baseline failed:', err);
  process.exitCode = 1;
});
