import { useMemo, useState } from "react";
import { Download, Eye, Filter, Search, Upload } from "lucide-react";
import {
  MetadataItem,
  MetadataSection,
  WorkspaceLayout,
} from "../components/layout";
import { EvidenceReviewArchetype } from "../components/archetypes";
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
import { SignalBadge } from "../components/ui/SignalBadge";

const evidenceRows = [
  {
    id: "EV-001",
    title: "Protest photo set A",
    type: "Image",
    caseId: "CASE-2024-001",
    state: "VERIFIED",
    confidence: "82%",
    signal: "financial" as const,
    source: "Field collection",
    note: "Contains repeated subject and badge identifiers near the transit yard.",
  },
  {
    id: "EV-002",
    title: "Social media video",
    type: "Video",
    caseId: "CASE-2024-001",
    state: "EXTRACTED",
    confidence: "75%",
    signal: "emerging" as const,
    source: "Open source ingest",
    note: "Entity extraction produced three candidate matches with route overlap.",
  },
  {
    id: "EV-003",
    title: "Network communication log",
    type: "Document",
    caseId: "CASE-2024-002",
    state: "CORRELATED",
    confidence: "88%",
    signal: "anomaly" as const,
    source: "Intercept archive",
    note: "References schedule variance and late-stage rerouting instructions.",
  },
];

export function Evidence() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState(evidenceRows[0]?.id ?? "");

  const filteredEvidence = useMemo(
    () =>
      evidenceRows.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.caseId.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  const selectedEvidence =
    filteredEvidence.find((item) => item.id === selectedId) ??
    filteredEvidence[0] ??
    null;

  return (
    <WorkspaceLayout
      dockContext="evidence"
      rightPanelTitle="Evidence Metadata"
      rightPanelContent={
        selectedEvidence ? (
          <>
            <MetadataSection title="Evidence Metadata">
              <MetadataItem label="Evidence ID" value={selectedEvidence.id} />
              <MetadataItem label="Type" value={selectedEvidence.type} />
              <MetadataItem label="Case" value={selectedEvidence.caseId} />
              <MetadataItem label="Workflow" value={selectedEvidence.state} />
              <MetadataItem label="Source" value={selectedEvidence.source} />
            </MetadataSection>
            <MetadataSection title="Classification">
              <SignalBadge tone={selectedEvidence.signal}>
                {selectedEvidence.confidence}
              </SignalBadge>
            </MetadataSection>
            <MetadataSection title="Analyst Annotation">
              <p className="text-sm text-muted-foreground">
                {selectedEvidence.note}
              </p>
            </MetadataSection>
          </>
        ) : undefined
      }
    >
      <EvidenceReviewArchetype
        header={
          <SectionHeader
            kicker="Evidence Review"
            title="Evidence"
            subtitle="Evidence review workspace with compact filters, a dominant document review surface, and a persistent metadata and classification inspector."
            meta={
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
                <Button>
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </Button>
              </div>
            }
          />
        }
        commandStrip={
          <div className="metis-command-strip">
            <div className="metis-metric-cell flex-1">
              <div className="metis-micro-label">Artifacts</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">
                {evidenceRows.length}
              </div>
            </div>
            <div className="metis-metric-cell flex-1">
              <div className="metis-micro-label">Ready for review</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">
                2
              </div>
            </div>
            <div className="metis-metric-cell flex-[1.3]">
              <div className="metis-micro-label">Surface note</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Evidence confidence stays inside signal components while viewer
                and metadata surfaces remain neutral.
              </p>
            </div>
          </div>
        }
        leftRail={
          <Panel>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Evidence Filters</div>
                <h2 className="text-[20px] font-semibold">Intake Scope</h2>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search evidence"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="metis-input w-full pl-10"
              />
            </div>
          </Panel>
        }
        centerPrimary={
          <Panel>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Document Viewer</div>
                <h2 className="text-[20px] font-semibold">Review Queue</h2>
              </div>
              <Badge variant="gold">
                {filteredEvidence.length} packets visible
              </Badge>
            </div>

            <DataTable className="mb-4">
              <DataTableTable>
                <thead>
                  <tr>
                    <DataTableHeadCell>Evidence</DataTableHeadCell>
                    <DataTableHeadCell>Workflow</DataTableHeadCell>
                    <DataTableHeadCell>Case</DataTableHeadCell>
                    <DataTableHeadCell>Confidence</DataTableHeadCell>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvidence.map((item) => (
                    <tr
                      key={item.id}
                      className={`cursor-pointer ${selectedEvidence?.id === item.id ? "bg-primary/5" : ""}`}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <DataTableCell>
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <span className="font-mono text-xs text-muted-foreground">
                              {item.id}
                            </span>
                            <Badge variant="neutral">{item.type}</Badge>
                          </div>
                          <div className="font-semibold text-foreground">
                            {item.title}
                          </div>
                        </div>
                      </DataTableCell>
                      <DataTableCell>
                        <Badge variant="neutral">{item.state}</Badge>
                      </DataTableCell>
                      <DataTableCell>{item.caseId}</DataTableCell>
                      <DataTableCell>
                        <SignalBadge tone={item.signal}>
                          {item.confidence}
                        </SignalBadge>
                      </DataTableCell>
                    </tr>
                  ))}
                </tbody>
              </DataTableTable>
            </DataTable>

            {selectedEvidence ? (
              <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="metis-pane-muted min-h-[320px]">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="metis-kicker">Preview</div>
                      <h3 className="text-[16px] font-semibold">
                        {selectedEvidence.title}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Preview evidence"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex h-[240px] items-center justify-center rounded-lg border border-border/70 bg-background/40 text-sm text-muted-foreground">
                    Canonical review surface placeholder
                  </div>
                </div>
                <div className="metis-pane-muted">
                  <div className="metis-kicker">Extracted Entities</div>
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <div className="metis-list-row">
                      <span>Samir Haddad</span>
                      <Badge variant="neutral">person</Badge>
                    </div>
                    <div className="metis-list-row">
                      <span>North Transit Yard</span>
                      <Badge variant="neutral">location</Badge>
                    </div>
                    <div className="metis-list-row">
                      <span>Badge 14-C</span>
                      <Badge variant="gold">asset</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </Panel>
        }
      />
    </WorkspaceLayout>
  );
}
