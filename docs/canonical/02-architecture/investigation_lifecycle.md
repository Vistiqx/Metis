# Investigation Lifecycle

This document defines the canonical lifecycle of an investigation in Metis.

## Lifecycle Stages

### 1. Creation
The investigation is created with:
- title
- description
- owner
- initial scope
- priority

### 2. Collection
Sources, records, notes, or uploads are attached to the investigation.

### 3. Linking
Entities and relationships are identified, created, normalized, and connected into the graph.

### 4. Analysis
Analysts review:
- graph relationships
- timeline activity
- findings
- anomalies
- supporting evidence

### 5. Reporting
Investigation outputs are structured into report-ready sections and exported.

### 6. Closure
The investigation is formally closed or archived, preserving auditability and generated outputs.

## Status Model

Suggested investigation states:
- draft
- active
- under_review
- reporting
- closed
- archived

## Lifecycle Requirements

The lifecycle should support:
- ownership
- collaboration
- audit trail
- report generation
- alert linkage
- evidence traceability
