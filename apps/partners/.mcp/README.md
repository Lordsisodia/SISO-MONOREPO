# MCP Configuration for SISO-PARTNERSHIPS

This directory contains the Model Context Protocol (MCP) configuration for the SISO Partnerships portal.

## What is MCP?

Model Context Protocol (MCP) is a standardized way for AI assistants like Claude to interact with external tools and services. It enables:

- **Direct database operations** via Supabase MCP server
- **File system access** for reading/writing project files
- **Git operations** for version control
- **GitHub integration** for repository management

## Configuration

### MCP Servers Configured

1. **Supabase** - Direct database operations
   - URL: `https://tcidaytqzruxqhsbfofy.supabase.co`
   - Requires: `SUPABASE_ANON_KEY` environment variable

2. **Filesystem** - Local file operations
   - Path: Project root directory
   - Enables: Read/write operations on project files

3. **Git** - Version control operations
   - Repository: Current project
   - Enables: Commits, branches, status checks

4. **GitHub** - Repository management
   - Requires: `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable
   - Enables: Issues, PRs, releases

### Environment Variables

Add the following to your `.env` file:

```bash
# MCP Configuration
SUPABASE_ANON_KEY=your_supabase_anon_key
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token
```

**Note:** The `SUPABASE_ANON_KEY` should match your `VITE_SUPABASE_ANON_KEY` value.

### How to Use MCP

MCP tools are automatically available when using Claude Code. You can:

1. **Database Operations**
   ```
   "Create a partners table in Supabase"
   "Query all active partners from the database"
   ```

2. **File Operations**
   ```
   "Read the partner types file"
   "Create a new partner component"
   ```

3. **Git Operations**
   ```
   "Show git status"
   "Create a new feature branch"
   ```

4. **GitHub Operations**
   ```
   "List open pull requests"
   "Create a new issue"
   ```

## Security Notes

- **Never commit** your actual `.env` file with real keys
- The `.env.example` file shows the required variables without sensitive values
- Use `.gitignore` to exclude `.env` from version control
- For production, use environment-specific keys

## Troubleshooting

### MCP Connection Issues

If MCP tools aren't working:

1. Verify environment variables are set correctly
2. Check that MCP servers are installed: `npx -y @modelcontextprotocol/server-supabase --version`
3. Restart Claude Code to reload configuration
4. Check logs for error messages

### Supabase Connection

If Supabase MCP isn't working:

1. Verify your Supabase URL and key are correct
2. Test connection manually: `curl https://tcidaytqzruxqhsbfofy.supabase.co`
3. Check that your Supabase project is active
4. Verify RLS policies allow anon key access

## Partner Portal Specific Usage

For partner portal development, MCP enables:

- **Partner database operations** - Direct CRUD on partner tables
- **Commission tracking** - Query and update commission data
- **Partner file uploads** - Manage partner documents via Supabase Storage
- **Audit logging** - Track partner actions and changes
- **Real-time updates** - Subscribe to partner data changes

## Additional Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Supabase MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/supabase)
- [Claude Code MCP Guide](https://docs.anthropic.com/claude/docs/model-context-protocol)
