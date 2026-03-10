# Alerting Model

This document defines how alerts are generated, classified, and handled inside Metis.

## Alert Purpose

Alerts surface changes, anomalies, thresholds, or conditions that may require analyst attention.

## Trigger Classes

Examples:
- relationship anomaly
- entity risk threshold
- source activity spike
- timeline anomaly
- watchlist match
- new evidence against tracked entity

## Severity Levels

Recommended levels:
- low
- medium
- high
- critical

## Alert States

Recommended states:
- new
- acknowledged
- in_review
- resolved
- dismissed

## Alert Workflow

1. trigger fires
2. alert is created
3. alert enters queue
4. analyst reviews
5. analyst resolves, escalates, or dismisses

## Alert Data Requirements

Each alert should store:
- alert type
- severity
- trigger reason
- related entities
- related investigation if applicable
- created time
- state changes
- analyst actions

## UI Alignment

The alerts queue and signal system should remain consistent with the finalized Signal Layer rules:
- alerts may use signal colors for classification
- color must not be the only conveyer of meaning
- labels and state text must remain explicit
