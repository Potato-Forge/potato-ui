# Pf-UI

Pf-UI is a source-distributed Vue 3 component registry for the Potato Forge / Potato Template ecosystem.

It follows the same broad idea as shadcn: components are installed into the consuming project's source tree instead of being used as a traditional runtime UI package from `node_modules`. The goal is to keep components easy to inspect, customize, fork, and evolve across Potato-series templates.

## Design Premise

Pf-UI Web is intentionally opinionated and self-use first. It is designed for the stable stack used by Potato Template:

- Vue 3
- Vite or an equivalent Vue SFC build environment
- UnoCSS
- `@unocss/preset-wind4`
- `@unocss/preset-icons`
- Pf theme tokens
- Pf icon configuration

Pf-UI does not aim to support every frontend stack. Compatibility with Tailwind-only projects, Element Plus, Naive UI, native CSS-only projects, or mini program runtimes is not a first-stage goal.

## Quick Start

```bash
pnpm install
pnpm dev
```

The documentation site is a Vite app with live previews for the first PoC components:

- `/components/button`
- `/components/tooltip`
- `/components/tree`
- `/foundation/theme`
- `/foundation/icons`

Build and verify the project:

```bash
pnpm typecheck
pnpm build
pnpm registry:build
```

## Distribution Model

Pf-UI components are delivered through registry items:

```bash
pnpm dlx shadcn-vue@latest add <pf-ui-registry-url>/r/pf-button.json
```

The command should copy component source code into the consuming project and install only the npm dependencies required by that component.

Generated registry payloads are emitted to:

```txt
registry/public/registry.json
registry/public/r/<item-name>.json
```

## Component Registry

The registry currently includes the full set of Pf components migrated from `potato-template`:

- `pf-breadcrumb`
- `pf-button`
- `pf-card`
- `pf-checkbox`
- `pf-color-picker`
- `pf-config-provider`
- `pf-data-table`
- `pf-divide`
- `pf-empty`
- `pf-form`
- `pf-help`
- `pf-icon-picker`
- `pf-img`
- `pf-loading`
- `pf-modal`
- `pf-sidebar`
- `pf-switch`
- `pf-text`
- `pf-toast`
- `pf-tooltip`
- `pf-tree`
- `pf-upload`

Shared setup is split into foundation/support registry items: `pf-theme`, `pf-icons`, `pf-runtime-support`, and `ui-primitives`.

## Repository Shape

```txt
src/
  components/
    pf-button/
    pf-checkbox/
    pf-tooltip/
    pf-tree/
  foundations/
    pf-theme/
    pf-icons/
  docs/
registry/
  items/
  public/
scripts/
  build-registry.ts
```

## Documentation Goal

The project should include a web documentation site with component pages covering:

- Installation command
- Basic usage
- Code examples
- Props, emits, slots, and exposed methods
- Dependencies
- Source entry points
- Copy-paste examples for simple components where useful

See `docs/pf-ui-architecture.md`, `docs/component-registry-plan.md`, and `docs/codex-handoff.md` for the current decisions and next-thread startup context.
