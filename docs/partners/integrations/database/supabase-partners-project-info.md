# SUPABASE PROJECT CONFIGURATION

## 🎯 CRITICAL: This is the PARTNERSHIPS Portal

**Project Name:** SISO-PARTNERSHIP
**Project ID:** `tcidaytqzruxqhsbfofy`
**Project URL:** `https://tcidaytqzruxqhsbfofy.supabase.co`
**Dashboard:** [https://supabase.com/dashboard/project/tcidaytqzruxqhsbfofy](https://supabase.com/dashboard/project/tcidaytqzruxqhsbfofy)

---

## ⚠️ DO NOT CONFUSE WITH OTHER PROJECTS

### This Project (SISO-PARTNERSHIPS)
- **ID:** `tcidaytqzruxqhsbfofy` ✅
- **Purpose:** Partner portal - referrals, commissions, training
- **Tables:** `partners`, `partner_referrals`, `partner_commissions`, `partner_training`, `partner_resources`

### SISO-INTERNAL (Different Project!)
- **ID:** `avdgyrepwrvsvwgxrccr` ❌ (DO NOT USE HERE)
- **Purpose:** Internal operations app
- **Tables:** Different schema for internal operations

---

## 🔐 Environment Variables

Your `.env` file should have:

```bash
# PARTNERSHIPS PROJECT (tcidaytqzruxqhsbfofy)
VITE_SUPABASE_URL=https://tcidaytqzruxqhsbfofy.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_for_this_project
```

**⚠️ NEVER use credentials from SISO-INTERNAL in this project!**

---

## 🛠️ Validation

We've created tools to ensure you're always connected to the correct project:

### 1. Configuration File
**File:** `supabase.config.json` (project root)

This file contains:
- Project name, ID, and URL
- Expected database tables
- Related projects (to avoid confusion)
- Validation rules

### 2. Validation Script
**Run:** `npm run supabase:validate`

This script checks:
- ✅ Environment variables are set correctly
- ✅ Project URL matches expected configuration
- ✅ Project ID is correct
- ✅ You're NOT using SISO-INTERNAL credentials
- ✅ Connection to Supabase is working
- ✅ Database tables are configured

**Example output:**
```bash
$ npm run supabase:validate

============================================================
🔍 SUPABASE PROJECT VALIDATION
============================================================

✅ VITE_SUPABASE_URL is set
✅ VITE_SUPABASE_ANON_KEY is set
✅ Environment URL matches config
✅ Project ID matches
✅ Not using SISO-INTERNAL credentials
✅ Successfully connected to Supabase

============================================================
✅ ALL VALIDATIONS PASSED
============================================================

You are connected to the correct Supabase project!
Project: SISO-PARTNERSHIP (tcidaytqzruxqhsbfofy)
```

### 3. Pre-commit Hook (Optional)
Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash
npm run supabase:validate || exit 1
```

This ensures you never commit with wrong credentials.

---

## 📊 Database Schema

### Tables in This Project

1. **partners** - Partner accounts and profiles
2. **partner_referrals** - Client referrals from partners
3. **partner_commissions** - Commission tracking and payments
4. **partner_training** - Training modules and certifications
5. **partner_resources** - Marketing materials and downloads

### Setup Scripts

Run these in Supabase SQL Editor (in order):

1. **`setup-database.sql`** - Creates all tables, indexes, triggers
2. **`setup-rls-security.sql`** - Enables Row Level Security policies

**Location:** Project root directory

---

## 🚀 Quick Start Checklist

Before starting development:

- [ ] Run `npm run supabase:validate` to verify configuration
- [ ] Check that `.env` has the correct Supabase URL and key
- [ ] Verify you're in the PARTNERSHIPS project (not SISO-INTERNAL)
- [ ] Run `setup-database.sql` in Supabase SQL Editor (if not done)
- [ ] Run `setup-rls-security.sql` in Supabase SQL Editor (if not done)
- [ ] Test connection with `npm run dev`

---

## 🔗 MCP Integration

### Local MCP Configuration (`.mcp.json`)

This project has **local MCP servers** specific to SISO-PARTNERSHIPS:

**File:** `.mcp.json` (project root)

```json
{
  "mcpServers": {
    "supabase-partnerships": {
      "command": "npx -y @modelcontextprotocol/server-supabase",
      "env": {
        "SUPABASE_URL": "https://tcidaytqzruxqhsbfofy.supabase.co",
        "SUPABASE_ANON_KEY": "your_key"
      }
    },
    "partnerships-memory": {
      "command": "npx -y @modelcontextprotocol/server-memory"
    },
    "partnerships-sqlite": {
      "command": "npx -y @modelcontextprotocol/server-sqlite",
      "args": ["--db-path", "./data/partnerships.db"]
    }
  }
}
```

These MCP servers are **only active when working in this project** and won't affect your global MCP configuration.

**See:** `.mcp/README-LOCAL.md` for detailed usage instructions

---

## 📝 Related Files

- **Configuration:** `supabase.config.json`
- **Validation Script:** `scripts/validate-supabase-config.js`
- **Database Setup:** `setup-database.sql`, `setup-rls-security.sql`
- **Environment:** `.env`, `.env.example`
- **MCP Config:** `.mcp/config.json`

---

## 💡 Tips

1. **Always validate first:** Run `npm run supabase:validate` when switching projects
2. **Check the dashboard:** Verify you're in the right project via the URL
3. **Use config file as source of truth:** Reference `supabase.config.json` for project details
4. **Bookmark the dashboard:** [https://supabase.com/dashboard/project/tcidaytqzruxqhsbfofy](https://supabase.com/dashboard/project/tcidaytqzruxqhsbfofy)

---

## 🆘 Troubleshooting

### "Project ID doesn't match"
- Check your `.env` file
- Make sure `VITE_SUPABASE_URL` contains `tcidaytqzruxqhsbfofy`
- Run `npm run supabase:validate` to see what's wrong

### "Connection failed"
- Verify your `VITE_SUPABASE_ANON_KEY` is correct
- Check if the Supabase project is active in the dashboard
- Test the URL directly: `https://tcidaytqzruxqhsbfofy.supabase.co`

### "Using wrong project credentials"
- You may have copied credentials from SISO-INTERNAL
- Check that URL doesn't contain `avdgyrepwrvsvwgxrccr`
- Copy the correct credentials from the Supabase dashboard

---

**Last Updated:** 2025-10-05
**Project:** SISO-PARTNERSHIPS
**Supabase Project ID:** tcidaytqzruxqhsbfofy
