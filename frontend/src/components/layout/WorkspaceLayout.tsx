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
      {/* Sidebar - Fixed on mobile, static on desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 lg:ml-0">
        {/* Top Bar */}
        <TopBar />

        {/* Workspace */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Main Content - pb-24 for dock bar space */}
          <main className="flex-1 overflow-auto p-4 lg:p-6 pb-24 lg:pb-24">
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

      {/* Dock - Fixed at bottom */}
      {showDock && (
        <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <Dock context={dockContext} />
          </div>
        </div>
      )}
    </div>
  )
}
