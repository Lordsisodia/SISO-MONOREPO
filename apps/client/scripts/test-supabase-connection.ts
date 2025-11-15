#!/usr/bin/env tsx
/**
 * Direct Supabase Connection Test
 * Tests the actual Supabase client and available operations
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

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
  info: (msg: string) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg: string) => console.log(`\n${colors.cyan}${msg}${colors.reset}`),
};

async function testConnection() {
  log.section('Testing Supabase Connection');

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

  log.info(`Connecting to: ${supabaseUrl}`);

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Test 1: Auth Session
  log.section('Test 1: Auth Session');
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error && error.message !== 'Auth session missing!') {
      log.error(`Auth test failed: ${error.message}`);
    } else {
      log.success('Auth API responding');
      log.info(`Session: ${data.session ? 'Active' : 'No session (expected)'}`);
    }
  } catch (error) {
    log.error(`Auth test error: ${error}`);
  }

  // Test 2: Check available tables (will fail if none exist, but confirms connection)
  log.section('Test 2: Database Access');
  try {
    // Try to query a table that doesn't exist - this will confirm database connection
    const { error } = await supabase.from('clients').select('count').limit(0);

    if (error) {
      if (error.message.includes('does not exist')) {
        log.success('Database connected (tables not yet created)');
        log.info('Run the migration SQL to create tables');
      } else if (error.code === 'PGRST116') {
        log.success('Database connected (no tables yet)');
        log.info('Run: supabase/migrations/001_init_client_portal.sql');
      } else {
        log.error(`Database query error: ${error.message}`);
      }
    } else {
      log.success('Database connected and clients table exists!');
    }
  } catch (error) {
    log.error(`Database test error: ${error}`);
  }

  // Test 3: Storage buckets
  log.section('Test 3: Storage Access');
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      log.error(`Storage error: ${error.message}`);
    } else {
      log.success('Storage API accessible');
      log.info(`Buckets: ${data.length} bucket(s) available`);
    }
  } catch (error) {
    log.error(`Storage test error: ${error}`);
  }

  // Test 4: Realtime connection
  log.section('Test 4: Realtime Capabilities');
  try {
    const channel = supabase.channel('test-channel');
    log.success('Realtime channel created');

    // Subscribe and immediately unsubscribe
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        log.success('Realtime connection working');
        channel.unsubscribe();
      } else if (status === 'CHANNEL_ERROR') {
        log.error('Realtime connection failed');
      }
    });

    // Give it a moment to connect
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (error) {
    log.error(`Realtime test error: ${error}`);
  }
}

async function main() {
  console.log(`
${colors.cyan}╔═══════════════════════════════════════════════════════╗
║   Supabase Connection Test                            ║
║   SISO-CLIENT-BASE Direct Testing                     ║
╚═══════════════════════════════════════════════════════╝${colors.reset}
`);

  await testConnection();

  console.log(`
${colors.cyan}═══════════════════════════════════════════════════════${colors.reset}

${colors.green}Test complete!${colors.reset}

Next step: Run the database migration
1. Go to: https://yeqosbhihojkrgexenzj.supabase.co
2. Open: SQL Editor
3. Run: supabase/migrations/001_init_client_portal.sql
`);
}

main().catch(error => {
  log.error(`Test failed: ${error}`);
  process.exit(1);
});
