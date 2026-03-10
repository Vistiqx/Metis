import { useState } from "react";
import { Database, Link2, MapPinned } from "lucide-react";
import {
  MetadataItem,
  MetadataSection,
  TagList,
  WorkspaceLayout,
} from "../components/layout";
import { EntityAnalysisArchetype } from "../components/archetypes";
import { Badge } from "../components/ui/Badge";
import {
  DataTable,
  DataTableCell,
  DataTableHeadCell,
  DataTableTable,
} from "../components/ui/DataTable";
import { Panel } from "../components/ui/Panel";
import { SectionHeader } from "../components/ui/SectionHeader";
import { SignalBadge } from "../components/ui/SignalBadge";
import type { SignalTone } from "../design/tokens";

interface EntityRecord {
  id: string;
  name: string;
  kind: "Person" | "Place" | "Organization";
  signal: SignalTone;
  stateLabel: string;
  sources: number;
  relationships: number;
  location: string;
  note: string;
  tags: string[];
}

const entities: EntityRecord[] = [
  {
    id: "ENT-044",
    name: "Samir Haddad",
    kind: "Person",
    signal: "financial",
    stateLabel: "CORROBORATED",
    sources: 12,
    relationships: 9,
    location: "District 7",
    note: "Observed across transit, organizer, and payment threads.",
    tags: ["subject", "payments", "priority"],
  },
  {
    id: "ENT-118",
    name: "North Transit Yard",
    kind: "Place",
    signal: "emerging",
    stateLabel: "EMERGING",
    sources: 8,
    relationships: 6,
    location: "Sector 3",
    note: "Location repeatedly associated with access-card anomalies.",
    tags: ["location", "logistics"],
  },
  {
    id: "ENT-205",
    name: "Helix Logistics",
    kind: "Organization",
    signal: "anomaly",
    stateLabel: "HIGH RISK",
    sources: 5,
    relationships: 11,
    location: "Freeport zone",
    note: "High-risk facilitator with unresolved manifest variance.",
    tags: ["organization", "facilitator", "watch"],
  },
];

const relationshipRows = [
  {
    linked: "CASE-2024-001",
    relation: "focal case",
    evidence: 6,
    lastSeen: "3h",
  },
  {
    linked: "North Transit Yard",
    relation: "co-located",
    evidence: 4,
    lastSeen: "8h",
  },
  {
    linked: "SR-118 packet",
    relation: "referenced in",
    evidence: 3,
    lastSeen: "1d",
  },
];

export function Entities() {
  const [selectedId, setSelectedId] = useState(entities[0]?.id ?? "");
  const selected =
    entities.find((entity) => entity.id === selectedId) ?? entities[0];

  return (
    <WorkspaceLayout
      layer="signal"
      rightPanelTitle="Entity Intelligence"
      rightPanelContent={
        <>
          <MetadataSection title="Profile Metadata">
            <MetadataItem label="Entity ID" value={selected.id} />
            <MetadataItem label="Type" value={selected.kind} />
            <MetadataItem label="Location" value={selected.location} />
            <MetadataItem label="Sources" value={selected.sources} />
            <MetadataItem
              label="Relationships"
              value={selected.relationships}
            />
          </MetadataSection>
          <MetadataSection title="Classification Tags">
            <TagList tags={selected.tags} />
          </MetadataSection>
          <MetadataSection title="Analyst Note">
            <p className="text-sm text-muted-foreground">{selected.note}</p>
          </MetadataSection>
        </>
      }
    >
      <EntityAnalysisArchetype
        header={
          <SectionHeader
            kicker="Entity Intelligence Profile"
            title="Entities"
            subtitle="Single-entity analysis workspace with a compact subject directory, relationship table, evidence references, and a persistent metadata inspector."
            meta={
              <>
                <Badge variant="gold">Authority-led profile shell</Badge>
                <Badge variant="neutral">Signal marks state only</Badge>
              </>
            }
          />
        }
        leftRail={
          <Panel>
            <div className="mb-4">
              <div className="metis-kicker">Entity Directory</div>
              <h2 className="text-[20px] font-semibold">Records</h2>
            </div>
            <div className="space-y-2.5">
              {entities.map((entity) => (
                <button
                  key={entity.id}
                  type="button"
                  onClick={() => setSelectedId(entity.id)}
                  className={`metis-list-row w-full text-left ${selected.id === entity.id ? "border-primary/35 bg-secondary/45" : ""}`}
                >
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {entity.id}
                      </span>
                      <Badge variant="neutral">{entity.kind}</Badge>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {entity.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {entity.location}
                    </p>
                  </div>
                  <SignalBadge tone={entity.signal}>
                    {entity.stateLabel}
                  </SignalBadge>
                </button>
              ))}
            </div>
          </Panel>
        }
        centerPrimary={
          <Panel>
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className="metis-kicker">Primary Profile</div>
                <h2 className="text-[20px] font-semibold">{selected.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {selected.note}
                </p>
              </div>
              <SignalBadge tone={selected.signal}>
                {selected.stateLabel}
              </SignalBadge>
            </div>

            <div className="metis-command-strip mb-4">
              <div className="metis-metric-cell flex-1">
                <div className="metis-micro-label">Sources</div>
                <div className="mt-1 text-xl font-semibold text-foreground">
                  {selected.sources}
                </div>
              </div>
              <div className="metis-metric-cell flex-1">
                <div className="metis-micro-label">Relationships</div>
                <div className="mt-1 text-xl font-semibold text-foreground">
                  {selected.relationships}
                </div>
              </div>
              <div className="metis-metric-cell flex-1">
                <div className="metis-micro-label">Location</div>
                <div className="mt-1 text-sm font-semibold text-foreground">
                  {selected.location}
                </div>
              </div>
            </div>

            <DataTable>
              <DataTableTable>
                <thead>
                  <tr>
                    <DataTableHeadCell>Linked Record</DataTableHeadCell>
                    <DataTableHeadCell>Relationship</DataTableHeadCell>
                    <DataTableHeadCell>Evidence</DataTableHeadCell>
                    <DataTableHeadCell>Last Seen</DataTableHeadCell>
                  </tr>
                </thead>
                <tbody>
                  {relationshipRows.map((row) => (
                    <tr key={row.linked}>
                      <DataTableCell className="font-semibold text-foreground">
                        {row.linked}
                      </DataTableCell>
                      <DataTableCell>{row.relation}</DataTableCell>
                      <DataTableCell>{row.evidence}</DataTableCell>
                      <DataTableCell>{row.lastSeen}</DataTableCell>
                    </tr>
                  ))}
                </tbody>
              </DataTableTable>
            </DataTable>

            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              <div className="metis-pane-muted">
                <div className="mb-2 flex items-center gap-2 text-foreground">
                  <Link2 className="h-4 w-4 text-primary" /> Relationship slice
                </div>
                <p className="text-sm text-muted-foreground">
                  Relationship rows stay dense and neutral so signal state
                  remains isolated to the entity marker.
                </p>
              </div>
              <div className="metis-pane-muted">
                <div className="mb-2 flex items-center gap-2 text-foreground">
                  <MapPinned className="h-4 w-4 text-primary" /> Spatial cue
                </div>
                <p className="text-sm text-muted-foreground">
                  Location context is supporting metadata, not a competing
                  visual surface.
                </p>
              </div>
            </div>
          </Panel>
        }
        centerSecondary={
          <Panel>
            <div className="mb-3 flex items-center gap-2 text-foreground">
              <Database className="h-4 w-4 text-primary" />
              <h2 className="text-[16px] font-semibold">Source Attribution</h2>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="metis-list-row">
                <span>Source packet SR-118</span>
                <Badge variant="neutral">verified</Badge>
              </div>
              <div className="metis-list-row">
                <span>Field report FR-020</span>
                <Badge variant="neutral">linked</Badge>
              </div>
              <div className="metis-list-row">
                <span>Communications intercept</span>
                <Badge variant="gold">priority review</Badge>
              </div>
            </div>
          </Panel>
        }
      />
    </WorkspaceLayout>
  );
}
