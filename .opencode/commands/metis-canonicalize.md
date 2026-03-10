---
description: Audits and remediates the Metis frontend to enforce the
  canonical Metis UI architecture, design system, and signal indicator
  rules.
domain: metis
id: metis-canonicalize
lane: remediation
name: Metis Canonicalize
status: active
type: command
version: 1.0.0
---

# Command

/metis-canonicalize

Audits and corrects the Metis UI implementation so it fully complies
with the Metis canonical design system.

This command performs a **full UI remediation pass**.

------------------------------------------------------------------------

# Rule Loading

Before executing remediation, the command must load all active rules
from:

.opencode/rules/

Frontend rules:

-   metis-ui-canonical-rule
-   metis-component-lock-rule
-   metis-design-system-rule

Backend rules:

-   fastapi-architecture-rule

Platform rules:

-   repository-governance-rule

These rules define canonical architecture and must not be violated
during remediation.

------------------------------------------------------------------------

# Objective

Ensure the Metis UI strictly follows:

-   the Metis UI Canonical Rule
-   the two-layer UI architecture
-   the Wisdom Gold platform aesthetic
-   the Signal Layer data indicator system
-   the canonical component library

------------------------------------------------------------------------

# Execution Strategy

The command must execute the following phases in order.

------------------------------------------------------------------------

# Phase 1 --- Repository Analysis

Analyze the frontend codebase and identify:

-   layout structure
-   component usage
-   design token usage
-   signal color usage
-   UI density issues
-   layout proportion issues

Detect violations of the Metis UI Canonical Rule.

------------------------------------------------------------------------

# Phase 2 --- Design System Validation

Ensure the Metis design system exists and defines tokens for:

-   colors
-   surfaces
-   typography
-   spacing
-   radii
-   elevation
-   signal classifications

If tokens are missing, implement them.

------------------------------------------------------------------------

# Phase 3 --- Component System Validation

Ensure shared UI components exist for:

Core components

-   Card
-   Panel
-   DataTable
-   SidebarNav
-   TopBar
-   Drawer
-   Modal
-   SectionHeader

Signal components

-   SignalIndicator
-   SignalBadge
-   SignalTag
-   SignalNode
-   SignalSeverityBar

Signal components must be the **only components allowed to use signal
colors.**

------------------------------------------------------------------------

# Phase 4 --- UI Refactor

Refactor pages so that:

-   pages rely on shared components
-   pages do not define custom styling
-   signal colors appear only in signal indicators
-   layout spacing follows canonical proportions
-   UI density matches intelligence platform expectations

------------------------------------------------------------------------

# Phase 5 --- Page Classification

Classify pages into two types.

### General Layer Pages

Pages without intelligence signals.

Examples:

-   documentation
-   settings
-   operational dashboards
-   configuration tools

These pages must use **Wisdom Gold palette only.**

------------------------------------------------------------------------

### Signal Layer Pages

Pages containing intelligence findings.

Examples:

-   investigations
-   alerts
-   entity analysis
-   graph intelligence
-   evidence review
-   watchlists

These pages may display signal indicators.

------------------------------------------------------------------------

# Phase 6 --- Graph Intelligence Validation

Ensure graph views:

-   use signal colors only for intelligence classification
-   maintain neutral graph UI structure
-   display signal indicators through graph nodes

------------------------------------------------------------------------

# Phase 7 --- Automated Validation

Use:

Playwright CLI\
Chrome DevTools CLI

Capture screenshots for each page and validate:

-   layout proportions
-   spacing hierarchy
-   component consistency
-   signal color restrictions

Fix issues discovered.

------------------------------------------------------------------------

# Continuous Remediation Loop

If validation fails, the command must:

1.  Identify the violation
2.  Apply remediation
3.  Re-run automated validation
4.  Repeat until all validation checks pass

------------------------------------------------------------------------

# Completion Criteria

The command completes when:

-   UI follows the Metis Canonical Rule
-   signal colors are isolated to indicators
-   pages use the shared component system
-   UI density is corrected
-   screenshot validation passes

------------------------------------------------------------------------

# Output

Provide a remediation report including:

-   pages analyzed
-   canonical violations found
-   components refactored
-   design tokens created or corrected
-   signal indicator usage validated
-   screenshots confirming compliance
