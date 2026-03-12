import {
  AlertTriangle, 
  BookOpen, 
  Eye, 
  FolderKanban, 
  GitGraph, 
  Network
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { WorkspaceLayout } from '../components/layout'

const stats = [
  { label: 'Active Cases', value: 12, icon: FolderKanban, trend: '+2 this week' },
  { label: 'Open Events', value: 47, icon: Network, trend: '+8 today' },
  { label: 'Alerts', value: 5, icon: AlertTriangle, trend: '3 high priority' },
  { label: 'Watchlists', value: 8, icon: Eye, trend: 'All active' },
]

const recentActivity = [
  { type: 'event', title: 'New event detected in District 7', time: '5 minutes ago', severity: 'high' },
  { type: 'alert', title: 'Watchlist "Protest Organizers" triggered', time: '12 minutes ago', severity: 'medium' },
  { type: 'evidence', title: 'Evidence uploaded to Case #2341', time: '1 hour ago', severity: 'low' },
  { type: 'candidate', title: 'Candidate event confidence increased to 78%', time: '2 hours ago', severity: 'medium' },
]

const quickActions = [
  { label: 'New Case', icon: FolderKanban, href: '/investigations' },
  { label: 'View Events', icon: Network, href: '/events' },
  { label: 'Graph Analysis', icon: GitGraph, href: '/graph' },
  { label: 'Browse Evidence', icon: BookOpen, href: '/evidence' },
]

export function Dashboard() {
  return (
    <WorkspaceLayout showDock={false} showRightPanel={false}>
      <div className="metis-page">
        <div className="metis-page-header">
          <div>
            <div className="metis-kicker">Executive Overview</div>
            <h1 className="metis-title">Dashboard</h1>
            <p className="metis-subtitle">Fast analyst orientation across active investigations, alert load, and system readiness.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="gold">Authority layer active</Badge>
            <Badge variant="success" dot>All systems operational</Badge>
          </div>
        </div>

        <div className="metis-stat-grid">
          {stats.map((stat) => (
            <Card key={stat.label} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="mb-3 text-3xl font-semibold text-foreground">{stat.value}</div>
                <Badge variant="neutral">{stat.trend}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <div className="metis-kicker">Navigation</div>
              <h2 className="text-2xl">Quick Actions</h2>
            </div>
            <p className="hidden text-sm text-muted-foreground lg:block">Go directly into the primary analysis surfaces.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="metis-panel group flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-secondary/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary transition group-hover:bg-primary/16">
                  <action.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">{action.label}</p>
                  <p className="text-sm text-muted-foreground">Open operational workspace</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest events and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.title}
                    className="rounded-2xl border border-border/70 bg-secondary/40 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <Badge
                        variant={
                          activity.severity === 'high'
                            ? 'danger'
                            : activity.severity === 'medium'
                              ? 'warning'
                              : 'success'
                        }
                        dot
                      >
                        {activity.type}
                      </Badge>
                      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{activity.title}</p>
                    <div
                      className={`mt-3 h-1.5 rounded-full ${
                        activity.severity === 'high'
                          ? 'bg-destructive'
                          : activity.severity === 'medium'
                            ? 'bg-amber-400'
                            : 'bg-emerald-400'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Component status overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Database', status: 'operational', latency: '24ms' },
                  { name: 'Ingestion Service', status: 'operational', latency: '156ms' },
                  { name: 'Analysis Engine', status: 'operational', latency: '89ms' },
                  { name: 'Graph Database', status: 'operational', latency: '12ms' },
                  { name: 'Search Index', status: 'degraded', latency: '450ms' },
                ].map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between rounded-2xl border border-border/70 bg-secondary/40 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant={service.status === 'operational' ? 'success' : 'warning'} dot>
                        {service.status}
                      </Badge>
                      <span className="text-sm font-semibold">{service.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{service.latency}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WorkspaceLayout>
  )
}
