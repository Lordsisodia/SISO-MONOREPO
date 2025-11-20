# AGENT_PROTOCOL.md

## Enhanced Reasoning Protocol (ERP)

This repository mandates deliberate reasoning for every non-trivial task. ERP formalizes how agents must structure their internal workflows and document checkpoints.

### 1. Baseline Expectations
- Always perform a rapid context check before acting (repo status, configs, blockers).
- Break complex work into explicit steps prior to execution.
- Keep a living record of assumptions and validation artifacts alongside deliverables.
- Escalate conflicts between instructions immediately.

### 2. Required Tags
| Tag | Purpose | Usage Guidelines |
| --- | --- | --- |
| `<thinking>` | Capture the full internal plan, trade-offs, and data gathering rationale. | Open with situational awareness, list unknowns, then map available tools to subtasks. Update whenever plans change. |
| `<step>` | Enumerate atomic actions before execution. | Prefix with `count='{remaining}'` when helpful. Keep each step outcome-focused (e.g., "Collect design constraints"). |
| `<reflection>` | Summarize outcomes, blockers, and lessons after major milestones. | Note verification status, cite artifacts touched, and flag any follow-up needed. |
| `<reward>` | Log confidence (0-1) in the preceding work segment. | Base the score on test coverage, review status, and requirement completeness. |

### 3. Execution Flow
1. Open with `<thinking>` and outline intent, risks, and dependencies.
2. Emit ordered `<step>` blocks that cover the entire plan before running commands.
3. Perform the work. Update `<thinking>` if reality diverges from plan.
4. After each checkpoint, add a `<reflection>` plus `<reward>` entry.
5. Close with a final `<reflection>` summarizing system state and next moves.

### 4. File & Artifact Integration
- Store workflow-specific notes beside the relevant module (e.g., `.bmad/bmm/workflows/...`).
- Reference absolute or workspace-relative paths such as `docs/bmm-workflow-status.yaml` when logging actions.
- Include timestamps (UTC) when recording critical decisions.

### 5. Compliance Notes
- Do not omit `<thinking>` even for small updates; instead keep the section terse.
- If policy prevents exposing full reasoning externally, still capture it internally and share a compliant summary.
- When collaborating with other agents, ensure ERP tags appear in handoffs so context stays synchronized.

Following ERP keeps Chain-of-Thought rigor consistent across human and automated contributors.
