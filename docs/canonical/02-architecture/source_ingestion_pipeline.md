# Source Ingestion Pipeline

This document defines how data enters and is normalized within Metis.

## Pipeline Goals

The ingestion pipeline must support:
- repeatable collection
- normalization
- deduplication
- attribution
- graph insertion
- downstream analyst review

## Pipeline Stages

### 1. Source Connection
Data arrives from:
- OSINT connectors
- uploaded files
- analyst-created notes
- imported records
- watchlists / feeds

### 2. Normalization
Raw source formats are converted into a structured internal format.

### 3. Extraction
The pipeline extracts:
- entities
- relationships
- timestamps
- evidence candidates
- metadata

### 4. Deduplication
Potential duplicate entities and relationships are identified.

### 5. Enrichment
Records may be enriched with:
- classification
- confidence scoring
- relationship typing
- source reliability metadata

### 6. Graph Insertion
Approved or processed records are inserted into the graph-aware data model.

## Requirements

The ingestion pipeline should preserve:
- source attribution
- capture time
- provenance
- raw reference
- investigation linkage where applicable
