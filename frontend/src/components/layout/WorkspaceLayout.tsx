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
    <div className="relative flex min-h-screen w-full overflow-hidden bg-transparent text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(212,167,58,0.08),rgba(15,23,42,0))]"
        data-layer={layer}
      />
      <Sidebar />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <TopBar />

        <div className="relative flex flex-1 overflow-hidden">
          <main className="relative flex-1 overflow-auto px-4 pb-28 pt-4 sm:px-5 lg:px-7 lg:pb-28 lg:pt-5">
            {children}
          </main>

          {showRightPanel && (
            <RightPanel title={rightPanelTitle}>{rightPanelContent}</RightPanel>
          )}
        </div>
      </div>

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
