---
alwaysApply: true
appliesTo:
- frontend
- ui
- design-system
- react
category: design-enforcement
description: Requires the frontend implementation to conform not only to
  architectural rules but also to the canonical Metis design
  specifications for UI composition, graph visualization, and layout
  geometry.
id: metis-canonical-design-enforcement-rule
name: Metis Canonical Design Enforcement Rule
status: active
type: rule
version: 1.0.0
---

# Metis Canonical Design Enforcement Rule

## Purpose

This rule ensures the Metis frontend is implemented to match the
canonical Metis design specifications, not merely pass structural or
code-quality checks.

The frontend must conform to the visual, spatial, and compositional
requirements defined in the canonical Metis design references.

------------------------------------------------------------------------

# Required Canonical References

Before performing UI remediation, refactoring, validation, or freeze
checks, the agent must load and use the following canonical
specification documents:

-   `docs/canonical/metis-ui-canonical-spec.md`
-   `docs/canonical/metis-graph-visualization-spec.md`
-   `docs/canonical/metis-layout-geometry-spec.md`

These documents are authoritative for design fidelity.

------------------------------------------------------------------------

# Enforcement Scope

This rule applies to:

-   page composition
-   panel hierarchy
-   graph visualization
-   focal layout structure
-   visual density
-   surface treatment
-   spatial arrangement
-   navigation and analytical workspace balance

This rule supplements, but does not replace:

-   `metis-ui-canonical-rule`
-   `metis-design-system-rule`
-   `metis-component-lock-rule`
-   `metis-design-system-integrity-rule`

------------------------------------------------------------------------

# Enforcement Requirements

## 1. Design Fidelity Over Generic Dashboard Patterns

The Metis interface must resemble:

-   a secure intelligence workstation
-   a strategic analysis environment
-   a mission operations console

The interface must not resemble:

-   generic admin templates
-   consumer SaaS dashboards
-   marketing-oriented analytics interfaces

------------------------------------------------------------------------

## 2. Canonical Layout Geometry

The frontend must follow the spatial structure defined in:

-   `docs/canonical/metis-layout-geometry-spec.md`

Required characteristics include:

-   stable left navigation rail
-   dominant central analytical workspace
-   supporting right-side intelligence detail region
-   predictable panel width ratios
-   strong vertical content ordering
-   analyst-first density

------------------------------------------------------------------------

## 3. Canonical Visual Composition

The frontend must follow the visual language defined in:

-   `docs/canonical/metis-ui-canonical-spec.md`

Required characteristics include:

-   dark intelligence aesthetic
-   wisdom gold authority accents
-   restrained layered surfaces
-   compact analyst-grade density
-   minimal decorative whitespace
-   consistent multi-region page composition

------------------------------------------------------------------------

## 4. Canonical Graph Intelligence Presentation

Any graph or relationship visualization must follow:

-   `docs/canonical/metis-graph-visualization-spec.md`

Required characteristics include:

-   central intelligence focal node
-   clearly connected relationship nodes
-   minimal uncluttered edge rendering
-   signal colors used only for intelligence state
-   graph interactions supporting analyst investigation

------------------------------------------------------------------------

# Prohibited Outcomes

The agent must treat the following as design violations:

-   layouts that resemble generic dashboard templates
-   oversized cards or excessive padding
-   page compositions lacking a dominant analytical focal area
-   signal colors leaking into theme surfaces
-   graph views that do not communicate intelligence relationships
    clearly
-   visually sparse layouts inconsistent with analyst workflows
-   implementation that is architecturally correct but visually
    inconsistent with canonical design references

------------------------------------------------------------------------

# Required Remediation Behavior

When implementation diverges from canonical specifications, the agent
must:

1.  identify which canonical reference is being violated
2.  document the specific visual or spatial mismatch
3.  refactor the implementation to align with the canonical
    specification
4.  validate the result with Playwright and screenshot review
5.  continue iterating until the implementation aligns with both:
    -   code architecture rules
    -   canonical design specification rules

------------------------------------------------------------------------

# Validation Requirements

Validation must include:

-   comparison of rendered UI against canonical specification documents
-   screenshot review for composition fidelity
-   layout proportion verification
-   graph visualization verification
-   density verification
-   signal isolation verification

Passing lint, tests, or code architecture checks alone is not
sufficient.

A page is not compliant unless it is also visually aligned with
canonical Metis design specifications.

------------------------------------------------------------------------

# Freeze Restriction

No frontend UI may be considered ready for freeze if it satisfies
architecture rules but fails canonical design fidelity.

Design fidelity is a required freeze condition.

------------------------------------------------------------------------

# Rule Priority

If a remediation agent produces a result that is structurally valid but
visually inconsistent with the canonical specifications, this rule takes
precedence and requires further remediation.

In cases involving frontend design fidelity, this rule has higher
priority than generic implementation convenience.

------------------------------------------------------------------------

# Objective

The objective of this rule is to ensure that Metis evolves into a
frontend that is not only technically governed, but also visually
faithful to the canonical intelligence interface defined by the Metis
design references.
