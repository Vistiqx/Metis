# Metis Platform - Complete Interactive Elements Audit

## Document Purpose
This document provides a comprehensive inventory of **every single clickable element** on every page of the Metis OSINT Platform. Use this for systematic testing and verification.

---

## Global Elements (Present on All Pages)

### 1. Sidebar Navigation (Left Side)
**File:** `src/components/layout/Sidebar.tsx`

| Element | Type | Purpose | Selector/Identifier |
|---------|------|---------|-------------------|
| **Mobile Menu Toggle** | Button | Opens/closes sidebar on mobile | Fixed button at top-left (lg:hidden) |
| **Mobile Overlay** | Div | Closes sidebar when clicked outside | Fixed full-screen overlay (lg:hidden) |
| **Logo/Shield** | Icon | Brand indicator, clickable | Shield icon in header |
| **Collapse Toggle** | Button | Expands/collapses sidebar | ChevronLeft/Right button in header |
| **Dashboard** | NavLink | Navigate to Dashboard | Path: `/` |
| **Investigations** | NavLink | Navigate to Investigations | Path: `/investigations` |
| **Events** | NavLink | Navigate to Events | Path: `/events` |
| **Graph** | NavLink | Navigate to Graph | Path: `/graph` |
| **Evidence** | NavLink | Navigate to Evidence | Path: `/evidence` |
| **Watchlists** | NavLink | Navigate to Watchlists | Path: `/watchlists` |
| **Alerts** | NavLink | Navigate to Alerts | Path: `/alerts` |
| **Sources** | NavLink | Navigate to Sources | Path: `/sources` |
| **Operations** | NavLink | Navigate to Operations | Path: `/operations` |
| **Narratives** | NavLink | Navigate to Narratives | Path: `/narratives` |
| **Docs** | NavLink | Navigate to Documentation | Path: `/docs` |
| **Settings** | NavLink | Navigate to Settings | Path: `/settings` |
| **Expand Hint** | Button | Shows ChevronRight when collapsed | Bottom of sidebar when collapsed |

**Total Sidebar Elements:** 15 navigation items + 3 control buttons = **18 elements**

---

### 2. Top Bar (Header)
**File:** `src/components/layout/TopBar.tsx`

| Element | Type | Purpose | Selector/Identifier |
|---------|------|---------|-------------------|
| **Global Search Input** | Text Input | Search across platform | Placeholder: "Search cases, events, actors, evidence..." |
| **Keyboard Shortcut** | KBD | Shows ⌘K shortcut | `<kbd>` element with Command icon |
| **Notifications Bell** | Button | View notifications | Bell icon with red dot indicator |
| **User Avatar** | Button | User profile menu | Circular button with User icon |
| **Logout** | Button | Log out of platform | LogOut icon button |

**Total Top Bar Elements:** **5 elements**

---

### 3. Dock Bar (Bottom Context Bar)
**File:** `src/components/layout/Dock.tsx`

**Context: Dashboard (No Dock)**
- Dashboard page has `showDock={false}`, so no dock bar appears

**Context: Investigations, Sources (Default Dock)**
| Element | Icon | Label |
|---------|------|-------|
| **Map Tool** | Map | "Map" |
| **Timeline Tool** | Clock | "Timeline" |
| **Evidence Tool** | FileImage | "Evidence" |
| **Actors Tool** | Users | "Actors" |
| **Graph Tool** | GitBranch | "Graph" |

**Context: Events (Event Dock)**
| Element | Icon | Label |
|---------|------|-------|
| **Map Tool** | Map | "Map" |
| **Timeline Tool** | Clock | "Timeline" |
| **Evidence Tool** | FileImage | "Evidence" |
| **Actors Tool** | Users | "Actors" |
| **Narratives Tool** | BookMarked | "Narratives" |
| **Related Tool** | GitBranch | "Related" |
| **Graph Tool** | LayoutGrid | "Graph" |

**Context: Graph (Graph Dock)**
| Element | Icon | Label |
|---------|------|-------|
| **Add Node** | Plus | "Add Node" |
| **Expand** | Maximize2 | "Expand" |
| **Pivot** | GitBranch | "Pivot" |
| **Cluster** | LayoutGrid | "Cluster" |
| **Filter** | Filter | "Filter" |
| **Layout** | Clock | "Layout" |

**Context: Evidence (Evidence Dock)**
| Element | Icon | Label |
|---------|------|-------|
| **Viewer** | FileImage | "Viewer" |
| **Location** | Map | "Location" |
| **Timeline** | Clock | "Timeline" |
| **Related** | Users | "Related" |
| **Network** | GitBranch | "Network" |

**Context: Watchlists (Watchlists Dock)**
| Element | Icon | Label |
|---------|------|-------|
| **New Watchlist** | Plus | "New Watchlist" |
| **View All** | Eye | "View All" |
| **Notifications** | Bell | "Notifications" |
| **High Priority** | AlertTriangle | "High Priority" |
| **Filter** | Filter | "Filter" |
| **Refresh** | RefreshCw | "Refresh" |

**Context: Alerts (Alerts Dock)**
| Element | Icon | Label |
|---------|------|-------|
| **Mark Read** | CheckCircle2 | "Mark Read" |
| **All Alerts** | Bell | "All Alerts" |
| **Critical** | AlertTriangle | "Critical" |
| **Filter** | Filter | "Filter" |
| **Clear All** | Trash2 | "Clear All" |
| **Settings** | Settings | "Settings" |

**Context: Operations (Operations Dock)**
| Element | Icon | Label |
|---------|------|-------|
| **New Task** | Plus | "New Task" |
| **Start** | Play | "Start" |
| **Complete** | CheckCircle2 | "Complete" |
| **Pending** | Clock | "Pending" |
| **Filter** | Filter | "Filter" |
| **Assigned** | Users | "Assigned" |

**Context: Narratives (Narratives Dock)**
| Element | Icon | Label |
|---------|------|-------|
| **New Report** | Plus | "New Report" |
| **Drafts** | FileText | "Drafts" |
| **Published** | BookMarked | "Published" |
| **Share** | Share2 | "Share" |
| **Export** | Download | "Export" |
| **Collaborators** | Users | "Collaborators" |

**Context: Settings (Settings Dock)**
| Element | Icon | Label |
|---------|------|-------|
| **General** | Settings | "General" |
| **Notifications** | Bell | "Notifications" |
| **Security** | Shield | "Security" |
| **Data** | Database | "Data" |
| **System** | Activity | "System" |
| **Account** | Users | "Account" |

---

## Page-Specific Elements

### PAGE 1: Dashboard
**File:** `src/pages/Dashboard.tsx`
**Dock:** None (showDock={false})

| Element | Type | Purpose | Location |
|---------|------|---------|----------|
| **Active Cases Stat** | Card | Display stat count | Stats grid |
| **Open Events Stat** | Card | Display stat count | Stats grid |
| **Alerts Stat** | Card | Display stat count | Stats grid |
| **Watchlists Stat** | Card | Display stat count | Stats grid |
| **New Case Quick Action** | Link Button | Navigate to /investigations/new | Quick Actions section |
| **View Events Quick Action** | Link Button | Navigate to /events | Quick Actions section |
| **Graph Analysis Quick Action** | Link Button | Navigate to /graph | Quick Actions section |
| **Browse Evidence Quick Action** | Link Button | Navigate to /evidence | Quick Actions section |

**Total Dashboard Elements:** 4 stat cards + 4 quick action links = **8 elements**

---

### PAGE 2: Investigations
**File:** `src/pages/Investigations.tsx`
**Dock:** Default (5 tools)

| Element | Type | Purpose | Location |
|---------|------|---------|----------|
| **New Case Button** | Button | Create new case | Header, primary button |
| **Search Input** | Text Input | Search cases | Filters section |
| **Filter Button** | Button | Open filter panel | Filters section |
| **Case Card 1** | Card | View case details | Cases grid |
| **Case Card 2** | Card | View case details | Cases grid |
| **Case Card 3** | Card | View case details | Cases grid |
| **Case Card 4** | Card | View case details | Cases grid |

**Total Investigations Elements:** **7 elements** + 4 clickable case cards

---

### PAGE 3: Events
**File:** `src/pages/Events.tsx`
**Dock:** Event (7 tools)

| Element | Type | Purpose | Location |
|---------|------|---------|----------|
| **Events Tab** | Button | Switch to events view | Header tabs |
| **Candidates Tab** | Button | Switch to candidates view | Header tabs |
| **New Event Button** | Button | Create new event | Header |
| **Search Input** | Text Input | Search events | Filters section |
| **Filter Button** | Button | Open filter panel | Filters section |
| **Event Card 1** | Card | Select event, show details | Events list |
| **Event Card 2** | Card | Select event, show details | Events list |
| **Event Card 3** | Card | Select event, show details | Events list |
| **Candidate Card 1** | Card | View candidate | Candidates list |
| **Candidate Card 2** | Card | View candidate | Candidates list |
| **Candidate Card 3** | Card | View candidate | Candidates list |
| **Promote Button** | Button | Promote candidate to event | Candidate card actions |
| **Merge Button** | Button | Merge candidate | Candidate card actions |
| **Dismiss Button** | Button | Dismiss candidate | Candidate card actions |

**Total Events Elements:** **14 elements** + clickable cards

---

### PAGE 4: Graph
**File:** `src/pages/Graph.tsx`
**Dock:** Graph (6 tools)

| Element | Type | Purpose | Location |
|---------|------|---------|----------|
| **Export Button** | Button | Export graph | Header |
| **Add Node Button** | Button | Add new node | Header |
| **Search Nodes Input** | Text Input | Search nodes | Toolbar |
| **Node Type Filter** | Select Dropdown | Filter by type | Toolbar |
| **Filters Button** | Button | Advanced filters | Toolbar |
| **Zoom Out Button** | Button | Decrease zoom | Toolbar |
| **Zoom In Button** | Button | Increase zoom | Toolbar |
| **Fullscreen Button** | Button | Fullscreen mode | Toolbar |
| **Refresh Button** | Button | Refresh graph | Toolbar |
| **Settings Button** | Button | Graph settings | Toolbar |
| **Graph Node 1-8** | SVG Circle | Select node, show details | Graph canvas |
| **View Details Button** | Button | Show node details | Right panel |

**Total Graph Elements:** **13 elements** + 8 clickable nodes

---

### PAGE 5: Evidence
**File:** `src/pages/Evidence.tsx`
**Dock:** Evidence (5 tools)

| Element | Type | Purpose | Location |
|---------|------|---------|----------|
| **Export Button** | Button | Export evidence | Header |
| **Upload Button** | Button | Upload new evidence | Header |
| **Search Input** | Text Input | Search evidence | Toolbar |
| **Filter Button** | Button | Filter evidence | Toolbar |
| **Tags Button** | Button | Filter by tags | Toolbar |
| **Grid View Toggle** | Button | Switch to grid view | View toggle |
| **List View Toggle** | Button | Switch to list view | View toggle |
| **Evidence Item Checkbox** | Checkbox | Select evidence | Each item |
| **View Eye Button** | Button | View evidence details | Each item |
| **More Options Button** | Button | Additional actions | Each item |
| **Download Button** | Button | Download evidence | List view only |
| **Trash Button** | Button | Delete evidence | List view only |

**Total Evidence Elements:** **12 elements** × 6 evidence items = many interactions

---

### PAGE 6: Watchlists
**File:** `src/pages/Watchlists.tsx`
**Dock:** Watchlists (6 tools)

| Element | Type | Purpose | Location |
|---------|------|---------|----------|
| **New Watchlist Button** | Button | Create watchlist | Header |
| **Search Input** | Text Input | Search watchlists | Filters |
| **Filter Button** | Button | Filter watchlists | Filters |
| **Watchlist Card 1-5** | Card | View watchlist details | Grid |
| **Pause/Resume Button** | Button | Toggle watchlist status | Each card |
| **Edit Button** | Button | Edit watchlist | Each card |
| **View Button** | Button | View details | Each card |
| **Delete Button** | Button | Delete watchlist | Each card |

**Total Watchlists Elements:** **6 elements** + 4 actions × 5 cards

---

### PAGE 7: Alerts
**File:** `src/pages/Alerts.tsx`
**Dock:** Alerts (6 tools)

| Element | Type | Purpose | Location |
|---------|------|---------|----------|
| **Mark All Read Button** | Button | Mark all alerts read | Header |
| **Email Settings Button** | Button | Configure email alerts | Header |
| **All Tab** | Button | Show all alerts | Filter tabs |
| **Unread Tab** | Button | Show unread alerts | Filter tabs |
| **Read Tab** | Button | Show read alerts | Filter tabs |
| **Filter Button** | Button | Advanced filters | Filters |
| **Alert Checkbox** | Checkbox | Select alert | Each alert |
| **View Eye Button** | Button | View alert details | Each alert |
| **Mark Read Check** | Button | Mark single alert read | Each alert |
| **Delete Button** | Button | Delete alert | Each alert |

**Total Alerts Elements:** **10 elements** + actions × 6 alerts

---

### PAGE 8: Sources
**File:** `src/pages/Sources.tsx`
**Dock:** Default (5 tools)

| Element | Type | Purpose | Location |
|---------|------|---------|----------|
| **New Source Button** | Button | Add data source | Header |
| **Search Input** | Text Input | Search sources | Filters |
| **Filter Button** | Button | Filter sources | Filters |
| **Source Card 1-4** | Card | Select source, show details | List |
| **Edit Configuration Button** | Button | Edit source settings | Right panel |
| **Run Ingestion Button** | Button | Manual data pull | Right panel |
| **Pause/Resume Button** | Button | Toggle source status | Right panel |

**Total Sources Elements:** **7 elements** + 4 source cards + 3 panel actions

---

### PAGE 9: Operations
**File:** `src/pages/Operations.tsx`
**Dock:** Operations (6 tools)

| Element | Type | Purpose | Location |
|---------|------|---------|----------|
| **Export Button** | Button | Export tasks | Header |
| **New Task Button** | Button | Create task | Header |
| **Search Input** | Text Input | Search tasks | Filters |
| **All Tab** | Button | Show all tasks | Filter tabs |
| **Pending Tab** | Button | Show pending tasks | Filter tabs |
| **In Progress Tab** | Button | Show active tasks | Filter tabs |
| **Completed Tab** | Button | Show completed tasks | Filter tabs |
| **Filter Button** | Button | Advanced filters | Filters |
| **Task Card 1-5** | Card | View task details | List |
| **Play/Start Button** | Button | Start task | Each card |
| **More Options** | Button | Additional actions | Each card |

**Total Operations Elements:** **11 elements** + 2 actions × 5 tasks

---

### PAGE 10: Narratives
**File:** `src/pages/Narratives.tsx`
**Dock:** Narratives (6 tools)

| Element | Type | Purpose | Location |
|---------|------|---------|----------|
| **Export Button** | Button | Export reports | Header |
| **New Narrative Button** | Button | Create report | Header |
| **Search Input** | Text Input | Search narratives | Filters |
| **All Tab** | Button | Show all | Filter tabs |
| **Published Tab** | Button | Show published | Filter tabs |
| **Drafts Tab** | Button | Show drafts | Filter tabs |
| **Review Tab** | Button | Show in review | Filter tabs |
| **Filter Button** | Button | Advanced filters | Filters |
| **Narrative Card 1-5** | Card | View narrative details | Grid |
| **Share Button** | Button | Share narrative | Each card |
| **More Options** | Button | Additional actions | Each card |
| **Edit Button** | Button | Edit narrative | Each card |
| **Delete Button** | Button | Delete narrative | Each card |

**Total Narratives Elements:** **13 elements** + 4 actions × 5 cards

---

### PAGE 11: Settings
**File:** `src/pages/Settings.tsx`
**Dock:** Settings (6 tools)

| Element | Type | Purpose | Location |
|---------|------|---------|----------|
| **General Tab** | Button | Profile settings | Left sidebar |
| **Notifications Tab** | Button | Notification prefs | Left sidebar |
| **Security Tab** | Button | Security settings | Left sidebar |
| **Appearance Tab** | Button | UI preferences | Left sidebar |
| **Display Name Input** | Text Input | User name | General tab |
| **Email Input** | Text Input | User email | General tab |
| **Role Select** | Select Dropdown | User role | General tab |
| **Timezone Select** | Select Dropdown | Timezone | General tab |
| **Department Input** | Text Input | Department | General tab |
| **Theme Light** | Button | Light theme | Appearance tab |
| **Theme Dark** | Button | Dark theme | Appearance tab |
| **Theme System** | Button | System theme | Appearance tab |
| **Interface Density Radio** | Radio | Compact/Comfortable/Spacious | Appearance tab |
| **Sidebar Labels Checkbox** | Checkbox | Always show labels | Appearance tab |
| **Sidebar Collapsed Checkbox** | Checkbox | Start collapsed | Appearance tab |
| **Email Notifications** | Multiple Checkboxes | Alert types | Notifications tab |
| **In-App Notifications** | Multiple Checkboxes | Alert types | Notifications tab |
| **Digest Frequency Select** | Select | Real-time/Hourly/Daily/Weekly | Notifications tab |
| **Current Password Input** | Password | Current password | Security tab |
| **New Password Input** | Password | New password | Security tab |
| **Confirm Password Input** | Password | Confirm password | Security tab |
| **Update Password Button** | Button | Change password | Security tab |
| **Enable 2FA Button** | Button | Enable 2FA | Security tab |
| **Show API Key Button** | Button | Reveal API key | Security tab |
| **Regenerate API Key Button** | Button | New API key | Security tab |
| **Save Changes Button** | Button | Save all settings | Footer |

**Total Settings Elements:** **30+ interactive elements**

---

### PAGE 12: Documentation (Docs)
**File:** `src/pages/Docs.tsx`
**Dock:** Default (5 tools)

| Element | Type | Purpose | Location |
|---------|------|---------|----------|
| **Search Bar** | Text Input | Search documentation | Top |
| **Video Tutorials Card** | Card | Access video content | Quick Links |
| **API Documentation Card** | Card | Access API docs | Quick Links |
| **Best Practices Card** | Card | Access guides | Quick Links |
| **Release Notes Card** | Card | Access changelogs | Quick Links |
| **Getting Started Section** | Card | Expand/collapse section | Accordion |
| **Core Features Section** | Card | Expand/collapse section | Accordion |
| **Data Sources Section** | Card | Expand/collapse section | Accordion |
| **Advanced Topics Section** | Card | Expand/collapse section | Accordion |
| **Help & Support Section** | Card | Expand/collapse section | Accordion |
| **28 Article Links** | Links | Individual documentation articles | Within sections |
| **Contact Support Button** | Button | Open support form | Help box |
| **Community Forum Button** | Button | Open forum | Help box |

**Total Docs Elements:** **20+ interactive elements**

---

## Summary Statistics

| Category | Count |
|----------|-------|
| **Global Sidebar Elements** | 18 |
| **Global Top Bar Elements** | 5 |
| **Global Dock Elements (varies by page)** | 5-7 |
| **Dashboard Elements** | 8 |
| **Investigations Elements** | 11 |
| **Events Elements** | 17 |
| **Graph Elements** | 21 |
| **Evidence Elements** | 30+ |
| **Watchlists Elements** | 26 |
| **Alerts Elements** | 28 |
| **Sources Elements** | 14 |
| **Operations Elements** | 21 |
| **Narratives Elements** | 33 |
| **Settings Elements** | 30+ |
| **Docs Elements** | 20+ |

**TOTAL INTERACTIVE ELEMENTS: ~280+ across all pages**

---

## Testing Checklist by Priority

### Critical Path (Must Work)
1. ✅ Sidebar navigation to all 12 pages
2. ✅ Sidebar collapse/expand toggle
3. ✅ Top bar search input
4. ✅ Notifications bell
5. ✅ User menu / Logout
6. ✅ Page-specific primary action buttons
7. ✅ Dock bar context switching

### High Priority
8. ✅ Search inputs on each page
9. ✅ Filter buttons/toggles
10. ✅ Tab switching (Events, Operations, Narratives, Alerts, Settings)
11. ✅ Card selection (Sources, Events, Graph)
12. ✅ View/Edit/Delete actions on cards

### Medium Priority
13. ✅ Secondary buttons (Export, Share, Download)
14. ✅ Checkbox selections
15. ✅ Dropdown menus
16. ✅ Form inputs (Settings page)
17. ✅ Accordion expand/collapse (Docs page)

### Nice to Have
18. ⚠️ Keyboard shortcuts (⌘K)
19. ⚠️ Mobile responsive menu
20. ⚠️ Hover tooltips on dock items

---

## Current Issues to Fix

Based on this audit, the following elements need attention:

1. **Sidebar Collapse Button** - Should be more visible/prominent
2. **Dock Bar Padding** - Main content should not scroll behind dock
3. **Button Clickability** - Some buttons may have z-index or event handling issues
4. **Card Click Areas** - Need clear visual feedback when hovering/clicking cards
5. **Form Submissions** - Settings page forms need actual submission logic

---

## Data Source Status

**Current Implementation:** All data is **HARDCODED MOCK DATA** embedded in frontend files

- ❌ Not connected to backend API
- ❌ Not from database
- ❌ Not from live internet sources
- ✅ TypeScript constants in each component

**Files with Mock Data:**
- `Investigations.tsx` - mockCases array
- `Events.tsx` - mockEvents, mockCandidates arrays
- `Graph.tsx` - mockNodes, mockEdges arrays
- `Evidence.tsx` - mockEvidence array
- `Watchlists.tsx` - mockWatchlists array
- `Alerts.tsx` - mockAlerts array
- `Sources.tsx` - mockSources array
- `Operations.tsx` - mockOperations array
- `Narratives.tsx` - mockNarratives array

---

*Document Version: 1.0*
*Created: 2026-03-06*
*Purpose: Complete interactive element inventory for testing*
