# Pf-UI

[中文说明](./README.zh-CN.md)

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

## Distribution

Pf-UI components are distributed as registry items. The components and their required `npm` dependencies are grouped logically so they can be easily installed into a consuming project's source tree.

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

## Documentation

The project provides a web documentation site that covers the following for each component:

- Installation steps
- Basic usage and code examples
- Props, emits, slots, and exposed methods
- Associated dependencies
- Source entry points
- Copy-paste examples for simpler components
