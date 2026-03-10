---
description: Overview of the Metis OpenCode control plane including
  rules, commands, agents, and execution flow.
id: opencode-readme
name: OpenCode README
status: active
type: reference
version: 1.0.0
---

# OpenCode Control Plane Overview

This directory contains the governed AI development control plane for
the Metis platform.

It defines the policies, commands, agents, and execution model used by
OpenCode when performing autonomous development and remediation tasks.

------------------------------------------------------------------------

# Directory Structure

The `.opencode/` directory is organized into the following lanes:

-   `agents/`
-   `commands/`
-   `rules/`
-   `skills/`
-   `tools/`
-   `orchestrators/` if present

------------------------------------------------------------------------

# Rules

Rules define the mandatory governance and architectural constraints the
system must follow.

Current rule categories include:

## Frontend Rules

-   Metis UI Canonical Rule
-   Metis Component Lock Rule
-   Metis Design System Rule
-   Metis Design System Integrity Rule
-   Metis Playwright Validation Rule
-   Metis UI Regression Prevention Rule

## Backend Rules

-   FastAPI Architecture Rule

## Platform Rules

-   Repository Governance Rule
-   Metis Agent Autonomy Rule

Rules must be loaded before remediation or validation commands are
executed.

------------------------------------------------------------------------

# Commands

Commands define executable workflows.

Current commands include:

-   `/metis-audit`
-   `/metis-canonicalize`
-   `/metis-playwright-baseline`
-   `/metis-validate`
-   `/metis-freeze-check`

These commands are intended to be executed either manually or through an
orchestrator loop.

------------------------------------------------------------------------

# Agents

Agents provide specialized execution or review capability.

Current agents include:

-   Frontend Architecture Review Agent
-   Playwright UI Validator Agent

Agents should be used according to specialization rather than as
general-purpose builders.

------------------------------------------------------------------------

# Recommended Execution Order

Standard execution flow:

1.  `/metis-audit`
2.  `/metis-playwright-baseline`
3.  `/metis-canonicalize`
4.  `/metis-validate`
5.  `/metis-freeze-check`

If validation fails, return to `/metis-canonicalize` and repeat until
all checks pass.

------------------------------------------------------------------------

# Governance Model

The OpenCode control plane exists to ensure:

-   canonical UI architecture is preserved
-   design system drift is prevented
-   Playwright validation is mandatory
-   autonomous agents do not stop early
-   repository stability is maintained

------------------------------------------------------------------------

# Rule Precedence

When multiple rules apply, precedence should be interpreted as follows:

1.  component lock and integrity rules
2.  canonical architecture rules
3.  validation and regression rules
4.  repository governance rules

If a conflict is detected, the more restrictive rule should win.

------------------------------------------------------------------------

# Objective

The objective of this OpenCode system is to transform Metis into a
stable, governed, self-correcting AI development environment suitable
for autonomous repository remediation and controlled platform evolution.
