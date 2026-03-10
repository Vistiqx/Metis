---
id: metis-screen-archetype-enforcement-rule
name: Metis Screen Archetype Enforcement Rule
description: Forces the Metis frontend to instantiate screens from canonical archetypes and prohibits freeform page composition.
type: rule
version: 1.0.0
status: active
category: architecture
appliesTo:
  - frontend
  - ui
  - react
  - layout
alwaysApply: true
---

# Metis Screen Archetype Enforcement Rule

## Purpose

This rule prevents the Metis UI from drifting through freeform page-level layout composition.

It requires all major screens to be implemented through canonical archetypes instead of locally authored dashboard layouts.

---

# Enforcement Standard

The frontend must follow the composition engine defined in:

`docs/canonical/metis-screen-composition-engine.md`

The frontend must also comply with:

- `docs/canonical/metis-layout-geometry-spec.md`
- `docs/canonical/metis-page-archetypes.md`
- `docs/canonical/metis-component-registry.md`
- `docs/canonical/metis-design-tokens.md`
- `docs/canonical/metis-ui-visual-contract.md`

---

# Mandatory Behavior

Major screens must be instantiated from canonical archetypes.

Examples:

- Dashboard -> DashboardArchetype
- Investigations -> InvestigationWorkspaceArchetype
- Graph -> GraphAnalysisArchetype
- Entities -> EntityAnalysisArchetype
- Evidence -> EvidenceReviewArchetype
- Watchlists -> WatchlistMonitoringArchetype

---

# Prohibited Behavior

AI agents must not:

- create page-specific top-level grids that bypass canonical archetypes
- let pages define their own shell geometry
- treat RightPanel as generic optional furniture when the archetype requires a structural intelligence region
- invent new screen composition patterns outside the archetype system
- keep a legacy dashboard shell if it visually conflicts with the canonical archetype

---

# Required Refactor Standard

When a page is found to be freeform or template-like, the AI must:

1. classify the page to a canonical archetype
2. replace freeform page composition with archetype slots
3. move shell geometry into WorkspaceLayout
4. preserve only canonical components
5. validate the rebuilt page visually

---

# Failure Definition

A screen fails this rule if it:

- still resembles a generic admin dashboard
- is composed primarily in the page file instead of through archetype slots
- uses local layout primitives not defined by the canonical system
- overrides shell geometry locally

---

# Objective

The objective of this rule is to ensure Metis screens are rebuilt as a deterministic intelligence interface rather than incrementally polished dashboard pages.
