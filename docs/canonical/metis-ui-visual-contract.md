
---
id: metis-ui-visual-contract
name: Metis UI Visual Contract
description: Visual fidelity contract ensuring that the Metis UI matches canonical design mockups using screenshot validation and structural verification.
type: reference
version: 1.0.0
status: active
---

# Metis UI Visual Contract

This document defines the **visual contract** for the Metis UI.

AI agents must ensure that the rendered interface visually matches the canonical design references.

---

# Purpose

The goal of this document is to prevent situations where:

- code refactoring occurs
- components are reorganized
- but the UI still visually resembles the old dashboard template

This contract forces alignment between:

Canonical Mockups  
Actual Rendered Interface

---

# Canonical Visual References

Canonical UI screenshots must exist in:

docs/canonical/mockups/

Examples:

dashboard-general-layer.png  
dashboard-signal-layer.png  
graph-analysis-view.png

These images represent the **authoritative UI appearance**.

---

# Screenshot Baseline Enforcement

Agents must capture screenshots using Playwright for the following routes:

/dashboard  
/graph  
/investigations  
/entities  
/evidence  
/watchlists

Captured images must be compared against canonical references.

Deviation tolerance: **5% pixel difference**

---

# Structural Validation

The following elements must be visually verified:

Sidebar width  
Topbar height  
Panel radii  
Panel spacing  
Graph canvas height  
Three-column analyst grid

These must match the layout geometry specification.

---

# Regression Detection

If visual deviation is detected:

1. the system must mark the UI as **non-canonical**
2. remediation must automatically run
3. `/metis-canonicalize` must execute

---

# Enforcement

Any AI performing UI changes must:

- run screenshot validation
- compare against canonical images
- verify layout geometry

Only after visual verification passes may the UI be considered canonical.
