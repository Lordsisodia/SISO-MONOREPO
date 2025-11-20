#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const allowedPatterns = [
  /\.client\.[tj]sx?$/,
  /^src\/app\/partners\/PartnerPerfMetrics\.tsx$/,
];

const globs = [
  "'src/app/partners/**/*.ts'",
  "'src/app/partners/**/*.tsx'",
  "'src/app/partners/**/*.js'",
  "'src/app/partners/**/*.jsx'",
];

let files = [];
try {
  const output = execSync(`git ls-files --cached --others --exclude-standard ${globs.join(' ')}`, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  files = output.split('\n').filter(Boolean);
} catch (error) {
  console.error('Failed to list partner app files via git ls-files.');
  console.error(error.message || error);
  process.exit(1);
}

if (files.length === 0) {
  console.log('No partner app files found; skipping hydration heuristics check.');
  process.exit(0);
}

const directivePattern = /['"]use client['"]/;
const violations = [];
let clientFileCount = 0;

for (const filePath of files) {
  let contents;
  try {
    contents = readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Unable to read ${filePath}`);
    console.error(error.message || error);
    process.exit(1);
  }

  if (!directivePattern.test(contents)) {
    continue;
  }

  clientFileCount += 1;
  const allowed = allowedPatterns.some((regex) => regex.test(filePath));
  if (!allowed) {
    violations.push(filePath);
  }
}

if (violations.length > 0) {
  console.error('\nHydration heuristics check failed.');
  console.error('The following partner files contain "use client" but do not follow the `.client.tsx` naming convention or whitelist:');
  for (const filePath of violations) {
    console.error(`  • ${filePath}`);
  }
  console.error('\nFix: move the interactive bits into a `*.client.tsx` hydrator (or extend the whitelist when absolutely necessary).');
  process.exit(1);
}

console.log(`Hydration heuristics check passed. ${clientFileCount} partner client file(s) conform to the naming rules.`);
