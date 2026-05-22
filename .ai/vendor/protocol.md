# Generic .ai Protocol

## Purpose

`.ai` is a cross-Agent project memory protocol. It gives different coding
agents a shared way to discover project facts, current status, decisions, and
handoff notes without copying volatile context into each Agent entry file.

## Lifecycle

1. **Init**: create the `.ai` directory structure and thin Agent entries.
2. **Load**: an Agent reads its entry file, then opens the indexed `.ai` files.
3. **Act**: the Agent changes code or docs while following project constraints.
4. **Sync**: the Agent records sanitized outcomes in state/log files.
5. **Maintain**: update core files only when stable project facts change.
6. **Upgrade**: update vendor protocol files from the starter kit when needed.

## Directory Contract

| Directory | Contract |
|-----------|----------|
| `.ai/vendor/` | Generic protocol, templates, checks, and reusable rules. |
| `.ai/core/` | Stable project facts: identity, architecture, conventions, ADRs. |
| `.ai/state/` | Current work status, known issues, progress, and handoff. |
| `.ai/logs/` | Sanitized event ledger: what changed, why, and result. |
| `.ai/private/` | Local-only sensitive notes, raw thinking, and personal context. |

## Update Rules

- Finishing a task updates `.ai/state/` and `.ai/logs/`.
- Architecture, dependency, naming, or command changes update `.ai/core/`.
- New durable decisions are recorded as ADR entries in `.ai/core/decisions.md`.
- Agent entries change only when hard constraints or index paths change.
- Vendor files change only when the generic protocol improves.

## Compression Rules

- Logs are event streams, not permanent context.
- Promote durable project facts from logs into `.ai/core/`.
- Promote current actionable status from logs into `.ai/state/`.
- Move raw notes or sensitive material into `.ai/private/`, not tracked logs.
- Archive obsolete logs after extracting durable facts and current state.
