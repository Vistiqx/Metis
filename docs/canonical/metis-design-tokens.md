
---
id: metis-design-tokens
name: Metis Design Tokens
description: Canonical design token definitions for the Metis intelligence platform UI including colors, typography, spacing, elevation, and signal classifications.
type: reference
version: 1.0.0
status: active
---

# Metis Design Tokens

This document defines the **canonical design tokens** used across the Metis platform.

Design tokens ensure:

- consistent visual styling
- deterministic AI-generated UI
- prevention of visual drift
- consistent spacing and density

All UI components must use these tokens instead of hard-coded styling.

---

# Platform Color System

## Core Platform Colors

Primary Intelligence Background

```
metis-midnight: #0B0F17
metis-obsidian: #111827
metis-slate: #1F2937
```

Panel Surfaces

```
metis-surface-primary: #111827
metis-surface-secondary: #1F2937
metis-surface-muted: #273449
```

Borders

```
metis-border-primary: rgba(148,163,184,0.25)
metis-border-secondary: rgba(148,163,184,0.15)
```

---

# Wisdom Gold Platform Palette

Wisdom Gold represents **authority layer context**.

```
wisdom-gold-primary: #D4AF37
wisdom-gold-secondary: #C8A432
wisdom-gold-muted: #B9982B
```

Usage:

- authority indicators
- analyst focus markers
- contextual badges

Wisdom gold **must never appear as large UI surfaces**.

---

# Signal Intelligence Palette

Signal colors represent **intelligence state**.

Signals must appear **only in signal components**.

## Signal Classifications

Anomaly

```
signal-anomaly: #EF4444
```

Financial

```
signal-financial: #F59E0B
```

Emerging Pattern

```
signal-emerging: #10B981
```

Relationship

```
signal-relationship: #6366F1
```

Communications

```
signal-communications: #06B6D4
```

---

# Typography System

## Font Family

Primary Font

```
Inter
```

Fallback

```
system-ui
```

---

## Typography Scale

Page Title

```
24px
font-weight: 600
```

Section Header

```
20px
font-weight: 600
```

Subsection Header

```
16px
font-weight: 600
```

Body Text

```
14px
font-weight: 400
```

Micro Labels

```
11px
uppercase
tracking: 0.18em
```

---

# Spacing System

All spacing must use the following scale:

```
4px
8px
12px
16px
20px
24px
32px
40px
```

Example usage:

Panel padding

```
16px
```

Grid gap

```
16px
```

List row padding

```
12px
```

---

# Border Radius

Panels

```
10px
```

Buttons

```
8px
```

Badges

```
6px
```

---

# Elevation

Panel Shadow

```
shadow-panel:
0px 6px 20px rgba(0,0,0,0.35)
```

Hover Elevation

```
shadow-hover:
0px 8px 26px rgba(0,0,0,0.45)
```

---

# Grid System

Primary analysis grid:

```
240px | 1.6fr | 300px
```

Grid gap:

```
16px
```

---

# Density Rules

Metis is an **analyst intelligence system**, not a marketing dashboard.

UI density must prioritize:

- high information throughput
- compact layout
- rapid analyst scanning

Avoid:

- excessive whitespace
- oversized cards
- marketing-style layouts

---

# Token Usage Rules

AI agents must:

1. use tokens instead of hard-coded styles
2. maintain density standards
3. preserve signal component restrictions

Violation of token usage constitutes a **canonical UI violation**.

---

# Canonical Integration

This document works together with:

- metis-layout-geometry-spec.md
- metis-page-archetypes.md
- metis-component-registry.md
- metis-ui-visual-contract.md
- metis-ui-state-machine.md

Together these documents define the **complete deterministic Metis UI system**.
