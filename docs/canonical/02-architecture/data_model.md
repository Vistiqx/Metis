# Metis Data Model

This document defines the core data structures that support investigations, graph analysis, alerting, and reporting.

## Design Principles

- The model must support graph-native relationship analysis.
- The model must support evidence-backed report generation.
- The model must preserve source attribution and traceability.
- The model must support analyst workflows, not only ingestion workflows.

## Core Objects

### Entity
Represents a real-world or digital object of interest.

Typical types:
- person
- organization
- location
- event
- device
- account
- document
- domain
- IP address
- cryptocurrency wallet
- unknown / unresolved object

Recommended fields:
- `id`
- `entity_type`
- `name`
- `aliases`
- `summary`
- `attributes`
- `confidence`
- `status`
- `source_refs`
- `created_at`
- `updated_at`

### Relationship
Represents a connection between two entities.

Recommended fields:
- `id`
- `source_entity_id`
- `target_entity_id`
- `relationship_type`
- `directionality`
- `confidence`
- `evidence_refs`
- `time_bounds`
- `notes`
- `created_at`
- `updated_at`

### Investigation
Represents an analyst workspace for a specific inquiry.

Recommended fields:
- `id`
- `title`
- `description`
- `status`
- `priority`
- `owner`
- `collaborators`
- `tags`
- `created_at`
- `updated_at`
- `report_refs`

### Evidence
Represents a specific supporting artifact, excerpt, record, or observation.

Recommended fields:
- `id`
- `investigation_id`
- `evidence_type`
- `title`
- `summary`
- `raw_reference`
- `source_id`
- `entity_refs`
- `relationship_refs`
- `captured_at`
- `created_at`

### Source
Represents the origin of collected information.

Typical source classes:
- OSINT connector
- uploaded file
- analyst-entered note
- watchlist / feed
- external database
- web capture

Recommended fields:
- `id`
- `source_type`
- `name`
- `origin`
- `collection_method`
- `reliability_score`
- `access_scope`
- `captured_at`
- `created_at`

### Alert
Represents a system-generated or analyst-defined signal.

Recommended fields:
- `id`
- `alert_type`
- `severity`
- `status`
- `entity_refs`
- `investigation_refs`
- `trigger_reason`
- `created_at`
- `resolved_at`

### Report
Represents a generated intelligence output.

Recommended fields:
- `id`
- `investigation_id`
- `title`
- `report_mode`
- `status`
- `generated_at`
- `template_version`
- `section_refs`
- `export_refs`

### Timeline Event
Represents a time-bound occurrence attached to investigations, entities, or evidence.

Recommended fields:
- `id`
- `event_type`
- `title`
- `description`
- `entity_refs`
- `evidence_refs`
- `start_time`
- `end_time`
- `confidence`
- `created_at`

## Relationship to the Graph

The graph should treat:
- entities as nodes
- relationships as edges
- evidence as supporting references
- alerts as overlays or derived states
- timeline events as temporal context connected to nodes or investigations

## Operational Requirements

The model must support:
- ingestion and normalization
- entity resolution
- graph traversal
- analyst review
- auditability
- report generation
