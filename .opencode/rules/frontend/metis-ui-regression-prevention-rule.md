---
alwaysApply: true
appliesTo:
- frontend
- ui
- playwright
category: quality
description: Detects UI drift using Playwright screenshot baselines and
  triggers remediation.
id: metis-ui-regression-prevention-rule
name: Metis UI Regression Prevention Rule
status: active
type: rule
version: 1.0.0
---

Baseline screenshots must exist for major routes. Playwright compares
screenshots against baselines. If drift is detected, automatically
trigger /metis-canonicalize.
