# Metis Gap Remediation Plan

This document defines the remaining work required to move the Métis system from design-complete to implementation-ready while preserving the finalized branding, UI, graph, and reporting instructions.

The current documentation stack is strong in brand, screens, UI, and graph behavior. The remaining work is now primarily engineering specification work.

---

## Current Strengths

The following areas are already established:

- finalized brand foundation
- finalized color system
- finalized typography system
- application architecture
- website architecture
- product screen inventory and route map
- per-screen product documentation
- UI design system with tokens
- graph visualization standards
- approved visual reference assets

This means the system is already well-defined visually and structurally.

---

## Current Shortcomings

The following areas still need formal specification before engineering can execute confidently:

1. no formal backend API contract
2. no formal data model/schema package
3. no graph query interface definition
4. no investigation lifecycle specification
5. no source ingestion pipeline specification
6. no alerting logic specification
7. no report engine specification
8. no PDF/export rendering specification
9. no graph snapshot rendering specification
10. no consolidated deployment architecture
11. no consolidated authentication, RBAC, and tenancy specification
12. no consolidated QA/test strategy for build execution

---

## Engineering Workstreams

The remaining documentation should be created through five workstreams.

---

## Workstream 1 — Core Data and Domain Model

**Goal**  
Define the system objects that drive investigations, graph relationships, sources, alerts, and reports.

**Files to create**
- `02-architecture/data_model.md`

**Must define**
- entity model
- relationship model
- investigation model
- evidence model
- source model
- alert model
- report model
- event/timeline model

**Outcome**  
This becomes the central domain authority for frontend, backend, graph operations, and reporting.

---

## Workstream 2 — API and Interaction Layer

**Goal**  
Define how clients, services, and internal processes communicate.

**Files to create**
- `02-architecture/api_specification.md`
- `02-architecture/graph_query_interface.md`

**Must define**
- REST or service endpoints
- request/response structures
- filtering and pagination
- graph traversal operations
- graph expansion behavior
- timeline query behavior
- report generation requests
- alert queue actions

**Minimum endpoint families**
- `/investigations`
- `/entities`
- `/relationships`
- `/sources`
- `/reports`
- `/alerts`
- `/analytics`

**Outcome**  
Engineering can scaffold backend services and frontend integrations without ambiguity.

---

## Workstream 3 — Investigation, Sources, and Alerts Logic

**Goal**  
Define the operational behavior of the system.

**Files to create**
- `02-architecture/investigation_lifecycle.md`
- `02-architecture/source_ingestion_pipeline.md`
- `02-architecture/alerting_model.md`

**Must define**
- investigation states
- analyst workflow stages
- source ingestion and normalization
- entity resolution and deduplication
- enrichment flow
- anomaly and alert trigger logic
- queue priority and triage logic

**Outcome**  
The product screens for investigations, sources, timelines, and alerts gain implementation-ready backend logic.

---

## Workstream 4 — Reporting and Export System

**Goal**  
Define how intelligence outputs are assembled, rendered, and exported according to the finalized dual-mode reporting strategy.

**Files to create**
- `08-reports-and-rendering/investigation_report_structure.md`
- `08-reports-and-rendering/report_layout_rules.md`
- `08-reports-and-rendering/pdf_export_spec.md`
- `08-reports-and-rendering/graph_snapshot_rendering.md`

**Must define**
- report section structure
- digital report rules
- print report rules
- chart and graph embedding
- graph image export rules
- appendix and evidence handling
- export formats
- pagination and print constraints

**Outcome**  
The report engine becomes buildable and consistent with the finalized Metis brand strategy.

---

## Workstream 5 — Platform Security, Deployment, and QA

**Goal**  
Define the operational model required for a serious, scalable platform.

**Files to create**
- `07-engineering-gap-plan/auth_rbac_and_tenancy_spec.md`
- `07-engineering-gap-plan/deployment_architecture.md`
- `07-engineering-gap-plan/test_strategy.md`
- `07-engineering-gap-plan/production_hardening_checklist.md`

**Must define**
- workspace and tenancy model
- analyst roles and privileges
- authentication strategy
- connector security boundaries
- deployment environments
- observability
- logging/audit expectations
- testing layers
- production-readiness requirements

**Outcome**  
Metis becomes implementation-ready for serious engineering execution.

---

## Immediate Priority Order

If only the most important missing documents are created first, use this order:

1. `02-architecture/data_model.md`
2. `02-architecture/api_specification.md`
3. `02-architecture/graph_query_interface.md`
4. `02-architecture/investigation_lifecycle.md`
5. `02-architecture/source_ingestion_pipeline.md`
6. `02-architecture/alerting_model.md`
7. `08-reports-and-rendering/investigation_report_structure.md`
8. `08-reports-and-rendering/report_layout_rules.md`
9. `08-reports-and-rendering/pdf_export_spec.md`
10. `08-reports-and-rendering/graph_snapshot_rendering.md`

---

## Current Readiness Assessment

### Ready now
- brand-consistent UI work
- screen-by-screen frontend build
- graph visualization implementation
- token and component implementation
- design-to-code handoff
- visual system enforcement

### Not fully ready yet
- backend implementation
- ingestion pipeline implementation
- report engine implementation
- export pipeline implementation
- enterprise deployment

---

## Success Condition

The documentation system is considered build-ready when a new engineer or AI coding agent can start from `Metis-Canonical/` and answer all of the following without guessing:

- what the platform looks like
- what screens exist
- how entities and investigations are modeled
- how graph traversal works
- how reports are composed and exported
- how alerts are generated and handled
- how users, workspaces, and permissions behave
- how the system is deployed and validated

Until those questions are answered in dedicated docs, the project remains design-complete but not fully implementation-complete.
