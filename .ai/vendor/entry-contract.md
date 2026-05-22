# Agent Entry Contract

Agent entry files are keys, not memory stores.

## Entries Should Contain

1. Hard constraints that must be visible before file operations.
2. A compact index showing where to read project facts and status.
3. A completion protocol for updating `.ai/state/` and `.ai/logs/`.
4. Tool-specific hints only when the Agent needs them to load the project.

## Entries Should Not Contain

- Full technology stack tables.
- ADR summaries.
- Milestone or task progress.
- Component counts.
- Architecture diagrams copied from `.ai/core/`.
- Handoff details copied from `.ai/state/`.
- User preferences or private notes.

## Update Frequency

Entry files should change rarely. Update them when:

- A hard project constraint changes.
- Command names or package manager rules change.
- `.ai` index paths change.
- A new Agent integration is added.

Do not update entries just because a task, sprint, or log changed.

## Recommended Shape

```md
# Project Agent Entry

## Hard Constraints
- ...

## Index
- Project facts -> .ai/core/project.md
- Architecture -> .ai/core/architecture.md
- Current task -> .ai/state/current-task.md

## Completion Protocol
- Append sanitized log entry.
- Update handoff and progress.
- Add ADR only for durable decisions.
```
