# Potato UI — Codex Agent Entry

> Thin key for Codex. This file points to `.ai/`; it is not the memory store.

## Hard Constraints

1. Pf components use `Pf<Name>.vue` in `src/components/pf-<name>/`.
2. UI primitives live in `src/components/ui/<name>/` and do not use the `Pf` prefix.
3. Internal imports use `@/`; avoid deep relative imports such as `../../../`.
4. Styling uses `cn()` + UnoCSS semantic tokens + `cva()` variants.
5. Do not add Tailwind CSS assumptions, `.tsx` files, `export default`, `dist/`, or component bundles.
6. Run `pnpm typecheck` before commit-like handoff when code changed.

## Index

- Project identity, stack, and structure: `.ai/core/project.md`
- Architecture and component layers: `.ai/core/architecture.md`
- Coding conventions and registry rules: `.ai/core/conventions.md`
- Durable decisions: `.ai/core/decisions.md`
- Terms and naming vocabulary: `.ai/core/glossary.md`
- Current task: `.ai/state/current-task.md`
- Progress and known issues: `.ai/state/progress.md`, `.ai/state/known-issues.md`
- Handoff: `.ai/state/handoff.md`
- Generic `.ai` protocol: `.ai/vendor/`

## Completion Protocol

1. Append a sanitized What/Why/Result entry to `.ai/logs/YYYY-MM.md`.
2. Update `.ai/state/handoff.md` and keep it concise.
3. Update `.ai/state/progress.md` or `.ai/state/current-task.md` when status changed.
4. Add an ADR in `.ai/core/decisions.md` only for durable architecture or convention changes.
