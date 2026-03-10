
---
id: metis-page-archetypes
name: Metis Page Archetypes
description: Canonical page archetype definitions describing the structural layout and component composition for all major Metis intelligence interface screens.
type: reference
version: 1.0.0
status: active
---

# Metis Page Archetypes

This document defines the **canonical page archetypes** used across the Metis intelligence platform.

Each archetype defines:

- layout structure
- primary analysis surface
- supporting panels
- component composition
- signal-layer behavior

These archetypes ensure the UI remains **consistent, dense, and analyst-focused**.

---

# Dashboard Archetype

Purpose:

Provide a **high-level operational overview** for analysts at session start.

Layout:

Command Strip
↓
Three-zone Analysis Grid

Left Column:
- workflow shortcuts
- watch desk
- monitoring indicators

Center Column:
- investigation command queue
- active case summary
- operational priorities

Right Column:
- activity feed
- intelligence alerts
- briefing notices

Primary components:

- SectionHeader
- SignalBadge
- Badge
- ListRow
- Panel

---

# Investigation Workspace Archetype

Purpose:

Primary analyst working environment for **active investigations**.

Layout:

Section Header
↓
Three-zone Analysis Grid

Left Column:

- case filters
- task queue
- evidence intake

Center Column:

- investigation workspace
- entity tables
- correlation views
- timeline summaries

Right Column:

- entity inspector
- metadata panels
- source evidence

Signal Layer:

- signals may appear in table cells
- signals may appear in entity markers
- panel surfaces remain neutral

---

# Graph Analysis Archetype

Purpose:

Interactive **entity relationship exploration**.

Layout:

Section Header
↓
Three-zone Graph Workspace

Left Column:

- traversal controls
- entity class filters
- legend

Center Column:

- graph canvas
- entity nodes
- relationship edges

Right Column:

- entity inspector
- node metadata
- evidence links

Graph Rules:

- signal colors appear **only on nodes**
- edges remain neutral
- background grid always visible

---

# Entity Analysis Archetype

Purpose:

Detailed analysis of a **single entity or subject**.

Layout:

Header
↓
Two-zone Analysis Grid

Left Column:

- entity summary
- attributes
- associated signals

Center Column:

- relationship table
- timeline events
- evidence references

Right Column:

- metadata
- source attribution
- analyst notes

---

# Evidence Review Archetype

Purpose:

Review and classification of **source evidence artifacts**.

Layout:

Header
↓
Three-zone Analysis Grid

Left Column:

- evidence filters
- ingestion status

Center Column:

- document viewer
- media preview
- extracted entities

Right Column:

- metadata
- classification
- analyst annotations

Signal Layer:

- evidence confidence
- anomaly markers

---

# Watchlist Monitoring Archetype

Purpose:

Monitor **tracked subjects or indicators**.

Layout:

Header
↓
Dense Table Workspace

Columns:

- subject
- classification
- last activity
- alert state
- assigned analyst

Signal Layer:

Signals indicate:

- anomaly detection
- priority alerts
- emerging patterns

---

# Canonical UI Rules

All page archetypes must follow:

1. High-density layout
2. Three-zone analysis grids where applicable
3. Neutral platform surfaces
4. Signals restricted to indicator components
5. Consistent SectionHeader usage
6. Canonical spacing system

Any page diverging from these archetypes constitutes a **canonical violation**.
