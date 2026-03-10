import { CalendarRange, Clock3, Filter, Link2, MapPinned } from "lucide-react";
import {
  MetadataSection,
  WorkspaceLayout,
} from "../components/layout";
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

const events = [
  {
    time: "08:15",
    title: "Transit yard access badge reused",
    location: "Sector 3",
    linked: "CASE-2024-001",
    tone: "financial" as const,
  },
  {
    time: "11:40",
    title: "Known organizer appeared near district hub",
    location: "District 7",
    linked: "ENT-044",
    tone: "financial" as const,
  },
  {
    time: "14:05",
    title: "Shipment routing anomaly entered queue",
    location: "Freeport",
    linked: "CASE-2024-004",
    tone: "anomaly" as const,
  },
  {
    time: "18:20",
    title: "Supporting media source corroborated movement",
    location: "Open source",
    linked: "SRC-011",
    tone: "emerging" as const,
  },
];

export function Timeline() {
  return (
    <WorkspaceLayout
      layer="signal"
      rightPanelTitle="Temporal Context"
      rightPanelContent={
        <>
          <MetadataSection title="Related Entities">
            <div className="space-y-2 text-sm">
              <div className="metis-pane-muted">
                <span className="flex items-center gap-2 text-foreground">
                  <CalendarRange className="h-4 w-4 text-primary" /> District 7 coordinator
                </span>
                <p className="mt-2 text-muted-foreground">Appears in three timeline windows this week.</p>
              </div>
              <div className="metis-pane-muted">
                <span className="flex items-center gap-2 text-foreground">
                  <Clock3 className="h-4 w-4 text-primary" /> Helix Logistics
                </span>
                <p className="mt-2 text-muted-foreground">Temporal overlap with shipment anomaly remains unresolved.</p>
              </div>
            </div>
          </MetadataSection>
        </>
      }
    >
      <div className="metis-page">
        <SectionHeader
          kicker="Event Timeline"
          title="Timeline"
          subtitle="Temporal correlation workspace for investigative sequencing, related entities, and evidence context without tinting the analytical surface."
          meta={
            <>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
              <Badge variant="gold">Temporal clarity first</Badge>
            </>
          }
        />

        <div className="metis-analysis-grid">
          <aside className="metis-analysis-stack">
            <Panel>
              <div className="mb-3">
                <div className="metis-kicker">Window Controls</div>
                <h2 className="text-[20px] font-semibold">Scope</h2>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="metis-list-row">
                  <span>Current window</span>
                  <Badge variant="gold">24h</Badge>
                </div>
                <div className="metis-list-row">
                  <span>Linked case</span>
                  <Badge variant="neutral">CASE-2024-001</Badge>
                </div>
              </div>
            </Panel>
          </aside>

          <section className="metis-analysis-stack">
            <Panel>
              <div className="mb-4">
                <div className="metis-kicker">Event Lane</div>
                <h2 className="text-[20px] font-semibold">Chronology</h2>
              </div>
              <DataTable>
                <DataTableTable>
                  <thead>
                    <tr>
                      <DataTableHeadCell>Time</DataTableHeadCell>
                      <DataTableHeadCell>Event</DataTableHeadCell>
                      <DataTableHeadCell>Location</DataTableHeadCell>
                      <DataTableHeadCell>Linked</DataTableHeadCell>
                      <DataTableHeadCell>Signal</DataTableHeadCell>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={`${event.time}-${event.title}`}>
                        <DataTableCell className="font-mono text-foreground">{event.time}</DataTableCell>
                        <DataTableCell className="font-semibold text-foreground">{event.title}</DataTableCell>
                        <DataTableCell>
                          <span className="inline-flex items-center gap-1">
                            <MapPinned className="h-4 w-4" /> {event.location}
                          </span>
                        </DataTableCell>
                        <DataTableCell>
                          <span className="inline-flex items-center gap-1">
                            <Link2 className="h-4 w-4" /> {event.linked}
                          </span>
                        </DataTableCell>
                        <DataTableCell>
                          <SignalBadge tone={event.tone}>{event.tone}</SignalBadge>
                        </DataTableCell>
                      </tr>
                    ))}
                  </tbody>
                </DataTableTable>
              </DataTable>
            </Panel>
          </section>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
