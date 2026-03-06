import { useState } from 'react'
import { 
  AlertTriangle, 
  Bell, 
  Edit, 
  Eye, 
  Filter, 
  MoreVertical, 
  Pause, 
  Play, 
  Plus, 
  Search, 
  Trash2,
  Users
} from 'lucide-react'
import { WorkspaceLayout } from '../components/layout'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

// Mock watchlists data
const mockWatchlists = [
  { 
    id: 'WL-001', 
    name: 'Protest Organizers', 
    type: 'actor',
    status: 'active',
    matches: 12,
    entities: 8,
    lastMatch: '5 minutes ago',
    severity: 'high',
    criteria: ['Name contains "organizer"', 'Location: District 7', 'Activity: Planning']
  },
  { 
    id: 'WL-002', 
    name: 'Social Media Influencers', 
    type: 'account',
    status: 'active',
    matches: 47,
    entities: 156,
    lastMatch: '12 minutes ago',
    severity: 'medium',
    criteria: ['Followers > 10K', 'Engagement rate > 5%', 'Content: Political']
  },
  { 
    id: 'WL-003', 
    name: 'Suspicious Locations', 
    type: 'location',
    status: 'paused',
    matches: 3,
    entities: 5,
    lastMatch: '2 hours ago',
    severity: 'high',
    criteria: ['Multiple events', 'High activity', 'Restricted access']
  },
  { 
    id: 'WL-004', 
    name: 'Financial Transactions', 
    type: 'transaction',
    status: 'active',
    matches: 8,
    entities: 12,
    lastMatch: '1 hour ago',
    severity: 'low',
    criteria: ['Amount > $1000', 'Frequency > 5/day', 'Cross-border']
  },
  { 
    id: 'WL-005', 
    name: 'Communication Patterns', 
    type: 'communication',
    status: 'active',
    matches: 23,
    entities: 34,
    lastMatch: '30 minutes ago',
    severity: 'medium',
    criteria: ['Keywords: protest, rally', 'Group chats > 50 members', 'Encryption: Yes']
  },
]

const typeIcons: Record<string, React.ElementType> = {
  actor: Users,
  account: Bell,
  location: AlertTriangle,
  transaction: AlertTriangle,
  communication: Bell,
}

const severityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}

export function Watchlists() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredWatchlists = mockWatchlists.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeWatchlists = mockWatchlists.filter(w => w.status === 'active').length
  const totalMatches = mockWatchlists.reduce((acc, w) => acc + w.matches, 0)
  const highSeverity = mockWatchlists.filter(w => w.severity === 'high' && w.status === 'active').length

  return (
    <WorkspaceLayout dockContext="watchlists" showRightPanel={true}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Watchlists</h1>
            <p className="text-muted-foreground">
              Monitor entities and track triggered matches
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Watchlist
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Watchlists</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeWatchlists}</div>
              <p className="text-xs text-muted-foreground">
                {mockWatchlists.length - activeWatchlists} paused
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMatches}</div>
              <p className="text-xs text-muted-foreground">All time triggers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Severity</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{highSeverity}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Match</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5m ago</div>
              <p className="text-xs text-muted-foreground">Protest Organizers</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search watchlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Watchlists Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredWatchlists.map((watchlist) => {
            const TypeIcon = typeIcons[watchlist.type] || Eye
            return (
              <Card key={watchlist.id} className="hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        watchlist.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-mono text-muted-foreground">{watchlist.id}</p>
                        <CardTitle className="text-lg">{watchlist.name}</CardTitle>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        watchlist.status === 'active' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {watchlist.status}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${severityColors[watchlist.severity]}`}>
                        {watchlist.severity}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Stats */}
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-2xl font-bold">{watchlist.matches}</p>
                        <p className="text-xs text-muted-foreground">Matches</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{watchlist.entities}</p>
                        <p className="text-xs text-muted-foreground">Entities</p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-sm font-medium">{watchlist.lastMatch}</p>
                        <p className="text-xs text-muted-foreground">Last match</p>
                      </div>
                    </div>

                    {/* Criteria */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Criteria</p>
                      <div className="space-y-1">
                        {watchlist.criteria.map((criterion, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {criterion}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex gap-1">
                        {watchlist.status === 'active' ? (
                          <Button variant="ghost" size="sm">
                            <Pause className="mr-1 h-4 w-4" />
                            Pause
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm">
                            <Play className="mr-1 h-4 w-4" />
                            Resume
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Edit className="mr-1 h-4 w-4" />
                          Edit
                        </Button>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </WorkspaceLayout>
  )
}
