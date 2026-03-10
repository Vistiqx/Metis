import {
  Bell,
  Search,
  LogOut,
  Command,
  ChevronRight,
  Shield,
  UserCircle2,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Badge } from "../ui/Badge";
import { MetisLogoMark } from "../ui/MetisLogoMark";

const routeMeta: Record<
  string,
  { label: string; section: string; posture: string }
> = {
  "/": {
    label: "Dashboard",
    section: "Intelligence Overview",
    posture: "Session-start posture",
  },
  "/alerts": {
    label: "Alerts",
    section: "Alert Triage",
    posture: "Priority response queue",
  },
  "/analytics": {
    label: "Analytics",
    section: "Analytical Models",
    posture: "Cross-case pattern analysis",
  },
  "/docs": {
    label: "Docs",
    section: "Reference Library",
    posture: "Source doctrine access",
  },
  "/entities": {
    label: "Entities",
    section: "Entity Analysis",
    posture: "Profile inspection",
  },
  "/evidence": {
    label: "Evidence",
    section: "Evidence Review",
    posture: "Artifact classification",
  },
  "/events": {
    label: "Events",
    section: "Event Correlation",
    posture: "Temporal signal review",
  },
  "/graph": {
    label: "Graph",
    section: "Graph Analysis",
    posture: "Relationship traversal",
  },
  "/investigations": {
    label: "Investigations",
    section: "Case Management",
    posture: "Active investigation workspace",
  },
  "/narratives": {
    label: "Narratives",
    section: "Narrative Production",
    posture: "Brief drafting",
  },
  "/operations": {
    label: "Operations",
    section: "Operational Surface",
    posture: "Mission coordination",
  },
  "/reports": {
    label: "Reports",
    section: "Reporting",
    posture: "Output review queue",
  },
  "/settings": {
    label: "Settings",
    section: "System Controls",
    posture: "Workspace configuration",
  },
  "/sources": {
    label: "Sources",
    section: "Source Registry",
    posture: "Ingestion oversight",
  },
  "/timeline": {
    label: "Timeline",
    section: "Timeline Analysis",
    posture: "Sequence reconstruction",
  },
  "/watchlists": {
    label: "Watchlists",
    section: "Continuous Monitoring",
    posture: "Subject surveillance queue",
  },
};

export function TopBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const activeRoute =
    Object.keys(routeMeta).find(
      (route) => route !== "/" && location.pathname.startsWith(route),
    ) ?? (location.pathname === "/" ? "/" : location.pathname);
  const currentRoute = routeMeta[activeRoute] ?? {
    label: "Workspace",
    section: "Application Shell",
    posture: "Shared analyst context",
  };

  return (
    <header className="metis-context-bar">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="min-w-0 flex-1 xl:max-w-[520px]">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="text-[#d4af37]">Application Shell</span>
              <span className="text-border/90">/</span>
              <span>{currentRoute.section}</span>
            </div>
            <div className="mt-1 flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
              <span className="metis-logo-lockup shrink-0">
                <span className="flex h-5 w-5 items-center justify-center rounded-sm border border-[rgba(212,175,55,0.22)] bg-[linear-gradient(180deg,rgba(46,34,11,0.48),rgba(21,14,16,0.9))]">
                  <MetisLogoMark className="h-3.5 w-3.5" />
                </span>
                <span className="metis-logo-wordmark text-[0.82rem]">METIS</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate text-foreground">{currentRoute.label}</span>
              <span className="hidden text-border/90 xl:inline">/</span>
              <span className="hidden truncate text-[11px] uppercase tracking-[0.16em] xl:inline">
                {currentRoute.posture}
              </span>
            </div>
          </div>
          <div className="hidden items-center gap-2 2xl:flex">
            <Badge variant="gold" dot>
              Authority layer
            </Badge>
            <Badge variant="neutral">Secure analyst session</Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden 2xl:block">
            <div className="metis-context-bar-search">
              <Search className="h-4 w-4 text-[#f0cf70]" />
              <input
                type="text"
                placeholder="Search workspace records"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-full w-[180px] border-0 bg-transparent p-0 text-sm text-foreground shadow-none outline-none ring-0 placeholder:text-muted-foreground focus:ring-0"
              />
              <kbd className="hidden rounded border border-border/80 bg-[rgba(10,15,24,0.94)] px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground 2xl:inline-flex 2xl:items-center 2xl:gap-1">
                <Command className="inline h-3 w-3" />K
              </kbd>
            </div>
          </div>

          <div className="hidden rounded-md border border-[rgba(156,120,70,0.22)] bg-[rgba(31,21,21,0.8)] px-2.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground lg:block">
            {currentRoute.label}
          </div>

          <button
            aria-label="Open notifications"
            title="Open notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-[rgba(156,120,70,0.24)] bg-[rgba(25,17,19,0.84)] text-muted-foreground transition hover:border-[rgba(212,175,55,0.24)] hover:text-[#f0cf70]"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="sr-only">Open notifications</span>
            <span className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full bg-primary" />
          </button>

          <div className="flex items-center gap-2 border-l border-border/70 pl-2">
            <div className="hidden items-center gap-2 rounded-md border border-[rgba(212,175,55,0.24)] bg-[linear-gradient(180deg,rgba(48,36,12,0.34),rgba(22,15,16,0.9))] px-2.5 py-1.5 md:flex">
              <Shield className="h-4 w-4 text-[#f0cf70]" />
              <div className="leading-none">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#d4af37]">
                  Analyst session
                </p>
                <p className="mt-1 text-xs font-medium text-foreground">analyst@metis.local</p>
              </div>
            </div>

            <button
              aria-label="Open user session"
              title="Open user session"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[rgba(156,120,70,0.24)] bg-[rgba(25,17,19,0.84)] text-muted-foreground transition hover:border-[rgba(212,175,55,0.24)] hover:text-[#f0cf70]"
            >
              <UserCircle2 className="h-[18px] w-[18px]" />
              <span className="sr-only">Open user session</span>
            </button>
            <button
              aria-label="Log out"
              title="Log out"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-muted-foreground transition hover:border-[rgba(156,120,70,0.24)] hover:bg-[rgba(25,17,19,0.84)] hover:text-[#f0cf70]"
            >
              <LogOut className="h-[18px] w-[18px]" />
              <span className="sr-only">Log out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
