# Potato UI — Cursor Rules

Thin key only. Project memory lives in `.ai/`.

## Hard Constraints

- Pf components: `Pf<Name>.vue` in `src/components/pf-<name>/`.
- UI primitives: `<Name>.vue` in `src/components/ui/<name>/`, no `Pf` prefix.
- Use `<script setup lang="ts">` for Vue SFCs.
- Internal imports use `@/`; avoid `../../../`.
- Styling uses `cn()` + UnoCSS semantic tokens + `cva()`.
- Named exports through `index.ts`; no `export default`.
- Do not create `.tsx`, `dist/`, or component bundles.
- Do not introduce Tailwind assumptions.

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
