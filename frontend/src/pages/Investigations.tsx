import { useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { WorkspaceLayout } from '../components/layout'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { CreateCaseDialog } from '../components/ui/Dialog'

interface Case {
  id: string
  title: string
  status: 'open' | 'closed'
  priority: 'low' | 'medium' | 'high'
  events: number
  evidence: number
  updated: string
}

const initialCases: Case[] = [
  { id: 'CASE-2024-001', title: 'District 7 Unrest Investigation', status: 'open', priority: 'high', events: 12, evidence: 45, updated: '2 hours ago' },
  { id: 'CASE-2024-002', title: 'Organizer Network Analysis', status: 'open', priority: 'medium', events: 8, evidence: 23, updated: '5 hours ago' },
  { id: 'CASE-2024-003', title: 'Social Media Campaign Tracking', status: 'closed', priority: 'low', events: 24, evidence: 67, updated: '2 days ago' },
  { id: 'CASE-2024-004', title: 'Cross-Border Activity Monitor', status: 'open', priority: 'high', events: 15, evidence: 34, updated: '1 day ago' },
]

export function Investigations() {
  const [cases, setCases] = useState<Case[]>(initialCases)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleCreateCase = (caseData: { title: string; description: string; priority: string }) => {
    const newCase: Case = {
      id: `CASE-2024-${String(cases.length + 1).padStart(3, '0')}`,
      title: caseData.title,
      status: 'open',
      priority: caseData.priority as 'low' | 'medium' | 'high',
      events: 0,
      evidence: 0,
      updated: 'Just now'
    }
    setCases([newCase, ...cases])
  }

  const filteredCases = cases.filter(caseItem =>
    caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caseItem.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const statusVariant = {
    open: 'success',
    closed: 'neutral',
  } as const

  const priorityVariant = {
    high: 'danger',
    medium: 'warning',
    low: 'info',
  } as const

  return (
    <WorkspaceLayout dockContext="default" showRightPanel={false}>
      <div className="metis-page">
        <div className="metis-page-header">
          <div>
            <div className="metis-kicker">Case Command</div>
            <h1 className="metis-title">Investigations</h1>
            <p className="metis-subtitle">Structured case inventory with owner context, evidence volume, and operational priority.</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>

        <div className="metis-toolbar">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="metis-input w-full pl-10"
            />
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="gold">{filteredCases.length} active rows</Badge>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Investigation Queue</CardTitle>
              <p className="text-sm text-muted-foreground">Dense but readable operational list aligned to case triage.</p>
            </div>
            <Badge variant="neutral">Owner metadata pending</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="metis-table">
                <thead>
                  <tr>
                    <th>Investigation</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Events</th>
                    <th>Evidence</th>
                    <th>Last updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map((caseItem) => (
                    <tr key={caseItem.id} className="cursor-pointer">
                      <td>
                        <div>
                          <div className="mb-1 font-mono text-xs text-muted-foreground">{caseItem.id}</div>
                          <div className="font-semibold text-foreground">{caseItem.title}</div>
                        </div>
                      </td>
                      <td><Badge variant={statusVariant[caseItem.status]}>{caseItem.status}</Badge></td>
                      <td><Badge variant={priorityVariant[caseItem.priority]}>{caseItem.priority}</Badge></td>
                      <td className="font-semibold text-foreground">{caseItem.events}</td>
                      <td className="font-semibold text-foreground">{caseItem.evidence}</td>
                      <td className="text-muted-foreground">{caseItem.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {filteredCases.length === 0 && (
          <div className="metis-empty border-dashed bg-transparent py-12">
            <p className="text-muted-foreground">No cases found matching your search.</p>
          </div>
        )}
      </div>

      {/* Create Case Dialog */}
      <CreateCaseDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleCreateCase}
      />
    </WorkspaceLayout>
  )
}
