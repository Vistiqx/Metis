import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Download,
  Focus,
  Fullscreen,
  RefreshCw,
  Search,
  Settings,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
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
  onPanLeft: () => void;
  onPanRight: () => void;
  onPanUp: () => void;
  onPanDown: () => void;
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
        <div className="mb-3 flex items-center gap-2">
          <Badge variant="neutral">{selectedNode.className}</Badge>
          <SignalBadge tone={selectedNode.signal}>
            {selectedNode.classification}
          </SignalBadge>
        </div>
        <p className="text-base font-semibold text-foreground">
          {selectedNode.label}
        </p>
      </MetadataSection>
      <MetadataSection title="Observation Metrics">
        <MetadataItem label="Confidence" value={`${selectedNode.confidence}%`} />
        <MetadataItem label="Evidence refs" value={selectedNode.evidence} />
        <MetadataItem label="Connected links" value={relatedEdges.length} />
      </MetadataSection>
      <MetadataSection title="Relationship Trace">
        <div className="space-y-2 text-sm text-muted-foreground">
          {relatedEdges.map((edge) => {
            const otherId = edge.from === selectedNode.id ? edge.to : edge.from;
            const otherNode = nodes.find((node) => node.id === otherId);

            return (
              <div
                key={`${edge.from}-${edge.to}-${edge.label}`}
                className="rounded-lg border border-[rgba(156,120,70,0.18)] bg-[rgba(25,17,19,0.9)] px-3 py-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-foreground">
                    {otherNode?.label}
                  </span>
                  <span className="font-mono text-xs">{edge.strength}</span>
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {edge.label} / {edge.classification}
                </div>
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
    <Panel>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="metis-kicker">Traversal Controls</div>
          <h2 className="text-[20px] font-semibold">Graph Scope</h2>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search node label"
            className="metis-input w-full pl-10"
          />
        </div>
        <div>
          <label
            htmlFor="graph-class"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            Entity class
          </label>
          <select
            id="graph-class"
            value={nodeClass}
            onChange={(event) => onNodeClassChange(event.target.value as NodeFilter)}
            className="metis-input h-10 w-full rounded-md px-3"
          >
            {nodeClasses.map((value) => (
              <option key={value} value={value}>
                {value === "all" ? "All classes" : value}
              </option>
            ))}
          </select>
        </div>
        <div className="metis-pane-muted">
          <div className="metis-micro-label">Graph posture</div>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Visible nodes</span>
              <span className="font-semibold text-foreground">
                {filteredNodeCount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Visible edges</span>
              <span className="font-semibold text-foreground">
                {filteredEdgeCount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Focus mode</span>
              <Badge variant="gold">Analyst</Badge>
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
  onPanLeft,
  onPanRight,
  onPanUp,
  onPanDown,
  onFocusSelected,
}: GraphToolbarProps) {
  return (
    <div className="metis-toolbar">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Badge variant="gold">Case focal canvas</Badge>
        <span>{filteredNodeCount} nodes</span>
        <span>{filteredEdgeCount} directional edges</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
        <Button variant="ghost" size="icon" aria-label="Zoom out" onClick={onZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="min-w-[54px] text-center text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {Math.round(zoom * 100)}%
        </span>
        <Button variant="ghost" size="icon" aria-label="Zoom in" onClick={onZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Pan left" onClick={onPanLeft}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Pan right" onClick={onPanRight}>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Pan up" onClick={onPanUp}>
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Pan down" onClick={onPanDown}>
          <ArrowDown className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Focus selected node"
          onClick={onFocusSelected}
        >
          <Focus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Toggle fullscreen">
          <Fullscreen className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Graph settings">
          <Settings className="h-4 w-4" />
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
        className="relative h-[680px] overflow-hidden bg-[radial-gradient(circle_at_50%_38%,rgba(240,207,112,0.12),transparent_18%),radial-gradient(circle_at_20%_18%,rgba(156,52,20,0.1),transparent_22%),linear-gradient(180deg,rgba(34,18,18,0.82),rgba(18,12,16,0.98))]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 38%, rgba(240,207,112,0.12), transparent 18%), radial-gradient(circle at 20% 18%, rgba(156,52,20,0.1), transparent 22%), radial-gradient(circle at 1px 1px, rgba(212,175,55,0.14) 1px, transparent 0)",
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
                        ? "rgba(240, 207, 112, 0.68)"
                        : "rgba(156, 120, 70, 0.32)"
                    }
                    strokeWidth="1.6"
                    strokeDasharray={
                      edge.from === selectedNodeId || edge.to === selectedNodeId
                        ? ""
                        : "4,6"
                    }
                    markerEnd="url(#edge-arrow)"
                  />
                  <rect
                    x={midX - 42}
                    y={midY - 18}
                    width="84"
                    height="20"
                    rx="10"
                    fill="rgba(8, 13, 23, 0.92)"
                    stroke="rgba(156, 120, 70, 0.3)"
                  />
                  <text
                    x={midX}
                    y={midY - 7}
                    fill="rgba(240, 207, 112, 0.9)"
                    fontSize="9"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                  <text
                    x={midX}
                    y={midY + 5}
                    fill="rgba(224, 196, 154, 0.82)"
                    fontSize="8"
                    textAnchor="middle"
                  >
                    {edge.strength} / {edge.classification}
                  </text>
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
                    <circle r="40" fill="rgba(240, 207, 112, 0.12)" />
                    <circle
                      r="36"
                      fill="rgba(212, 175, 55, 0.08)"
                      stroke="rgba(240, 207, 112, 0.54)"
                    />
                  </>
                ) : null}
                <SignalNode tone={node.signal} selected={selectedNodeId === node.id} />
                <text
                  y="6"
                  fill="hsl(var(--metis-midnight))"
                  fontSize="10"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {node.className.toUpperCase()}
                </text>
                <text
                  y="44"
                  fill={node.id === selectedNodeId ? "#fff1bf" : "hsl(var(--foreground))"}
                  fontSize="11"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {node.label}
                </text>
                <text
                  y="58"
                  fill="hsl(var(--muted-foreground))"
                  fontSize="9"
                  textAnchor="middle"
                >
                  {node.classification}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </Panel>
  );
}
