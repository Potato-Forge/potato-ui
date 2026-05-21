# Pf-UI Architecture

## Positioning

Pf-UI is a self-use-first component registry for Potato-series projects. The Web target is built around Vue 3 and UnoCSS. This project should optimize for consistency, maintainability, and fast reuse inside the author's own templates instead of broad public compatibility.

The library should be described as:

> A source-distributed Vue 3 + UnoCSS component registry for Potato-series templates.

## Core Decisions

1. Pf-UI is not a traditional runtime UI npm package.

   Components should not be consumed as `import { PfButton } from '@potato-ui/vue'` from `node_modules`. They should be installed into the consuming project's source tree, similar to shadcn.

2. Deeply customized components keep their own Pf code base.

   Components such as `PfButton` have already moved beyond thin shadcn wrappers by adding custom slots, API shape, variants, and behavior. They should be maintained as Pf-owned source, not as a wrapper that installs or depends on the original shadcn button component.

3. Third-party runtime libraries are declared per component.

   Examples:

   - `PfTree` declares `@he-tree/vue` and, when using dynamic icons, `@iconify/vue`.
   - `PfTooltip` declares `vue-tippy` and `tippy.js`.
   - `PfToast` declares `vue-sonner`.

   A consuming project should only install the libraries needed by the components it adds.

4. Pf components may depend on other Pf registry items.

   Example: a future `PfForm` can depend on `pf-button`, `pf-checkbox`, and `pf-switch` through Pf registry dependencies rather than pulling shadcn primitives again.

5. Styling and icons are explicit project prerequisites.

   Current Pf components rely on UnoCSS utility classes, theme color tokens, radius tokens, dark mode CSS variables, static icon classes such as `i-tabler-search`, and dynamic Iconify rendering in some components. These requirements should be documented and delivered through `pf-theme` and `pf-icons` foundations rather than being implicit assumptions from `potato-template`.

## Required Web Stack

Pf-UI Web assumes:

- Vue 3
- Vue SFC support
- UnoCSS
- `@unocss/preset-wind4`
- `@unocss/preset-icons`
- A Pf theme preset or equivalent copied UnoCSS theme configuration
- A Pf icon preset or equivalent copied UnoCSS icon configuration

This is a deliberate constraint. The Web component source may use UnoCSS syntax such as:

- `bg-primary`
- `border-border`
- `text-muted-foreground`
- `hover:(bg-secondary)`
- `rounded-md`
- `i-tabler-*`
- `@apply` in component styles

## Theme Foundation

Create a `pf-theme` foundation that owns:

- Light and dark CSS variables
- Semantic colors such as `primary`, `selected`, `success`, `info`, `warning`, `risk`, and `destructive`
- Border and ring colors
- Radius tokens based on `--radius`
- Minimal shortcuts such as `flex-center`

The preferred first design is an UnoCSS preset helper, for example `@potato-ui/uno-preset-pf`, even though components themselves remain source-distributed. This helper is configuration infrastructure, not a runtime UI component package.

If keeping the first version fully source-only is more convenient, `pf-theme` can begin as copied config and CSS snippets, then later become a small preset package.

## Icon Foundation

Create a `pf-icons` foundation that covers:

- UnoCSS `presetIcons` configuration
- Tabler icon class support
- Extra icon properties such as inline-block display and vertical alignment
- Pf-owned icons such as the Potato Forge logo

Static icons should generally use UnoCSS icon classes such as `i-tabler-chevron-right`.

Dynamic icons should use `@iconify/vue` only in components that need runtime icon names, such as tree nodes or icon pickers. Those components must declare `@iconify/vue` in their registry item dependencies.

## Future Targets

Do not force H5 or mini program support into the Web component source.

Possible future target split:

- `pf-ui-vue`: Vue 3 + UnoCSS Web registry.
- `pf-ui-h5`: future H5-oriented registry, if needed.
- `pf-ui-mini`: future mini program registry, likely sharing naming and design tokens rather than component source.

The first project phase should focus only on `pf-ui-vue`.
