import { Plus, Search, Filter } from 'lucide-react'
import { WorkspaceLayout } from '../components/layout'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

const mockCases = [
  { id: 'CASE-2024-001', title: 'District 7 Unrest Investigation', status: 'open', priority: 'high', events: 12, evidence: 45, updated: '2 hours ago' },
  { id: 'CASE-2024-002', title: 'Organizer Network Analysis', status: 'open', priority: 'medium', events: 8, evidence: 23, updated: '5 hours ago' },
  { id: 'CASE-2024-003', title: 'Social Media Campaign Tracking', status: 'closed', priority: 'low', events: 24, evidence: 67, updated: '2 days ago' },
  { id: 'CASE-2024-004', title: 'Cross-Border Activity Monitor', status: 'open', priority: 'high', events: 15, evidence: 34, updated: '1 day ago' },
]

export function Investigations() {
  return (
    <WorkspaceLayout dockContext="default" showRightPanel={false}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Investigations</h1>
            <p className="text-muted-foreground">
              Manage cases and track investigation progress
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cases..."
              className="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Cases Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {mockCases.map((caseItem) => (
            <Card key={caseItem.id} className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">{caseItem.id}</p>
                    <CardTitle className="text-lg mt-1">{caseItem.title}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      caseItem.status === 'open' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {caseItem.status}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      caseItem.priority === 'high'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : caseItem.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {caseItem.priority}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">{caseItem.events}</span> events
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{caseItem.evidence}</span> evidence
                  </div>
                  <div className="ml-auto">
                    Updated {caseItem.updated}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  )
}
