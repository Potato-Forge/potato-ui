# Logging Protocol

Tracked logs are a project event ledger, not a transcript.

## Tracked Log Style

Use concise, sanitized entries:

```md
## YYYY-MM-DD HH:mm TZ — Short Task Name

- What: Changed the Agent entries to thin keys.
- Why: Prevent duplicated memory from drifting away from `.ai/core`.
- Result: Entries now index `.ai`; project facts stay in core/state files.
```

## Allowed

- What changed.
- Why the project needed it.
- Result or verification.
- File paths, commands, issue IDs, ADR IDs.
- Short blockers that affect future work.

## Forbidden

- User raw messages or private reasoning.
- Agent chain-of-thought or emotional narration.
- Secrets, tokens, account data, private environment details.
- Large command outputs.
- Speculative discussion that did not become a project decision.

## Private Logs

Use `.ai/private/` for local-only notes that are useful to one user or Agent but
should not enter project history.
