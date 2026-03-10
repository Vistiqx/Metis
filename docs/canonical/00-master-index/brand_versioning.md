# Métis Brand Versioning

This document defines how the finalized Métis brand system is versioned without drifting away from the approved mockups and written specifications.

## Current Canonical Brand Version

**Brand Version: v1.0**

This version is defined by the approved documentation and approved visual mockups already stored in `Metis-Canonical/`.

## Canonical Brand Inputs

The following items together define the active brand system:

### Written authority
- `01-finalized-brand-foundation/metis_complete_finalized_system.md`
- `01-finalized-brand-foundation/metis_color_system.md`
- `01-finalized-brand-foundation/metis_typography_system.md`
- `01-finalized-brand-foundation/metis_brand_guidelines.pdf`
- `01-finalized-brand-foundation/metis_brand_final_package/brand/metis_brand_guidelines.md`

### Approved visual authority
- `06-brand-assets/Metis-Mockup-Logo.png`
- `06-brand-assets/Metis-Logo-Mockups-01.png`
- `06-brand-assets/Metis-Mockup-Product-Marketing.png`
- `06-brand-assets/Metis-Mockup-UI-General-Layer.png`
- `06-brand-assets/Metis-Mockup-UI-Signal-Layer.png`
- `06-brand-assets/Metis-Mockup-Media-Digital-General-Layer.png`
- `06-brand-assets/Metis-Mockup-Media-Digital-Signal-Layer.png`
- `06-brand-assets/Metis-Mockup-Media-Print-General-Layer.png`
- `06-brand-assets/Metis-Mockup-Media-Print-Signal-Layer.png`

No new visual asset should be treated as canonical unless it is explicitly approved against these sources.

## Versioning Rules

### Patch version
Use a patch version when:
- wording is clarified
- examples are improved
- documentation is corrected
- no approved colors, typography, logo structure, or signal meanings change

Example:
- `v1.0.0` → `v1.0.1`

### Minor version
Use a minor version when:
- new documentation is added
- additional approved examples are added
- new component usage guidance is added
- new export guidance is added
- no core identity changes

Example:
- `v1.0` → `v1.1`

### Major version
Use a major version when any of the following change:
- logo system
- Wisdom Gold definitions
- Signal Layer meanings
- typography system
- report mode philosophy
- strategic brand positioning

Example:
- `v1.x` → `v2.0`

## Change Control

Any change affecting the following requires explicit approval:
- logo shape or lockup
- approved color tokens
- signal meanings
- chart color mapping
- graph color mapping
- report cover/export branding
- approved marketing visuals

## Required Change Log Entry

Each approved brand change should record:
- version
- date
- owner
- files changed
- reason
- downstream implementation impact

## Operational Rule

If a newly generated file conflicts with the approved mockups or finalized written instructions, the approved mockups and finalized written instructions win.
