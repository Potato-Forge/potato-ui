# {{PROJECT_NAME}} — Codex Agent Entry

> Thin key for Codex. This file points to `.ai/`; it is not the memory store.

## Hard Constraints

1. Read `.ai/vendor/behavior.md` before non-trivial coding work.
2. Keep changes surgical and directly tied to the user request.
3. Match existing project style and conventions.
4. Use the project commands documented in `.ai/core/project.md` and `.ai/core/architecture.md`.
5. Do not write secrets, raw user messages, or private reasoning into tracked `.ai` files.

## Index

- Project identity, stack, and structure: `.ai/core/project.md`
- Architecture and boundaries: `.ai/core/architecture.md`
- Coding conventions: `.ai/core/conventions.md`
- Durable decisions: `.ai/core/decisions.md`
- Terms and naming vocabulary: `.ai/core/glossary.md`
- Current task: `.ai/state/current-task.md`
- Progress and known issues: `.ai/state/progress.md`, `.ai/state/known-issues.md`
- Handoff: `.ai/state/handoff.md`
- Generic `.ai` protocol and behavior: `.ai/vendor/`

## Completion Protocol

1. Append a sanitized What/Why/Result entry to `.ai/logs/YYYY-MM.md`.
2. Update `.ai/state/handoff.md` and keep it concise.
3. Update `.ai/state/progress.md` or `.ai/state/current-task.md` when status changed.
4. Add an ADR in `.ai/core/decisions.md` only for durable architecture or convention changes.
