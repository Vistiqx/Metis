import { useState } from 'react'
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Download, 
  FileText, 
  Filter, 
  MoreVertical, 
  Play, 
  Plus, 
  Search, 
  Settings,
  User
} from 'lucide-react'
import { WorkspaceLayout } from '../components/layout'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

// Mock operations/tasks data
const mockOperations = [
  { 
    id: 'OP-001', 
    title: 'Analyze District 7 Protest Footage', 
    description: 'Review and tag video evidence from protest events',
    type: 'analysis',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Analyst A',
    caseId: 'CASE-2024-001',
    dueDate: 'Today',
    progress: 65,
    createdAt: '2 days ago',
  },
  { 
    id: 'OP-002', 
    title: 'Cross-reference Social Media Accounts', 
    description: 'Link social profiles across platforms for target network',
    type: 'investigation',
    status: 'pending',
    priority: 'medium',
    assignee: 'Analyst B',
    caseId: 'CASE-2024-002',
    dueDate: 'Tomorrow',
    progress: 0,
    createdAt: '1 day ago',
  },
  { 
    id: 'OP-003', 
    title: 'Generate Weekly Intelligence Report', 
    description: 'Compile findings from all active cases',
    type: 'reporting',
    status: 'completed',
    priority: 'low',
    assignee: 'Analyst A',
    caseId: null,
    dueDate: 'Yesterday',
    progress: 100,
    createdAt: '5 days ago',
  },
  { 
    id: 'OP-004', 
    title: 'Verify Source Reliability', 
    description: 'Assess credibility of new RSS feed source',
    type: 'verification',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Reviewer C',
    caseId: 'CASE-2024-003',
    dueDate: 'In 2 days',
    progress: 30,
    createdAt: '3 days ago',
  },
  { 
    id: 'OP-005', 
    title: 'Update Watchlist Criteria', 
    description: 'Refine monitoring rules based on recent findings',
    type: 'maintenance',
    status: 'pending',
    priority: 'high',
    assignee: 'Analyst A',
    caseId: null,
    dueDate: 'Today',
    progress: 0,
    createdAt: '1 day ago',
  },
]

const statusColors: Record<string, string> = {
  'pending': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'completed': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'blocked': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}

const typeIcons: Record<string, React.ElementType> = {
  analysis: FileText,
  investigation: Search,
  reporting: FileText,
  verification: CheckCircle2,
  maintenance: Settings,
}

export function Operations() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOperations = mockOperations.filter(op => {
    const matchesFilter = filter === 'all' || op.status === filter
    const matchesSearch = op.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         op.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    pending: mockOperations.filter(o => o.status === 'pending').length,
    inProgress: mockOperations.filter(o => o.status === 'in-progress').length,
    completed: mockOperations.filter(o => o.status === 'completed').length,
    highPriority: mockOperations.filter(o => o.priority === 'high' && o.status !== 'completed').length,
  }

  return (
    <WorkspaceLayout dockContext="operations" showRightPanel={true}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Operations</h1>
            <p className="text-muted-foreground">
              Manage tasks and track operational progress
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">Waiting to start</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Play className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Finished tasks</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <Clock className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex gap-1 rounded-lg border bg-card p-1">
              <Button
                variant={filter === 'all' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'pending' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filter === 'in-progress' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('in-progress')}
              >
                In Progress
              </Button>
              <Button
                variant={filter === 'completed' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('completed')}
              >
                Completed
              </Button>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredOperations.map((operation) => {
            const TypeIcon = typeIcons[operation.type] || FileText
            return (
              <Card key={operation.id} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Progress Indicator */}
                    <div className="relative flex h-12 w-12 items-center justify-center">
                      <svg className="h-12 w-12 -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-muted/20"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray={`${operation.progress * 1.26} 126`}
                          className={operation.status === 'completed' ? 'text-green-500' : 'text-primary'}
                        />
                      </svg>
                      <span className="absolute text-xs font-medium">
                        {operation.progress}%
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{operation.title}</p>
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[operation.status]}`}>
                              {operation.status}
                            </span>
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[operation.priority]}`}>
                              {operation.priority}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {operation.description}
                          </p>
                          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="font-mono">{operation.id}</span>
                            <span className="flex items-center gap-1">
                              <TypeIcon className="h-3 w-3" />
                              {operation.type}
                            </span>
                            {operation.caseId && (
                              <span>{operation.caseId}</span>
                            )}
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {operation.assignee}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Due: {operation.dueDate}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
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
      </div>
    </WorkspaceLayout>
  )
}
