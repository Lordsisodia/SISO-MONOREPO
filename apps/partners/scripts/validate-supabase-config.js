#!/usr/bin/env node

/**
 * SUPABASE PROJECT VALIDATION SCRIPT
 * Ensures you're connected to the correct Supabase project
 * Run: node scripts/validate-supabase-config.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'bold');
  console.log('='.repeat(60));
}

function loadConfig() {
  try {
    const configPath = join(projectRoot, 'supabase.config.json');
    const configContent = readFileSync(configPath, 'utf-8');
    return JSON.parse(configContent);
  } catch (error) {
    log('❌ Error: Could not load supabase.config.json', 'red');
    process.exit(1);
  }
}

function loadEnv() {
  try {
    const envPath = join(projectRoot, '.env');
    const envContent = readFileSync(envPath, 'utf-8');
    const env = {};

    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });

    return env;
  } catch (error) {
    log('❌ Error: Could not load .env file', 'red');
    process.exit(1);
  }
}

function extractProjectId(url) {
  const match = url.match(/https:\/\/([^.]+)\.supabase\.co/);
  return match ? match[1] : null;
}

async function validateConnection(url, anonKey) {
  try {
    const response = await fetch(`${url}/rest/v1/`, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`
      }
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}

async function main() {
  logSection('🔍 SUPABASE PROJECT VALIDATION');

  // Load configuration
  log('\n📋 Loading project configuration...', 'cyan');
  const config = loadConfig();

  // Load environment
  log('📋 Loading environment variables...', 'cyan');
  const env = loadEnv();

  // Display project info
  logSection('📊 PROJECT INFORMATION');
  log(`Project Name:    ${config.project.name}`, 'blue');
  log(`Project ID:      ${config.project.id}`, 'blue');
  log(`Project URL:     ${config.project.url}`, 'blue');
  log(`Dashboard:       ${config.project.dashboard}`, 'blue');
  log(`Description:     ${config.project.description}`, 'blue');

  // Validate environment variables
  logSection('🔐 ENVIRONMENT VALIDATION');

  const envUrl = env.VITE_SUPABASE_URL;
  const envAnonKey = env.VITE_SUPABASE_ANON_KEY;

  let hasErrors = false;

  // Check required env vars exist
  config.validation.requiredEnvVars.forEach(varName => {
    if (env[varName]) {
      log(`✅ ${varName} is set`, 'green');
    } else {
      log(`❌ ${varName} is missing`, 'red');
      hasErrors = true;
    }
  });

  // Check URL matches
  logSection('🔗 URL VALIDATION');

  if (envUrl === config.project.url) {
    log('✅ Environment URL matches config', 'green');
    log(`   ${envUrl}`, 'blue');
  } else {
    log('❌ Environment URL does NOT match config!', 'red');
    log(`   Expected: ${config.project.url}`, 'yellow');
    log(`   Got:      ${envUrl}`, 'yellow');
    hasErrors = true;
  }

  // Check project ID
  const envProjectId = extractProjectId(envUrl);
  if (envProjectId === config.project.id) {
    log('✅ Project ID matches', 'green');
    log(`   ${envProjectId}`, 'blue');
  } else {
    log('❌ Project ID does NOT match!', 'red');
    log(`   Expected: ${config.project.id}`, 'yellow');
    log(`   Got:      ${envProjectId}`, 'yellow');
    hasErrors = true;
  }

  // Check we're not using SISO-INTERNAL by mistake
  logSection('⚠️  CROSS-PROJECT VALIDATION');

  if (config.relatedProjects && config.relatedProjects.sisoInternal) {
    const internalId = config.relatedProjects.sisoInternal.id;
    const internalUrl = config.relatedProjects.sisoInternal.url;

    if (envProjectId === internalId || envUrl === internalUrl) {
      log('❌ CRITICAL ERROR: Using SISO-INTERNAL credentials!', 'red');
      log(`   This is the PARTNERSHIPS project, not SISO-INTERNAL`, 'red');
      log(`   Expected project ID: ${config.project.id}`, 'yellow');
      log(`   Got SISO-INTERNAL: ${internalId}`, 'yellow');
      hasErrors = true;
    } else {
      log('✅ Not using SISO-INTERNAL credentials', 'green');
    }
  }

  // Test connection
  logSection('🌐 CONNECTION TEST');
  log('Testing connection to Supabase...', 'cyan');

  const isConnected = await validateConnection(envUrl, envAnonKey);

  if (isConnected) {
    log('✅ Successfully connected to Supabase', 'green');
  } else {
    log('❌ Failed to connect to Supabase', 'red');
    log('   Check your VITE_SUPABASE_ANON_KEY', 'yellow');
    hasErrors = true;
  }

  // Database validation
  logSection('📊 DATABASE CONFIGURATION');
  log(`Expected Tables: ${config.database.tables.join(', ')}`, 'blue');
  log(`RLS Enabled:     ${config.database.rlsEnabled ? 'Yes' : 'No'}`, 'blue');
  log(`Setup Scripts:   ${config.database.setupScripts.join(', ')}`, 'blue');

  // Final summary
  logSection('📝 VALIDATION SUMMARY');

  if (hasErrors) {
    log('❌ VALIDATION FAILED', 'red');
    log('\nPlease fix the errors above before continuing.', 'yellow');
    log('Make sure you are using the correct Supabase project:', 'yellow');
    log(`  Project: ${config.project.name}`, 'cyan');
    log(`  ID:      ${config.project.id}`, 'cyan');
    log(`  URL:     ${config.project.url}`, 'cyan');
    process.exit(1);
  } else {
    log('✅ ALL VALIDATIONS PASSED', 'green');
    log('\nYou are connected to the correct Supabase project!', 'green');
    log(`Project: ${config.project.name} (${config.project.id})`, 'cyan');
    log('\nYou can proceed with development.', 'blue');
  }

  // Notes
  if (config.notes && config.notes.length > 0) {
    logSection('📌 IMPORTANT NOTES');
    config.notes.forEach(note => {
      log(`  • ${note}`, 'yellow');
    });
  }

  console.log('\n');
}

main().catch(error => {
  log(`\n❌ Unexpected error: ${error.message}`, 'red');
  process.exit(1);
});
