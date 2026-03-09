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
import { useMemo, useState } from 'react'
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
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 1024)
  const location = useLocation()
  const isMobile = window.innerWidth < 1024
  const workspaceLabel = useMemo(() => {
    const active = [...navItems, ...bottomItems].find((item) => {
      if (item.path === '/') return location.pathname === '/'
      return location.pathname.startsWith(item.path)
    })

    return active?.label ?? 'Workspace'
  }, [location.pathname])

  return (
    <>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed left-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-card/95 text-foreground shadow-panel shadow-black/30 backdrop-blur transition hover:border-primary/40 hover:text-primary lg:hidden"
        aria-label="Toggle navigation"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation</span>
      </button>

      {!collapsed && isMobile && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setCollapsed(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setCollapsed(true)
            }
          }}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen flex-col border-r border-border/70 bg-metis-ink/95 backdrop-blur-xl transition-all duration-300 ease-out lg:static ${
          collapsed ? 'w-[92px] -translate-x-full lg:translate-x-0' : 'w-[280px] translate-x-0'
        }`}
      >
        <div className="border-b border-border/70 px-4 py-4">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between gap-3'}`}>
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary shadow-sm shadow-primary/10">
                <Shield className="h-5 w-5 flex-shrink-0" />
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <div className="metis-kicker">Metis</div>
                  <span className="block truncate font-authority text-xl text-foreground">{workspaceLabel}</span>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCollapsed(!collapsed)
                }}
                className="hidden h-9 w-9 items-center justify-center rounded-xl border border-transparent text-muted-foreground transition hover:border-border/80 hover:bg-secondary/70 hover:text-foreground lg:flex"
                title="Collapse navigation"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
          </div>
          {collapsed && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setCollapsed(false)
              }}
              className="mt-3 hidden w-full items-center justify-center rounded-xl border border-border/70 bg-secondary/70 py-2 text-muted-foreground transition hover:border-primary/40 hover:text-primary lg:flex"
              title="Expand navigation"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {!collapsed && <div className="mb-3 px-3 text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">Operations</div>}
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path))

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (isMobile) {
                        setCollapsed(true)
                      }
                    }}
                    className={`group flex items-center gap-3 rounded-xl border px-3 py-3 transition-all duration-200 ${
                      isActive
                        ? 'border-primary/30 bg-primary/12 text-primary shadow-sm shadow-primary/10'
                        : 'border-transparent text-slate-200 hover:border-border/80 hover:bg-secondary/60 hover:text-foreground'
                    } ${collapsed ? 'justify-center px-0' : ''}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                    {!collapsed && (
                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{item.label}</span>
                      </div>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-border/70 px-3 py-4">
          {!collapsed && <div className="mb-3 px-3 text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">Reference</div>}
          <ul className="space-y-1.5">
            {bottomItems.map((item) => {
              const isActive = location.pathname === item.path

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (isMobile) {
                        setCollapsed(true)
                      }
                    }}
                    className={`group flex items-center gap-3 rounded-xl border px-3 py-3 transition-all duration-200 ${
                      isActive
                        ? 'border-primary/30 bg-primary/12 text-primary shadow-sm shadow-primary/10'
                        : 'border-transparent text-slate-200 hover:border-border/80 hover:bg-secondary/60 hover:text-foreground'
                    } ${collapsed ? 'justify-center px-0' : ''}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                    {!collapsed && (
                      <span className="truncate text-sm font-semibold">{item.label}</span>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>

      </aside>
    </>
  )
}
