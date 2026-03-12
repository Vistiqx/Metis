import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Focus,
  Search,
  Download,
  RefreshCw,
} from "lucide-react";
import { WorkspaceLayout } from "../components/layout";

type NodeKind = "case" | "person" | "org" | "location" | "asset";
type SignalKind = "gold" | "signal" | "muted";

type GraphNode = {
  id: number;
  label: string;
  kind: NodeKind;
  signal: SignalKind;
  x: number;
  y: number;
  subtitle: string;
  confidence: number;
};

type GraphEdge = {
  from: number;
  to: number;
  label: string;
};

const NODES: GraphNode[] = [
  {
    id: 1,
    label: "CASE-2024-001",
    kind: "case",
    signal: "gold",
    x: 52,
    y: 46,
    subtitle: "Focal investigation",
    confidence: 92,
  },
  {
    id: 2,
    label: "Samir Haddad",
    kind: "person",
    signal: "signal",
    x: 26,
    y: 26,
    subtitle: "Corroborated actor",
    confidence: 81,
  },
  {
    id: 3,
    label: "Helix Logistics",
    kind: "org",
    signal: "signal",
    x: 76,
    y: 30,
    subtitle: "Facilitator node",
    confidence: 87,
  },
  {
    id: 4,
    label: "North Transit Yard",
    kind: "location",
    signal: "muted",
    x: 77,
    y: 67,
    subtitle: "Observed hub",
    confidence: 72,
  },
  {
    id: 5,
    label: "Badge 14-C",
    kind: "asset",
    signal: "muted",
    x: 33,
    y: 70,
    subtitle: "Access artifact",
    confidence: 76,
  },
  {
    id: 6,
    label: "Source Packet SR-118",
    kind: "asset",
    signal: "muted",
    x: 16,
    y: 54,
    subtitle: "Supporting evidence",
    confidence: 68,
  },
];

const EDGES: GraphEdge[] = [
  { from: 1, to: 2, label: "coordinates" },
  { from: 1, to: 3, label: "financed by" },
  { from: 3, to: 4, label: "operates through" },
  { from: 5, to: 4, label: "used at" },
  { from: 6, to: 2, label: "references" },
  { from: 6, to: 1, label: "supports" },
];

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function signalNodeClasses(signal: SignalKind, selected: boolean) {
  const base =
    "absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border px-3 py-2 text-left shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition-all";
  const selectedRing = selected ? "ring-1 ring-offset-0" : "";

  if (signal === "gold") {
    return cx(
      base,
      "border-amber-400/55 bg-amber-300/10 text-amber-50",
      selectedRing,
      "ring-amber-300/50",
    );
  }

  if (signal === "signal") {
    return cx(
      base,
      "border-cyan-400/30 bg-slate-900/90 text-slate-100",
      selectedRing,
      "ring-cyan-300/35",
    );
  }

  return cx(
    base,
    "border-white/10 bg-black/30 text-slate-200",
    selectedRing,
    "ring-white/10",
  );
}

export function Graph() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const minX = Math.min(...NODES.map((n) => n.x));
    const maxX = Math.max(...NODES.map((n) => n.x));
    const minY = Math.min(...NODES.map((n) => n.y));
    const maxY = Math.max(...NODES.map((n) => n.y));

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    setPan({
      x: 50 - centerX,
      y: 47 - centerY,
    });
  }, []);

  const selected = useMemo(
    () => NODES.find((n) => n.id === selectedId) ?? NODES[0],
    [selectedId],
  );

  const related = useMemo(
    () =>
      EDGES.filter((e) => e.from === selectedId || e.to === selectedId).map(
        (edge) => {
          const otherId = edge.from === selectedId ? edge.to : edge.from;
          const other = NODES.find((n) => n.id === otherId)!;
          return { edge, other };
        },
      ),
    [selectedId],
  );

  const rightPanel = (
    <div className="space-y-4">
      <section className="rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/70">
          Selected node
        </div>
        <div className="mb-1 text-lg font-semibold text-white">
          {selected.label}
        </div>
        <div className="mb-4 text-xs text-slate-300">{selected.subtitle}</div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg border border-white/8 bg-white/[0.03] p-2">
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
              Class
            </div>
            <div className="mt-1 text-slate-100">{selected.kind}</div>
          </div>
          <div className="rounded-lg border border-white/8 bg-white/[0.03] p-2">
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
              Confidence
            </div>
            <div className="mt-1 text-slate-100">{selected.confidence}%</div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200/70">
          Active links
        </div>
        <div className="space-y-2">
          {related.map(({ edge, other }) => (
            <button
              key={`${edge.from}-${edge.to}-${edge.label}`}
              onClick={() => setSelectedId(other.id)}
              className="w-full rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 text-left transition hover:border-amber-300/25 hover:bg-white/[0.05]"
            >
              <div className="text-sm font-medium text-slate-100">
                {other.label}
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                {edge.label}
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <WorkspaceLayout
      layer="signal"
      dockContext="graph"
      showDock={false}
      rightPanelTitle="Entity Inspector"
      rightPanelContent={rightPanel}
    >
      <div className="flex min-h-0 flex-col gap-4 p-4 lg:p-5">
        <header className="rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(245,191,86,0.12),transparent_38%),linear-gradient(180deg,rgba(15,10,8,0.95),rgba(10,10,10,0.92))] px-4 py-3 lg:px-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-200/75">
                Signal graph
              </div>
              <h1 className="text-2xl font-semibold tracking-[0.01em] text-white">
                Relationship map
              </h1>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <button className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-200 transition hover:border-amber-300/25 hover:bg-white/[0.06]">
                <RefreshCw className="mr-2 inline h-4 w-4" />
                Refresh
              </button>
              <button className="rounded-lg border border-amber-300/35 bg-amber-300/10 px-3 py-2 text-xs text-amber-50 transition hover:bg-amber-300/15">
                <Download className="mr-2 inline h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </header>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-200 transition hover:bg-white/[0.06]">
                <Search className="mr-2 inline h-4 w-4" />
                Search graph
              </button>
              <button
                onClick={() => setPan((v) => ({ x: v.x + 24, y: v.y }))}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-slate-200 transition hover:bg-white/[0.06]"
                aria-label="Pan left"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPan((v) => ({ x: v.x - 24, y: v.y }))}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-slate-200 transition hover:bg-white/[0.06]"
                aria-label="Pan right"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPan((v) => ({ x: v.x, y: v.y + 24 }))}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-slate-200 transition hover:bg-white/[0.06]"
                aria-label="Pan up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPan((v) => ({ x: v.x, y: v.y - 24 }))}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-slate-200 transition hover:bg-white/[0.06]"
                aria-label="Pan down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-slate-300">
                6 nodes / 6 links
              </div>
              <button
                onClick={() => {
                  const minX = Math.min(...NODES.map((n) => n.x));
                  const maxX = Math.max(...NODES.map((n) => n.x));
                  const minY = Math.min(...NODES.map((n) => n.y));
                  const maxY = Math.max(...NODES.map((n) => n.y));

                  const centerX = (minX + maxX) / 2;
                  const centerY = (minY + maxY) / 2;

                  setPan({
                    x: 50 - centerX,
                    y: 47 - centerY,
                  });
                }}
                className="rounded-lg border border-amber-300/35 bg-amber-300/10 px-3 py-2 text-xs text-amber-50 transition hover:bg-amber-300/15"
              >
                <Focus className="mr-2 inline h-4 w-4" />
                center graph
              </button>
            </div>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
          <section className="min-h-[720px] rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,10,0.82),rgba(16,12,10,0.9))] p-3 sm:p-4">
            <div className="relative h-full min-h-[680px] overflow-hidden rounded-xl border border-white/8 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0.01))]">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  <pattern
                    id="metis-grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="0.2"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#metis-grid)" />
                {EDGES.map((edge) => {
                  const from = NODES.find((n) => n.id === edge.from)!;
                  const to = NODES.find((n) => n.id === edge.to)!;
                  const midX = (from.x + to.x) / 2;
                  const midY = (from.y + to.y) / 2;

                  return (
                    <g key={`${edge.from}-${edge.to}-${edge.label}`}>
                      <line
                        x1={from.x + pan.x}
                        y1={from.y + pan.y}
                        x2={to.x + pan.x}
                        y2={to.y + pan.y}
                        stroke="rgba(226, 232, 240, 0.22)"
                        strokeWidth={
                          selectedId === edge.from || selectedId === edge.to
                            ? 0.45
                            : 0.28
                        }
                      />
                      <rect
                        x={midX - 4.5 + pan.x}
                        y={midY - 1.8 + pan.y}
                        width="9"
                        height="3.2"
                        rx="0.8"
                        fill="rgba(12,12,12,0.75)"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="0.12"
                      />
                      <text
                        x={midX + pan.x}
                        y={midY + 0.4 + pan.y}
                        textAnchor="middle"
                        fontSize="1.15"
                        fill="rgba(226,232,240,0.7)"
                      >
                        {edge.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {NODES.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedId(node.id)}
                  className={signalNodeClasses(node.signal, selectedId === node.id)}
                  style={{
                    left: `${node.x + pan.x}%`,
                    top: `${node.y + pan.y}%`,
                    width: node.kind === "case" ? 182 : 154,
                  }}
                >
                  <div className="mb-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {node.kind}
                  </div>
                  <div className="text-sm font-semibold leading-tight">
                    {node.label}
                  </div>
                  <div className="mt-1 text-[11px] leading-4 text-slate-300">
                    {node.subtitle}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-4 xl:hidden">{rightPanel}</aside>
        </div>
      </div>
    </WorkspaceLayout>
  );
}