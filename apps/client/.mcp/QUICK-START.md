# 🚀 MCP Quick Start - SISO-CLIENT-BASE

## ⚡ TL;DR - Get Started in 3 Steps

### 1️⃣ Initialize Database
```bash
# Go to Supabase SQL Editor
# https://yeqosbhihojkrgexenzj.supabase.co
# Run: supabase/migrations/001_init_client_portal.sql
```

### 2️⃣ Verify Setup
```bash
npm run mcp:verify
# Expected: ✅ All checks passed!
```

### 3️⃣ Start Building with Claude
```
Claude, use MCP to create a test client and show me their data
```

---

## 🎯 Common MCP Commands for Claude Code

### Database Operations
```
Claude, use MCP to:
- Show me all clients in the database
- Create a new client named "Test Corp"
- Update client status to "active"
- Get all projects for client ID [uuid]
```

### Client Portal Features
```
Claude, create a ClientDashboard component that uses MCP to:
- Fetch current client data
- Display their active projects
- Show recent communications
- Implement real-time updates
```

### Data Analysis
```
Claude, use MCP to:
- Count total active clients
- Show clients with pending projects
- Get communication stats by type
- Export client data to CSV
```

---

## 📊 Database Quick Reference

### Tables
```
clients              → Main client records
client_users         → Team members per client
client_projects      → Client projects
client_files         → File attachments
client_communications → Messages & notifications
```

### Key Columns
```typescript
// All tables have:
id: UUID               // Primary key
created_at: timestamp  // Auto-set on insert
updated_at: timestamp  // Auto-updated on change

// Soft delete tables (clients, client_projects):
deleted_at: timestamp  // NULL = active, value = deleted
```

---

## 🔧 Helper Functions

### In TypeScript Code
```typescript
import { supabase, clientQueries } from '@/lib/supabase';

// Get current authenticated client
const client = await clientQueries.getCurrentClient();

// Get client projects
const projects = await clientQueries.getClientProjects(clientId);

// Subscribe to real-time updates
const sub = clientQueries.subscribeToClientUpdates(
  clientId,
  (payload) => console.log('Update:', payload)
);
```

### Via MCP (Ask Claude)
```
Claude, use the MCP get_client_by_user_id function with user ID [uuid]
Claude, use the MCP get_client_projects function with client ID [uuid]
```

---

## 🔒 Security Reminders

### ✅ Always Include client_id
```typescript
// ✅ Good - Client isolation
.eq('client_id', currentClientId)

// ❌ Bad - No isolation
.select('*')  // RLS will block this
```

### ✅ Use Helper Functions
```typescript
// ✅ Good - Built-in isolation
clientQueries.getCurrentClient()

// ❌ Risky - Manual query
supabase.from('clients').select('*')
```

---

## 🎭 BMAD Integration

### When to Use BMAD
- Multi-step client features
- Complex client workflows
- Cross-table operations
- New client portal sections

### Quick BMAD Flow
```bash
*agent analyst     # Research client needs
*agent pm         # Create PRD
*agent architect  # Design with MCP
*agent sm         # Create stories
*agent dev        # Implement with MCP
```

---

## 📚 Documentation Links

| Resource | Location |
|----------|----------|
| Full Setup Guide | `MCP-SETUP.md` |
| MCP Usage Guide | `.mcp/README.md` |
| Database Types | `src/types/database.ts` |
| Supabase Client | `src/lib/supabase.ts` |
| Migration SQL | `supabase/migrations/001_init_client_portal.sql` |
| Verification Script | `scripts/verify-mcp-setup.ts` |

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| MCP tools not working | Restart Claude Code |
| Database connection error | Run `npm run mcp:verify` |
| Type errors | Check `src/types/database.ts` |
| RLS blocking queries | Verify client_id filtering |

---

## 💡 Pro Tips

### 1. Use MCP for Exploration
```
Claude, use MCP to show me the schema for the clients table
Claude, use MCP to count how many rows are in each table
```

### 2. Let Claude Handle Types
```
Claude, use MCP to fetch client data and create a TypeScript interface for it
```

### 3. Test with MCP First
```
Claude, use MCP to insert test data before I write the component
```

### 4. Real-time Development
```
Claude, set up MCP real-time subscription for client_projects table
```

---

## 🎯 Example Workflow

### Building a New Client Feature

1. **Ask Claude to Explore**
   ```
   Claude, use MCP to show me the current client_projects schema
   ```

2. **Let Claude Design**
   ```
   Claude, design a project status tracker component using MCP
   ```

3. **Claude Implements**
   ```
   Claude, implement the component with:
   - MCP data fetching
   - Real-time updates
   - Client isolation
   - TypeScript types
   ```

4. **Claude Tests**
   ```
   Claude, use MCP to insert test projects and verify the component works
   ```

---

## ✨ You're Ready!

Your MCP setup is complete and verified. Start building with:

```
Claude, let's build an amazing client portal using MCP! 🚀
```

---

**Quick Links:**
- Supabase Dashboard: https://yeqosbhihojkrgexenzj.supabase.co
- Run Verification: `npm run mcp:verify`
- Full Docs: `MCP-SETUP.md`
