---
id: metis-shell-reconstruction-skill
name: Metis Shell Reconstruction Skill
description: Skill that teaches AI agents how to reconstruct the Metis application shell, page archetypes, and screen geometry to match the canonical interface.
type: skill
version: 1.0.0
status: active
domain: metis
lane: frontend
---

# Metis Shell Reconstruction Skill

This skill defines the exact procedure required to rebuild the Metis UI shell and page composition system.

The goal is to stop the AI from making incremental cosmetic tweaks and instead force a canonical shell and archetype reconstruction.

---

# Use This Skill When

Use this skill when any of the following are true:

- the UI still looks like a generic dashboard after remediation
- dashboard pages changed but visual composition remained mostly the same
- WorkspaceLayout behaves like a wrapper instead of a shell engine
- pages still own their own grid structure
- graph, investigation, and dashboard screens do not visually match the canonical mockups

---

# Canonical Inputs

Load and follow:

- `docs/canonical/metis-screen-composition-engine.md`
- `docs/canonical/metis-layout-geometry-spec.md`
- `docs/canonical/metis-page-archetypes.md`
- `docs/canonical/metis-component-registry.md`
- `docs/canonical/metis-design-tokens.md`
- `docs/canonical/metis-ui-visual-contract.md`

---

# Reconstruction Procedure

## Phase 1 — Shell Audit

Inspect:

- `frontend/src/components/layout/WorkspaceLayout.tsx`
- `frontend/src/components/layout/Sidebar.tsx`
- `frontend/src/components/layout/TopBar.tsx`
- `frontend/src/components/layout/RightPanel.tsx`

Identify:

- generic shell behavior
- incorrect widths
- incorrect density
- optional intelligence region logic where structural regions are required
- page-owned geometry leaking into the shell

## Phase 2 — Shell Rebuild

Rebuild WorkspaceLayout so it owns:

- canonical shell geometry
- sidebar width
- topbar height
- right intelligence region width
- platform vs signal layer mode
- content region defaults
- density defaults

## Phase 3 — Archetype Extraction

Create or enforce archetype implementations for:

- dashboard
- investigations
- graph
- entity analysis
- evidence review
- watchlist monitoring

Replace freeform page grids with archetype slot composition.

## Phase 4 — Page Rebinding

Refactor pages to:

- declare archetype
- populate slots
- stop owning shell geometry
- use registry components only

## Phase 5 — Visual Verification

Run Playwright and screenshot validation against canonical mockups.

If the result still resembles the old dashboard shell, continue reconstruction.

---

# Success Condition

This skill succeeds only when the UI visibly departs from the legacy dashboard template and adopts the canonical Metis shell and archetype structure.
