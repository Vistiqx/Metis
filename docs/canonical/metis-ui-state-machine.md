
---
id: metis-ui-state-machine
name: Metis UI State Machine
description: Canonical state machine defining the lifecycle states and transitions for investigations, alerts, evidence, and operational intelligence workflows in the Metis platform.
type: reference
version: 1.0.0
status: active
---

# Metis UI State Machine

This document defines the **behavioral state model** for the Metis intelligence platform.

While other canonical documents define **layout and appearance**, this document defines **how the interface behaves over time**.

The state machine ensures that:

- workflows are deterministic
- UI state is predictable
- signals reflect real intelligence meaning
- AI agents implement correct operational behavior

---

# Core UI State Categories

The Metis UI state system is composed of the following domains:

1. Investigation State
2. Alert State
3. Evidence State
4. Graph Intelligence State
5. Workflow Execution State
6. Analyst Interaction State

Each domain has defined **states and transitions**.

---

# Investigation Lifecycle

Investigations represent the **primary operational object** in Metis.

## States

INTAKE  
TRIAGE  
ACTIVE  
CORRELATION  
ESCALATED  
REPORTING  
ARCHIVED

## State Transitions

INTAKE → TRIAGE  
TRIAGE → ACTIVE  
ACTIVE → CORRELATION  
CORRELATION → ESCALATED  
ESCALATED → REPORTING  
REPORTING → ARCHIVED

Reverse transitions allowed:

ACTIVE → TRIAGE  
CORRELATION → ACTIVE

---

# Alert State Machine

Alerts represent **signal detections** produced by intelligence systems.

## States

DETECTED  
VERIFIED  
FALSE_POSITIVE  
ESCALATED  
RESOLVED

## Transitions

DETECTED → VERIFIED  
VERIFIED → ESCALATED  
ESCALATED → RESOLVED  

Alternative:

DETECTED → FALSE_POSITIVE

---

# Evidence State Machine

Evidence artifacts represent collected intelligence sources.

## States

INGESTED  
PROCESSING  
EXTRACTED  
CORRELATED  
VERIFIED  
ARCHIVED

## Transitions

INGESTED → PROCESSING  
PROCESSING → EXTRACTED  
EXTRACTED → CORRELATED  
CORRELATED → VERIFIED  
VERIFIED → ARCHIVED

---

# Graph Intelligence State

Graph analysis surfaces represent **relationship discovery and correlation**.

## Node States

UNVERIFIED  
CANDIDATE  
CORROBORATED  
PRIMARY_ENTITY

## Edge States

INFERRED  
SUPPORTED  
CONFIRMED

---

# Workflow Execution State

Operational workflows progress through task states.

## Task States

QUEUED  
ASSIGNED  
IN_PROGRESS  
REVIEW  
COMPLETED  
BLOCKED

---

# Analyst Interaction States

These states describe **UI interaction context**.

## Context Modes

OBSERVATION  
ANALYSIS  
CORRELATION  
REPORTING

---

# Signal Interpretation Rules

Signal colors must reflect **state meaning**, not visual decoration.

Examples:

ANOMALY → anomaly tone  
FINANCIAL → financial tone  
RELATIONSHIP → relationship tone  
EMERGING → emerging tone

Signal components:

SignalBadge  
SignalNode  
SignalSeverityBar

Only these components may display signal colors.

---

# UI Synchronization Rules

The UI must always reflect the **current state of objects**.

Examples:

Investigation state → case header indicator  
Alert state → signal badge tone  
Evidence state → metadata panel indicator  
Graph node state → node signal classification

---

# Canonical Behavior Enforcement

AI agents implementing UI behavior must:

1. enforce valid state transitions
2. prevent illegal transitions
3. synchronize UI indicators with state changes
4. update signal components accordingly

---

# Canonical Integration

This document works together with:

- metis-layout-geometry-spec.md
- metis-page-archetypes.md
- metis-component-registry.md
- metis-ui-visual-contract.md

Together these documents define the **complete Metis UI architecture and behavior system**.
