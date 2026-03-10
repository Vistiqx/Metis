---
appliesTo:
- backend
- fastapi
category: architecture
description: Defines architectural standards for the Metis backend.
id: fastapi-architecture-rule
name: FastAPI Architecture Rule
status: active
type: rule
version: 1.0.0
---

# FastAPI Architecture Rule

The backend must maintain separation between:

API Routes\
Services\
Data Models\
Integrations

Routes remain thin and delegate logic to service layers.
