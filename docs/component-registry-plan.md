# Component Registry Plan

## Goal

Build a shadcn-like registry for Pf-UI so components can be installed into a consuming project's source tree on demand.

The project does not need to build bundled component artifacts such as `dist/index.js` for runtime consumption. It does need a registry payload generation flow that turns source files and item manifests into installable JSON files.

## Proposed Repository Shape

Start lightweight:

```txt
potato-ui/
  README.md
  docs/
    pf-ui-architecture.md
    component-registry-plan.md
    codex-handoff.md
  src/
    components/
      pf-button/
      pf-tooltip/
      pf-tree/
    lib/
    styles/
  registry/
    items/
      pf-button.json
      pf-tooltip.json
      pf-tree.json
      pf-theme.json
      pf-icons.json
    public/
      registry.json
      r/
        pf-button.json
        pf-tooltip.json
        pf-tree.json
  docs-site/
  scripts/
    build-registry.ts
```

Upgrade to a monorepo only after the shape is proven:

```txt
potato-ui/
  apps/
    docs/
  packages/
    registry/
    uno-preset-pf/
```

## Registry Item Responsibilities

Each component registry item should declare:

- Files to copy
- Target paths when needed
- npm dependencies
- Pf registry dependencies
- Documentation note if manual setup is required
- Optional metadata for docs generation

Example sketch for `pf-tree`:

```json
{
  "$schema": "https://shadcn-vue.com/schema/registry-item.json",
  "name": "pf-tree",
  "type": "registry:block",
  "title": "PfTree",
  "description": "A tree component based on he-tree with selectable, checkable, and draggable nodes.",
  "dependencies": ["@he-tree/vue", "@iconify/vue"],
  "registryDependencies": [
    "<registry-url>/r/pf-theme.json",
    "<registry-url>/r/pf-icons.json",
    "<registry-url>/r/pf-checkbox.json"
  ],
  "files": [
    {
      "path": "src/components/pf-tree/PfTree.vue",
      "type": "registry:component"
    },
    {
      "path": "src/components/pf-tree/PfTreeCheckbox.vue",
      "type": "registry:component"
    },
    {
      "path": "src/components/pf-tree/types/PfTreeProps.types.ts",
      "type": "registry:file",
      "target": "~/src/components/pf/pf-tree/types/PfTreeProps.types.ts"
    }
  ]
}
```

The exact source and target paths can be adjusted during implementation.

## Registry Build Script

`scripts/build-registry.ts` should generate registry payloads, not component bundles.

Responsibilities:

- Read `registry/items/*.json`.
- Validate that referenced files exist.
- Inline file contents into installable registry item JSON payloads if required by the shadcn-vue registry format.
- Emit `registry/public/r/<name>.json`.
- Emit `registry/public/registry.json`.
- Fail loudly when dependency declarations or file paths are incomplete.

## First PoC Scope

### PfButton

Purpose:

- Validate fully Pf-owned source.
- Avoid pulling shadcn button as an external registry dependency.
- Keep custom slots and API as the Pf baseline.

Docs should cover:

- Variants
- Sizes
- Icon usage
- Prefix/suffix slots if present
- Loading/disabled behavior if present
- Copy-paste basic usage

### PfTooltip

Purpose:

- Validate third-party dependency installation.
- Keep the Pf API small while using tippy underneath.

Dependencies:

- `vue-tippy`
- `tippy.js`

Docs should cover:

- Basic tooltip
- Placement
- Delay
- Interactive tooltip
- Component usage
- Directive usage if the directive remains part of the component entry

### PfTree

Purpose:

- Validate complex multi-file installation.
- Validate third-party dependency installation.
- Validate dynamic icons.
- Validate slots, exposed methods, and types.

Dependencies:

- `@he-tree/vue`
- `@iconify/vue` when dynamic node icons are supported

Docs should cover:

- Basic tree
- Checkable tree
- Choosable tree
- Draggable tree
- Slots for icon, text, subText, and actions
- Exposed methods such as `getTreeData`, `getCheckedKeys`, and `setCheckedByKeys`

## Documentation Site

The docs site should be part of the new project and should include real component previews.

Each component page should follow this structure:

- Overview
- Installation
- Basic usage
- Examples
- API
- Dependencies
- Source entry

Simple components can provide copy-paste source or compact examples. More complex components should provide focused examples rather than dumping all source into the page.

## Relationship With potato-template

`potato-template` is the original source and first validation consumer.

Initial flow:

1. Copy the first three components from `potato-template`.
2. Normalize them inside `potato-ui`.
3. Build registry payloads.
4. Install them back into a test project or branch of `potato-template`.
5. Verify source paths, dependencies, UnoCSS theme, icons, and docs examples.
