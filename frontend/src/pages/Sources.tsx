import { useMemo, useState } from "react";
import { Activity, Filter, Play, Plus, Search, Settings } from "lucide-react";
import {
  MetadataItem,
  MetadataSection,
  WorkspaceLayout,
} from "../components/layout";
import { OperationalSurfaceArchetype } from "../components/archetypes";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import {
  DataTable,
  DataTableCell,
  DataTableHeadCell,
  DataTableTable,
} from "../components/ui/DataTable";
import { Panel } from "../components/ui/Panel";
import { SectionHeader } from "../components/ui/SectionHeader";

interface SourceRecord {
  id: string;
  name: string;
  type: string;
  status: "active" | "paused" | "error";
  url: string;
  reliability: number;
  lastIngested: string;
  recordsToday: number;
  avgLatency: string;
  health: "healthy" | "degraded" | "error";
}

const mockSources: SourceRecord[] = [
  {
    id: "SRC-001",
    name: "BBC News Feed",
    type: "rss",
    status: "active",
    url: "https://feeds.bbci.co.uk/news/rss.xml",
    reliability: 0.85,
    lastIngested: "2 minutes ago",
    recordsToday: 47,
    avgLatency: "24s",
    health: "healthy",
  },
  {
    id: "SRC-002",
    name: "Reddit r/news",
    type: "reddit",
    status: "active",
    url: "r/news",
    reliability: 0.65,
    lastIngested: "15 minutes ago",
    recordsToday: 156,
    avgLatency: "45s",
    health: "healthy",
  },
  {
    id: "SRC-003",
    name: "Local News Network",
    type: "rss",
    status: "paused",
    url: "https://localnews.com/feed",
    reliability: 0.72,
    lastIngested: "3 hours ago",
    recordsToday: 12,
    avgLatency: "N/A",
    health: "degraded",
  },
  {
    id: "SRC-004",
    name: "Twitter Monitor - Protests",
    type: "x",
    status: "error",
    url: "search: protest OR rally",
    reliability: 0.55,
    lastIngested: "1 day ago",
    recordsToday: 0,
    avgLatency: "N/A",
    health: "error",
  },
];

export function Sources() {
  const [selectedId, setSelectedId] = useState(mockSources[0]?.id ?? "");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSources = useMemo(
    () =>
      mockSources.filter(
        (source) =>
          source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          source.id.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  const selected =
    filteredSources.find((source) => source.id === selectedId) ?? filteredSources[0] ?? null;

  return (
    <WorkspaceLayout
      layer="platform"
      dockContext="default"
      rightPanelTitle="Source Inspector"
      rightPanelContent={
        selected ? (
          <>
            <MetadataSection title="Selected Source">
              <MetadataItem label="Source ID" value={selected.id} />
              <MetadataItem label="Type" value={selected.type} />
              <MetadataItem label="Status" value={selected.status} />
              <MetadataItem label="Health" value={selected.health} />
            </MetadataSection>
            <MetadataSection title="Performance">
              <MetadataItem label="Reliability" value={`${Math.round(selected.reliability * 100)}%`} />
              <MetadataItem label="Latency" value={selected.avgLatency} />
              <MetadataItem label="Records today" value={selected.recordsToday} />
              <MetadataItem label="Last ingested" value={selected.lastIngested} />
            </MetadataSection>
            <MetadataSection title="Actions">
              <div className="flex flex-wrap gap-2">
                <Button size="sm">
                  <Play className="mr-2 h-4 w-4" /> Run Ingestion
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" /> Edit Configuration
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Activity className="h-3 w-3" /> Health state: {selected.health}
              </div>
            </MetadataSection>
          </>
        ) : undefined
      }
    >
      <OperationalSurfaceArchetype
        header={
          <SectionHeader
            kicker="Source Intelligence Directory"
            title="Sources"
            subtitle="Provenance and ingestion control surface with compact directory rows, neutral platform treatment, and a persistent configuration inspector."
            meta={
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Source
              </Button>
            }
          />
        }
        commandStrip={
          <div className="metis-command-strip">
            <div className="metis-metric-cell flex-1">
              <div className="metis-micro-label">Active sources</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">
                {mockSources.filter((source) => source.status === "active").length}
              </div>
            </div>
            <div className="metis-metric-cell flex-1">
              <div className="metis-micro-label">Records today</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">
                {mockSources.reduce((sum, source) => sum + source.recordsToday, 0)}
              </div>
            </div>
            <div className="metis-metric-cell flex-[1.3]">
              <div className="metis-micro-label">Authority note</div>
              <p className="mt-2 text-sm text-muted-foreground">
                This page stays on the platform layer with gold authority accents
                and no signal-state theming.
              </p>
            </div>
          </div>
        }
        leftRail={
          <Panel>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Lookup</div>
                <h2 className="text-[20px] font-semibold">Source Scope</h2>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Refine
              </Button>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search sources"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="metis-input w-full pl-10"
                />
              </div>
            </div>
          </Panel>
        }
        centerPrimary={
          <Panel>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Ingestion Directory</div>
                <h2 className="text-[20px] font-semibold">Source Queue</h2>
              </div>
              <Badge variant="gold">Trust and provenance</Badge>
            </div>
            <DataTable>
              <DataTableTable>
                <thead>
                  <tr>
                    <DataTableHeadCell>Source</DataTableHeadCell>
                    <DataTableHeadCell>Status</DataTableHeadCell>
                    <DataTableHeadCell>Records</DataTableHeadCell>
                    <DataTableHeadCell>Trust</DataTableHeadCell>
                    <DataTableHeadCell>Health</DataTableHeadCell>
                  </tr>
                </thead>
                <tbody>
                  {filteredSources.map((source) => (
                    <tr
                      key={source.id}
                      className={`cursor-pointer ${selected?.id === source.id ? "bg-primary/5" : ""}`}
                      onClick={() => setSelectedId(source.id)}
                    >
                      <DataTableCell>
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <span className="font-mono text-xs text-muted-foreground">{source.id}</span>
                            <Badge variant="neutral">{source.type}</Badge>
                          </div>
                          <div className="font-semibold text-foreground">{source.name}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{source.url}</div>
                        </div>
                      </DataTableCell>
                      <DataTableCell>
                        <Badge variant={source.status === "active" ? "gold" : "neutral"}>
                          {source.status}
                        </Badge>
                      </DataTableCell>
                      <DataTableCell>{source.recordsToday}</DataTableCell>
                      <DataTableCell>{Math.round(source.reliability * 100)}%</DataTableCell>
                      <DataTableCell>{source.health}</DataTableCell>
                    </tr>
                  ))}
                </tbody>
              </DataTableTable>
            </DataTable>
          </Panel>
        }
      />
    </WorkspaceLayout>
  );
}
