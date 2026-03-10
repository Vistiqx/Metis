
# Metis Brand System
**Canonical Branding Specification**

Path in Repository:
```
docs/canonical/metis-brand-system.md
```

Version: 1.0  
Project: Metis Platform  
Status: Canonical Standard

---

# 1. Purpose

This document defines the **official branding system for the Metis platform**.

It ensures:

• consistent UI presentation  
• consistent report exports  
• correct icon usage  
• no brand drift across AI-generated code  
• predictable asset usage across frontend, backend, and reports

This file is considered **canonical documentation** for brand assets.

---

# 2. Brand Philosophy

Metis represents:

• intelligence  
• strategic insight  
• navigation through complex information  
• signal discovery within large data spaces

Visual identity is inspired by:

• a **navigation star / compass**
• a **central intelligence core**
• **orbital nodes representing signals**

---

# 3. Logo System

Metis uses two logo variants.

## Primary Logo

Contains:

• star compass mark  
• Metis wordmark

Used for:

• landing pages
• login screen
• marketing
• exported reports

---

## Icon Mark

Contains only:

• the star compass

Used for:

• application icon
• navigation UI
• mobile app icon
• favicon

---

# 4. Logo Variants

## Dark Logo

Use when placed on:

• dark UI backgrounds
• dashboards
• dark reports

Asset:

```
public/brand/metis_logo_dark.svg
```

---

## Light Logo

Use when placed on:

• light UI backgrounds
• documents
• exported PDFs

Asset:

```
public/brand/metis_logo_light.svg
```

---

# 5. Icon Marks

Icons follow the same rule.

```
public/icons/metis_icon_dark.svg
public/icons/metis_icon_light.svg
```

---

# 6. Favicons

Location:

```
frontend/public/favicons/
```

Files:

```
favicon-16.png
favicon-32.png
favicon-48.png
favicon-64.png
favicon-128.png
favicon-256.png
favicon-512.png
```

Referenced in:

```
frontend/index.html
```

Example:

```html
<link rel="icon" href="/favicons/favicon-32.png">
```

---

# 7. Mobile Application Icons

Location:

```
frontend/public/mobile/
```

Files:

```
ios_app_icon_1024.png
android_app_icon_512.png
```

These serve as base assets for:

• Apple App Store
• Android Play Store

---

# 8. Color System

Metis uses two color layers.

## Wisdom Gold (Brand Identity)

Primary brand color.

Used for:

• logos
• headings
• emphasis
• visual hierarchy

---

## Signal Layer (Intelligence Findings)

Used only for:

• findings
• alerts
• risk signals
• OSINT discoveries

Signal colors **must never replace brand golds**.

They only highlight intelligence.

---

# 9. Typography

Primary font family:

```
Serif Intelligence Font
```
Used for:

• brand name
• headings
• reports

UI font:

```
Modern sans-serif
```

Used for:

• dashboards
• data tables
• analytics panels

---

# 10. Spacing Rules

Logo clear space must equal **height of the central star core**.

No UI element may enter this boundary.

---

# 11. Asset Directory Structure

```
frontend/public/
│
├── brand/
│   ├── metis_logo_dark.svg
│   └── metis_logo_light.svg
│
├── icons/
│   ├── metis_icon_dark.svg
│   └── metis_icon_light.svg
│
├── favicons/
│
└── mobile/
```

---

# 12. AI Development Rule

AI coding assistants must **never create alternate logos**.

Only the assets in the following directories may be used:

```
public/brand
public/icons
public/favicons
public/mobile
```

---

# 13. Future Brand Assets

Future additions may include:

• report seals
• watermark assets
• presentation templates
• marketing graphics

These will live in:

```
public/report-assets/
```

---

# 14. Canonical Status

This file is considered a **canonical project law**.

Changes must be:

• reviewed
• approved
• versioned

Unauthorized modifications are not allowed.
