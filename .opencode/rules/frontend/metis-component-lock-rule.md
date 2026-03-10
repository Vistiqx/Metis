---
alwaysApply: true
appliesTo:
- frontend
- ui
category: governance
description: Prevents modification of canonical UI components and
  tokens.
id: metis-component-lock-rule
name: Metis Component Lock Rule
status: active
type: rule
version: 1.0.0
---

# Metis Component Lock Rule

Canonical components are **locked architecture**.

Locked components:

Card\
Panel\
DataTable\
SidebarNav\
TopBar\
Drawer\
Modal\
SectionHeader

Signal Components:

SignalIndicator\
SignalBadge\
SignalTag\
SignalNode\
SignalSeverityBar

AI agents may **use** but must not **modify** these components without
explicit operator authorization.
