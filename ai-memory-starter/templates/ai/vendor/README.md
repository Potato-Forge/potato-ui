# .ai Vendor Layer

> Project-independent protocol assets installed by AI Memory Starter.

`.ai/vendor/` is the dependency layer of the `.ai` system. It stores generic
rules, templates, behavior calibration, and operating protocols that should work
across projects.

It must not contain project facts such as framework versions, component names,
repository paths, current tasks, milestone status, user preferences, or local
environment details.

## Files

- `protocol.md` defines the generic lifecycle.
- `behavior.md` defines coding-agent behavioral guardrails.
- `entry-contract.md` defines what Agent entry files should and should not do.
- `logging.md` defines the sanitized log style.
- `privacy.md` defines the boundary between tracked memory and local memory.
- `manifest.json` records installed vendor protocol metadata.
