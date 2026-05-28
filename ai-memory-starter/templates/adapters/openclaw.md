# {{PROJECT_NAME}} — OpenClaw Entry

> Thin key for autonomous planning. Read `.ai/` before acting.

## Hard Constraints

1. Read `.ai/vendor/behavior.md` before non-trivial coding work.
2. Keep changes surgical and directly tied to the user request.
3. Match existing project style and conventions.
4. Use the project commands documented in `.ai/core/project.md` and `.ai/core/architecture.md`.
5. Do not write secrets, raw user messages, or private reasoning into tracked `.ai` files.

## Planning Index

- Load current state: `.ai/state/current-task.md`, `.ai/state/handoff.md`
- Check progress and risks: `.ai/state/progress.md`, `.ai/state/known-issues.md`
- Check project rules: `.ai/core/project.md`, `.ai/core/conventions.md`
- Go deeper when needed: `.ai/core/architecture.md`, `.ai/core/decisions.md`
- Generic `.ai` protocol and behavior: `.ai/vendor/`

## Completion Protocol

1. Append a sanitized What/Why/Result entry to `.ai/logs/YYYY-MM.md`.
2. Update `.ai/state/handoff.md` and keep it concise.
3. Update `.ai/state/progress.md` or `.ai/state/current-task.md` when status changed.
4. Add an ADR in `.ai/core/decisions.md` only for durable architecture or convention changes.
