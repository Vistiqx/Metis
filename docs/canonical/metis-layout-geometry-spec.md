
---
id: metis-layout-geometry-spec
name: Metis Layout Geometry Specification
description: Canonical geometry specification defining exact layout structure, spacing, and component dimensions for the Metis intelligence analysis interface.
type: reference
version: 1.0.0
status: active
---

# Metis Layout Geometry Specification

This document defines the **exact spatial geometry** of the Metis interface.  
AI systems must use this document as the **source of truth for page layout structure**.

This specification exists to eliminate layout drift and ensure the UI matches the canonical mockups.

---

# Global Application Shell

## Sidebar

Width: **240px**  
Behavior:

- fixed vertical navigation
- scrollable if overflow
- background: platform surface
- separator line on right edge

Spacing:

- icon grid spacing: 12px
- section separation: 20px

---

## Top Bar

Height: **56px**

Contains:

- application title
- context breadcrumbs
- user session controls

Padding:

- horizontal: 16px
- vertical: 8px

---

# Page Container

Maximum width: **fluid**  
Horizontal padding: **20px**  
Vertical padding: **16px**

Primary layout uses **three-zone analyst grid**.

---

# Canonical Analysis Grid

The primary intelligence workspace uses:

240px | 1.6fr | 300px

Zones:

Left Column (Filters / Tools)
Center Column (Primary Analysis Surface)
Right Column (Inspector / Evidence / Metadata)

Grid Gap: **16px**

---

# Command Strip

Height: **48px**

Used for:

- high density metrics
- analyst posture indicators

Padding:

horizontal: 12px  
vertical: 8px

Metric Cell Minimum Width: **140px**

---

# Panels

Panels represent neutral analytical surfaces.

Border Radius: **10px**  
Border: 1px neutral border  
Padding: **16px**

Panel variants:

Standard Panel  
Muted Panel (secondary context)  
Toolbar Panel (top control bars)

---

# Data Tables

Row Height: **36px**  
Header Height: **32px**

Column Padding: **10px**

Table Density Target:

- high analyst density
- minimal whitespace
- fast scanability

---

# Graph Canvas

Minimum Height: **680px**

Canvas Structure:

Left: traversal controls  
Center: graph visualization  
Right: node inspector

Graph grid background spacing: **28px**

Node size: **26px radius**

---

# Typography

Primary Title: 24px  
Section Header: 20px  
Subsection Header: 16px  

Body Text: 14px  
Micro Labels: 11px uppercase

---

# Spacing System

Spacing units:

4px
8px
12px
16px
24px
32px

Allowed padding values must use these units.

---

# Signal Layer Constraints

Signal colors are allowed only in:

SignalBadge  
SignalNode  
SignalSeverityBar  
AlertMarker

Signal colors must **never modify panel surfaces**.

---

# Compliance Requirement

All UI pages must conform to this geometry specification.

AI agents modifying the UI must:

1. Validate page layout against this geometry spec
2. Refactor pages violating the grid structure
3. Preserve the analyst-first density model

Any deviation from this document constitutes a **canonical violation**.
