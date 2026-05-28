# {{PROJECT_NAME}} — Claude Code Entry

> Thin key for Claude Code. Read `.ai/` for memory; do not treat this file as a project summary.

## Hard Constraints

1. Read `.ai/vendor/behavior.md` before non-trivial coding work.
2. Keep changes surgical and directly tied to the user request.
3. Match existing project style and conventions.
4. Use the project commands documented in `.ai/core/project.md` and `.ai/core/architecture.md`.
5. Do not write secrets, raw user messages, or private reasoning into tracked `.ai` files.

## Read First

1. `.ai/state/current-task.md`
2. `.ai/state/handoff.md`
3. `.ai/core/project.md`
4. `.ai/core/conventions.md`
5. `.ai/vendor/behavior.md`

## Read As Needed

- Architecture: `.ai/core/architecture.md`
- ADRs: `.ai/core/decisions.md`
- Known issues: `.ai/state/known-issues.md`
- Generic protocol: `.ai/vendor/`

## Completion Protocol

1. Append a sanitized What/Why/Result entry to `.ai/logs/YYYY-MM.md`.
2. Update `.ai/state/handoff.md` and keep it concise.
3. Update `.ai/state/progress.md` or `.ai/state/current-task.md` when status changed.
4. Add an ADR in `.ai/core/decisions.md` only for durable architecture or convention changes.
