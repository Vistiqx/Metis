---
id: metis-screen-composition-engine
name: Metis Screen Composition Engine
description: Canonical composition model defining how Metis pages must be instantiated from archetypes instead of being freely composed page by page.
type: reference
version: 1.0.0
status: active
---

# Metis Screen Composition Engine

This document defines the **screen composition engine** required for the Metis frontend.

The root architectural problem in the current UI is that pages are still being **authored individually** instead of being **instantiated from canonical screen archetypes**.

This document fixes that by defining the exact composition model the frontend must use.

---

# Problem Statement

The current UI can be refactored repeatedly without ever matching the canonical mockups if:

- pages build their own layout ad hoc
- WorkspaceLayout behaves like a generic wrapper
- Sidebar, TopBar, and RightPanel are treated as reusable furniture instead of canonical structural zones
- page composition is inferred from local component choices rather than canonical screen blueprints

This creates a system where:

- code changes happen
- components improve
- density improves
- but the UI still visually feels like the old dashboard shell

---

# Required Architectural Shift

Metis must move from:

**Page-authored UI**

to:

**Archetype-instantiated UI**

Pages must no longer freely compose the screen.

Instead, pages must:

1. declare which canonical archetype they use
2. populate the approved regions of that archetype
3. inherit canonical shell geometry automatically
4. inherit density, spacing, and inspector behavior automatically

---

# Canonical Screen Engine Layers

The Metis UI must be composed in the following order.

## Layer 1 — Application Shell

The application shell is mandatory and shared.

It includes:

- Sidebar
- TopBar
- Main workspace frame
- Right intelligence region
- Dock behavior where applicable

The shell must not be redefined by pages.

---

## Layer 2 — Page Archetype

Each page must select a canonical archetype.

Allowed archetypes:

- DashboardArchetype
- InvestigationWorkspaceArchetype
- GraphAnalysisArchetype
- EntityAnalysisArchetype
- EvidenceReviewArchetype
- WatchlistMonitoringArchetype
- OperationalSurfaceArchetype

Each archetype defines:

- region layout
- region widths
- panel hierarchy
- density behavior
- signal-layer rules

---

## Layer 3 — Region Slots

Archetypes expose named slots.

Example slots:

- leftRail
- centerPrimary
- centerSecondary
- rightInspector
- topMetrics
- feedPanel
- graphCanvas
- graphControls
- graphInspector

Pages must populate slots rather than authoring arbitrary layout.

---

## Layer 4 — Canonical Components

Slot contents must use only components approved in:

`docs/canonical/metis-component-registry.md`

No page may introduce new structural primitives outside the registry.

---

# WorkspaceLayout Requirements

WorkspaceLayout must become the canonical shell engine.

It must stop behaving like a generic wrapper.

WorkspaceLayout must own:

- canonical shell geometry
- sidebar width
- topbar height
- right intelligence region width
- platform vs signal layer mode
- content max-width and padding
- page rail behavior
- density defaults

WorkspaceLayout must not delegate these decisions to page files.

---

# Sidebar Requirements

Sidebar is not a convenience component. It is a canonical structural region.

It must be locked to canonical geometry:

- width: 240px
- fixed vertical orientation
- grouped navigation sections
- analyst-first density
- no dashboard-style icon inflation

---

# TopBar Requirements

TopBar must be canonical and shared.

It must be locked to:

- height: 56px
- breadcrumb region
- context region
- user/session controls
- restrained density

TopBar must not drift page by page.

---

# Right Intelligence Region Requirements

RightPanel must become a canonical intelligence region, not optional furniture.

It must:

- be structurally present where archetypes require it
- use canonical width rules
- support metadata, evidence, entity, and analyst context
- remain visually subordinate to the central analytical region
- inherit neutral surfaces by default

---

# Archetype Ownership Rules

Each page may define:

- content
- data bindings
- slot population

Each page may not define:

- shell geometry
- screen ratios
- ad hoc region structure
- custom dashboard compositions
- independent inspector layout rules

---

# Canonical Outcome

A compliant Metis screen must be the result of:

`Shell -> Archetype -> Slots -> Canonical Components -> Data`

Not:

`Page -> Arbitrary Grid -> Arbitrary Cards -> Local Styling`

---

# Enforcement Requirement

Any AI agent refactoring the Metis UI must rebuild pages toward this composition engine.

A page is not canonical merely because it uses good components.

A page is canonical only if:

- it is instantiated from an approved archetype
- it inherits shell geometry from WorkspaceLayout
- it uses registry components
- it matches canonical visual references
