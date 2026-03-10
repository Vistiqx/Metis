import { CalendarRange, Clock3, Filter, Link2, MapPinned } from "lucide-react";
import { WorkspaceLayout } from "../components/layout";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { SignalBadge } from "../components/ui/SignalBadge";

const events = [
  {
    time: "08:15",
    title: "Transit yard access badge reused",
    location: "Sector 3",
    tone: "financial" as const,
  },
  {
    time: "11:40",
    title: "Known organizer appeared near district hub",
    location: "District 7",
    tone: "relationship" as const,
  },
  {
    time: "14:05",
    title: "Shipment routing anomaly entered queue",
    location: "Freeport",
    tone: "anomaly" as const,
  },
  {
    time: "18:20",
    title: "Supporting media source corroborated movement",
    location: "Open source",
    tone: "emerging" as const,
  },
];

export function Timeline() {
  return (
    <WorkspaceLayout layer="signal" showRightPanel={false}>
      <div className="metis-page">
        <SectionHeader
          kicker="Timeline View"
          title="Timeline"
          subtitle="Temporal correlation lane for investigation sequencing, related entities, and detail context without converting the full surface into signal colors."
          meta={
            <>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
              <Badge variant="gold">Temporal clarity first</Badge>
            </>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Event Lane</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={`${event.time}-${event.title}`}
                    className="grid gap-3 rounded-xl border border-border/70 bg-secondary/35 p-4 md:grid-cols-[90px_1fr]"
                  >
                    <div>
                      <p className="font-mono text-sm text-foreground">
                        {event.time}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        UTC
                      </p>
                    </div>
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <SignalBadge tone={event.tone}>
                          {event.tone}
                        </SignalBadge>
                        <Badge variant="neutral">Correlation lane</Badge>
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {event.title}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPinned className="h-4 w-4" /> {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Link2 className="h-4 w-4" /> Linked to CASE-2024-001
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle>Related Entities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="rounded-xl border border-border/70 bg-secondary/35 p-3">
                  <span className="flex items-center gap-2 text-foreground">
                    <CalendarRange className="h-4 w-4 text-primary" /> District
                    7 coordinator
                  </span>
                  <p className="mt-2 text-muted-foreground">
                    Appears in three timeline windows this week.
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-secondary/35 p-3">
                  <span className="flex items-center gap-2 text-foreground">
                    <Clock3 className="h-4 w-4 text-primary" /> Helix Logistics
                  </span>
                  <p className="mt-2 text-muted-foreground">
                    Temporal overlap with shipment anomaly remains unresolved.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
