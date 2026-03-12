import { useState } from "react";
import {
  Download,
  Filter,
  Fullscreen,
  Network,
  RefreshCw,
  Search,
  Settings,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { WorkspaceLayout } from "../components/layout";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Panel } from "../components/ui/Panel";
import { SectionHeader } from "../components/ui/SectionHeader";
import { SignalBadge } from "../components/ui/SignalBadge";
import { SignalNode } from "../components/ui/SignalNode";

const mockNodes = [
  { id: 1, label: "Actor A", type: "actor", x: 100, y: 100, connections: 5 },
  { id: 2, label: "Event 1", type: "event", x: 250, y: 150, connections: 3 },
  {
    id: 3,
    label: "Location X",
    type: "location",
    x: 400,
    y: 100,
    connections: 4,
  },
  { id: 4, label: "Actor B", type: "actor", x: 150, y: 300, connections: 2 },
  {
    id: 5,
    label: "Evidence 1",
    type: "evidence",
    x: 350,
    y: 250,
    connections: 1,
  },
  { id: 6, label: "Actor C", type: "actor", x: 500, y: 200, connections: 3 },
  { id: 7, label: "Event 2", type: "event", x: 300, y: 400, connections: 2 },
  { id: 8, label: "Source A", type: "source", x: 50, y: 200, connections: 2 },
];

const mockEdges = [
  { from: 1, to: 2, label: "participated" },
  { from: 2, to: 3, label: "occurred at" },
  { from: 1, to: 4, label: "connected to" },
  { from: 2, to: 5, label: "has evidence" },
  { from: 4, to: 7, label: "participated" },
  { from: 6, to: 3, label: "visited" },
  { from: 8, to: 1, label: "reported" },
  { from: 3, to: 6, label: "linked" },
];

const nodeTones: Record<
  string,
  "relationship" | "financial" | "emerging" | "anomaly" | "communications"
> = {
  actor: "relationship",
  event: "financial",
  location: "emerging",
  evidence: "anomaly",
  source: "communications",
};

export function Graph() {
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredNodes =
    filter === "all"
      ? mockNodes
      : mockNodes.filter((node) => node.type === filter);

  return (
    <WorkspaceLayout dockContext="graph" layer="signal" showRightPanel={false}>
      <div className="metis-page">
        <SectionHeader
          kicker="Graph Explorer"
          title="Graph Analysis"
          subtitle="Canonical three-zone correlation workspace with dedicated filters, neutral graph structure, and a live entity inspector."
          meta={
            <>
              <Badge variant="gold">Focal entity in authority gold</Badge>
              <Badge variant="neutral">Signals limited to nodes</Badge>
            </>
          }
        />

        <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          <Panel className="h-fit p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="metis-kicker">Filters</div>
                <h2 className="text-xl">Traversal Controls</h2>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="graph-search"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                >
                  Search graph
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    id="graph-search"
                    placeholder="Actor, source, location..."
                    className="metis-input w-full pl-10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="graph-entity-class"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                >
                  Entity class
                </label>
                <select
                  id="graph-entity-class"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="metis-input h-10 w-full rounded-xl px-3"
                >
                  <option value="all">All Types</option>
                  <option value="actor">Actors</option>
                  <option value="event">Events</option>
                  <option value="location">Locations</option>
                  <option value="evidence">Evidence</option>
                </select>
              </div>

              <div className="rounded-xl border border-border/70 bg-secondary/40 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Traversal mode
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Hop range</span>
                    <span className="font-semibold text-foreground">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Edge threshold</span>
                    <span className="font-semibold text-foreground">0.68</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Candidate nodes</span>
                    <span className="font-semibold text-foreground">
                      {filteredNodes.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Legend
                </p>
                {Object.entries(nodeTones).map(([type, tone]) => (
                  <div
                    key={type}
                    className="flex items-center justify-between rounded-xl border border-border/70 bg-secondary/30 px-3 py-2"
                  >
                    <span className="text-sm capitalize text-foreground">
                      {type}
                    </span>
                    <SignalBadge tone={tone}>{type}</SignalBadge>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel className="overflow-hidden p-0">
            <div className="metis-toolbar rounded-none border-0 border-b border-border/80 shadow-none">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Network className="h-4 w-4" />
                  {filteredNodes.length} nodes, {mockEdges.length} relationships
                </div>
                <Badge variant="gold">Neutral structure preserved</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Zoom out"
                  onClick={() => setZoom((value) => Math.max(0.5, value - 0.1))}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="min-w-[60px] text-center text-sm text-muted-foreground">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Zoom in"
                  onClick={() => setZoom((value) => Math.min(2, value + 0.1))}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle fullscreen"
                >
                  <Fullscreen className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Refresh graph">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Graph settings">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative h-[680px] w-full overflow-hidden bg-metis-grid bg-[size:32px_32px] bg-secondary/35">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary/8 to-transparent" />
              <svg
                className="h-full w-full"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "center center",
                }}
              >
                {mockEdges.map((edge) => {
                  const fromNode = mockNodes.find(
                    (node) => node.id === edge.from,
                  );
                  const toNode = mockNodes.find((node) => node.id === edge.to);
                  if (!fromNode || !toNode) return null;

                  return (
                    <g key={`${edge.from}-${edge.to}-${edge.label}`}>
                      <line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="rgba(148, 163, 184, 0.45)"
                        strokeWidth="1.5"
                        strokeDasharray="4,5"
                      />
                      <text
                        x={(fromNode.x + toNode.x) / 2}
                        y={(fromNode.y + toNode.y) / 2 - 5}
                        fill="hsl(var(--muted-foreground))"
                        className="text-[10px]"
                        textAnchor="middle"
                      >
                        {edge.label}
                      </text>
                    </g>
                  );
                })}

                {filteredNodes.map((node) => (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer"
                    onClick={() => setSelectedNode(node.id)}
                  >
                    <SignalNode
                      tone={nodeTones[node.type]}
                      selected={selectedNode === node.id}
                    />
                    <text
                      y="5"
                      fill="hsl(var(--metis-midnight))"
                      className="text-[11px] font-semibold"
                      textAnchor="middle"
                    >
                      {node.label.substring(0, 8)}
                    </text>
                    <text
                      y="40"
                      fill="hsl(var(--muted-foreground))"
                      className="text-[10px] uppercase"
                      textAnchor="middle"
                    >
                      {node.type}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </Panel>

          <Panel className="h-fit p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="metis-kicker">Inspector</div>
                <h2 className="text-xl">Entity Details</h2>
              </div>
              <Badge variant="neutral">Right context</Badge>
            </div>

            {selectedNode ? (
              <div className="space-y-4">
                {(() => {
                  const node = mockNodes.find(
                    (item) => item.id === selectedNode,
                  );
                  if (!node) return null;

                  return (
                    <>
                      <div className="rounded-xl border border-border/70 bg-secondary/35 p-4">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="text-base font-semibold text-foreground">
                            {node.label}
                          </p>
                          <SignalBadge tone={nodeTones[node.type]}>
                            {node.type}
                          </SignalBadge>
                        </div>
                        <div className="grid gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center justify-between">
                            <span>Connections</span>
                            <span className="font-semibold text-foreground">
                              {node.connections}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Confidence</span>
                            <span className="font-semibold text-foreground">
                              84%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Evidence refs</span>
                            <span className="font-semibold text-foreground">
                              6
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-border/70 bg-secondary/35 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          Observed links
                        </p>
                        <div className="mt-3 space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span>District 7 protest cell</span>
                            <Badge variant="neutral">correlated</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Source packet SR-118</span>
                            <Badge variant="neutral">validated</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Case CASE-2024-001</span>
                            <Badge variant="gold">active</Badge>
                          </div>
                        </div>
                      </div>

                      <Button size="sm" className="w-full">
                        Open entity profile
                      </Button>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="metis-empty min-h-[280px] border-dashed bg-transparent">
                <p className="text-sm text-muted-foreground">
                  Select a node to inspect entity context.
                </p>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
