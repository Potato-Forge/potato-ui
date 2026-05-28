# .ai Memory Layer

> Shared project memory for coding agents.

## What This Is

`.ai/` is a project-local memory layer for multiple coding agents. It separates
generic protocol, stable project facts, current status, sanitized logs, and
local private context.

## Layout

```text
.ai/
├── vendor/       # Generic protocol and behavior rules
├── core/         # Stable project facts and decisions
├── state/        # Current project status and handoff
├── logs/         # Sanitized project event ledger
├── private/      # Local-only sensitive notes
├── tmp/          # Scratch space
└── .gitignore    # Ignores private/tmp/raw archive
```

## Agent Load Order

1. Read the tool-specific entry file.
2. Read `.ai/state/current-task.md` and `.ai/state/handoff.md`.
3. Read `.ai/core/project.md` and `.ai/core/conventions.md`.
4. Read architecture, ADRs, and vendor protocol as needed.
5. After work, update state and append a sanitized log entry.

## Boundaries

- Project facts go in `.ai/core/`.
- Current status goes in `.ai/state/`.
- Sanitized outcomes go in `.ai/logs/`.
- Generic reusable protocol goes in `.ai/vendor/`.
- Private notes and raw reasoning go in `.ai/private/`.
