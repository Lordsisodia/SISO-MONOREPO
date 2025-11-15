# Project-Local MCP Configuration

This project has **local MCP servers** that are specific to SISO-PARTNERSHIPS and won't affect your global Claude Code configuration.

## 📍 Local vs Global MCP

### Global MCP (in `~/.claude.json`)
- Available across all projects
- Your general-purpose tools
- Configured via `claude mcp add`

### Local MCP (in `.mcp.json`)
- **Only for this project**
- Project-specific databases and memory
- Automatically loaded when working in this directory

---

## 🔧 Local MCP Servers Configured

### 1. **supabase-partnerships**
**Purpose:** Direct access to SISO-PARTNERSHIPS Supabase database

```json
{
  "command": "npx -y @modelcontextprotocol/server-supabase",
  "env": {
    "SUPABASE_URL": "https://tcidaytqzruxqhsbfofy.supabase.co",
    "SUPABASE_ANON_KEY": "your_key"
  }
}
```

**Capabilities:**
- Query partner tables directly
- Execute SQL queries
- Manage database schema
- Real-time subscriptions

**Example Usage:**
```
"Show me all active partners"
"Create a new partner referral for partner_id abc123"
"Query commission totals by partner tier"
```

---

### 2. **partnerships-memory**
**Purpose:** Project-specific memory and context storage

```json
{
  "command": "npx -y @modelcontextprotocol/server-memory"
}
```

**Capabilities:**
- Store project-specific context
- Remember partner-related decisions
- Track implementation patterns
- Build project knowledge base

**Example Usage:**
```
"Remember that gold tier partners get 25% commission"
"What commission rate did we decide for silver tier?"
"Store this partner onboarding flow for future reference"
```

---

### 3. **partnerships-sqlite**
**Purpose:** Local SQLite database for development and caching

```json
{
  "command": "npx -y @modelcontextprotocol/server-sqlite",
  "args": ["--db-path", "./data/partnerships.db"]
}
```

**Capabilities:**
- Local database for testing
- Cache partner data for offline development
- Store temporary analytics
- Development seed data

**Example Usage:**
```
"Create a local test database with sample partners"
"Cache the current partner commission rates"
"Store this referral data for testing"
```

---

## 🚀 How to Use Local MCPs

### First-Time Setup

Claude Code will detect the `.mcp.json` file and prompt you to approve these servers. You'll see:

```
This project wants to use the following MCP servers:
- supabase-partnerships
- partnerships-memory
- partnerships-sqlite

[Approve for this session] [Always approve] [Reject]
```

Choose **"Always approve"** to automatically load them when working on this project.

### Verify Local MCPs

After approving, restart Claude Code and run:

```bash
/mcp
```

You should see both:
- **Global MCPs** (your general tools)
- **Local MCPs** (supabase-partnerships, partnerships-memory, partnerships-sqlite)

---

## 📊 Use Cases

### Partner Data Queries
```
"Using supabase-partnerships, show me all partners with commission_rate > 0.20"
"Get the total commission amount for partner john@example.com"
```

### Project Memory
```
"Remember that we're using tcidaytqzruxqhsbfofy for partnerships Supabase"
"Store the partner tier upgrade criteria: 5 successful referrals"
"What was the commission calculation formula we agreed on?"
```

### Local Testing
```
"Create a local test database with 10 sample partners"
"Cache the current production partner list for offline testing"
"Set up test data for commission calculation testing"
```

---

## 🔐 Security

### Environment Variables
The `.mcp.json` file includes the actual Supabase credentials for convenience. If you prefer:

1. **Move to environment variables:**
```json
{
  "env": {
    "SUPABASE_URL": "${VITE_SUPABASE_URL}",
    "SUPABASE_ANON_KEY": "${VITE_SUPABASE_ANON_KEY}"
  }
}
```

2. **Or use local override:**
Create `.mcp.local.json` (gitignored) with your credentials

### What's Committed
- ✅ `.mcp.json` - Server configuration (committed)
- ❌ `.mcp.local.json` - Local overrides (gitignored)
- ❌ `data/` folder - Local SQLite databases (gitignored)

---

## 🛠️ Troubleshooting

### "MCP server failed to connect"

**For Supabase MCP:**
```bash
# Test the package
npx -y @modelcontextprotocol/server-supabase --help

# Verify credentials
npm run supabase:validate
```

**For Memory MCP:**
```bash
# Test memory server
npx -y @modelcontextprotocol/server-memory --help
```

**For SQLite MCP:**
```bash
# Ensure data directory exists
mkdir -p data

# Test SQLite server
npx -y @modelcontextprotocol/server-sqlite --db-path ./data/partnerships.db --help
```

### "MCP servers not loading"

1. Check that `.mcp.json` exists in project root
2. Restart Claude Code
3. Approve the servers when prompted
4. Run `/mcp` to verify

### "Permission denied"

Approve the MCP servers:
```bash
# Reset and re-approve
claude mcp reset-project-choices
```

Then restart Claude Code and approve when prompted.

---

## 📝 Best Practices

1. **Use Supabase MCP** for production data queries
2. **Use Memory MCP** for storing project context and decisions
3. **Use SQLite MCP** for local testing and caching
4. **Always validate** Supabase connection before using: `npm run supabase:validate`
5. **Document important context** in Memory MCP for team consistency

---

## 🔄 Updating Configuration

Edit `.mcp.json` directly, then:

```bash
# Reset project MCP choices
claude mcp reset-project-choices

# Restart Claude Code
# Approve the updated servers
```

---

**Last Updated:** 2025-10-05
**Project:** SISO-PARTNERSHIPS
**Local MCP Servers:** 3 (Supabase, Memory, SQLite)
