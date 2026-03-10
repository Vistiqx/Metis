import { useMemo, useState } from "react";
import { WorkspaceLayout } from "../components/layout";
import { GraphAnalysisArchetype } from "../components/archetypes";
import { Badge } from "../components/ui/Badge";
import { SectionHeader } from "../components/ui/SectionHeader";
import {
  GraphCanvas,
  GraphControlRail,
  GraphInspectorPanel,
  GraphToolbar,
  type GraphEdge,
  type GraphNode,
  type NodeFilter,
} from "./GraphWorkspace";

const graphNodes: GraphNode[] = [
  {
    id: 1,
    label: "CASE-2024-001",
    className: "case",
    signal: "anomaly",
    classification: "Focal investigation",
    x: 420,
    y: 270,
    confidence: 92,
    evidence: 45,
  },
  {
    id: 2,
    label: "Samir Haddad",
    className: "person",
    signal: "financial",
    classification: "Corroborated actor",
    x: 235,
    y: 135,
    confidence: 81,
    evidence: 18,
  },
  {
    id: 3,
    label: "Helix Logistics",
    className: "organization",
    signal: "anomaly",
    classification: "High-risk facilitator",
    x: 620,
    y: 160,
    confidence: 87,
    evidence: 21,
  },
  {
    id: 4,
    label: "North Transit Yard",
    className: "location",
    signal: "emerging",
    classification: "Observed hub",
    x: 640,
    y: 390,
    confidence: 72,
    evidence: 11,
  },
  {
    id: 5,
    label: "Badge 14-C",
    className: "asset",
    signal: "financial",
    classification: "Access artifact",
    x: 300,
    y: 400,
    confidence: 76,
    evidence: 8,
  },
  {
    id: 6,
    label: "Source Packet SR-118",
    className: "asset",
    signal: "emerging",
    classification: "Supporting evidence",
    x: 170,
    y: 300,
    confidence: 68,
    evidence: 6,
  },
];

const graphEdges: GraphEdge[] = [
  {
    from: 1,
    to: 2,
    label: "coordinates",
    strength: "0.84",
    classification: "confirmed",
  },
  {
    from: 1,
    to: 3,
    label: "financed by",
    strength: "0.79",
    classification: "under review",
  },
  {
    from: 3,
    to: 4,
    label: "operates through",
    strength: "0.72",
    classification: "corroborated",
  },
  {
    from: 5,
    to: 4,
    label: "used at",
    strength: "0.68",
    classification: "observed",
  },
  {
    from: 6,
    to: 2,
    label: "references",
    strength: "0.63",
    classification: "supporting",
  },
  {
    from: 6,
    to: 1,
    label: "supports",
    strength: "0.74",
    classification: "supporting",
  },
];

const nodeClasses: NodeFilter[] = [
  "all",
  "person",
  "organization",
  "asset",
  "location",
  "case",
];

export function Graph() {
  const [zoom, setZoom] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<number>(1);
  const [nodeClass, setNodeClass] = useState<NodeFilter>("all");
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const filteredNodes = useMemo(
    () =>
      nodeClass === "all"
        ? graphNodes
        : graphNodes.filter((node) => node.className === nodeClass),
    [nodeClass],
  );

  const visibleIds = new Set(filteredNodes.map((node) => node.id));
  const filteredEdges = graphEdges.filter(
    (edge) => visibleIds.has(edge.from) && visibleIds.has(edge.to),
  );
  const selectedNode =
    graphNodes.find((node) => node.id === selectedNodeId) ?? graphNodes[0];
  const relatedEdges = graphEdges.filter(
    (edge) => edge.from === selectedNode.id || edge.to === selectedNode.id,
  );

  return (
    <WorkspaceLayout
      dockContext="graph"
      layer="signal"
      rightPanelTitle="Node Inspector"
      rightPanelContent={
        <GraphInspectorPanel
          selectedNode={selectedNode}
          relatedEdges={relatedEdges}
          nodes={graphNodes}
        />
      }
    >
      <GraphAnalysisArchetype
        archetype="graph-analysis"
        header={
          <SectionHeader
            kicker="Graph Analysis Workspace"
            title="Graph"
            subtitle="Canonical graph workspace with traversal controls, a neutral canvas, directional relationships, and node-level signal state reserved for intelligence meaning only."
            meta={
              <>
                <Badge variant="gold">Central focal node preserved</Badge>
                <Badge variant="neutral">
                  Signals restricted to graph nodes
                </Badge>
              </>
            }
          />
        }
        leftRail={
          <GraphControlRail
            nodeClass={nodeClass}
            nodeClasses={nodeClasses}
            filteredNodeCount={filteredNodes.length}
            filteredEdgeCount={filteredEdges.length}
            onNodeClassChange={setNodeClass}
          />
        }
        graphControls={
          <GraphToolbar
            zoom={zoom}
            filteredNodeCount={filteredNodes.length}
            filteredEdgeCount={filteredEdges.length}
            onZoomOut={() => setZoom((value) => Math.max(0.7, value - 0.1))}
            onZoomIn={() => setZoom((value) => Math.min(1.5, value + 0.1))}
            onPanLeft={() => setPan((value) => ({ ...value, x: value.x + 20 }))}
            onPanRight={() => setPan((value) => ({ ...value, x: value.x - 20 }))}
            onPanUp={() => setPan((value) => ({ ...value, y: value.y + 20 }))}
            onPanDown={() => setPan((value) => ({ ...value, y: value.y - 20 }))}
            onFocusSelected={() =>
              setPan({ x: 420 - selectedNode.x, y: 270 - selectedNode.y })
            }
          />
        }
        graphCanvas={
          <GraphCanvas
            nodes={filteredNodes}
            edges={filteredEdges}
            allNodes={graphNodes}
            zoom={zoom}
            pan={pan}
            selectedNodeId={selectedNode.id}
            onSelectNode={setSelectedNodeId}
          />
        }
      />
    </WorkspaceLayout>
  );
}
