import {
  AlertTriangle,
  BookOpen,
  Database,
  FileText,
  Files,
  FolderKanban,
  GitGraph,
  LayoutDashboard,
  Menu,
  Radar,
  ScanSearch,
  Settings,
  Shapes,
  Shield,
  TimerReset,
  Waypoints,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FolderKanban, label: "Investigations", path: "/investigations" },
  { icon: TimerReset, label: "Events", path: "/events" },
  { icon: GitGraph, label: "Graph", path: "/graph" },
  { icon: Shapes, label: "Entities", path: "/entities" },
  { icon: Files, label: "Evidence", path: "/evidence" },
  { icon: Radar, label: "Watchlists", path: "/watchlists" },
  { icon: AlertTriangle, label: "Alerts", path: "/alerts" },
  { icon: Database, label: "Sources", path: "/sources" },
  { icon: Waypoints, label: "Operations", path: "/operations" },
  { icon: FileText, label: "Narratives", path: "/narratives" },
];

const bottomItems: NavItem[] = [
  { icon: BookOpen, label: "Docs", path: "/docs" },
  { icon: ScanSearch, label: "Analytics", path: "/analytics" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const workspaceLabel = useMemo(() => {
    const active = [...navItems, ...bottomItems].find((item) => {
      if (item.path === "/") return location.pathname === "/";
      return location.pathname.startsWith(item.path);
    });

    return active?.label ?? "Workspace";
  }, [location.pathname]);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-3 z-[60] flex h-10 w-10 items-center justify-center rounded-md border border-border/80 bg-card/95 text-foreground shadow-panel transition hover:border-primary/40 hover:text-primary xl:hidden"
        aria-label="Toggle navigation"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation</span>
      </button>

      {mobileOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-30 bg-metis-ink/82 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setMobileOpen(false);
            }
          }}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-[240px] flex-col border-r border-border/70 bg-metis-ink/95 backdrop-blur-xl transition-transform duration-200 xl:static ${
          mobileOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
        }`}
      >
        <div className="border-b border-border/70 px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                <Shield className="h-5 w-5 flex-shrink-0" />
              </div>
              <div className="min-w-0">
                <div className="metis-kicker">Metis Intelligence</div>
                <span className="block truncate text-base font-semibold text-foreground">
                  {workspaceLabel}
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-muted-foreground transition hover:border-border/80 hover:bg-secondary/70 hover:text-foreground xl:hidden"
              title="Close navigation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-3 px-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Operations
          </div>
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 rounded-md border px-3 py-2.5 transition-all duration-200 ${
                      isActive
                        ? "border-primary/30 bg-primary/12 text-primary shadow-sm shadow-primary/10"
                        : "border-transparent text-slate-200 hover:border-border/80 hover:bg-secondary/60 hover:text-foreground"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">
                        {item.label}
                      </span>
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-border/70 px-3 py-3.5">
          <div className="mb-3 px-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Reference
          </div>
          <ul className="space-y-1.5">
            {bottomItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 rounded-md border px-3 py-2.5 transition-all duration-200 ${
                      isActive
                        ? "border-primary/30 bg-primary/12 text-primary shadow-sm shadow-primary/10"
                        : "border-transparent text-slate-200 hover:border-border/80 hover:bg-secondary/60 hover:text-foreground"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                    />
                    <span className="truncate text-sm font-semibold">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
