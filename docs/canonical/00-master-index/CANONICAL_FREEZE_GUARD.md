# Metis Canonical Documentation Freeze Guard

## Purpose

This document defines the rules for interacting with the Metis canonical
documentation set.

The directory:

Metis-Canonical/

is the single authoritative specification for the Metis platform.

All engineering work must treat this directory as the source of truth.

------------------------------------------------------------------------

# Core Rule

No system component may modify canonical documentation automatically.

This includes:

-   AI agents
-   automation tools
-   CI pipelines
-   build systems
-   code generators

Canonical documentation may only change through intentional human
review.

------------------------------------------------------------------------

# Directory Authority

The following directories define the platform specification:

Metis-Canonical/ ├── 00-master-index ├── 01-finalized-brand-foundation
├── 02-architecture ├── 03-product-screens ├── 04-ui-design-system ├──
05-graph-visualization ├── 06-brand-assets ├── 07-engineering-gap-plan
├── 08-reports-and-rendering

These folders together define:

-   product architecture
-   UI system
-   graph visualization system
-   screen definitions
-   reporting engine
-   brand system
-   token system

------------------------------------------------------------------------

# AI Agent Rules

When AI systems interact with this repository they must follow these
rules.

## Agents MAY

-   read canonical documentation
-   generate code from canonical documentation
-   reference canonical documentation in prompts
-   create implementation files outside the canonical directory

## Agents MAY NOT

-   modify canonical documentation
-   rename canonical files
-   move canonical files
-   generate new documentation inside the canonical directory

All generated content must exist outside the canonical tree.

------------------------------------------------------------------------

# Code Generation Rule

Code generation tools must treat the canonical directory as input
specification only.

Example usage:

INPUT: Metis-Canonical/

OUTPUT: frontend/ backend/ services/

The canonical directory must never be used as a writable output
location.

------------------------------------------------------------------------

# Change Process

If canonical documentation must change:

1.  Human review is required
2.  Changes must be intentional
3.  VERSION.txt must be updated
4.  Changes should be documented in the master index

------------------------------------------------------------------------

# Version Authority

The file:

Metis-Canonical/VERSION.txt

defines the active canonical version.

Engineering implementations must reference this version.

------------------------------------------------------------------------

# Documentation Integrity Rules

The following constraints must remain true:

-   the directory structure must remain unchanged
-   screen count must remain consistent
-   architecture documents must remain unique
-   token systems must remain synchronized
-   graph visualization standards must remain consistent

Any change to these systems requires manual review.

------------------------------------------------------------------------

# Freeze Status

This canonical package has passed:

-   structural verification
-   duplication scan
-   architecture completeness verification
-   screen documentation verification
-   design system verification
-   asset integrity verification

Status:

CANONICAL DOCUMENTATION: FROZEN

------------------------------------------------------------------------

# Engineering Directive

All implementation efforts must now focus on:

-   building the application
-   implementing the UI system
-   implementing graph visualization
-   implementing reporting pipelines

Documentation work is complete.

The canonical documentation must remain stable while the platform is
built.
