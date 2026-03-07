# Dashboard Page - Click Map

## Overview
**Route:** `/`  
**Dock Context:** None (showDock=false)  
**Right Panel:** No  
**Total Interactive Elements:** 22

---

## Global Navigation (Sidebar)

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Mobile Menu Toggle | Button | Toggle sidebar on mobile | ✅ Working |
| Logo/Shield | Icon | Brand indicator | ✅ Decorative |
| Collapse Toggle | Button | Collapse/expand sidebar | ✅ Working |
| Dashboard | NavLink | Navigate to / | ✅ Working |
| Investigations | NavLink | Navigate to /investigations | ✅ Working |
| Events | NavLink | Navigate to /events | ✅ Working |
| Graph | NavLink | Navigate to /graph | ✅ Working |
| Evidence | NavLink | Navigate to /evidence | ✅ Working |
| Watchlists | NavLink | Navigate to /watchlists | ✅ Working |
| Alerts | NavLink | Navigate to /alerts | ✅ Working |
| Sources | NavLink | Navigate to /sources | ✅ Working |
| Operations | NavLink | Navigate to /operations | ✅ Working |
| Narratives | NavLink | Navigate to /narratives | ✅ Working |
| Docs | NavLink | Navigate to /docs | ✅ Working |
| Settings | NavLink | Navigate to /settings | ✅ Working |

**Total Sidebar Elements:** 15

---

## Top Bar Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Global Search Input | Text Input | Search across platform | ✅ Working |
| Notifications Bell | Button | View notifications | ✅ Working |
| User Avatar | Button | Open user menu | ✅ Working |
| Logout | Button | Log out | ✅ Working |

**Total Top Bar Elements:** 5

---

## Page-Specific Elements

### Stats Cards (4)
- Active Cases - Display only
- Open Events - Display only
- Alerts - Display only
- Watchlists - Display only

### Quick Actions (4)

| Element | Target | Status |
|---------|--------|--------|
| New Case | `/investigations` | ✅ Valid Route |
| View Events | `/events` | ✅ Valid Route |
| Graph Analysis | `/graph` | ✅ Valid Route |
| Browse Evidence | `/evidence` | ✅ Valid Route |

**All quick action links resolve to valid routes.**

---

## Issues Found

**None** - All elements are functioning correctly.

---

## Validation Notes

- ✅ All navigation links work correctly
- ✅ Quick actions navigate to valid pages
- ✅ Sidebar collapse/expand works
- ✅ Top bar elements are present and interactive
- ✅ No console errors
- ✅ No broken links

---

## Playwright Test Coverage

```typescript
// Navigation tests
test('dashboard quick actions navigate correctly')
test('sidebar navigation works from dashboard')
test('top bar elements are interactive')

// Visual tests
test('dashboard renders without errors')
test('stats cards display correctly')
test('quick actions are visible')
```

---

*Click map generated: 2026-03-06*
