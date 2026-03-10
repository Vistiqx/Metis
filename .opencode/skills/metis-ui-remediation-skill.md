
---
id: metis-ui-remediation-skill
name: Metis UI Remediation Skill
description: Skill that teaches OpenCode agents how to systematically refactor the existing Metis UI into the canonical architecture defined in docs/canonical.
type: skill
scope: frontend
version: 1.0.0
status: active
---

# Metis UI Remediation Skill

This skill defines the **exact procedure** an AI agent must follow to transform the existing Metis UI into the **canonical Metis intelligence interface**.

The goal is not incremental styling changes — the goal is **structural UI alignment with canonical architecture**.

Canonical documentation is located in:

docs/canonical/

---

# Remediation Philosophy

The AI must treat the current UI as **non-authoritative**.

If the current implementation conflicts with canonical specifications:

CANONICAL DOCUMENTS WIN.

The AI must refactor the codebase until the UI matches:

• canonical layout geometry  
• canonical page archetypes  
• canonical component registry  
• canonical design tokens  

---

# Required Canonical Documents

The agent must read the following before modifying UI code:

docs/canonical/metis-layout-geometry-spec.md  
docs/canonical/metis-page-archetypes.md  
docs/canonical/metis-component-registry.md  
docs/canonical/metis-design-tokens.md  
docs/canonical/metis-ui-state-machine.md  

These documents define the full **UI architecture contract**.

---

# UI Refactor Workflow

The agent must execute the following remediation sequence.

---

## Phase 1 — UI Audit

Scan the repository:

frontend/src/

Identify:

• layout primitives  
• component usage  
• token violations  
• page composition  
• duplicated UI patterns  

Produce a remediation plan.

---

## Phase 2 — Layout System Reconstruction

Refactor the layout system to match canonical geometry.

Target layout:

Sidebar | Main Workspace | Right Intelligence Panel

Canonical grid:

240px | 1.6fr | 300px

All pages must inherit the same workspace layout container.

---

## Phase 3 — Component Registry Enforcement

Only components defined in:

docs/canonical/metis-component-registry.md

are allowed.

Replace ad‑hoc components with canonical ones:

Card  
Panel  
DataTable  
SidebarNav  
TopBar  
Drawer  
Modal  
SectionHeader  

---

## Phase 4 — Design Token Enforcement

Remove hardcoded styles.

All styling must reference tokens defined in:

docs/canonical/metis-design-tokens.md

Examples:

colors  
spacing  
typography  
borders  
elevation  

---

## Phase 5 — Page Archetype Refactoring

Each page must match a canonical archetype.

Example mapping:

Dashboard → Intelligence Overview  
Investigations → Case Management  
Graph → Graph Analysis Workspace  
Alerts → Alert Triage Interface  

Refactor page structure accordingly.

---

## Phase 6 — Signal Layer Isolation

Signal colors may only appear in:

SignalBadge  
SignalTag  
SignalNode  
SignalSeverityBar  

Signal colors must never appear in:

• panel backgrounds  
• cards  
• layout containers  

Signal colors represent **data meaning**, not UI decoration.

---

## Phase 7 — Density Optimization

Metis is an **analyst intelligence workstation**.

Optimize for:

• compact layout  
• dense tables  
• minimal whitespace  
• fast scanning  

Avoid:

• oversized cards  
• marketing dashboards  
• decorative layouts  

---

# Validation Procedure

After refactoring UI code:

1. Launch application
2. Run Playwright route discovery
3. Capture screenshots of major pages
4. Compare screenshots with canonical mockups
5. Detect layout deviations

If deviations exist:

Continue remediation.

---

# Completion Criteria

The skill is complete only when:

• layout matches canonical geometry  
• pages match archetypes  
• tokens are enforced  
• components match registry  
• signal colors are isolated  
• Playwright validation passes  

---

# Outcome

When this skill executes successfully, the Metis UI becomes:

A **stable intelligence analysis interface** matching the canonical mockups and resistant to UI drift.
