# Privacy Boundary

The `.ai` memory system separates project knowledge from local private context.

## Trackable

- Stable project facts.
- Architecture and coding conventions.
- Sanitized current status.
- Sanitized task outcome logs.
- Durable ADR decisions.

## Local Only

- Raw conversation summaries.
- User personal preferences not needed by the project.
- Secrets, tokens, credentials, and private URLs.
- Local machine details beyond necessary repository paths.
- Agent scratch notes, failed hypotheses, and raw reasoning traces.

## Recommended Ignore Rules

```gitignore
.ai/private/
.ai/tmp/
.ai/archive/raw/
```

Projects may choose whether to track `.ai/logs/`. If tracked, logs must follow
the sanitized logging protocol.
