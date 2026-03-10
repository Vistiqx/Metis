---
id: metis-shell-rebuild
name: Metis Shell Rebuild
description: Rebuilds the Metis shell and page composition system from canonical archetypes and shell geometry specifications.
type: command
version: 1.0.0
status: active
domain: metis
lane: remediation
---

# /metis-shell-rebuild

Rebuild the Metis frontend shell and page composition system so screens are instantiated from canonical archetypes instead of freeform dashboard layouts.

---

# Required Inputs

Before execution, load:

- `.opencode/skills/metis-shell-reconstruction-skill.md`
- `.opencode/skills/metis-ui-remediation-skill.md`
- `.opencode/rules/frontend/metis-screen-archetype-enforcement-rule.md`
- `.opencode/rules/frontend/metis-canonical-docs-enforcement-rule.md`
- `docs/canonical/metis-screen-composition-engine.md`

---

# Execution Phases

1. Audit current shell and page composition
2. Rebuild WorkspaceLayout into canonical shell engine
3. Normalize Sidebar, TopBar, and RightPanel to canonical geometry
4. Extract or enforce canonical page archetypes
5. Rebind pages to archetype slots
6. Validate with Playwright and screenshot comparison
7. Iterate until the UI no longer resembles the legacy dashboard shell

---

# Completion Criteria

The command completes only when:

- shell geometry is canonical
- page composition is archetype-driven
- visual dashboard-template likeness is removed
- validation passes
