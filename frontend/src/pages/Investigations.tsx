import { useMemo, useState } from "react";
import { Filter, Plus, Search } from "lucide-react";
import { InvestigationWorkspaceArchetype } from "../components/archetypes";
import {
  MetadataItem,
  MetadataSection,
  WorkspaceLayout,
} from "../components/layout";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { CreateCaseDialog } from "../components/ui/Dialog";
import {
  DataTable,
  DataTableCell,
  DataTableHeadCell,
  DataTableTable,
} from "../components/ui/DataTable";
import { Panel } from "../components/ui/Panel";
import { SectionHeader } from "../components/ui/SectionHeader";
import { SignalBadge } from "../components/ui/SignalBadge";

interface Case {
  id: string;
  title: string;
  state: "TRIAGE" | "ACTIVE" | "CORRELATION" | "ESCALATED" | "ARCHIVED";
  priority: "low" | "medium" | "high";
  events: number;
  evidence: number;
  updated: string;
  owner: string;
  focus: string;
}

const initialCases: Case[] = [
  {
    id: "CASE-2024-001",
    title: "District 7 unrest investigation",
    state: "ESCALATED",
    priority: "high",
    events: 12,
    evidence: 45,
    updated: "2 hours ago",
    owner: "A. Rivera",
    focus: "Courier cluster and overnight mobilization.",
  },
  {
    id: "CASE-2024-002",
    title: "Organizer network analysis",
    state: "ACTIVE",
    priority: "medium",
    events: 8,
    evidence: 23,
    updated: "5 hours ago",
    owner: "J. Cole",
    focus: "Network overlap between coordinators and media nodes.",
  },
  {
    id: "CASE-2024-003",
    title: "Social media campaign tracking",
    state: "ARCHIVED",
    priority: "low",
    events: 24,
    evidence: 67,
    updated: "2 days ago",
    owner: "S. Amin",
    focus: "Closed after corroboration threshold was met.",
  },
  {
    id: "CASE-2024-004",
    title: "Cross-border activity monitor",
    state: "CORRELATION",
    priority: "high",
    events: 15,
    evidence: 34,
    updated: "1 day ago",
    owner: "M. Imani",
    focus: "Manifest anomalies and transit-yard linkages.",
  },
];

const priorityTone = {
  high: "anomaly",
  medium: "financial",
  low: "emerging",
} as const;

export function Investigations() {
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState(initialCases[0]?.id ?? "");

  const handleCreateCase = (caseData: {
    title: string;
    description: string;
    priority: string;
  }) => {
    const newCase: Case = {
      id: `CASE-2024-${String(cases.length + 1).padStart(3, "0")}`,
      title: caseData.title,
      state: "TRIAGE",
      priority: caseData.priority as "low" | "medium" | "high",
      events: 0,
      evidence: 0,
      updated: "Just now",
      owner: "Unassigned",
      focus: caseData.description || "Awaiting analytical brief.",
    };

    setCases((current) => [newCase, ...current]);
    setSelectedId(newCase.id);
  };

  const filteredCases = useMemo(
    () =>
      cases.filter(
        (caseItem) =>
          caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caseItem.id.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [cases, searchQuery],
  );

  const selectedCase =
    filteredCases.find((caseItem) => caseItem.id === selectedId) ??
    filteredCases[0] ??
    null;

  const openCount = cases.filter(
    (caseItem) => caseItem.state !== "ARCHIVED",
  ).length;

  return (
    <WorkspaceLayout
      layer="signal"
      dockContext="default"
      rightPanelTitle="Case Inspector"
      rightPanelContent={
        selectedCase ? (
          <>
            <MetadataSection title="Selected Case">
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  {selectedCase.id}
                </span>
                <SignalBadge tone={priorityTone[selectedCase.priority]}>
                  {selectedCase.priority}
                </SignalBadge>
              </div>
              <p className="text-base font-semibold text-foreground">
                {selectedCase.title}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {selectedCase.focus}
              </p>
            </MetadataSection>
            <MetadataSection title="Case Metrics">
              <MetadataItem label="Workflow" value={selectedCase.state} />
              <MetadataItem label="Owner" value={selectedCase.owner} />
              <MetadataItem label="Events" value={selectedCase.events} />
              <MetadataItem label="Evidence" value={selectedCase.evidence} />
              <MetadataItem label="Updated" value={selectedCase.updated} />
            </MetadataSection>
            <MetadataSection title="Next Action">
              <p className="text-sm text-muted-foreground">
                Prepare a corroboration review packet and open linked graph
                context before the next analyst handoff.
              </p>
            </MetadataSection>
          </>
        ) : undefined
      }
    >
      <InvestigationWorkspaceArchetype
        header={
          <SectionHeader
            kicker="Case Management"
            title="Investigations"
            subtitle="Primary analyst workspace with compact triage controls, dense entity correlation rows, and a persistent case inspector."
            meta={
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Case
              </Button>
            }
          />
        }
        commandStrip={
            <div className="metis-command-strip">
            <div className="metis-metric-cell flex-1 border-[rgba(212,175,55,0.18)] bg-[linear-gradient(180deg,rgba(10,18,29,0.96),rgba(7,12,21,0.98))]">
              <div className="metis-micro-label">Open cases</div>
              <div className="mt-1 text-2xl font-semibold text-[#fff1bf]">
                {openCount}
              </div>
            </div>
            <div className="metis-metric-cell flex-1 border-[rgba(212,175,55,0.18)] bg-[linear-gradient(180deg,rgba(10,18,29,0.96),rgba(7,12,21,0.98))]">
              <div className="metis-micro-label">Evidence linked</div>
              <div className="mt-1 text-2xl font-semibold text-[#fff1bf]">
                {cases.reduce((sum, item) => sum + item.evidence, 0)}
              </div>
            </div>
            <div className="metis-metric-cell flex-1 border-[rgba(212,175,55,0.18)] bg-[linear-gradient(180deg,rgba(10,18,29,0.96),rgba(7,12,21,0.98))]">
              <div className="metis-micro-label">High priority</div>
              <div className="mt-1 text-2xl font-semibold text-[#fff1bf]">
                {
                  cases.filter(
                    (item) =>
                      item.priority === "high" && item.state !== "ARCHIVED",
                  ).length
                }
              </div>
            </div>
            <div className="metis-metric-cell flex-[1.3] border-[rgba(212,175,55,0.14)] bg-[rgba(12,18,29,0.88)]">
              <div className="metis-micro-label">Queue note</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Signal colors classify urgency only. Workflow state and
                ownership remain neutral for cleaner scan paths.
              </p>
            </div>
          </div>
        }
        leftRail={
          <Panel>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Case Filters</div>
                <h2 className="text-[20px] font-semibold">Queue Scope</h2>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Refine
              </Button>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search case ID or title"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="metis-input w-full pl-10"
                />
              </div>
                <div className="metis-pane-muted border-[rgba(110,138,189,0.18)] bg-[rgba(10,16,27,0.92)]">
                <div className="metis-micro-label">Case posture</div>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Open</span>
                    <Badge variant="neutral">{openCount}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Archived</span>
                    <Badge variant="neutral">{cases.length - openCount}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Avg evidence</span>
                    <Badge variant="gold">
                      {Math.round(
                        cases.reduce((sum, item) => sum + item.evidence, 0) /
                          cases.length,
                      )}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        }
        centerPrimary={
          <Panel>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Investigation Workspace</div>
                <h2 className="text-[20px] font-semibold">Case Triage</h2>
              </div>
              <Badge variant="gold">{filteredCases.length} rows visible</Badge>
            </div>

            <DataTable>
              <DataTableTable>
                <thead>
                  <tr>
                    <DataTableHeadCell>Investigation</DataTableHeadCell>
                    <DataTableHeadCell>Workflow</DataTableHeadCell>
                    <DataTableHeadCell>Priority</DataTableHeadCell>
                    <DataTableHeadCell>Events</DataTableHeadCell>
                    <DataTableHeadCell>Evidence</DataTableHeadCell>
                    <DataTableHeadCell>Updated</DataTableHeadCell>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map((caseItem) => (
                    <tr
                      key={caseItem.id}
                      className={`cursor-pointer ${selectedCase?.id === caseItem.id ? "bg-[linear-gradient(90deg,rgba(66,48,13,0.26),rgba(15,23,42,0.08))]" : ""}`}
                      onClick={() => setSelectedId(caseItem.id)}
                    >
                      <DataTableCell>
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <span className="font-mono text-xs text-muted-foreground">
                              {caseItem.id}
                            </span>
                            <Badge variant="neutral">
                              Owner {caseItem.owner}
                            </Badge>
                          </div>
                          <div className="font-semibold text-foreground">
                            {caseItem.title}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {caseItem.focus}
                          </div>
                        </div>
                      </DataTableCell>
                      <DataTableCell>
                        <Badge
                          variant={
                            caseItem.state === "ESCALATED" ? "gold" : "neutral"
                          }
                        >
                          {caseItem.state}
                        </Badge>
                      </DataTableCell>
                      <DataTableCell>
                        <SignalBadge tone={priorityTone[caseItem.priority]}>
                          {caseItem.priority}
                        </SignalBadge>
                      </DataTableCell>
                      <DataTableCell className="font-semibold text-foreground">
                        {caseItem.events}
                      </DataTableCell>
                      <DataTableCell className="font-semibold text-foreground">
                        {caseItem.evidence}
                      </DataTableCell>
                      <DataTableCell className="text-muted-foreground">
                        {caseItem.updated}
                      </DataTableCell>
                    </tr>
                  ))}
                </tbody>
              </DataTableTable>
            </DataTable>

            {filteredCases.length === 0 ? (
              <div className="metis-empty mt-4 py-12">
                <p className="text-muted-foreground">
                  No cases found matching your search.
                </p>
              </div>
            ) : null}
          </Panel>
        }
      />
      <CreateCaseDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleCreateCase}
      />
    </WorkspaceLayout>
  );
}
