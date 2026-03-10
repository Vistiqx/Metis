# Reports and Rendering

This directory is the canonical home for all report engine, export, and rendering documentation for Métis.

The finalized brand strategy already establishes that Métis supports two report modes:

1. **Digital Presentation Reports**
   - dark presentation surfaces
   - premium/cinematic delivery
   - Wisdom Gold highlights
   - signal layer accents where needed for findings, risk, and intelligence classification

2. **Print-Friendly Reports**
   - white/light interior pages
   - black typography
   - restrained gold usage
   - efficient print-safe charting and graph output

This folder must translate that strategy into implementation-ready documentation.

---

## What This Folder Must Define

This folder should define the full reporting system for investigations, intelligence outputs, exports, and executive delivery.

It must cover:

- how an investigation becomes a report
- report section structure
- digital vs print variants
- graph snapshot usage
- chart/image generation rules
- appendix and evidence handling
- PDF/export behavior
- pagination and print constraints
- branding rules for exported reports

---

## Required Documents To Add

Create the following files in this folder:

### 1. `investigation_report_structure.md`
Define the canonical structure of a Metis investigation report.

Should include:
- title page
- executive summary
- key findings
- methodology
- entity analysis
- timeline analysis
- graph analysis
- source appendix
- evidence appendix
- recommendations / conclusions

### 2. `report_layout_rules.md`
Define visual layout rules for report composition.

Should include:
- spacing system
- typography hierarchy
- section dividers
- chart placement
- graph snapshot placement
- pull-quote or highlight block rules
- cover rules
- table rules
- appendix rules

### 3. `pdf_export_spec.md`
Define export behavior for report generation.

Should include:
- supported export modes
- PDF generation rules
- page sizing
- header/footer logic
- pagination behavior
- print-safe asset handling
- embedded image/chart handling
- filename conventions

### 4. `graph_snapshot_rendering.md`
Define how graph content is rendered into reports.

Should include:
- graph crop rules
- label density rules
- color preservation rules
- dark vs print rendering differences
- annotation rules
- export resolution rules
- legend inclusion rules

---

## Relationship to Other Canonical Folders

This directory should be used together with:

- `01-finalized-brand-foundation/` for report branding rules
- `04-ui-design-system/` for typography, spacing, and token logic
- `05-graph-visualization/` for graph color, legend, and shape language
- `03-product-screens/` for report-builder workflow context
- `02-architecture/` for report generation pipeline behavior

---

## Current Status

Current status of this area:

- report strategy is conceptually defined
- report implementation documentation is not yet created
- this folder is therefore reserved and must be filled before the report engine can be built confidently

Until the four files above exist, the reporting system should be treated as **partially specified**.
