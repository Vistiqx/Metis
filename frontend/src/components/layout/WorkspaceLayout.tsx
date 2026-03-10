import { Dock } from "./Dock";
import { RightPanel } from "./RightPanel";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  dockContext?:
    | "watchlists"
    | "alerts"
    | "operations"
    | "narratives"
    | "settings"
    | "graph"
    | "evidence"
    | "default"
    | "event";
  layer?: "platform" | "signal";
  rightPanelContent?: React.ReactNode;
  rightPanelTitle?: string;
  showRightPanel?: boolean;
  showDock?: boolean;
}

export function WorkspaceLayout({
  children,
  dockContext = "default",
  layer = "platform",
  rightPanelContent,
  rightPanelTitle = "Details",
  showRightPanel = true,
  showDock = true,
}: WorkspaceLayoutProps) {
  const hasInspector = showRightPanel;

  return (
    <div
      className="metis-shell-grid bg-transparent text-foreground"
      data-has-inspector={hasInspector ? "true" : "false"}
      data-layer={layer}
    >
      <Sidebar />

      <div
        className="metis-workspace relative flex min-w-0 flex-col"
        data-shell-region="workspace"
        data-layer={layer}
      >
        <TopBar />

        <div className="metis-shell-region relative flex min-h-[calc(100vh-56px)] flex-1 overflow-hidden">
          <main
            className="metis-page-body relative flex-1 overflow-auto pb-24"
            data-shell-region="analysis"
          >
            {children}
          </main>
        </div>
      </div>

      {hasInspector ? (
        <RightPanel title={rightPanelTitle}>{rightPanelContent}</RightPanel>
      ) : null}

      {showDock && (
        <div className="metis-dock-frame">
          <div className="pointer-events-auto">
            <Dock context={dockContext} />
          </div>
        </div>
      )}
    </div>
  );
}
