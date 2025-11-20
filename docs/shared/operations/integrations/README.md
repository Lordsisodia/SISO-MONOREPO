# Integration Runbooks

Each portal now hosts its own integration runbooks so ownership stays obvious:

| Scope | Location | Notes |
| --- | --- | --- |
| Client base | `docs/client/integrations/` | Contains Cloudinary media workflow, Clerk client setup, and MCP configs for the client portal. |
| Partnerships | `docs/partners/integrations/` | Houses Claude playbooks, partner-specific Clerk/Supabase instructions, and Supabase project notes. |
| Shared | `docs/shared/integrations/` | Use this folder for cross-portal integration docs when we have them. |

When adding new guides, include environment prerequisites, indicate which portal owns the integration, and point to any automation scripts stored under `packages/` or `scripts/`.
