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
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { CreateTaskDialog } from '../components/ui/Dialog'

interface Operation {
  id: string
  title: string
  description: string
  type: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  assignee: string
  caseId: string | null
  dueDate: string
  progress: number
  createdAt: string
}

const initialOperations: Operation[] = [
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
  'pending': 'neutral',
  'in-progress': 'info',
  'completed': 'success',
  'blocked': 'danger',
}

const priorityColors: Record<string, string> = {
  high: 'danger',
  medium: 'warning',
  low: 'info',
}

const typeIcons: Record<string, React.ElementType> = {
  analysis: FileText,
  investigation: Search,
  reporting: FileText,
  verification: CheckCircle2,
  maintenance: Settings,
}

export function Operations() {
  const [operations, setOperations] = useState<Operation[]>(initialOperations)
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateTask = (taskData: { title: string; description: string; priority: string; type: string }) => {
    const newTask: Operation = {
      id: `OP-${String(operations.length + 1).padStart(3, '0')}`,
      title: taskData.title,
      description: taskData.description,
      type: taskData.type,
      status: 'pending',
      priority: taskData.priority as 'low' | 'medium' | 'high',
      assignee: 'Unassigned',
      caseId: null,
      dueDate: 'Not set',
      progress: 0,
      createdAt: 'Just now'
    }
    setOperations([newTask, ...operations])
  }

  const filteredOperations = operations.filter(op => {
    const matchesFilter = filter === 'all' || op.status === filter
    const matchesSearch = op.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         op.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    pending: operations.filter(o => o.status === 'pending').length,
    inProgress: operations.filter(o => o.status === 'in-progress').length,
    completed: operations.filter(o => o.status === 'completed').length,
    highPriority: operations.filter(o => o.priority === 'high' && o.status !== 'completed').length,
  }

  return (
    <WorkspaceLayout dockContext="operations" showRightPanel={true}>
      <div className="metis-page">
        <div className="metis-page-header">
          <div>
            <div className="metis-kicker">Task Orchestration</div>
            <h1 className="metis-title">Operations</h1>
            <p className="metis-subtitle">Track analytical tasks, assignees, due dates, and workflow completion with administrative clarity.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
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
                 className="metis-input w-full pl-10"
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
                             <Badge variant={statusColors[operation.status] as 'neutral' | 'info' | 'success' | 'danger'}>{operation.status}</Badge>
                             <Badge variant={priorityColors[operation.priority] as 'danger' | 'warning' | 'info'}>{operation.priority}</Badge>
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
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Start operation">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More operation actions">
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

        {filteredOperations.length === 0 && (
          <div className="metis-empty border-dashed bg-transparent py-12">
            <p className="text-muted-foreground">No tasks found matching your search.</p>
          </div>
        )}
      </div>

      {/* Create Task Dialog */}
      <CreateTaskDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleCreateTask}
      />
    </WorkspaceLayout>
  )
}
