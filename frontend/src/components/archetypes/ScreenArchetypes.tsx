import type { ReactNode } from "react";

interface SharedArchetypeProps {
  archetype: string;
  header: ReactNode;
  commandStrip?: ReactNode;
  leftRail?: ReactNode;
  centerPrimary: ReactNode;
  centerSecondary?: ReactNode;
}

interface GraphAnalysisArchetypeProps {
  archetype: string;
  header: ReactNode;
  leftRail?: ReactNode;
  graphCanvas: ReactNode;
  graphControls?: ReactNode;
}

function ArchetypeFrame({
  archetype,
  header,
  commandStrip,
  leftRail,
  centerPrimary,
  centerSecondary,
  mode = "analysis",
}: SharedArchetypeProps & { mode?: "analysis" | "monitoring" }) {
  return (
    <div
      className="metis-page metis-archetype"
      data-archetype={archetype}
      data-archetype-mode={mode}
    >
      <section data-slot="header">{header}</section>
      {commandStrip ? (
        <section className="metis-archetype-command" data-slot="commandStrip">
          {commandStrip}
        </section>
      ) : null}

      <div className="metis-analysis-grid metis-archetype-grid">
        {leftRail ? (
          <section
            className="metis-analysis-stack metis-archetype-rail"
            data-slot="leftRail"
          >
            {leftRail}
          </section>
        ) : null}

        <section
          className="metis-analysis-stack metis-archetype-main"
          data-slot="centerPrimary"
        >
          {centerPrimary}
          {centerSecondary ? (
            <div className="metis-archetype-secondary" data-slot="centerSecondary">
              {centerSecondary}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

export function DashboardArchetype(
  props: Omit<SharedArchetypeProps, "archetype">,
) {
  return <ArchetypeFrame {...props} archetype="dashboard" mode="analysis" />;
}

export function InvestigationWorkspaceArchetype(
  props: Omit<SharedArchetypeProps, "archetype">,
) {
  return (
    <ArchetypeFrame
      {...props}
      archetype="investigation-workspace"
      mode="analysis"
    />
  );
}

export function EntityAnalysisArchetype(
  props: Omit<SharedArchetypeProps, "archetype">,
) {
  return (
    <ArchetypeFrame {...props} archetype="entity-analysis" mode="analysis" />
  );
}

export function EvidenceReviewArchetype(
  props: Omit<SharedArchetypeProps, "archetype">,
) {
  return (
    <ArchetypeFrame {...props} archetype="evidence-review" mode="analysis" />
  );
}

export function WatchlistMonitoringArchetype(
  props: Omit<SharedArchetypeProps, "archetype">,
) {
  return (
    <ArchetypeFrame
      {...props}
      archetype="watchlist-monitoring"
      mode="monitoring"
    />
  );
}

export function OperationalSurfaceArchetype(
  props: Omit<SharedArchetypeProps, "archetype">,
) {
  return (
    <ArchetypeFrame
      {...props}
      archetype="operational-surface"
      mode="analysis"
    />
  );
}

export function GraphAnalysisArchetype({
  archetype,
  header,
  leftRail,
  graphCanvas,
  graphControls,
}: GraphAnalysisArchetypeProps) {
  return (
    <div
      className="metis-page metis-archetype"
      data-archetype={archetype}
      data-archetype-mode="analysis"
    >
      <section data-slot="header">{header}</section>

      <div className="metis-analysis-grid metis-archetype-grid">
        {leftRail ? (
          <section
            className="metis-analysis-stack metis-archetype-rail"
            data-slot="graphControlsRail"
          >
            {leftRail}
          </section>
        ) : null}

        <section
          className="metis-analysis-stack metis-archetype-main"
          data-slot="graphCanvas"
        >
          {graphControls ? (
            <div className="metis-archetype-secondary" data-slot="graphControls">
              {graphControls}
            </div>
          ) : null}
          {graphCanvas}
        </section>
      </div>
    </div>
  );
}
