import {
  Bell,
  Search,
  User,
  LogOut,
  Command,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Badge } from "../ui/Badge";

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
    <header className="sticky top-0 z-20 flex h-14 items-center border-b border-border/70 bg-metis-ink/92 px-4 py-2 backdrop-blur xl:px-5">
      <div className="flex w-full flex-col gap-2.5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex max-w-3xl flex-1 items-center gap-3">
          <div className="hidden min-w-[244px] xl:block">
            <div className="metis-kicker">{currentRoute.section}</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Metis</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>{currentRoute.label}</span>
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground/90">
              {currentRoute.posture}
            </div>
          </div>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cases, events, actors, evidence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="metis-input h-10 w-full pl-10 pr-14"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <kbd className="hidden rounded-md border border-border/80 bg-secondary/80 px-2 py-1 text-[11px] font-semibold text-muted-foreground sm:inline-flex sm:items-center sm:gap-1">
                <Command className="inline h-3 w-3" />K
              </kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 xl:justify-end">
          <div className="hidden items-center gap-2 lg:flex">
            <Badge variant="gold" dot>
              Analyst workspace secure
            </Badge>
            <Badge variant="neutral">{currentRoute.label}</Badge>
          </div>

          <button
            aria-label="Open notifications"
            title="Open notifications"
            className="relative rounded-md border border-border/80 bg-secondary/60 p-2.5 text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Open notifications</span>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          </button>

          <div className="flex items-center gap-3 border-l border-border/70 pl-3 sm:pl-4">
            <div className="hidden text-right md:block">
              <p className="text-sm font-semibold">Analyst User</p>
              <p className="text-xs tracking-[0.08em] text-muted-foreground">
                analyst@metis.local
              </p>
            </div>
            <button
              aria-label="Open user profile"
              title="Open user profile"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/35 bg-primary/12 text-primary transition hover:bg-primary/18"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Open user profile</span>
            </button>
            <button
              aria-label="Log out"
              title="Log out"
              className="rounded-md border border-transparent p-2 text-muted-foreground transition hover:border-border/80 hover:bg-secondary/70 hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
