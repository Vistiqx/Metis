import { Database, FileText, Link2, MapPinned, Shapes } from "lucide-react";
import { WorkspaceLayout } from "../components/layout";
import { Badge } from "../components/ui/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { SignalBadge } from "../components/ui/SignalBadge";

const entities = [
  {
    id: "ENT-044",
    name: "Samir Haddad",
    kind: "Person",
    tone: "relationship" as const,
    sources: 12,
    relationships: 9,
    location: "District 7",
  },
  {
    id: "ENT-118",
    name: "North Transit Yard",
    kind: "Place",
    tone: "financial" as const,
    sources: 8,
    relationships: 6,
    location: "Sector 3",
  },
  {
    id: "ENT-205",
    name: "Helix Logistics",
    kind: "Organization",
    tone: "anomaly" as const,
    sources: 5,
    relationships: 11,
    location: "Freeport zone",
  },
];

export function Entities() {
  return (
    <WorkspaceLayout layer="signal" showRightPanel={false}>
      <div className="metis-page">
        <SectionHeader
          kicker="Entity Profile"
          title="Entities"
          subtitle="Evidence-backed entity records with relationship density, timeline relevance, and linked source coverage."
          meta={
            <>
              <Badge variant="gold">Authority-led profile shell</Badge>
              <Badge variant="neutral">
                Signals classify entity state only
              </Badge>
            </>
          }
        />

        <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <CardHeader>
              <CardTitle>Structured Entity Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {entities.map((entity) => (
                  <div
                    key={entity.id}
                    className="rounded-xl border border-border/70 bg-secondary/35 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">
                            {entity.id}
                          </span>
                          <SignalBadge tone={entity.tone}>
                            {entity.kind}
                          </SignalBadge>
                        </div>
                        <p className="text-base font-semibold text-foreground">
                          {entity.name}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Observed in {entity.location}
                        </p>
                      </div>
                      <Badge variant="neutral">
                        {entity.relationships} links
                      </Badge>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                      <div className="rounded-lg border border-border/60 bg-background/20 px-3 py-2">
                        <span className="block text-xs uppercase tracking-[0.14em]">
                          Sources
                        </span>
                        <span className="font-semibold text-foreground">
                          {entity.sources}
                        </span>
                      </div>
                      <div className="rounded-lg border border-border/60 bg-background/20 px-3 py-2">
                        <span className="block text-xs uppercase tracking-[0.14em]">
                          Relationships
                        </span>
                        <span className="font-semibold text-foreground">
                          {entity.relationships}
                        </span>
                      </div>
                      <div className="rounded-lg border border-border/60 bg-background/20 px-3 py-2">
                        <span className="block text-xs uppercase tracking-[0.14em]">
                          Last reviewed
                        </span>
                        <span className="font-semibold text-foreground">
                          2h ago
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
                <CardTitle>Relationship Slice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-secondary/35 p-3">
                  <span className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-primary" /> Logistics
                    intermediary
                  </span>
                  <Badge variant="neutral">verified</Badge>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-secondary/35 p-3">
                  <span className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary" /> Source packet
                    SR-118
                  </span>
                  <Badge variant="neutral">linked</Badge>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-secondary/35 p-3">
                  <span className="flex items-center gap-2">
                    <MapPinned className="h-4 w-4 text-primary" /> Transit yard
                    cluster
                  </span>
                  <Badge variant="gold">focal</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evidence Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="rounded-xl border border-border/70 bg-secondary/35 p-4">
                  <p className="mb-2 flex items-center gap-2 text-foreground">
                    <FileText className="h-4 w-4 text-primary" /> Source
                    references remain the dominant corroboration path.
                  </p>
                  <p>
                    Timeline slice and report references stay neutral; only
                    classification chips use signal tones.
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-secondary/35 p-4">
                  <p className="mb-2 flex items-center gap-2 text-foreground">
                    <Shapes className="h-4 w-4 text-primary" /> Entity profile
                    stays factual and compact.
                  </p>
                  <p>
                    Profile layout favors dense scanning over card-heavy
                    presentation.
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
