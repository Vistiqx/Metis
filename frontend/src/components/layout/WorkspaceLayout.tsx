import { Dock } from './Dock'
import { RightPanel } from './RightPanel'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

interface WorkspaceLayoutProps {
  children: React.ReactNode
  dockContext?: 'watchlists' | 'alerts' | 'operations' | 'narratives' | 'settings' | 'graph' | 'evidence' | 'default' | 'event'
  rightPanelContent?: React.ReactNode
  rightPanelTitle?: string
  showRightPanel?: boolean
  showDock?: boolean
}

export function WorkspaceLayout({
  children,
  dockContext = 'default',
  rightPanelContent,
  rightPanelTitle = 'Details',
  showRightPanel = true,
  showDock = true,
}: WorkspaceLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Bar */}
        <TopBar />

        {/* Workspace - pb-32 adds padding for dock bar at bottom */}
        <div className="flex flex-1 overflow-hidden pb-32">
          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>

          {/* Right Panel */}
          {showRightPanel && (
            <RightPanel title={rightPanelTitle}>
              {rightPanelContent}
            </RightPanel>
          )}
        </div>
      </div>

      {/* Dock */}
      {showDock && <Dock context={dockContext} />}
    </div>
  )
}
