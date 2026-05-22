# Potato UI — Hermes Skill Entry

---
name: potato-ui
description: "Thin key for Potato UI. Load project memory from .ai/ before acting."
version: 1.1.0
author: Potato Forge
platforms: [linux, macos]
metadata:
  hermes:
    tags: [vue, unocss, component-registry, potato-ui]
    project_path: /Users/xiabinyang/Code/Personal/potato-ui
---

## Hard Constraints

1. Pf components use `Pf<Name>.vue` in `src/components/pf-<name>/`.
2. UI primitives live in `src/components/ui/<name>/` and do not use the `Pf` prefix.
3. Internal imports use `@/`; avoid deep relative imports such as `../../../`.
4. Styling uses `cn()` + UnoCSS semantic tokens + `cva()` variants.
5. Do not add Tailwind CSS assumptions, `.tsx` files, `export default`, `dist/`, or component bundles.
6. Run `pnpm typecheck` before commit-like handoff when code changed.

## Load Order

1. `.ai/state/current-task.md`
2. `.ai/state/handoff.md`
3. `.ai/core/project.md`
4. `.ai/core/conventions.md`
5. As needed: `.ai/core/architecture.md`, `.ai/core/decisions.md`, `.ai/vendor/`

## Completion Protocol

1. Append a sanitized What/Why/Result entry to `.ai/logs/YYYY-MM.md`.
2. Update `.ai/state/handoff.md` and keep it concise.
3. Update `.ai/state/progress.md` or `.ai/state/current-task.md` when status changed.
4. Add an ADR in `.ai/core/decisions.md` only for durable architecture or convention changes.
