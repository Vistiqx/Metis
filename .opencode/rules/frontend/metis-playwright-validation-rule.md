---
alwaysApply: true
appliesTo:
- frontend
- playwright
category: validation
description: Enforces automated UI validation using Playwright before
  frontend changes are considered complete.
id: metis-playwright-validation-rule
name: Metis Playwright Validation Rule
status: active
type: rule
version: 1.0.0
---

Playwright must run for every major UI change. Validation includes: -
route loading - console error detection - screenshot capture - layout
overflow checks - screenshot diff comparison
