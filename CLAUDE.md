<!--
  由 scripts/sync-adapters.py 自动生成
  来源: adapters/claude.md
  同步时间: 2026-05-22 08:22:58 UTC
  请勿手动编辑 — 修改 adapters/claude.md 或 .ai/vendor/ 后再运行 sync
-->

# Potato UI — Claude Code Entry

> Thin key for Claude Code. Read `.ai/` for memory; do not treat this file as a project summary.

## Hard Constraints

1. Pf components use `Pf<Name>.vue` in `src/components/pf-<name>/`.
2. UI primitives live in `src/components/ui/<name>/` and do not use the `Pf` prefix.
3. Internal imports use `@/`; avoid deep relative imports such as `../../../`.
4. Styling uses `cn()` + UnoCSS semantic tokens + `cva()` variants.
5. Do not add Tailwind CSS assumptions, `.tsx` files, `export default`, `dist/`, or component bundles.
6. Run `pnpm typecheck` before commit-like handoff when code changed.

## Read First

1. `.ai/state/current-task.md`
2. `.ai/state/handoff.md`
3. `.ai/core/project.md`
4. `.ai/core/conventions.md`

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
