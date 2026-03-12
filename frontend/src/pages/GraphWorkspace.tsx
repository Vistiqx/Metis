import { Focus, RefreshCw, Search, ZoomIn, ZoomOut } from "lucide-react";
import { MetadataItem, MetadataSection } from "../components/layout";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Panel } from "../components/ui/Panel";
import { SignalBadge } from "../components/ui/SignalBadge";
import { SignalNode } from "../components/ui/SignalNode";
import type { SignalTone } from "../design/tokens";

export type NodeClass =
  | "person"
  | "organization"
  | "asset"
  | "location"
  | "case";

export type NodeFilter = "all" | NodeClass;

export interface GraphNode {
  id: number;
  label: string;
  className: NodeClass;
  signal: SignalTone;
  classification: string;
  x: number;
  y: number;
  confidence: number;
  evidence: number;
}

export interface GraphEdge {
  from: number;
  to: number;
  label: string;
  strength: string;
  classification: string;
}

interface GraphInspectorPanelProps {
  selectedNode: GraphNode;
  relatedEdges: GraphEdge[];
  nodes: GraphNode[];
}

interface GraphControlRailProps {
  nodeClass: NodeFilter;
  nodeClasses: NodeFilter[];
  filteredNodeCount: number;
  filteredEdgeCount: number;
  onNodeClassChange: (value: NodeFilter) => void;
}

interface GraphToolbarProps {
  zoom: number;
  filteredNodeCount: number;
  filteredEdgeCount: number;
  onZoomOut: () => void;
  onZoomIn: () => void;
  onFocusSelected: () => void;
}

interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  allNodes: GraphNode[];
  zoom: number;
  pan: { x: number; y: number };
  selectedNodeId: number;
  onSelectNode: (id: number) => void;
}

export function GraphInspectorPanel({
  selectedNode,
  relatedEdges,
  nodes,
}: GraphInspectorPanelProps) {
  return (
    <>
      <MetadataSection title="Selected Node">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="neutral">{selectedNode.className}</Badge>
          <SignalBadge tone={selectedNode.signal}>
            {selectedNode.classification}
          </SignalBadge>
        </div>
        <p className="text-sm font-semibold text-foreground">{selectedNode.label}</p>
      </MetadataSection>
      <MetadataSection title="Metrics">
        <MetadataItem label="Confidence" value={`${selectedNode.confidence}%`} />
        <MetadataItem label="Evidence refs" value={selectedNode.evidence} />
        <MetadataItem label="Connected links" value={relatedEdges.length} />
      </MetadataSection>
      <MetadataSection title="Links">
        <div className="space-y-1 text-[11px] text-muted-foreground">
          {relatedEdges.slice(0, 3).map((edge) => {
            const otherId = edge.from === selectedNode.id ? edge.to : edge.from;
            const otherNode = nodes.find((node) => node.id === otherId);

            return (
              <div key={`${edge.from}-${edge.to}-${edge.label}`} className="flex items-center justify-between gap-2">
                <span className="truncate">{otherNode?.label}</span>
                <span className="font-mono text-[10px]">{edge.strength}</span>
              </div>
            );
          })}
        </div>
      </MetadataSection>
    </>
  );
}

export function GraphControlRail({
  nodeClass,
  nodeClasses,
  filteredNodeCount,
  filteredEdgeCount,
  onNodeClassChange,
}: GraphControlRailProps) {
  return (
    <Panel className="p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <div className="metis-kicker">Traversal Controls</div>
          <h2 className="text-[15px] font-semibold uppercase tracking-[0.1em]">Scope</h2>
        </div>
        <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Reset
        </Button>
      </div>
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search node label"
            className="metis-input h-9 w-full pl-10"
          />
        </div>
        <div>
          <label
            htmlFor="graph-class"
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
          >
            Entity class
          </label>
          <select
            id="graph-class"
            value={nodeClass}
            onChange={(event) => onNodeClassChange(event.target.value as NodeFilter)}
            className="metis-input h-9 w-full rounded-md px-3"
          >
            {nodeClasses.map((value) => (
              <option key={value} value={value}>
                {value === "all" ? "All classes" : value}
              </option>
            ))}
          </select>
        </div>
        <div className="metis-pane-muted p-2">
          <div className="metis-micro-label">Graph posture</div>
          <div className="mt-2 space-y-1 text-[11px] text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Visible nodes</span>
              <span className="font-semibold text-foreground">{filteredNodeCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Visible edges</span>
              <span className="font-semibold text-foreground">{filteredEdgeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function GraphToolbar({
  zoom,
  filteredNodeCount,
  filteredEdgeCount,
  onZoomOut,
  onZoomIn,
  onFocusSelected,
}: GraphToolbarProps) {
  return (
    <div className="metis-toolbar min-h-10 gap-2 px-2 py-1.5">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <span>{filteredNodeCount} nodes</span>
        <span>{filteredEdgeCount} edges</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Zoom out" onClick={onZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="min-w-[44px] text-center text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {Math.round(zoom * 100)}%
        </span>
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Zoom in" onClick={onZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Focus selected node"
          onClick={onFocusSelected}
        >
          <Focus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function GraphCanvas({
  nodes,
  edges,
  allNodes,
  zoom,
  pan,
  selectedNodeId,
  onSelectNode,
}: GraphCanvasProps) {
  return (
    <Panel className="overflow-hidden p-0">
      <div
        className="relative min-h-[680px] overflow-hidden bg-[radial-gradient(circle_at_50%_38%,rgba(240,207,112,0.08),transparent_20%),linear-gradient(180deg,rgba(24,18,19,0.9),rgba(14,12,15,0.98))]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 38%, rgba(240,207,112,0.08), transparent 20%), radial-gradient(circle at 1px 1px, rgba(212,175,55,0.09) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      >
        <svg className="h-full w-full">
          <defs>
            <marker
              id="edge-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="rgba(240,207,112,0.72)" />
            </marker>
          </defs>
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {edges.map((edge) => {
              const fromNode = allNodes.find((node) => node.id === edge.from);
              const toNode = allNodes.find((node) => node.id === edge.to);
              if (!fromNode || !toNode) return null;

              const midX = (fromNode.x + toNode.x) / 2;
              const midY = (fromNode.y + toNode.y) / 2;

              return (
                <g key={`${edge.from}-${edge.to}-${edge.label}`}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={
                      edge.from === selectedNodeId || edge.to === selectedNodeId
                        ? "rgba(240, 207, 112, 0.62)"
                        : "rgba(128, 98, 58, 0.24)"
                    }
                    strokeWidth="1.4"
                    strokeDasharray={
                      edge.from === selectedNodeId || edge.to === selectedNodeId
                        ? ""
                        : "3,6"
                    }
                    markerEnd="url(#edge-arrow)"
                  />
                  {edge.from === selectedNodeId || edge.to === selectedNodeId ? (
                    <text
                      x={midX}
                      y={midY - 6}
                      fill="rgba(240, 207, 112, 0.78)"
                      fontSize="7"
                      textAnchor="middle"
                    >
                      {edge.label}
                    </text>
                  ) : null}
                </g>
              );
            })}

            {nodes.map((node) => (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onClick={() => onSelectNode(node.id)}
              >
                {node.id === selectedNodeId ? (
                  <>
                    <circle r="36" fill="rgba(240, 207, 112, 0.1)" />
                    <circle
                      r="32"
                      fill="rgba(212, 175, 55, 0.08)"
                      stroke="rgba(240, 207, 112, 0.46)"
                    />
                  </>
                ) : null}
                <SignalNode tone={node.signal} selected={selectedNodeId === node.id} />
                <text
                  y="5"
                  fill="hsl(var(--metis-midnight))"
                  fontSize="9"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {node.className.toUpperCase()}
                </text>
                {node.id === selectedNodeId ? (
                  <text
                    y="40"
                    fill="#fff1bf"
                    fontSize="9"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {node.label}
                  </text>
                ) : null}
                {node.id === selectedNodeId ? (
                  <text
                    y="52"
                    fill="hsl(var(--muted-foreground))"
                    fontSize="8"
                    textAnchor="middle"
                  >
                    {node.classification}
                  </text>
                ) : null}
              </g>
            ))}
          </g>
        </svg>
      </div>
    </Panel>
  );
}
