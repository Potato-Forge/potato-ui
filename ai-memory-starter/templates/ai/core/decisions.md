# Decisions

Use this file for durable architecture, convention, dependency, or workflow
decisions.

## D001: Initialize .ai Memory Layer

**Decision**: Use `.ai/` as a project-local memory layer shared by coding agents.

**Reason**:
- Keep Agent entries thin and stable.
- Reduce repeated startup context.
- Preserve durable project knowledge across tools and models.

**Consequences**:
- Project facts belong in `.ai/core/`.
- Current status belongs in `.ai/state/`.
- Sanitized event history belongs in `.ai/logs/`.
- Private notes belong in `.ai/private/`.
