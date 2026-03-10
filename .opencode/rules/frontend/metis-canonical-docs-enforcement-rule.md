
---
id: metis-canonical-docs-enforcement-rule
name: Metis Canonical Docs Enforcement Rule
description: Forces all AI development activity to strictly follow the canonical documentation under docs/canonical for UI, layout, and design decisions.
type: rule
scope: frontend
mode: all
priority: critical
version: 1.0.0
status: active
---

# Metis Canonical Documentation Enforcement Rule

This rule enforces that **all UI architecture, layout, styling, and component decisions**
must follow the canonical documentation located in:

```
docs/canonical/
```

The canonical documents define the **source of truth for the Metis UI system**.

AI agents operating inside OpenCode must treat these documents as **authoritative specifications**, not suggestions.

---

# Canonical Source of Truth

The following documents govern the Metis interface:

```
docs/canonical/metis-layout-geometry-spec.md
docs/canonical/metis-page-archetypes.md
docs/canonical/metis-component-registry.md
docs/canonical/metis-ui-state-machine.md
docs/canonical/metis-design-tokens.md
docs/canonical/metis-ui-canonical-spec.md
docs/canonical/metis-graph-visualization-spec.md
```

These documents define:

• page composition  
• layout grid geometry  
• design tokens  
• component system  
• intelligence signal usage  
• UI state behavior  

---

# Mandatory Enforcement Behavior

AI agents must:

1. Read canonical documents before modifying UI code.
2. Refactor UI implementations that violate canonical specifications.
3. Reject patterns not defined in the component registry.
4. Enforce layout geometry exactly as specified.
5. Use design tokens instead of hard-coded values.
6. Preserve signal layer isolation rules.
7. Ensure pages follow defined archetypes.

---

# Canonical Violation Definition

A canonical violation occurs when:

• Layout grid differs from geometry spec  
• Page composition differs from archetype definition  
• Components are not from the component registry  
• Hard-coded styles replace design tokens  
• Signal colors appear outside signal components  
• UI density contradicts analyst interface requirements  

All violations must be **automatically remediated**.

---

# Enforcement Workflow

When performing UI remediation:

1. Inspect UI implementation.
2. Compare implementation with canonical documents.
3. Identify violations.
4. Refactor code to match canonical specifications.
5. Validate with Playwright screenshot comparison.
6. Commit corrections.

This process must repeat until **no canonical violations remain**.

---

# Conflict Resolution

If repository code conflicts with canonical documentation:

**Canonical documentation wins.**

The AI agent must refactor the code to comply with canonical specifications.

---

# Validation Requirement

Before completing remediation cycles, the AI must verify:

• layout matches canonical mockups  
• spacing matches geometry tokens  
• components match registry definitions  
• signal colors are isolated  
• screenshot validation passes  

---

# Objective

The goal of this rule is to ensure the Metis platform maintains a **stable, deterministic intelligence UI architecture** that cannot drift away from the canonical design system.

This rule is **critical infrastructure** for autonomous development inside OpenCode.
