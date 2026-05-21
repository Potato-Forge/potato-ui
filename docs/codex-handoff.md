# Codex Handoff

Use this document to start a new Codex thread inside the `potato-ui` project.

## Suggested First Message

```md
This is the Potato UI / Pf-UI project. It is being extracted from `/Users/xiabinyang/Code/Personal/potato-template`.

Pf-UI is a self-use-first Vue 3 + UnoCSS source-distributed component registry for Potato-series templates. The target is similar to shadcn: components are installed into the consuming project's source code through registry items, not consumed as a traditional runtime UI package from node_modules.

Confirmed decisions:

- Web target only needs to support Vue 3 + UnoCSS.
- The component library is self-use first and does not aim to support every frontend stack.
- Deeply customized components such as PfButton maintain their own Pf code base and should not install the original shadcn button as a separate dependency.
- Components backed by third-party libraries declare those dependencies in registry items, for example PfTree uses @he-tree/vue and PfTooltip uses vue-tippy/tippy.js.
- Styling tokens, semantic colors, border/radius values, dark mode variables, and related utilities are provided by a pf-theme foundation.
- Static icon classes and dynamic Iconify usage are handled by a pf-icons foundation plus per-component dependencies when needed.
- First PoC components are PfButton, PfTooltip, and PfTree.
- The project should include a web documentation site with installation commands, usage examples, code samples, Props/Emits/Slots/API tables, dependencies, and source entry points.

Please read:

- docs/pf-ui-architecture.md
- docs/component-registry-plan.md

Then create an implementation plan for the registry, docs site, and the first three PoC components.
```

## Source Project Pointers

Original source checkout:

```txt
/Users/xiabinyang/Code/Personal/potato-template
```

Representative files to inspect there:

```txt
src/components/pf/pf-button/
src/components/pf/pf-tooltip/
src/components/pf/pf-tree/
uno.config.ts
src/assets/main.css
components.json
package.json
```

## Important Context

The new project should keep template logic and component registry logic separate.

Use `potato-template` as:

- Original component source
- Compatibility reference
- First consumer for validation

Use `potato-ui` as:

- Registry source
- Pf component ownership home
- Documentation site home
- Registry generation script home
