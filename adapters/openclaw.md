# Potato UI — OpenClaw Entry

> Thin key for autonomous planning. Read `.ai/` before acting.

## Hard Constraints

1. Pf components use `Pf<Name>.vue` in `src/components/pf-<name>/`.
2. UI primitives live in `src/components/ui/<name>/` and do not use the `Pf` prefix.
3. Internal imports use `@/`; avoid deep relative imports such as `../../../`.
4. Styling uses `cn()` + UnoCSS semantic tokens + `cva()` variants.
5. Do not add Tailwind CSS assumptions, `.tsx` files, `export default`, `dist/`, or component bundles.
6. Run `pnpm typecheck` before commit-like handoff when code changed.

## Planning Index

- Load current state: `.ai/state/current-task.md`, `.ai/state/handoff.md`
- Check progress and risks: `.ai/state/progress.md`, `.ai/state/known-issues.md`
- Check project rules: `.ai/core/project.md`, `.ai/core/conventions.md`
- Go deeper when needed: `.ai/core/architecture.md`, `.ai/core/decisions.md`
- Generic `.ai` protocol: `.ai/vendor/`

## Completion Protocol

1. Append a sanitized What/Why/Result entry to `.ai/logs/YYYY-MM.md`.
2. Update `.ai/state/handoff.md` and keep it concise.
3. Update `.ai/state/progress.md` or `.ai/state/current-task.md` when status changed.
4. Add an ADR in `.ai/core/decisions.md` only for durable architecture or convention changes.
