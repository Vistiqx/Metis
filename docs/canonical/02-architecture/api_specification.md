# Metis API Specification

This document defines the core API surface required by the web application.

## API Principles

- APIs should support analyst workflows directly.
- Responses should preserve source attribution where relevant.
- Filtering, pagination, and sorting should be standard.
- Sensitive operations should be auditable.

## Base Path

Recommended base path:

`/api/v1`

## Core Endpoint Families

### Investigations
- `GET /investigations`
- `POST /investigations`
- `GET /investigations/{id}`
- `PATCH /investigations/{id}`
- `GET /investigations/{id}/timeline`
- `GET /investigations/{id}/entities`
- `GET /investigations/{id}/reports`

### Entities
- `GET /entities`
- `POST /entities`
- `GET /entities/{id}`
- `PATCH /entities/{id}`
- `GET /entities/{id}/relationships`
- `GET /entities/{id}/timeline`
- `GET /entities/{id}/evidence`

### Relationships
- `GET /relationships`
- `POST /relationships`
- `GET /relationships/{id}`
- `PATCH /relationships/{id}`

### Sources
- `GET /sources`
- `POST /sources`
- `GET /sources/{id}`
- `GET /sources/{id}/evidence`
- `GET /sources/{id}/entities`

### Alerts
- `GET /alerts`
- `GET /alerts/{id}`
- `PATCH /alerts/{id}`
- `POST /alerts/{id}/acknowledge`
- `POST /alerts/{id}/resolve`

### Reports
- `GET /reports`
- `POST /reports/generate`
- `GET /reports/{id}`
- `GET /reports/{id}/export`

### Analytics
- `GET /analytics/summary`
- `GET /analytics/investigations`
- `GET /analytics/signals`
- `GET /analytics/sources`

## Response Expectations

Typical response patterns should include:
- item identifiers
- timestamps
- pagination metadata where needed
- confidence or severity where relevant
- source attribution where applicable

## Filtering Expectations

Support common filters such as:
- status
- priority
- severity
- entity type
- source type
- time range
- owner
- tag

## Authentication and Authorization

The API layer should enforce:
- authenticated access
- role-aware access control
- workspace / tenant isolation where applicable
- audit logging for write operations
