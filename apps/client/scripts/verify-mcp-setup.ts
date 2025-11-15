#!/usr/bin/env tsx
/**
 * MCP Setup Verification Script for SISO-CLIENT-BASE
 *
 * Verifies:
 * - Supabase connection
 * - Environment variables
 * - MCP configuration
 * - Client portal readiness
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg: string) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg: string) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg: string) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg: string) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg: string) => console.log(`\n${colors.cyan}${msg}${colors.reset}`),
};

async function verifyEnvironmentVariables(): Promise<boolean> {
  log.section('1. Verifying Environment Variables');

  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
  ];

  const optionalVars = [
    'SUPABASE_URL',
    'SUPABASE_KEY',
    'NOTION_API_KEY',
  ];

  let allRequired = true;

  // Check .env file exists
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    log.error('.env file not found');
    return false;
  }
  log.success('.env file found');

  // Read and parse .env
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars = Object.fromEntries(
    envContent
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'))
      .map(line => {
        const [key, ...valueParts] = line.split('=');
        return [key.trim(), valueParts.join('=').trim()];
      })
  );

  // Check required variables
  for (const varName of requiredVars) {
    if (envVars[varName] && envVars[varName] !== 'your-project.supabase.co' && envVars[varName] !== 'your-anon-key') {
      log.success(`${varName} configured`);
    } else {
      log.error(`${varName} missing or not configured`);
      allRequired = false;
    }
  }

  // Check optional variables
  for (const varName of optionalVars) {
    if (envVars[varName] && !envVars[varName].includes('your-')) {
      log.success(`${varName} configured (optional)`);
    } else {
      log.warning(`${varName} not configured (optional)`);
    }
  }

  return allRequired;
}

async function verifyMCPConfiguration(): Promise<boolean> {
  log.section('2. Verifying MCP Configuration');

  const mcpConfigPath = path.join(process.cwd(), '.mcp', 'config.json');

  if (!fs.existsSync(mcpConfigPath)) {
    log.error('MCP config.json not found');
    return false;
  }
  log.success('MCP config.json found');

  try {
    const mcpConfig = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf-8'));

    if (mcpConfig.mcpServers?.supabase) {
      log.success('Supabase MCP server configured');
    } else {
      log.error('Supabase MCP server not configured');
      return false;
    }

    if (mcpConfig.mcpServers?.notion) {
      log.success('Notion MCP server configured (optional)');
    } else {
      log.warning('Notion MCP server not configured (optional)');
    }

    if (mcpConfig.mcpServers?.filesystem) {
      log.success('Filesystem MCP server configured');
    } else {
      log.warning('Filesystem MCP server not configured (optional)');
    }

    return true;
  } catch (error) {
    log.error(`Failed to parse MCP config: ${error}`);
    return false;
  }
}

async function verifySupabaseConnection(): Promise<boolean> {
  log.section('3. Verifying Supabase Connection');

  // Read .env
  const envPath = path.join(process.cwd(), '.env');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars = Object.fromEntries(
    envContent
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'))
      .map(line => {
        const [key, ...valueParts] = line.split('=');
        return [key.trim(), valueParts.join('=').trim()];
      })
  );

  const supabaseUrl = envVars.VITE_SUPABASE_URL;
  const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    log.error('Supabase credentials not found in .env');
    return false;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test connection with auth.getSession() which doesn't require any tables
    const { error } = await supabase.auth.getSession();

    if (error && error.message !== 'Auth session missing!') {
      log.error(`Supabase connection failed: ${error.message}`);
      return false;
    }

    log.success('Supabase connection successful');
    log.info(`Connected to: ${supabaseUrl}`);

    return true;
  } catch (error) {
    log.error(`Supabase connection error: ${error}`);
    return false;
  }
}

async function verifyClientPortalSetup(): Promise<boolean> {
  log.section('4. Verifying Client Portal Setup');

  const requiredFiles = [
    'src/lib/supabase.ts',
    'src/types/database.ts',
    '.mcp/config.json',
    '.mcp/README.md',
  ];

  let allFilesExist = true;

  for (const file of requiredFiles) {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      log.success(`${file} exists`);
    } else {
      log.error(`${file} missing`);
      allFilesExist = false;
    }
  }

  return allFilesExist;
}

async function verifyDependencies(): Promise<boolean> {
  log.section('5. Verifying Dependencies');

  const packageJsonPath = path.join(process.cwd(), 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    log.error('package.json not found');
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const requiredDeps = [
    '@supabase/supabase-js',
    '@supabase/auth-helpers-react',
  ];

  let allDepsInstalled = true;

  for (const dep of requiredDeps) {
    if (packageJson.dependencies?.[dep]) {
      log.success(`${dep} installed (${packageJson.dependencies[dep]})`);
    } else {
      log.error(`${dep} not installed`);
      allDepsInstalled = false;
    }
  }

  return allDepsInstalled;
}

async function main() {
  console.log(`
${colors.cyan}╔═══════════════════════════════════════════════════════╗
║   SISO-CLIENT-BASE MCP Setup Verification             ║
║   Supabase + MCP Integration for Client Portal        ║
╚═══════════════════════════════════════════════════════╝${colors.reset}
`);

  const results = {
    env: await verifyEnvironmentVariables(),
    mcp: await verifyMCPConfiguration(),
    supabase: await verifySupabaseConnection(),
    portal: await verifyClientPortalSetup(),
    deps: await verifyDependencies(),
  };

  log.section('Summary');

  const allPassed = Object.values(results).every(r => r);

  if (allPassed) {
    log.success('All checks passed! MCP setup is complete.');
    console.log(`
${colors.green}
✨ Your SISO-CLIENT-BASE is ready for MCP-powered development!

Next steps:
1. Initialize database schema with client portal tables
2. Set up Row Level Security (RLS) policies
3. Configure Notion integration (optional)
4. Start using Claude Code with MCP tools

Example:
  "Claude, use MCP to create the client portal database schema"
${colors.reset}
`);
    process.exit(0);
  } else {
    log.error('Some checks failed. Please review the errors above.');
    console.log(`
${colors.yellow}
Failed checks:
${Object.entries(results).filter(([_, passed]) => !passed).map(([name]) => `  - ${name}`).join('\n')}

Please fix the issues and run this script again.
${colors.reset}
`);
    process.exit(1);
  }
}

main().catch(error => {
  log.error(`Verification failed: ${error}`);
  process.exit(1);
});
