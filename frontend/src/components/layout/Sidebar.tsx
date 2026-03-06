import { 
  AlertTriangle, 
  BookOpen, 
  Building2, 
  ChevronLeft, 
  ChevronRight,
  Database, 
  Eye, 
  FileText, 
  FolderKanban, 
  GitGraph, 
  LayoutDashboard, 
  Menu,
  Network, 
  Newspaper, 
  Settings, 
  Shield
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

interface NavItem {
  icon: React.ElementType
  label: string
  path: string
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: FolderKanban, label: 'Investigations', path: '/investigations' },
  { icon: Network, label: 'Events', path: '/events' },
  { icon: GitGraph, label: 'Graph', path: '/graph' },
  { icon: FileText, label: 'Evidence', path: '/evidence' },
  { icon: Eye, label: 'Watchlists', path: '/watchlists' },
  { icon: AlertTriangle, label: 'Alerts', path: '/alerts' },
  { icon: Database, label: 'Sources', path: '/sources' },
  { icon: Building2, label: 'Operations', path: '/operations' },
  { icon: BookOpen, label: 'Narratives', path: '/narratives' },
]

const bottomItems: NavItem[] = [
  { icon: Newspaper, label: 'Docs', path: '/docs' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  // Debug: Log current path
  console.log('Current path:', location.pathname)

  return (
    <>
      {/* Mobile Toggle Button - Visible on small screens */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 lg:hidden flex h-10 w-10 items-center justify-center rounded-lg bg-card border shadow-md hover:bg-accent"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay for mobile */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-40 flex flex-col border-r bg-card transition-all duration-300 ease-in-out ${
          collapsed ? 'w-16 -translate-x-full lg:translate-x-0' : 'w-64 translate-x-0'
        }`}
      >        {/* Logo Section */}
        <div className="flex h-16 items-center border-b px-3">
          {/* Logo / Shield */}
          <div className={`flex items-center ${collapsed ? 'justify-center w-full' : 'gap-2 flex-1'}`}>
            <Shield className="h-8 w-8 text-primary flex-shrink-0" />
            {!collapsed && (
              <span className="text-xl font-bold whitespace-nowrap overflow-hidden">Metis</span>
            )}
          </div>
          
          {/* Collapse Toggle Button - Desktop only */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log('Toggle clicked, current state:', collapsed)
              setCollapsed(!collapsed)
            }}
            className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent transition-colors flex-shrink-0 ml-2"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path))
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      console.log('Navigating to:', item.path)
                      // On mobile, close sidebar after navigation
                      if (window.innerWidth < 1024) {
                        setCollapsed(true)
                      }
                    }}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'hover:bg-accent text-foreground'
                    } ${collapsed ? 'justify-center' : ''}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && (
                      <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t py-4">
          <ul className="space-y-1 px-2">
            {bottomItems.map((item) => {
              const isActive = location.pathname === item.path
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      console.log('Navigating to:', item.path)
                      if (window.innerWidth < 1024) {
                        setCollapsed(true)
                      }
                    }}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'hover:bg-accent text-foreground'
                    } ${collapsed ? 'justify-center' : ''}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && (
                      <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Expand hint when collapsed */}
        {collapsed && (
          <div className="border-t py-2 px-1">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setCollapsed(false)
              }}
              className="w-full flex items-center justify-center py-2 rounded-lg hover:bg-accent transition-colors"
              title="Click to expand"
            >
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
