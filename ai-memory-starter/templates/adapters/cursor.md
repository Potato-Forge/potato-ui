# {{PROJECT_NAME}} — Cursor Rules

Thin key only. Project memory lives in `.ai/`.

## Hard Constraints

- Read `.ai/vendor/behavior.md` for general coding-agent guardrails.
- Keep edits surgical and tied to the request.
- Match existing style and conventions.
- Use project commands documented in `.ai/core/`.
- Do not write secrets, raw user messages, or private reasoning into tracked `.ai` files.

## Index

- Project facts: `.ai/core/project.md`
- Architecture: `.ai/core/architecture.md`
- Conventions: `.ai/core/conventions.md`
- Current task: `.ai/state/current-task.md`
- Handoff: `.ai/state/handoff.md`
- Generic protocol: `.ai/vendor/`

## Done

- Append sanitized What/Why/Result to `.ai/logs/YYYY-MM.md`.
- Update `.ai/state/handoff.md`.
- Update progress/current-task when status changed.
