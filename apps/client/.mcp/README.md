# MCP Configuration for SISO-CLIENT-BASE

## Overview
Model Context Protocol (MCP) integration for AI-assisted client portal development with Supabase.

## Setup Complete ✅

### 1. Supabase Instance
- **URL**: `https://yeqosbhihojkrgexenzj.supabase.co`
- **Project**: SISO-CLIENT-BASE
- **Status**: Production instance ready

### 2. MCP Servers Configured

#### Supabase MCP Server
Provides AI-assisted database operations:
- Table queries and management
- Real-time subscriptions
- Client data isolation
- Row-level security operations

#### Notion MCP Server (Optional)
For client documentation:
- Client project documentation
- Executive updates
- Product catalogs
- Timeline tracking

#### Filesystem MCP Server
Local file operations for client portal code:
- Component management
- Service layer operations
- Type definitions
- Configuration files

## Usage with Claude Code

### Available MCP Tools

When working with Claude Code, you can use these MCP tools:

```bash
# Supabase operations
mcp__supabase__query_database
mcp__supabase__create_table
mcp__supabase__insert_rows
mcp__supabase__update_rows
mcp__supabase__delete_rows
mcp__supabase__get_schema

# Notion operations (if configured)
mcp__notion__create_page
mcp__notion__update_page
mcp__notion__search_pages
mcp__notion__create_database

# Filesystem operations
mcp__filesystem__read_file
mcp__filesystem__write_file
mcp__filesystem__list_directory
```

### Example Queries

#### 1. Create Client Portal Tables
```
Claude, use MCP to create the client portal database schema:
- clients table (id, name, email, status, settings)
- client_projects table (id, client_id, name, status, metadata)
- client_files table (id, client_id, project_id, filename, url)
```

#### 2. Query Client Data
```
Claude, use MCP to query all active clients and their projects
```

#### 3. Real-time Subscriptions
```
Claude, set up real-time subscriptions for client notifications
```

## Environment Variables

The following environment variables are configured in `.env`:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://yeqosbhihojkrgexenzj.supabase.co
VITE_SUPABASE_ANON_KEY=[configured]

# MCP Configuration
SUPABASE_URL=https://yeqosbhihojkrgexenzj.supabase.co
SUPABASE_KEY=[configured]

# Notion Integration (Optional)
NOTION_API_KEY=[your-key-here]
```

## Client Portal Specific Features

### 1. Client Data Isolation
All MCP operations respect client data boundaries:
- Automatic client_id filtering
- Row-level security enforcement
- Audit trail generation

### 2. Security Features
- PKCE authentication flow
- Session persistence
- Auto-refresh tokens
- Client-specific storage keys

### 3. Real-time Updates
```typescript
import { clientQueries } from '@/lib/supabase';

// Subscribe to client updates
const subscription = clientQueries.subscribeToClientUpdates(
  clientId,
  (payload) => {
    console.log('Client update:', payload);
  }
);
```

## Development Workflow

### With Claude Code + MCP

1. **Database Schema Design**
   ```
   Claude, design the client portal database schema using MCP
   ```

2. **Client Feature Development**
   ```
   Claude, create a client dashboard component with real-time data from Supabase via MCP
   ```

3. **Testing & Validation**
   ```
   Claude, use MCP to insert test client data and verify isolation
   ```

4. **Documentation**
   ```
   Claude, use MCP to create Notion documentation for client onboarding
   ```

## Verification

Run the verification script:
```bash
npm run mcp:verify
```

This will test:
- MCP server connectivity
- Supabase authentication
- Database access
- Client data isolation
- Real-time subscriptions

## Troubleshooting

### MCP Server Not Found
```bash
npx -y @modelcontextprotocol/server-supabase
```

### Connection Errors
1. Verify `.env` variables are correct
2. Check Supabase project is active
3. Confirm API keys are valid

### Client Isolation Issues
1. Verify Row Level Security policies
2. Check client_id filtering in queries
3. Test with different client accounts

## Next Steps

1. **Initialize Database Schema**
   - Run migration scripts
   - Set up RLS policies
   - Create initial client data

2. **Configure Notion Integration**
   - Get Notion API key
   - Set up client documentation templates
   - Link to Supabase data

3. **Development**
   - Use BMAD-METHOD for complex features
   - Leverage MCP for database operations
   - Implement client-specific workflows

## Resources

- [MCP Documentation](https://modelcontextprotocol.io)
- [Supabase Docs](https://supabase.com/docs)
- [SISO Client Portal Docs](../docs/)
- [BMAD Method](../.bmad-core/)

---

**Status**: ✅ MCP Configured and Ready
**Last Updated**: 2025-10-05
**Project**: SISO-CLIENT-BASE
