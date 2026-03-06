import { 
  AlertTriangle, 
  BookOpen, 
  Eye, 
  FolderKanban, 
  GitGraph, 
  Network
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
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
  { label: 'New Case', icon: FolderKanban, href: '/investigations/new' },
  { label: 'View Events', icon: Network, href: '/events' },
  { label: 'Graph Analysis', icon: GitGraph, href: '/graph' },
  { label: 'Browse Evidence', icon: BookOpen, href: '/evidence' },
]

export function Dashboard() {
  return (
    <WorkspaceLayout showDock={false} showRightPanel={false}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back to Metis OSINT Platform
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">System Status</p>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs text-muted-foreground">All systems operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <action.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">{action.label}</p>
                  <p className="text-sm text-muted-foreground">Go to workspace</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest events and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-lg border p-3"
                  >
                    <div
                      className={`h-2 w-2 rounded-full mt-2 ${
                        activity.severity === 'high'
                          ? 'bg-destructive'
                          : activity.severity === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
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
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          service.status === 'operational'
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                      />
                      <span className="text-sm font-medium">{service.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {service.latency}
                    </span>
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
