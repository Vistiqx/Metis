import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Map,
  Clock,
  FileImage,
  Users,
  BookMarked,
  GitBranch,
  Maximize2,
  Filter,
  LayoutGrid,
  Plus,
  Bell,
  Eye,
  AlertTriangle,
  Play,
  CheckCircle2,
  Settings,
  FileText,
  Trash2,
  Download,
  Share2,
  RefreshCw,
  Activity,
  Shield,
  Database,
} from "lucide-react";
import { useState } from "react";

interface DockItem {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

interface DockProps {
  context?:
    | "watchlists"
    | "alerts"
    | "operations"
    | "narratives"
    | "settings"
    | "graph"
    | "evidence"
    | "default"
    | "event";
  onItemClick?: (item: string) => void;
}

const contextItems: Record<string, DockItem[]> = {
  event: [
    { icon: Map, label: "Map" },
    { icon: Clock, label: "Timeline" },
    { icon: FileImage, label: "Evidence" },
    { icon: Users, label: "Actors" },
    { icon: BookMarked, label: "Narratives" },
    { icon: GitBranch, label: "Related" },
    { icon: LayoutGrid, label: "Graph" },
  ],
  graph: [
    { icon: Plus, label: "Add Node" },
    { icon: Maximize2, label: "Expand" },
    { icon: GitBranch, label: "Pivot" },
    { icon: LayoutGrid, label: "Cluster" },
    { icon: Filter, label: "Filter" },
    { icon: Clock, label: "Layout" },
  ],
  evidence: [
    { icon: FileImage, label: "Viewer" },
    { icon: Map, label: "Location" },
    { icon: Clock, label: "Timeline" },
    { icon: Users, label: "Related" },
    { icon: GitBranch, label: "Network" },
  ],
  watchlists: [
    { icon: Plus, label: "New Watchlist" },
    { icon: Eye, label: "View All" },
    { icon: Bell, label: "Notifications" },
    { icon: AlertTriangle, label: "High Priority" },
    { icon: Filter, label: "Filter" },
    { icon: RefreshCw, label: "Refresh" },
  ],
  alerts: [
    { icon: CheckCircle2, label: "Mark Read" },
    { icon: Bell, label: "All Alerts" },
    { icon: AlertTriangle, label: "Critical" },
    { icon: Filter, label: "Filter" },
    { icon: Trash2, label: "Clear All" },
    { icon: Settings, label: "Settings" },
  ],
  operations: [
    { icon: Plus, label: "New Task" },
    { icon: Play, label: "Start" },
    { icon: CheckCircle2, label: "Complete" },
    { icon: Clock, label: "Pending" },
    { icon: Filter, label: "Filter" },
    { icon: Users, label: "Assigned" },
  ],
  narratives: [
    { icon: Plus, label: "New Report" },
    { icon: FileText, label: "Drafts" },
    { icon: BookMarked, label: "Published" },
    { icon: Share2, label: "Share" },
    { icon: Download, label: "Export" },
    { icon: Users, label: "Collaborators" },
  ],
  settings: [
    { icon: Settings, label: "General" },
    { icon: Bell, label: "Notifications" },
    { icon: Shield, label: "Security" },
    { icon: Database, label: "Data" },
    { icon: Activity, label: "System" },
    { icon: Users, label: "Account" },
  ],
  default: [
    { icon: Map, label: "Map" },
    { icon: Clock, label: "Timeline" },
    { icon: FileImage, label: "Evidence" },
    { icon: Users, label: "Actors" },
    { icon: GitBranch, label: "Graph" },
  ],
};

export function Dock({ context = "default", onItemClick }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const items = contextItems[context] || contextItems.default;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex max-w-[calc(100vw-2rem)] items-center gap-2 overflow-x-auto rounded-2xl border border-border/80 bg-metis-ink/88 p-2.5 shadow-panel shadow-black/35 backdrop-blur-xl"
        >
          {items.map((item, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <m.button
                key={item.label}
                onClick={() => onItemClick?.(item.label)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-label={item.label}
                title={item.label}
                className="group relative flex flex-col items-center"
                animate={{
                  scale: isHovered ? 1.04 : 1,
                  y: isHovered ? -4 : 0,
                }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
              >
                <m.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? -28 : -18,
                  }}
                  className="pointer-events-none absolute whitespace-nowrap rounded-lg border border-border/80 bg-popover px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-popover-foreground shadow-md"
                >
                  {item.label}
                </m.span>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${isHovered ? "border-primary/35 bg-primary/12 text-primary" : "border-border/70 bg-secondary/65 text-muted-foreground group-hover:border-border group-hover:text-foreground"}`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </div>
              </m.button>
            );
          })}
        </m.div>
      </LazyMotion>
    </div>
  );
}
