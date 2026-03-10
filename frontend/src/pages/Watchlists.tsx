import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Edit,
  Eye,
  Filter,
  Pause,
  Play,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { WatchlistMonitoringArchetype } from "../components/archetypes";
import { WorkspaceLayout } from "../components/layout";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { CreateWatchlistDialog } from "../components/ui/Dialog";
import { Panel } from "../components/ui/Panel";
import { SectionHeader } from "../components/ui/SectionHeader";
import { SignalBadge } from "../components/ui/SignalBadge";
import type { SignalTone } from "../design/tokens";

interface Watchlist {
  id: string;
  name: string;
  type: string;
  status: "active" | "paused";
  matches: number;
  entities: number;
  lastMatch: string;
  severity: "high" | "medium" | "low";
  criteria: string[];
}

const initialWatchlists: Watchlist[] = [
  {
    id: "WL-001",
    name: "Protest Organizers",
    type: "actor",
    status: "active",
    matches: 12,
    entities: 8,
    lastMatch: "5 minutes ago",
    severity: "high",
    criteria: [
      'Name contains "organizer"',
      "Location: District 7",
      "Activity: Planning",
    ],
  },
  {
    id: "WL-002",
    name: "Social Media Influencers",
    type: "account",
    status: "active",
    matches: 47,
    entities: 156,
    lastMatch: "12 minutes ago",
    severity: "medium",
    criteria: ["Followers > 10K", "Engagement rate > 5%", "Content: Political"],
  },
  {
    id: "WL-003",
    name: "Suspicious Locations",
    type: "location",
    status: "paused",
    matches: 3,
    entities: 5,
    lastMatch: "2 hours ago",
    severity: "high",
    criteria: ["Multiple events", "High activity", "Restricted access"],
  },
  {
    id: "WL-004",
    name: "Financial Transactions",
    type: "transaction",
    status: "active",
    matches: 8,
    entities: 12,
    lastMatch: "1 hour ago",
    severity: "low",
    criteria: ["Amount > $1000", "Frequency > 5/day", "Cross-border"],
  },
  {
    id: "WL-005",
    name: "Communication Patterns",
    type: "communication",
    status: "active",
    matches: 23,
    entities: 34,
    lastMatch: "30 minutes ago",
    severity: "medium",
    criteria: [
      "Keywords: protest, rally",
      "Group chats > 50 members",
      "Encryption: Yes",
    ],
  },
];

const typeIcons: Record<string, React.ElementType> = {
  actor: Users,
  account: Bell,
  location: AlertTriangle,
  transaction: AlertTriangle,
  communication: Bell,
};

const severityTone: Record<Watchlist["severity"], SignalTone> = {
  high: "anomaly",
  medium: "financial",
  low: "emerging",
};

export function Watchlists() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>(initialWatchlists);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(initialWatchlists[0]?.id ?? "");

  const handleCreateWatchlist = (watchlistData: {
    name: string;
    type: string;
    description: string;
  }) => {
    const newWatchlist: Watchlist = {
      id: `WL-${String(watchlists.length + 1).padStart(3, "0")}`,
      name: watchlistData.name,
      type: watchlistData.type,
      status: "active",
      matches: 0,
      entities: 0,
      lastMatch: "Never",
      severity: "medium",
      criteria: [watchlistData.description || "No criteria defined"],
    };
    setWatchlists((current) => [newWatchlist, ...current]);
    setSelectedId(newWatchlist.id);
  };

  const filteredWatchlists = useMemo(
    () =>
      watchlists.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.id.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, watchlists],
  );

  const selected =
    filteredWatchlists.find((item) => item.id === selectedId) ??
    filteredWatchlists[0] ??
    null;

  const activeWatchlists = watchlists.filter(
    (item) => item.status === "active",
  ).length;
  const totalMatches = watchlists.reduce((sum, item) => sum + item.matches, 0);

  return (
    <WorkspaceLayout
      dockContext="watchlists"
      layer="signal"
      rightPanelTitle="Selected Watchlist"
      rightPanelContent={
        selected ? (
          <div className="space-y-3 text-sm">
            <div className="metis-pane-muted">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  {selected.id}
                </span>
                <Badge variant="neutral">{selected.type}</Badge>
              </div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-base font-semibold text-foreground">
                  {selected.name}
                </p>
                <SignalBadge tone={severityTone[selected.severity]}>
                  {selected.severity}
                </SignalBadge>
              </div>
              <p className="text-muted-foreground">
                {selected.entities} entities monitored with {selected.matches}{" "}
                observed triggers.
              </p>
            </div>
            <div className="metis-pane-muted">
              <div className="metis-micro-label">Criteria</div>
              <div className="mt-3 space-y-2 text-muted-foreground">
                {selected.criteria.map((criterion) => (
                  <div
                    key={criterion}
                    className="rounded-lg border border-border/60 bg-background/15 px-3 py-2"
                  >
                    {criterion}
                  </div>
                ))}
              </div>
            </div>
            <div className="metis-pane-muted">
              <div className="metis-micro-label">Actions</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selected.status === "active" ? (
                  <Button variant="ghost" size="sm">
                    <Pause className="mr-1 h-4 w-4" /> Pause
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm">
                    <Play className="mr-1 h-4 w-4" /> Resume
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="mr-1 h-4 w-4" /> Remove
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="metis-empty min-h-[280px] border-dashed bg-transparent">
            <p className="text-sm text-muted-foreground">
              Select a watchlist to inspect details.
            </p>
          </div>
        )
      }
    >
      <WatchlistMonitoringArchetype
        header={
          <SectionHeader
            kicker="Continuous Monitoring"
            title="Watchlists"
            subtitle="Dense watchlist monitoring surface with neutral queue controls, a dominant trigger ledger, and right-region watch criteria for active inspection."
            meta={
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Watchlist
              </Button>
            }
          />
        }
        commandStrip={
          <div className="metis-command-strip">
            <div className="min-w-[150px] flex-1">
              <div className="metis-micro-label">Active watchlists</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">
                {activeWatchlists}
              </div>
            </div>
            <div className="min-w-[150px] flex-1">
              <div className="metis-micro-label">Total matches</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">
                {totalMatches}
              </div>
            </div>
            <div className="min-w-[150px] flex-1">
              <div className="metis-micro-label">High-risk queues</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">
                {
                  watchlists.filter(
                    (item) =>
                      item.severity === "high" && item.status === "active",
                  ).length
                }
              </div>
            </div>
            <div className="min-w-[220px] flex-1">
              <div className="metis-micro-label">Control note</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Monitoring workflow remains neutral; only severity findings use
                signal color.
              </p>
            </div>
          </div>
        }
        leftRail={
          <Panel>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Queue Controls</div>
                <h2 className="text-xl">Filter Scope</h2>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Refine
              </Button>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search watchlists"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="metis-input w-full pl-10"
                />
              </div>
              <div className="metis-pane-muted text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Paused queues</span>
                  <Badge variant="neutral">
                    {watchlists.length - activeWatchlists}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>Visible rows</span>
                  <Badge variant="gold">{filteredWatchlists.length}</Badge>
                </div>
              </div>
            </div>
          </Panel>
        }
        centerPrimary={
          <Panel>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Monitoring Queue</div>
                <h2 className="text-2xl">Watchlist Triage</h2>
              </div>
              <Badge variant="gold">Analyst monitoring view</Badge>
            </div>
            <div className="space-y-3">
              {filteredWatchlists.map((watchlist) => {
                const TypeIcon = typeIcons[watchlist.type] || Eye;

                return (
                  <button
                    key={watchlist.id}
                    type="button"
                    onClick={() => setSelectedId(watchlist.id)}
                    className={`metis-list-row w-full text-left ${selected?.id === watchlist.id ? "border-primary/35 bg-secondary/45" : ""}`}
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-secondary/60 text-primary">
                        <TypeIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">
                            {watchlist.id}
                          </span>
                          <Badge variant="neutral">{watchlist.type}</Badge>
                          <Badge
                            variant={
                              watchlist.status === "active" ? "gold" : "neutral"
                            }
                          >
                            {watchlist.status}
                          </Badge>
                        </div>
                        <p className="truncate text-sm font-semibold text-foreground">
                          {watchlist.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {watchlist.entities} entities monitored / last trigger{" "}
                          {watchlist.lastMatch}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <SignalBadge tone={severityTone[watchlist.severity]}>
                        {watchlist.severity}
                      </SignalBadge>
                      <Badge variant="neutral">
                        {watchlist.matches} matches
                      </Badge>
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredWatchlists.length === 0 ? (
              <div className="metis-empty mt-4 border-dashed bg-transparent py-12">
                <p className="text-muted-foreground">
                  No watchlists found matching your search.
                </p>
              </div>
            ) : null}
          </Panel>
        }
      />

      <CreateWatchlistDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleCreateWatchlist}
      />
    </WorkspaceLayout>
  );
}
