import { useMemo, useState } from "react";
import { Check, CheckCircle2, Filter, Mail } from "lucide-react";
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
import { SignalBadge } from "../components/ui/SignalBadge";
import { SignalSeverityBar } from "../components/ui/SignalSeverityBar";
import type { SignalTone } from "../design/tokens";

interface AlertRecord {
  id: string;
  title: string;
  description: string;
  type: string;
  severity: "high" | "medium" | "low";
  status: "DETECTED" | "VERIFIED" | "FALSE_POSITIVE" | "ESCALATED" | "RESOLVED";
  createdAt: string;
  caseId: string | null;
}

const mockAlerts: AlertRecord[] = [
  {
    id: "AL-001",
    title: 'Watchlist "Protest Organizers" triggered',
    description: "Three monitored entities matched new route and handset criteria.",
    type: "Watchlist",
    severity: "high",
    status: "ESCALATED",
    createdAt: "5 minutes ago",
    caseId: "CASE-2024-001",
  },
  {
    id: "AL-002",
    title: "High-confidence event detected",
    description: "Event clustering crossed corroboration threshold in the district command lane.",
    type: "Analysis",
    severity: "high",
    status: "VERIFIED",
    createdAt: "12 minutes ago",
    caseId: "CASE-2024-002",
  },
  {
    id: "AL-003",
    title: "New source ingested",
    description: 'RSS feed "District News" added 23 new articles for review.',
    type: "Ingestion",
    severity: "low",
    status: "RESOLVED",
    createdAt: "1 hour ago",
    caseId: null,
  },
  {
    id: "AL-004",
    title: "Source connection failed",
    description: "Unable to connect to the monitored external account feed.",
    type: "System",
    severity: "medium",
    status: "DETECTED",
    createdAt: "2 hours ago",
    caseId: null,
  },
];

const severityTone: Record<AlertRecord["severity"], SignalTone> = {
  high: "anomaly",
  medium: "financial",
  low: "emerging",
};

export function Alerts() {
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("all");
  const [selectedId, setSelectedId] = useState(mockAlerts[0]?.id ?? "");

  const filteredAlerts = useMemo(
    () =>
      mockAlerts.filter((alert) => {
        if (filter === "active") return alert.status !== "RESOLVED";
        if (filter === "resolved") return alert.status === "RESOLVED";
        return true;
      }),
    [filter],
  );

  const selectedAlert =
    filteredAlerts.find((alert) => alert.id === selectedId) ?? filteredAlerts[0] ?? null;

  const unresolvedCount = mockAlerts.filter((alert) => alert.status !== "RESOLVED").length;

  return (
    <WorkspaceLayout
      layer="signal"
      dockContext="alerts"
      rightPanelTitle="Alert Context"
      rightPanelContent={
        selectedAlert ? (
          <>
            <MetadataSection title="Selected Alert">
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{selectedAlert.id}</span>
                <SignalBadge tone={severityTone[selectedAlert.severity]}>
                  {selectedAlert.severity}
                </SignalBadge>
              </div>
              <p className="text-base font-semibold text-foreground">{selectedAlert.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{selectedAlert.description}</p>
              <SignalSeverityBar tone={severityTone[selectedAlert.severity]} />
            </MetadataSection>
            <MetadataSection title="Operational Detail">
              <MetadataItem label="State" value={selectedAlert.status} />
              <MetadataItem label="Type" value={selectedAlert.type} />
              <MetadataItem label="Raised" value={selectedAlert.createdAt} />
              <MetadataItem label="Linked case" value={selectedAlert.caseId ?? "None"} />
            </MetadataSection>
            <MetadataSection title="Recommendation">
              <p className="text-sm text-muted-foreground">
                Correlate this alert with the selected case graph and confirm
                whether escalation criteria remain valid before notifying
                operations.
              </p>
            </MetadataSection>
          </>
        ) : undefined
      }
    >
      <OperationalSurfaceArchetype
        header={
          <SectionHeader
            kicker="Alert Triage"
            title="Alerts"
            subtitle="Dense alert triage interface with compact queue metrics, standing filter controls, and a persistent incident context region."
            meta={
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Check className="mr-2 h-4 w-4" />
                  Mark All Read
                </Button>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Settings
                </Button>
              </div>
            }
          />
        }
        commandStrip={
          <div className="metis-command-strip">
            <div className="metis-metric-cell flex-1">
              <div className="metis-micro-label">Unresolved</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">{unresolvedCount}</div>
            </div>
            <div className="metis-metric-cell flex-1">
              <div className="metis-micro-label">Critical</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">
                {mockAlerts.filter((alert) => alert.severity === "high" && alert.status !== "RESOLVED").length}
              </div>
            </div>
            <div className="metis-metric-cell flex-[1.3]">
              <div className="metis-micro-label">Triage Note</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Signal chips communicate severity. Workflow labels and queue
                surfaces stay neutral.
              </p>
            </div>
          </div>
        }
        leftRail={
          <Panel>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Queue Filters</div>
                <h2 className="text-[20px] font-semibold">Views</h2>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Refine
              </Button>
            </div>
            <div className="metis-tablist w-full justify-between">
              {(["all", "active", "resolved"] as const).map((value) => (
                <Button
                  key={value}
                  variant={filter === value ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(value)}
                  className="flex-1"
                >
                  {value}
                </Button>
              ))}
            </div>
          </Panel>
        }
        centerPrimary={
          <Panel>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Primary Queue</div>
                <h2 className="text-[20px] font-semibold">Alert Queue</h2>
              </div>
              <Badge variant="gold">{filteredAlerts.length} alerts visible</Badge>
            </div>

            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <button
                  key={alert.id}
                  type="button"
                  onClick={() => setSelectedId(alert.id)}
                  className={`metis-list-row w-full text-left ${selectedAlert?.id === alert.id ? "border-primary/35 bg-secondary/45" : ""}`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{alert.id}</span>
                      <Badge variant="neutral">{alert.type}</Badge>
                      <Badge variant={alert.status === "ESCALATED" ? "gold" : "neutral"}>
                        {alert.status}
                      </Badge>
                      <SignalBadge tone={severityTone[alert.severity]}>
                        {alert.severity}
                      </SignalBadge>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{alert.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span>{alert.createdAt}</span>
                      {alert.caseId ? <span>{alert.caseId}</span> : null}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {filteredAlerts.length === 0 ? (
              <div className="metis-empty mt-4 py-12">
                <CheckCircle2 className="mb-3 h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No alerts match your current view.</p>
              </div>
            ) : null}
          </Panel>
        }
      />
    </WorkspaceLayout>
  );
}
