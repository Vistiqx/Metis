import { useState } from "react";
import {
  FileSignature,
  FolderKanban,
  LayoutTemplate,
  Printer,
  Send,
} from "lucide-react";
import {
  MetadataItem,
  MetadataSection,
  WorkspaceLayout,
} from "../components/layout";
import { OperationalSurfaceArchetype } from "../components/archetypes";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Panel } from "../components/ui/Panel";
import { SectionHeader } from "../components/ui/SectionHeader";

const reportRows = [
  {
    id: "REP-021",
    title: "District 7 weekly intelligence brief",
    caseId: "CASE-2024-001",
    status: "draft",
    updated: "42m ago",
    note: "Executive summary and logistics annex awaiting review.",
  },
  {
    id: "REP-018",
    title: "Cross-border logistics assessment",
    caseId: "CASE-2024-004",
    status: "review",
    updated: "3h ago",
    note: "Manifest variance section routed to legal review.",
  },
  {
    id: "REP-011",
    title: "Organizer network summary",
    caseId: "CASE-2024-002",
    status: "published",
    updated: "1d ago",
    note: "Published to mission distribution list.",
  },
];

const compositionBlocks = [
  {
    title: "Executive summary",
    text: "Authority-led opening narrative for decision-ready context.",
    icon: LayoutTemplate,
  },
  {
    title: "Investigation findings",
    text: "Dense evidence-backed sections pulled from active cases.",
    icon: FolderKanban,
  },
  {
    title: "Distribution controls",
    text: "Review, export, and dissemination gating for final outputs.",
    icon: Send,
  },
];

export function Reports() {
  const [selectedId, setSelectedId] = useState(reportRows[0]?.id ?? "");
  const selected = reportRows.find((report) => report.id === selectedId) ?? reportRows[0];

  return (
    <WorkspaceLayout
      layer="platform"
      rightPanelTitle="Selected Report"
      rightPanelContent={
        <>
          <MetadataSection title="Selected Report">
            <div className="mb-1 flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{selected.id}</span>
              <Badge variant="neutral">{selected.caseId}</Badge>
              <Badge variant={selected.status === "published" ? "gold" : "neutral"}>{selected.status}</Badge>
            </div>
            <p className="text-base font-semibold text-foreground">{selected.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{selected.note}</p>
          </MetadataSection>
          <MetadataSection title="Readiness">
            <MetadataItem label="Updated" value={selected.updated} />
            <MetadataItem label="Executive summary" value={<Badge variant="gold">ready</Badge>} />
            <MetadataItem label="Evidence annex" value={<Badge variant="neutral">reviewing</Badge>} />
          </MetadataSection>
        </>
      }
    >
      <OperationalSurfaceArchetype
        header={
          <SectionHeader
            kicker="Report Builder"
            title="Reports"
            subtitle="Report pipeline surface with a dominant publication queue, structured composition guidance, and a standing inspector for the selected output."
            meta={
              <>
                <Button variant="outline">
                  <Printer className="mr-2 h-4 w-4" /> Export queue
                </Button>
                <Button>
                  <FileSignature className="mr-2 h-4 w-4" /> New report
                </Button>
              </>
            }
          />
        }
        commandStrip={
          <div className="metis-command-strip">
            <div className="min-w-[150px] flex-1">
              <div className="metis-micro-label">Draft reports</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">
                {reportRows.filter((item) => item.status === "draft").length}
              </div>
            </div>
            <div className="min-w-[150px] flex-1">
              <div className="metis-micro-label">In review</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">
                {reportRows.filter((item) => item.status === "review").length}
              </div>
            </div>
            <div className="min-w-[150px] flex-1">
              <div className="metis-micro-label">Published</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">
                {reportRows.filter((item) => item.status === "published").length}
              </div>
            </div>
            <div className="min-w-[220px] flex-1">
              <div className="metis-micro-label">Composition note</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Reports stay on the authority layer: compact, neutral, and optimized for briefing preparation.
              </p>
            </div>
          </div>
        }
        leftRail={
          <Panel>
            <div className="mb-3">
              <div className="metis-kicker">Template Stack</div>
              <h2 className="text-xl">Composition Blocks</h2>
            </div>
            <div className="space-y-2.5">
              {compositionBlocks.map((block) => (
                <div key={block.title} className="metis-pane-muted">
                  <div className="flex items-center gap-2 text-foreground">
                    <block.icon className="h-4 w-4 text-primary" /> {block.title}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{block.text}</p>
                </div>
              ))}
            </div>
          </Panel>
        }
        centerPrimary={
          <Panel>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Publication Queue</div>
                <h2 className="text-2xl">Report Pipeline</h2>
              </div>
              <Badge variant="gold">Briefing output view</Badge>
            </div>
            <div className="space-y-3">
              {reportRows.map((report) => (
                <button
                  key={report.id}
                  type="button"
                  onClick={() => setSelectedId(report.id)}
                  className={`metis-list-row w-full text-left ${selected.id === report.id ? "border-primary/35 bg-secondary/45" : ""}`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{report.id}</span>
                      <Badge variant={report.status === "published" ? "gold" : "neutral"}>{report.status}</Badge>
                      <Badge variant="neutral">{report.caseId}</Badge>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{report.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{report.note}</p>
                  </div>
                  <div className="text-right text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {report.updated}
                  </div>
                </button>
              ))}
            </div>
          </Panel>
        }
      />
    </WorkspaceLayout>
  );
}
