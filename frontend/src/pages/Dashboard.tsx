import {
  ArrowRight,
  BookOpen,
  FolderKanban,
  GitGraph,
  Network,
  ScanSearch,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardArchetype } from "../components/archetypes";
import {
  MetadataItem,
  MetadataSection,
  WorkspaceLayout,
} from "../components/layout";
import { Badge } from "../components/ui/Badge";
import { Panel } from "../components/ui/Panel";
import { SectionHeader } from "../components/ui/SectionHeader";
import { SignalBadge } from "../components/ui/SignalBadge";

const metrics = [
  { label: "Active cases", value: "12", note: "3 due for reassessment" },
  { label: "Alert load", value: "05", note: "2 require immediate triage" },
  { label: "Evidence backlog", value: "41", note: "8 packets unreviewed" },
  { label: "Draft outputs", value: "08", note: "2 ready for signoff" },
];

const quickActions = [
  {
    label: "Investigations",
    href: "/investigations",
    note: "Open case management workspace",
    icon: FolderKanban,
  },
  {
    label: "Timeline",
    href: "/timeline",
    note: "Review temporal correlation lane",
    icon: Network,
  },
  {
    label: "Graph",
    href: "/graph",
    note: "Trace entity relationship paths",
    icon: GitGraph,
  },
  {
    label: "Sources",
    href: "/sources",
    note: "Inspect ingestion directory",
    icon: ScanSearch,
  },
];

const commandRows = [
  {
    id: "CASE-2024-001",
    title: "District 7 unrest network",
    owner: "A. Rivera",
    confidence: "88%",
    tone: "anomaly" as const,
    state: "ESCALATED",
    nextAction: "Validate courier cluster against overnight footage.",
  },
  {
    id: "CASE-2024-004",
    title: "Cross-border logistics channel",
    owner: "M. Imani",
    confidence: "81%",
    tone: "financial" as const,
    state: "CORRELATION",
    nextAction: "Merge manifest delta with yard-access sequence.",
  },
  {
    id: "CASE-2024-002",
    title: "Organizer network analysis",
    owner: "J. Cole",
    confidence: "73%",
    tone: "emerging" as const,
    state: "ACTIVE",
    nextAction: "Approve narrative packet before afternoon brief.",
  },
];

const activityFeed = [
  {
    time: "05m",
    label: "Alert",
    text: "Watchlist organizer cluster produced a new anomaly match.",
  },
  {
    time: "18m",
    label: "Evidence",
    text: "Source packet SR-118 completed OCR and entity extraction.",
  },
  {
    time: "42m",
    label: "Graph",
    text: "Transit yard focal node gained two confirmed logistics links.",
  },
  {
    time: "1h",
    label: "Report",
    text: "Weekly brief for CASE-2024-001 moved to review queue.",
  },
];

const watchRows = [
  {
    subject: "Transit yard badge reuse",
    owner: "Graph desk",
    status: "Tracking",
  },
  {
    subject: "Courier handset cluster",
    owner: "Signals desk",
    status: "Reviewing",
  },
  {
    subject: "Harbor manifest variance",
    owner: "Finance desk",
    status: "Queued",
  },
];

export function Dashboard() {
  return (
    <WorkspaceLayout
      layer="platform"
      showDock={false}
      rightPanelTitle="Operational Context"
      rightPanelContent={
        <>
          <MetadataSection title="Activity Feed">
            {activityFeed.map((item) => (
              <div
                key={`${item.time}-${item.text}`}
                className="rounded-lg border border-[rgba(156,120,70,0.18)] bg-[rgba(25,17,19,0.88)] px-3 py-2.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.time}
                  </span>
                  <span className="metis-micro-label">{item.label}</span>
                </div>
                <p className="mt-2 text-sm text-foreground">{item.text}</p>
              </div>
            ))}
          </MetadataSection>
          <MetadataSection title="Briefing Notices">
            <MetadataItem label="Morning brief" value="09:30 UTC" />
            <MetadataItem label="Priority case" value="CASE-2024-001" />
            <MetadataItem label="Publishing queue" value="3 briefs" />
          </MetadataSection>
          <MetadataSection title="Analyst Guidance">
            <p className="text-sm text-muted-foreground">
              Gold accents remain reserved for authority cues. Signal chips mark
              intelligence state without tinting panels or layout surfaces.
            </p>
          </MetadataSection>
        </>
      }
    >
      <DashboardArchetype
        header={
          <SectionHeader
            kicker="Intelligence Overview"
            title="Dashboard"
            subtitle="Session-start overview with compact posture metrics, a dominant investigation command queue, and persistent analyst briefing context."
            meta={
              <>
                <Badge variant="gold">Authority layer active</Badge>
                <Badge variant="neutral" dot>
                  Canonical shell aligned
                </Badge>
              </>
            }
          />
        }
        commandStrip={
            <div className="metis-command-strip">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="metis-metric-cell flex-1 border-[rgba(212,175,55,0.18)] bg-[linear-gradient(180deg,rgba(10,18,29,0.96),rgba(7,12,21,0.98))]"
                >
                  <div className="metis-micro-label">{metric.label}</div>
                  <div className="mt-1 text-2xl font-semibold text-[#fff1bf]">
                    {metric.value}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {metric.note}
                  </p>
                </div>
              ))}
            </div>
        }
        leftRail={
          <>
            <Panel>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="metis-kicker">Workflow Shortcuts</div>
                  <h2 className="text-[20px] font-semibold">Access Surfaces</h2>
                </div>
                <ScanSearch className="h-4 w-4 text-[#f0cf70]" />
              </div>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    to={action.href}
                    className="metis-list-row group"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(212,175,55,0.22)] bg-[linear-gradient(180deg,rgba(52,39,12,0.46),rgba(14,21,33,0.94))] text-[#f0cf70] shadow-[0_0_14px_rgba(212,175,55,0.08)]">
                        <action.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {action.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {action.note}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-[#f0cf70]" />
                  </Link>
                ))}
              </div>
            </Panel>

            <Panel>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="metis-kicker">Watch Desk</div>
                  <h2 className="text-[20px] font-semibold">Monitoring</h2>
                </div>
                <Badge variant="neutral">3 active</Badge>
              </div>
              <div className="space-y-2.5">
                {watchRows.map((row) => (
                    <div key={row.subject} className="metis-pane-muted border-[rgba(156,120,70,0.18)] bg-[rgba(24,17,19,0.9)]">
                    <p className="text-sm font-semibold text-foreground">
                      {row.subject}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      <span>{row.owner}</span>
                      <span>{row.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </>
        }
        centerPrimary={
          <Panel>
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="metis-kicker">Investigation Command Queue</div>
                <h2 className="text-[20px] font-semibold">
                  Operational Priorities
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Cases remain the dominant analytical surface. Signals describe
                  status only while ownership and actions stay neutral for rapid
                  scanning.
                </p>
              </div>
                <Badge variant="gold">Morning brief window</Badge>
              </div>

            <div className="space-y-3 rounded-[18px] border border-[rgba(212,175,55,0.14)] bg-[linear-gradient(180deg,rgba(7,12,21,0.76),rgba(7,12,21,0.3))] p-3">
              {commandRows.map((row) => (
                <div
                  key={row.id}
                  className="metis-list-row flex-col border-[rgba(156,120,70,0.18)] bg-[linear-gradient(180deg,rgba(28,18,18,0.94),rgba(18,14,18,0.96))]"
                >
                  <div className="flex w-full items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          {row.id}
                        </span>
                        <Badge variant="neutral">Owner {row.owner}</Badge>
                        <SignalBadge tone={row.tone}>{row.state}</SignalBadge>
                      </div>
                      <p className="text-base font-semibold text-foreground">
                        {row.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="metis-micro-label">Confidence</div>
                      <div className="mt-1 text-lg font-semibold text-[#fff1bf]">
                        {row.confidence}
                      </div>
                    </div>
                  </div>
                  <div className="metis-keyline" />
                  <div className="flex w-full items-center justify-between gap-3 text-sm">
                    <p className="text-muted-foreground">{row.nextAction}</p>
                      <Link
                        to="/investigations"
                        className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f0cf70]"
                      >
                        Open case
                      </Link>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        }
        centerSecondary={
          <Panel>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Operational Priorities</div>
                <h2 className="text-[20px] font-semibold">
                  Briefing Readiness
                </h2>
              </div>
              <BookOpen className="h-4 w-4 text-[#f0cf70]" />
            </div>
            <div className="space-y-2.5 text-sm">
              <div className="metis-list-row">
                <span>District 7 weekly brief</span>
                <Badge variant="gold">Review</Badge>
              </div>
              <div className="metis-list-row">
                <span>Logistics assessment annex</span>
                <Badge variant="neutral">Draft</Badge>
              </div>
              <div className="metis-list-row">
                <span>Watchlist update digest</span>
                <Badge variant="neutral">Queued</Badge>
              </div>
            </div>
          </Panel>
        }
      />
    </WorkspaceLayout>
  );
}
