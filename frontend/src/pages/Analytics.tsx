import {
  Activity,
  BarChart3,
  Clock3,
  Database,
  FolderKanban,
  Radar,
} from "lucide-react";
import { MetadataSection, WorkspaceLayout } from "../components/layout";
import { OperationalSurfaceArchetype } from "../components/archetypes";
import { Badge } from "../components/ui/Badge";
import { Panel } from "../components/ui/Panel";
import { SectionHeader } from "../components/ui/SectionHeader";

const metrics = [
  {
    label: "Investigations closed",
    value: "18",
    note: "7-day throughput",
    icon: FolderKanban,
  },
  {
    label: "Signals reviewed",
    value: "241",
    note: "Analyst triage volume",
    icon: Radar,
  },
  {
    label: "Source utility",
    value: "84%",
    note: "Useful-source hit rate",
    icon: Database,
  },
  {
    label: "Mean cycle time",
    value: "4.6h",
    note: "Intake to disposition",
    icon: Clock3,
  },
];

const trendRows = [
  { period: "Mon", investigations: 3, alerts: 19, sources: 11 },
  { period: "Tue", investigations: 2, alerts: 24, sources: 14 },
  { period: "Wed", investigations: 4, alerts: 21, sources: 15 },
  { period: "Thu", investigations: 5, alerts: 27, sources: 18 },
  { period: "Fri", investigations: 4, alerts: 22, sources: 13 },
];

const notes = [
  {
    icon: Activity,
    text: "Queue efficiency recovered after source pruning and shorter analyst handoffs.",
  },
  {
    icon: BarChart3,
    text: "Report output still trails investigation closure rate; prioritize two high-value briefs.",
  },
];

export function Analytics() {
  return (
    <WorkspaceLayout
      layer="platform"
      rightPanelTitle="Performance Context"
      rightPanelContent={
        <>
          <MetadataSection title="Command Readout">
            <p className="text-sm text-muted-foreground">
              Thursday remains the strongest correlation window for source quality and queue velocity.
            </p>
          </MetadataSection>
          <MetadataSection title="Operational Guidance">
            <p className="text-sm text-muted-foreground">
              Intelligence throughput is stable, but publication lag still needs operational correction.
            </p>
          </MetadataSection>
        </>
      }
    >
      <OperationalSurfaceArchetype
        header={
          <SectionHeader
            kicker="Operational Analytics"
            title="Analytics"
            subtitle="Authority-led performance surface with compact throughput analysis, trend review, and contextual notes without drifting into dashboard-style card inflation."
            meta={
              <>
                <Badge variant="gold">Primary metrics in gold</Badge>
                <Badge variant="neutral">Platform layer preserved</Badge>
              </>
            }
          />
        }
        commandStrip={
          <div className="metis-command-strip">
            {metrics.map((metric) => (
              <div key={metric.label} className="min-w-[150px] flex-1">
                <div className="flex items-center gap-2 text-primary">
                  <metric.icon className="h-4 w-4" />
                  <span className="metis-micro-label text-primary/80">{metric.label}</span>
                </div>
                <div className="mt-1 text-2xl font-semibold text-foreground">{metric.value}</div>
                <p className="mt-1 text-xs text-muted-foreground">{metric.note}</p>
              </div>
            ))}
          </div>
        }
        leftRail={
          <Panel>
            <div className="mb-3">
              <div className="metis-kicker">Review Frame</div>
              <h2 className="text-xl">Analyst Notes</h2>
            </div>
            <div className="space-y-2.5 text-sm">
              {notes.map((note) => (
                <div key={note.text} className="metis-pane-muted">
                  <div className="flex items-center gap-2 text-foreground">
                    <note.icon className="h-4 w-4 text-primary" /> Insight
                  </div>
                  <p className="mt-2 text-muted-foreground">{note.text}</p>
                </div>
              ))}
            </div>
          </Panel>
        }
        centerPrimary={
          <Panel>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Trend Window</div>
                <h2 className="text-2xl">Throughput Trend</h2>
              </div>
              <Badge variant="gold">Last 5 days</Badge>
            </div>
            <div className="space-y-3">
              {trendRows.map((row) => (
                <div key={row.period} className="metis-list-row flex-col">
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-foreground">{row.period}</span>
                    <Badge variant="neutral">Review window</Badge>
                  </div>
                  <div className="metis-metric-row w-full">
                    <div className="metis-metric-cell">
                      <div className="metis-micro-label">Investigations</div>
                      <div className="mt-1 text-base font-semibold text-foreground">{row.investigations}</div>
                    </div>
                    <div className="metis-metric-cell">
                      <div className="metis-micro-label">Alerts</div>
                      <div className="mt-1 text-base font-semibold text-foreground">{row.alerts}</div>
                    </div>
                    <div className="metis-metric-cell">
                      <div className="metis-micro-label">Sources</div>
                      <div className="mt-1 text-base font-semibold text-foreground">{row.sources}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        }
      />
    </WorkspaceLayout>
  );
}
