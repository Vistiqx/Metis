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
  return (
    <div
      className="metis-shell-grid bg-transparent text-foreground"
      data-has-inspector={showRightPanel ? "true" : "false"}
      data-layer={layer}
    >
      <Sidebar />

      <div
        className="metis-workspace relative flex min-w-0 flex-col"
        data-shell-region="workspace"
      >
        <TopBar />

        <div className="metis-shell-region relative flex flex-1 overflow-hidden">
          <main className="metis-page-body relative flex-1 overflow-auto pb-24">
            {children}
          </main>
        </div>
      </div>

      {showRightPanel ? (
        <RightPanel title={rightPanelTitle}>{rightPanelContent}</RightPanel>
      ) : (
        <aside
          aria-hidden="true"
          className="hidden h-screen w-[300px] border-l border-border/70 bg-card/55 xl:block"
        />
      )}

      {showDock && (
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50">
          <div className="pointer-events-auto">
            <Dock context={dockContext} />
          </div>
        </div>
      )}
    </div>
  );
}
