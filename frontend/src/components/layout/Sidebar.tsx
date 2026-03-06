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
  Network, 
  Newspaper, 
  Settings, 
  Shield
} from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

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

  return (
    <aside 
      className={`flex flex-col border-r bg-card transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className={`flex h-16 items-center border-b px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Metis</span>
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-1 hover:bg-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {collapsed && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-20 rounded-full bg-card border p-1 shadow-md hover:bg-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t py-4">
        <ul className="space-y-1 px-2">
          {bottomItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
