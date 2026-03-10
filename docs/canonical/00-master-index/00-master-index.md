# Metis Canonical Master Index

This directory is the canonical working set for the finalized Métis brand, UI, graph visualization, and product design system.

Use this directory as the only active source of truth for design, implementation planning, and future engineering handoff.

## Source of Truth Rules

1. Use files in `Metis-Canonical/` as the active source of truth.
2. Treat `99-archive/` as historical reference only.
3. When duplicate files exist elsewhere in the project, prefer the file inside `Metis-Canonical/`.
4. For finalized brand decisions, prioritize:
   - `01-finalized-brand-foundation/metis_complete_finalized_system.md`
   - `01-finalized-brand-foundation/metis_color_system.md`
   - `01-finalized-brand-foundation/metis_typography_system.md`
   - `01-finalized-brand-foundation/metis_brand_guidelines.pdf`
   - `01-finalized-brand-foundation/metis_brand_final_package/`
5. For application and website structure, use `02-architecture/`.
6. For screen-level product definition, use `03-product-screens/`.
7. For UI implementation rules, use `04-ui-design-system/`.
8. For graph behavior, legend, and styling, use `05-graph-visualization/`.
9. For report engine and export behavior, use `08-reports-and-rendering/`.
10. Do not hand `99-archive/` to implementation agents.

---

## Directory Navigation

### 00-master-index
Top-level orientation and source-of-truth instructions.

**Primary file**
- `00-master-index/00-master-index.md`

---

### 01-finalized-brand-foundation
Canonical brand authority for Métis.

**Contains**
- finalized brand philosophy
- finalized color system
- finalized typography system
- brand guidelines PDF
- revised brand package
- supporting brand implementation docs

**Primary files**
- `01-finalized-brand-foundation/metis_complete_finalized_system.md`
- `01-finalized-brand-foundation/metis_color_system.md`
- `01-finalized-brand-foundation/metis_typography_system.md`
- `01-finalized-brand-foundation/metis_brand_guidelines.pdf`
- `01-finalized-brand-foundation/metis_brand_final_package/brand/metis_brand_guidelines.md`

---

### 02-architecture
Defines product architecture, product areas, and future engineering specifications.

**Contains**
- application architecture
- website architecture

**Primary files**
- `02-architecture/metis_application_architecture.md`
- `02-architecture/metis_website_architecture.md`

**Reserved for future creation**
- `02-architecture/data_model.md`
- `02-architecture/api_specification.md`
- `02-architecture/graph_query_interface.md`
- `02-architecture/investigation_lifecycle.md`
- `02-architecture/alerting_model.md`
- `02-architecture/source_ingestion_pipeline.md`

---

### 03-product-screens
Canonical product screen inventory and screen-level requirements.

**Contains**
- screen inventory
- navigation map
- routes
- screen matrix
- all screen mockups
- all screen markdown specifications

**Primary files**
- `03-product-screens/metis_screen_final_package/00-screen-inventory.md`
- `03-product-screens/metis_screen_final_package/01-navigation-map.md`
- `03-product-screens/metis_screen_final_package/routes.json`
- `03-product-screens/metis_screen_final_package/screen-matrix.csv`

---

### 04-ui-design-system
Canonical UI design system for implementation.

**Contains**
- color standards
- typography standards
- layout and grid
- component rules
- icon and illustration rules
- motion rules
- accessibility
- screen templates
- engineering handoff
- design tokens
- CSS tokens

**Primary files**
- `04-ui-design-system/metis_ui_design_system_final_package/01-color-standards.md`
- `04-ui-design-system/metis_ui_design_system_final_package/02-typography-standards.md`
- `04-ui-design-system/metis_ui_design_system_final_package/04-components.md`
- `04-ui-design-system/metis_ui_design_system_final_package/design-tokens.json`
- `04-ui-design-system/metis_ui_design_system_final_package/tokens.css`

---

### 05-graph-visualization
Canonical graph visualization standards for entity intelligence and investigative relationship analysis.

**Contains**
- entity shape language
- edge standards
- graph color mapping
- layout density and labeling
- interaction and motion
- state behavior
- accessibility
- export rules
- implementation notes
- graph legend
- graph tokens

**Primary files**
- `05-graph-visualization/metis_graph_visualization_final_package/01-entity-shape-language.md`
- `05-graph-visualization/metis_graph_visualization_final_package/02-edge-standards.md`
- `05-graph-visualization/metis_graph_visualization_final_package/03-color-mapping.md`
- `05-graph-visualization/metis_graph_visualization_final_package/graph-tokens.json`

---

### 06-brand-assets
Approved brand and product visuals for reference use.

**Contains**
- palette previews
- typography previews
- logo mockups
- UI mockups
- digital report mockups
- print report mockups

**Primary contents**
- `06-brand-assets/Metis-Logo-Mockups-01.png`
- `06-brand-assets/Metis-Mockup-Logo.png`
- `06-brand-assets/Metis-Mockup-UI-General-Layer.png`
- `06-brand-assets/Metis-Mockup-UI-Signal-Layer.png`
- `06-brand-assets/Metis-Mockup-Media-Digital-General-Layer.png`
- `06-brand-assets/Metis-Mockup-Media-Digital-Signal-Layer.png`
- `06-brand-assets/Metis-Mockup-Media-Print-General-Layer.png`
- `06-brand-assets/Metis-Mockup-Media-Print-Signal-Layer.png`
- `06-brand-assets/metis_color_palettes.png`
- `06-brand-assets/metis_typography_demo.png`

---

### 07-engineering-gap-plan
Tracks remaining engineering documentation required to move from design-complete to build-ready.

**Primary file**
- `07-engineering-gap-plan/metis_gap_remediation_plan.md`

---

### 08-reports-and-rendering
Canonical location for report engine, PDF/export, and visual report rendering documentation.

**Current purpose**
- define the report engine document set
- define digital vs print rules
- define report composition and export behavior
- define graph snapshot and chart embedding rules

**Current file**
- `08-reports-and-rendering/README.md`

**Reserved for future creation**
- `08-reports-and-rendering/investigation_report_structure.md`
- `08-reports-and-rendering/report_layout_rules.md`
- `08-reports-and-rendering/pdf_export_spec.md`
- `08-reports-and-rendering/graph_snapshot_rendering.md`

---

### 99-archive
Historical or superseded materials retained only for reference.

**Rule**
Do not use files in this directory for current implementation unless explicitly comparing old vs revised work.

---

## Recommended Working Order

For active implementation work, review documentation in this order:

1. `01-finalized-brand-foundation/`
2. `02-architecture/`
3. `03-product-screens/`
4. `04-ui-design-system/`
5. `05-graph-visualization/`
6. `08-reports-and-rendering/`
7. `07-engineering-gap-plan/`

---

## Immediate Next Documentation Priorities

The next highest-value documents to create are:

1. `02-architecture/data_model.md`
2. `02-architecture/api_specification.md`
3. `02-architecture/graph_query_interface.md`
4. `02-architecture/investigation_lifecycle.md`
5. `02-architecture/alerting_model.md`
6. `02-architecture/source_ingestion_pipeline.md`
7. `08-reports-and-rendering/investigation_report_structure.md`
8. `08-reports-and-rendering/report_layout_rules.md`
9. `08-reports-and-rendering/pdf_export_spec.md`
10. `08-reports-and-rendering/graph_snapshot_rendering.md`

---

## Usage Guidance for Humans and AI Builders

- Use this directory only.
- Do not mix files from `Previous-Documents/`.
- Do not mix files from root loose copies if they already exist in `Metis-Canonical/`.
- When in doubt, prefer the file stored deepest inside the relevant canonical package folder.
