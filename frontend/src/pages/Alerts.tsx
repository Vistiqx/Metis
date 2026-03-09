import { useState } from 'react'
import { 
  AlertTriangle, 
  Bell, 
  Check, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Filter, 
  Mail, 
  Trash2
} from 'lucide-react'
import { WorkspaceLayout } from '../components/layout'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

// Mock alerts data
const mockAlerts = [
  { 
    id: 'AL-001', 
    title: 'Watchlist "Protest Organizers" triggered', 
    description: 'New match found: 3 entities matched criteria',
    type: 'watchlist',
    severity: 'high',
    status: 'unread',
    createdAt: '5 minutes ago',
    caseId: 'CASE-2024-001',
  },
  { 
    id: 'AL-002', 
    title: 'High confidence event detected', 
    description: 'Event clustering reached 85% confidence threshold',
    type: 'analysis',
    severity: 'high',
    status: 'unread',
    createdAt: '12 minutes ago',
    caseId: 'CASE-2024-002',
  },
  { 
    id: 'AL-003', 
    title: 'New source ingested', 
    description: 'RSS feed "District News" added 23 new articles',
    type: 'ingestion',
    severity: 'low',
    status: 'read',
    createdAt: '1 hour ago',
    caseId: null,
  },
  { 
    id: 'AL-004', 
    title: 'Source connection failed', 
    description: 'Unable to connect to Twitter API for @target_account',
    type: 'system',
    severity: 'medium',
    status: 'read',
    createdAt: '2 hours ago',
    caseId: null,
  },
  { 
    id: 'AL-005', 
    title: 'Anomaly detected in event pattern', 
    description: 'Unusual spike in related events over 24 hours',
    type: 'analysis',
    severity: 'medium',
    status: 'unread',
    createdAt: '3 hours ago',
    caseId: 'CASE-2024-004',
  },
  { 
    id: 'AL-006', 
    title: 'Evidence processing complete', 
    description: 'Video analysis finished for evidence EV-002',
    type: 'processing',
    severity: 'low',
    status: 'read',
    createdAt: '5 hours ago',
    caseId: 'CASE-2024-001',
  },
]

const severityIcons: Record<string, React.ElementType> = {
  high: AlertTriangle,
  medium: Bell,
  low: CheckCircle2,
}

const severityColors: Record<string, string> = {
  high: 'danger',
  medium: 'warning',
  low: 'info',
}

const typeLabels: Record<string, string> = {
  watchlist: 'Watchlist',
  analysis: 'Analysis',
  ingestion: 'Ingestion',
  system: 'System',
  processing: 'Processing',
}

export function Alerts() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([])

  const filteredAlerts = mockAlerts.filter(alert => {
    if (filter === 'unread') return alert.status === 'unread'
    if (filter === 'read') return alert.status === 'read'
    return true
  })

  const unreadCount = mockAlerts.filter(a => a.status === 'unread').length
  const highSeverityCount = mockAlerts.filter(a => a.severity === 'high' && a.status === 'unread').length

  const toggleSelection = (id: string) => {
    setSelectedAlerts(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const markAllAsRead = () => {
    // Would update API in real implementation
    console.log('Marking all as read')
  }

  return (
    <WorkspaceLayout dockContext="alerts" showRightPanel={true}>
      <div className="metis-page">
        <div className="metis-page-header">
          <div className="flex items-center gap-4">
            <div>
              <div className="metis-kicker">Alerts Queue</div>
              <h1 className="metis-title">Alerts</h1>
              <p className="metis-subtitle">Triage system findings with explicit state labels, case context, and analyst actions.</p>
            </div>
            {unreadCount > 0 && (
              <Badge variant="danger">{unreadCount} unread</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Email Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{highSeverityCount}</div>
              <p className="text-xs text-muted-foreground">Critical alerts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAlerts.length}</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Alert</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5m ago</div>
              <p className="text-xs text-muted-foreground">Watchlist match</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <div className="metis-tablist">
            <Button
              variant={filter === 'all' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
              <span className="ml-2 text-xs text-muted-foreground">({mockAlerts.length})</span>
            </Button>
            <Button
              variant={filter === 'unread' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Unread
              <span className="ml-2 text-xs text-muted-foreground">({unreadCount})</span>
            </Button>
            <Button
              variant={filter === 'read' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFilter('read')}
            >
              Read
              <span className="ml-2 text-xs text-muted-foreground">({mockAlerts.length - unreadCount})</span>
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const SeverityIcon = severityIcons[alert.severity]
            return (
              <Card 
                key={alert.id}
                className={`transition-colors hover:bg-muted/50 ${
                  alert.status === 'unread' ? 'border-l-4 border-l-primary' : ''
                } ${selectedAlerts.includes(alert.id) ? 'ring-2 ring-primary' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedAlerts.includes(alert.id)}
                      onChange={() => toggleSelection(alert.id)}
                      className="mt-1 h-4 w-4 rounded border-gray-300"
                    />

                    {/* Severity Icon */}
                     <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-secondary/70">
                       <SeverityIcon className="h-5 w-5" />
                     </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className={`font-medium ${alert.status === 'unread' ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {alert.title}
                            </p>
                            {alert.status === 'unread' && (
                              <Badge variant={severityColors[alert.severity] as 'danger' | 'warning' | 'info'} dot>{alert.severity}</Badge>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {alert.description}
                          </p>
                          <div className="mt-2 flex items-center gap-3">
                            <span className="text-xs font-mono text-muted-foreground">
                              {alert.id}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {typeLabels[alert.type]}
                            </span>
                            {alert.caseId && (
                              <span className="text-xs text-muted-foreground">
                                Case: {alert.caseId}
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {alert.createdAt}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                           <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="View alert details">
                             <Eye className="h-4 w-4" />
                           </Button>
                           <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Mark alert read">
                             <Check className="h-4 w-4" />
                           </Button>
                           <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Delete alert">
                             <Trash2 className="h-4 w-4" />
                           </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredAlerts.length === 0 && (
          <Card className="py-12">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No alerts</p>
              <p className="text-sm text-muted-foreground">
                {filter === 'unread' ? 'All caught up! No unread alerts.' : 'No alerts match your criteria.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </WorkspaceLayout>
  )
}
