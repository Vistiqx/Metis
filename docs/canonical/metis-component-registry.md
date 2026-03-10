
---
id: metis-component-registry
name: Metis Component Registry
description: Canonical registry of all approved UI components allowed in the Metis intelligence platform interface.
type: reference
version: 1.0.0
status: active
---

# Metis Component Registry

This document defines the **authoritative list of UI components** permitted in the Metis platform.

The goal is to prevent:

- UI drift
- component duplication
- ad-hoc UI construction
- dashboard-style patterns

All pages must be composed **only from the components listed in this registry**.

If a UI element is not listed here, it must not be introduced without updating this document.

---

# Core Layout Components

These components define the **primary structural framework** of the application.

## WorkspaceLayout

Purpose:
Defines the main application shell and page container.

Responsibilities:

- sidebar integration
- top bar alignment
- page container spacing
- signal layer configuration

Props:

layer: `"platform" | "signal"`  
showDock: boolean  
showRightPanel: boolean  
dockContext: string

---

## Sidebar

Purpose:

Primary application navigation.

Constraints:

- fixed width: **240px**
- icon-first navigation
- vertical section grouping

---

## TopBar

Purpose:

Provides global application context and session controls.

Constraints:

- fixed height: **56px**
- contains breadcrumbs and user context

---

# Structural Components

These components define the **layout zones within pages**.

## SectionHeader

Purpose:

Provides the primary page header and context summary.

Contains:

- kicker label
- page title
- subtitle
- metadata badges

Example usage:

SectionHeader
- title
- subtitle
- meta badges

---

## Panel

Purpose:

Defines neutral analytical surfaces.

Variants:

standard  
muted  
toolbar

Constraints:

- border radius: **10px**
- padding: **16px**
- neutral background only

---

## Drawer

Purpose:

Slide-out panel for contextual actions or information.

---

## Modal

Purpose:

Dialog interaction for confirmations or secondary workflows.

---

# Data Presentation Components

These components present structured intelligence information.

## DataTable

Purpose:

Displays dense tabular intelligence data.

Rules:

- row height: **36px**
- column padding: **10px**
- minimal whitespace

---

## ListRow

Purpose:

High-density list item used in:

- command queues
- activity feeds
- watchlists

---

# Signal Components

Signal components represent **intelligence meaning**, not UI decoration.

Signal colors must **only appear in these components**.

## SignalBadge

Purpose:

Displays intelligence classification state.

Examples:

- anomaly
- financial
- emerging
- communications

---

## SignalNode

Purpose:

Graph node representing an entity.

Constraints:

- signal color applied to node indicator
- node radius: **26px**

---

## SignalSeverityBar

Purpose:

Visual indicator for severity levels.

---

# Interaction Components

## Button

Purpose:

Primary interaction control.

Variants:

primary  
secondary  
outline  
ghost

---

## Badge

Purpose:

Displays small contextual labels.

Variants:

neutral  
gold  
success  
warning  
danger

---

# Inspector Components

Used in the right-side intelligence inspector.

## MetadataSection

Purpose:

Groups metadata attributes.

---

## MetadataItem

Purpose:

Displays label/value intelligence metadata.

---

## TagList

Purpose:

Displays entity classification tags.

---

# Component Compliance Rules

1. Pages must use components from this registry.
2. Inline UI construction is prohibited.
3. Signal colors may only appear in signal components.
4. New components must be added to this registry before use.

---

# Governance

This registry works together with:

- metis-layout-geometry-spec.md
- metis-page-archetypes.md
- metis-ui-visual-contract.md

Together these documents define the **complete canonical UI system for Metis**.
