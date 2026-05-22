# .ai Vendor Layer

> Project-independent protocol assets installed by the .ai memory starter.

## Role

`.ai/vendor/` is the dependency layer of the `.ai` system. It stores generic
rules, templates, and operating protocols that should work across projects.

It must not contain project facts such as framework versions, component names,
repository paths, current tasks, sprint status, user preferences, or local
environment details.

## Layer Model

| Layer | Purpose | Project-specific | Typical git status |
|-------|---------|------------------|--------------------|
| `.ai/vendor/` | Generic protocol and templates | No | Track or install from kit |
| `.ai/core/` | Stable project facts and decisions | Yes | Track |
| `.ai/state/` | Current project status | Yes | Track |
| `.ai/logs/` | Sanitized project event ledger | Yes | Track if sanitized |
| `.ai/private/` | Local notes, sensitive context, raw thinking | Yes/local | Ignore |
| Agent entries | Thin keys into `.ai/` | Minimal | Track |

## Rules

1. Keep vendor content project-independent.
2. Put reusable protocol improvements here before extracting them into the
   external `.ai` starter kit.
3. Put project facts in `.ai/core/`, not here.
4. Put project progress in `.ai/state/` and `.ai/logs/`, not here.
5. Put sensitive notes, user-specific context, raw conversation summaries, and
   local environment details in `.ai/private/`.

## Files

- `protocol.md` defines the generic lifecycle.
- `entry-contract.md` defines what Agent entry files should and should not do.
- `logging.md` defines the sanitized log style.
- `privacy.md` defines the boundary between tracked memory and local memory.
- `manifest.json` records the installed vendor protocol metadata.
