# MCP Configuration - SISO Client Base

## 🎯 Overview

This project uses **Model Context Protocol (MCP)** servers for enhanced AI-assisted development with:
- **Supabase**: Database operations and client data management
- **Notion**: Documentation and client communication
- **Filesystem**: Local file operations

## 📋 Active Configuration

**Location**: `.mcp.json` (project root)

### Supabase MCP Server

**Package**: `@modelcontextprotocol/server-supabase` (official)

```json
{
  "supabase": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-supabase"],
    "env": {
      "SUPABASE_URL": "https://yeqosbhihojkrgexenzj.supabase.co",
      "SUPABASE_KEY": "[anon-key]"
    }
  }
}
```

**Purpose**: Client portal database operations
- Client data queries
- Project management
- File metadata
- User authentication
- Real-time subscriptions

**Security**: Uses `anon` key (safe for client-side, respects RLS)

---

### Notion MCP Server

**Package**: `@modelcontextprotocol/server-notion`

```json
{
  "notion": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-notion"],
    "env": {
      "NOTION_API_KEY": "${NOTION_API_KEY}"
    }
  }
}
```

**Purpose**: Client documentation and project management
- Executive updates
- Product databases
- Timeline tracking
- Budget summaries
- Demo showcases

**Setup**: Requires `NOTION_API_KEY` environment variable

---

### Filesystem MCP Server

**Package**: `@modelcontextprotocol/server-filesystem`

```json
{
  "filesystem": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "/Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-CLIENT-BASE"
    ]
  }
}
```

**Purpose**: Local file operations
- Code reading/writing
- Configuration management
- Build artifacts
- Client asset management

**Scope**: Limited to `SISO-CLIENT-BASE` directory

---

## 🔑 Supabase API Keys

### Available Keys

| Key Type | Usage | Security | Status |
|----------|-------|----------|--------|
| **anon** (public) | ✅ MCP, client-side | 🟢 Safe with RLS | Active |
| **service_role** (secret) | ⚠️ Server-side only | 🔴 Bypasses RLS | Not used in MCP |

### Current Configuration

**MCP uses `anon` key** - correct and secure:
- Respects Row Level Security (RLS)
- Safe for browser and development tools
- Cannot bypass database permissions
- Recommended for client portal operations

**`service_role` key** - reserved for:
- Server-side operations only
- Admin scripts and migrations
- Backend services
- **Never exposed in client code or MCP**

---

## 🚀 MCP Tool Usage

### Supabase Operations

**Available via**: `mcp__supabase__*` tools

Common operations:
```bash
# Query client data
mcp__supabase__query_data

# Execute SQL
mcp__supabase__execute_sql

# Manage storage
mcp__supabase__storage_*

# Real-time subscriptions
mcp__supabase__subscribe_*
```

**Security Note**: All operations respect RLS policies defined in Supabase

---

### Notion Operations

**Available via**: `mcp__notion__*` tools

Common operations:
```bash
# Create client pages
mcp__notion__create_page

# Update documentation
mcp__notion__update_page

# Query databases
mcp__notion__query_database

# Manage client content
mcp__notion__append_block_children
```

---

### Filesystem Operations

**Available via**: `mcp__filesystem__*` tools

Common operations:
```bash
# Read files
mcp__filesystem__read_file
mcp__filesystem__read_multiple_files

# Write files
mcp__filesystem__write_file
mcp__filesystem__edit_file

# Directory operations
mcp__filesystem__list_directory
mcp__filesystem__directory_tree

# Search
mcp__filesystem__search_files
```

**Scope**: Operations limited to project directory only

---

## 🔧 Configuration Management

### Active Config
- **File**: `.mcp.json` (project root)
- **Status**: ✅ Active
- **Package**: Official `@modelcontextprotocol/*` servers

### Backup Config
- **File**: `.mcp/config.json.backup` (archived)
- **Status**: ❌ Disabled
- **Reason**: Duplicate configuration removed

### Documentation
- **Directory**: `.mcp/`
- **Files**: CHANGELOG.md, QUICK-START.md, README.md, STATUS.md
- **Status**: ✅ Preserved for reference

---

## 📊 Global vs Project MCPs

### Global MCPs (User-wide)
Located in: `~/.config/claude/` or `~/Library/Application Support/Claude/`

Available globally:
- `mcp__serena__*` - Code intelligence
- `mcp__chrome-devtools__*` - Browser automation
- `mcp__testsprite__*` - Testing framework
- `mcp__clear-thought-1_5__*` - Reasoning tools
- `mcp__duckduckgo__*` - Web search
- `mcp__fetch__*` - URL fetching
- `mcp__ide__*` - IDE integration

### Project MCPs (SISO-CLIENT-BASE only)
Located in: `.mcp.json`

Project-specific:
- `supabase` - Client base database
- `notion` - Client documentation
- `filesystem` - Local file ops

---

## 🛡️ Security Best Practices

### ✅ Current Security Posture

1. **API Key Separation**
   - ✅ MCP uses `anon` key (safe)
   - ✅ `service_role` key not exposed
   - ✅ RLS policies enforced

2. **Scope Limitation**
   - ✅ Filesystem MCP limited to project directory
   - ✅ Supabase operations respect database permissions
   - ✅ Notion API key uses environment variable

3. **Configuration Security**
   - ✅ No secrets in git (use `.env` or env vars)
   - ✅ Official MCP packages only
   - ✅ Minimal permissions (anon key)

### ⚠️ Security Reminders

- **Never commit** `service_role` key to git
- **Always use** RLS policies for client data
- **Rotate keys** if exposed publicly
- **Monitor** Supabase API usage for anomalies
- **Test** RLS policies before deploying

---

## 🔄 Updating Configuration

### Change Supabase URL/Key
```bash
# Edit .mcp.json
nano .mcp.json

# Restart Claude Code to reload MCP servers
```

### Add New MCP Server
```json
{
  "mcpServers": {
    "new-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-name"],
      "env": {
        "API_KEY": "${ENV_VAR_NAME}"
      }
    }
  }
}
```

### Test MCP Connection
Use Claude Code's MCP tools to verify:
```
"List available MCP servers"
"Test Supabase connection"
"Query Notion databases"
```

---

## 📖 Related Documentation

- **MCP Setup Guide**: `.mcp/QUICK-START.md`
- **MCP Changelog**: `.mcp/CHANGELOG.md`
- **MCP Status**: `.mcp/STATUS.md`
- **Project README**: `README.md`
- **Claude Instructions**: `CLAUDE.md`

---

## 🐛 Troubleshooting

### MCP Server Not Found
```bash
# Verify package installation
npx @modelcontextprotocol/server-supabase --version

# Check Claude Code MCP status
# Ask: "Show MCP server status"
```

### Supabase Connection Issues
```bash
# Test URL and key
curl -H "apikey: [anon-key]" \
     -H "Authorization: Bearer [anon-key]" \
     https://yeqosbhihojkrgexenzj.supabase.co/rest/v1/
```

### Notion API Issues
```bash
# Verify API key is set
echo $NOTION_API_KEY

# Test Notion connection
# Ask: "List Notion databases"
```

---

*Last Updated: 2025-10-05*
*Config Version: 1.0*
*MCP Package Versions: Official @modelcontextprotocol/*@latest*
