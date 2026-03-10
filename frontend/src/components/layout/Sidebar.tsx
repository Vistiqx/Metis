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
  TimerReset,
  Waypoints,
  ChevronRight,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MetisLogoMark } from "../ui/MetisLogoMark";

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

function SidebarLane({
  title,
  items,
  pathname,
  onNavigate,
}: {
  title: string;
  items: NavItem[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <section className="space-y-2">
      <div className="flex items-center gap-2 px-2">
        <div className="h-px flex-1 bg-border/60" />
        <div className="metis-operations-rail-label">{title}</div>
      </div>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== "/" && pathname.startsWith(item.path));

          return (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={onNavigate}
                data-active={isActive ? "true" : "false"}
                className="metis-operations-rail-link group"
              >
                <item.icon
                  className={`h-[18px] w-[18px] flex-shrink-0 ${isActive ? "text-[#f0cf70]" : "text-muted-foreground group-hover:text-[#f0cf70]"}`}
                />
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{item.label}</span>
                </div>
                <ChevronRight
                  className={`h-3.5 w-3.5 flex-shrink-0 ${isActive ? "text-[#f0cf70]/80" : "text-muted-foreground/50 group-hover:text-[#f0cf70]/70"}`}
                />
              </NavLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

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
        className="fixed left-4 top-3 z-[60] flex h-10 w-10 items-center justify-center rounded-md border border-border/80 bg-[rgba(10,15,24,0.96)] text-foreground shadow-panel transition hover:border-primary/30 hover:text-primary xl:hidden"
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
          className="fixed inset-0 z-30 bg-metis-ink/82 backdrop-blur-sm xl:hidden"
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
        className={`metis-shell-sidebar fixed inset-y-0 left-0 z-40 flex h-screen w-[240px] flex-col backdrop-blur-xl transition-transform duration-200 xl:static ${
          mobileOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
        }`}
      >
        <div className="relative z-[1] border-b border-border/70 px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-md border border-[rgba(212,175,55,0.28)] bg-[linear-gradient(180deg,rgba(46,34,11,0.56),rgba(11,17,28,0.94))] shadow-[0_0_18px_rgba(212,175,55,0.08)]">
                <MetisLogoMark className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="metis-operations-rail-label">System Rail</div>
                <div className="metis-logo-lockup mt-0.5">
                  <span className="metis-logo-wordmark text-[0.95rem]">METIS</span>
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground/95">
                  Active module: {workspaceLabel}
                </div>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-muted-foreground transition hover:border-[rgba(156,120,70,0.24)] hover:bg-[rgba(31,21,21,0.8)] hover:text-foreground xl:hidden"
              title="Close navigation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative z-[1] border-b border-border/70 px-4 py-3">
          <div className="metis-operations-rail-label">Navigation Posture</div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <div className="rounded-md border border-[rgba(156,120,70,0.24)] bg-[rgba(25,17,19,0.84)] px-2 py-2 text-[#eadfca]">
              Analyst mode
            </div>
            <div className="rounded-md border border-[rgba(212,175,55,0.28)] bg-[linear-gradient(180deg,rgba(48,36,12,0.42),rgba(22,15,16,0.9))] px-2 py-2 text-[#f0cf70]">
              Secure session
            </div>
          </div>
        </div>

        <nav className="relative z-[1] flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-5">
            <SidebarLane
              title="Operations"
              items={navItems}
              pathname={location.pathname}
              onNavigate={() => setMobileOpen(false)}
            />
            <SidebarLane
              title="Reference"
              items={bottomItems}
              pathname={location.pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </nav>

        <div className="relative z-[1] border-t border-border/70 px-4 py-3">
          <div className="metis-operations-rail-label">Rail Status</div>
          <div className="mt-2 rounded-md border border-[rgba(156,120,70,0.24)] bg-[rgba(25,17,19,0.84)] px-3 py-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between gap-3">
              <span>Context lane</span>
              <span className="text-foreground">{workspaceLabel}</span>
            </div>
            <div className="mt-2 h-px bg-border/60" />
            <div className="mt-2 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.16em]">
              <span>Authority layer</span>
              <span className="text-[#f0cf70]">Stable</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
