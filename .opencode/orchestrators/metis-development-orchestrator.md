---
description: Coordinates audit, remediation, validation, and
  freeze-check workflows for autonomous Metis development.
domain: metis
id: metis-development-orchestrator
lane: orchestration
mode: autonomous
name: Metis Development Orchestrator
status: active
type: orchestrator
version: 1.0.0
---

# Metis Development Orchestrator

## Purpose

This orchestrator coordinates the primary OpenCode workflow for Metis
autonomous development.

It ensures that repository analysis, canonical UI remediation,
validation, and freeze verification occur in the correct order and
repeat until the repository reaches a compliant state.

------------------------------------------------------------------------

# Required Rule Loading

Before beginning execution, load all active rules from:

-   `.opencode/rules/frontend/`
-   `.opencode/rules/backend/`
-   `.opencode/rules/platform/`

These rules must remain active for the full orchestration cycle.

------------------------------------------------------------------------

# Controlled Workflow

Execute the following sequence:

1.  `/metis-audit`
2.  `/metis-playwright-baseline` when baseline creation or refresh is
    required
3.  `/metis-canonicalize`
4.  `/metis-validate`
5.  `/metis-freeze-check`

------------------------------------------------------------------------

# Execution Logic

## Step 1 --- Audit

Run `/metis-audit` to identify:

-   canonical architecture drift
-   design system misuse
-   component duplication
-   token inconsistencies
-   backend structure violations
-   repository governance issues

## Step 2 --- Baseline Preparation

Run `/metis-playwright-baseline` if:

-   screenshot baselines do not exist
-   approved UI changes require new baselines
-   validation tooling needs a reset

## Step 3 --- Canonical Remediation

Run `/metis-canonicalize` to correct frontend architecture and restore
canonical UI compliance.

## Step 4 --- Validation

Run `/metis-validate` to verify:

-   build success
-   lint success
-   test success
-   Playwright route validation
-   screenshot diff stability
-   console error absence

## Step 5 --- Freeze Check

Run `/metis-freeze-check` to confirm the repository is stable enough for
a freeze, handoff, or checkpoint.

------------------------------------------------------------------------

# Autonomous Loop Behavior

If any stage fails, the orchestrator must:

1.  identify the failing step
2.  route remediation to the appropriate command or agent
3.  re-run validation
4.  continue until all required checks pass

The orchestrator must not stop after partial completion.

------------------------------------------------------------------------

# Agent Routing Guidance

Use the following agents where beneficial:

-   `frontend-architecture-review-agent` for component architecture,
    density, token, and signal-layer review
-   `playwright-ui-validator-agent` for route validation, screenshot
    capture, diffing, and console inspection

Prefer specialized agents over general execution when high-confidence
validation is required.

------------------------------------------------------------------------

# Completion Criteria

The orchestration cycle completes only when:

-   all relevant rules remain satisfied
-   canonical UI architecture is preserved
-   validation passes
-   regression checks pass
-   freeze checks pass
-   no unresolved blockers remain

------------------------------------------------------------------------

# Output

Provide a structured orchestration report including:

-   commands executed
-   rules loaded
-   agents used
-   violations discovered
-   remediation actions performed
-   validation results
-   freeze-check status

------------------------------------------------------------------------

# Objective

This orchestrator exists to create a repeatable, governed,
self-correcting development loop for the Metis platform.
