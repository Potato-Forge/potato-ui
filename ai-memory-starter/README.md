# AI Memory Starter

> A portable `.ai` memory starter for consistent coding-agent workflows across tools and models.

## Purpose

AI Memory Starter installs a thin, project-local memory layer that lets Codex,
Claude Code, Cursor, OpenClaw, Hermes, and future agents share the same project
facts, current status, decisions, and handoff notes.

The goal is to reduce startup token cost, keep development behavior consistent
across agents, and allow stronger models to leave durable guidance that weaker
or cheaper models can follow later.

## Model

Agent entry files are keys, not memory stores.

```text
AGENTS.md / CLAUDE.md / .cursorrules
  -> read .ai/core for project facts
  -> read .ai/state for current status
  -> read .ai/vendor for generic protocol and behavior
  -> write back sanitized state/log updates after work
```

## Installed Layout

```text
.ai/
├── vendor/       # Generic protocol, behavior, privacy, and logging rules
├── core/         # Stable project facts and decisions
├── state/        # Current status, handoff, progress, known issues
├── logs/         # Sanitized project event ledger
├── private/      # Local-only sensitive notes (ignored)
├── tmp/          # Scratch space (ignored)
└── .gitignore    # .ai-local ignore rules

adapters/         # Thin entry templates for each agent
scripts/          # Sync/check helpers
AGENTS.md         # Generated Codex entry
CLAUDE.md         # Generated Claude Code entry
.cursorrules      # Generated Cursor entry
```

## Quick Start

From a target project:

```bash
python3 /path/to/ai-memory-starter/bin/ai-memory init --target .
python3 scripts/ai-memory.py sync
python3 scripts/ai-memory.py status
```

Then fill in `.ai/core/project.md`, `.ai/core/architecture.md`, and
`.ai/core/conventions.md` with project-specific facts.

## Design Principles

1. Keep entries thin: hard constraints, indexes, and completion protocol only.
2. Keep vendor generic: no project facts, paths, sprint data, or local context.
3. Keep logs sanitized: What/Why/Result, no raw conversation or reasoning.
4. Keep private data local: secrets, user preferences, and scratch notes stay in
   `.ai/private/`.
5. Let high-capability models write durable guidance into `core/`, `state/`, or
   `vendor/` so other agents can continue with less context.

## Template Status

This starter is currently extracted from a live project and is intended as a
seed for a future standalone repository.
