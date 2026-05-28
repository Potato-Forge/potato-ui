# Templates

This directory contains the files installed into target projects.

## `ai/`

The project-local `.ai` memory instance:

- `vendor/` is generic and project-independent.
- `core/` is filled by the target project.
- `state/` is updated as work progresses.
- `logs/` stores sanitized event summaries.
- `.gitignore` keeps private and temporary memory local.

## `adapters/`

Thin Agent entry templates. These are copied into the target project's
`adapters/` directory and rendered into tool-specific entry files.

Do not put project facts in adapter templates. Use placeholders only for the
project display name, slug, and path.
