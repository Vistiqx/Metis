# Graph Query Interface

This document defines how the web application and backend services interact with the Metis graph layer.

## Purpose

The graph query interface must support:
- relationship discovery
- neighborhood expansion
- pattern analysis
- path-finding
- timeline-linked graph review
- report-ready graph snapshots

## Core Query Types

### Neighborhood Expansion
Returns nodes and edges surrounding a selected entity within a defined hop range.

Use cases:
- entity profile
- graph explorer
- investigation detail

### Path-Finding
Finds meaningful paths between two or more entities.

Use cases:
- hidden relationship discovery
- analyst hypothesis testing
- report generation

### Filtered Traversal
Traverses the graph while applying filters such as:
- relationship type
- confidence threshold
- time range
- source class
- investigation scope

### Investigation-Scoped Graph
Returns the graph context for a specific investigation.

Use cases:
- investigation detail screen
- report builder
- graph export

### Timeline-Linked Graph Query
Returns graph segments relevant to a selected time range.

Use cases:
- timeline view
- event correlation
- anomaly windows

## Query Controls

The interface should support:
- hop depth
- result limits
- confidence threshold
- source filtering
- entity-type filtering
- edge-type filtering
- time range filtering

## Graph Output Expectations

Graph responses should include:
- node list
- edge list
- node metadata
- edge metadata
- confidence / severity / signal annotations
- legend or classification context where needed

## UI Alignment

The query layer must align with the finalized graph visualization rules:
- Wisdom Gold for confirmed intelligence
- signal colors for classification
- dense but readable graph response payloads
- support for export-ready graph states
