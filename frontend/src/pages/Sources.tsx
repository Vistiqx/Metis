import { useState } from 'react'
import { 
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Database,
  Filter,
  Play,
  Plus,
  Rss,
  Search,
  Settings
} from 'lucide-react'
import { WorkspaceLayout, MetadataItem, MetadataSection } from '../components/layout'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

const mockSources = [
  {
    id: 'SRC-001',
    name: 'BBC News Feed',
    type: 'rss',
    status: 'active',
    url: 'https://feeds.bbci.co.uk/news/rss.xml',
    reliability: 0.85,
    lastIngested: '2 minutes ago',
    recordsToday: 47,
    avgLatency: '24s',
    health: 'healthy'
  },
  {
    id: 'SRC-002',
    name: 'Reddit r/news',
    type: 'reddit',
    status: 'active',
    url: 'r/news',
    reliability: 0.65,
    lastIngested: '15 minutes ago',
    recordsToday: 156,
    avgLatency: '45s',
    health: 'healthy'
  },
  {
    id: 'SRC-003',
    name: 'Local News Network',
    type: 'rss',
    status: 'paused',
    url: 'https://localnews.com/feed',
    reliability: 0.72,
    lastIngested: '3 hours ago',
    recordsToday: 12,
    avgLatency: 'N/A',
    health: 'degraded'
  },
  {
    id: 'SRC-004',
    name: 'Twitter Monitor - Protests',
    type: 'x',
    status: 'error',
    url: 'search: protest OR rally',
    reliability: 0.55,
    lastIngested: '1 day ago',
    recordsToday: 0,
    avgLatency: 'N/A',
    health: 'error'
  },
]

const getSourceIcon = (type: string) => {
  switch (type) {
    case 'rss': return Rss
    case 'reddit': return Database
    case 'x': return AlertCircle
    default: return Database
  }
}

export function Sources() {
  const [selectedSource, setSelectedSource] = useState<typeof mockSources[0] | null>(null)

  const rightPanelContent = selectedSource ? (
    <>
      <MetadataSection title="Source Details">
        <MetadataItem label="ID" value={selectedSource.id} />
        <MetadataItem label="Type" value={selectedSource.type} />
        <MetadataItem label="Status" value={selectedSource.status} />
        <MetadataItem 
          label="Reliability" 
          value={`${Math.round(selectedSource.reliability * 100)}%`} 
        />
      </MetadataSection>

      <MetadataSection title="Performance">
        <MetadataItem label="Last Ingested" value={selectedSource.lastIngested} />
        <MetadataItem label="Records Today" value={selectedSource.recordsToday} />
        <MetadataItem label="Avg Latency" value={selectedSource.avgLatency} />
      </MetadataSection>

      <MetadataSection title="Configuration">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground break-all">
            {selectedSource.url}
          </p>
          <Button variant="outline" size="sm" className="w-full">
            <Settings className="mr-2 h-4 w-4" />
            Edit Configuration
          </Button>
        </div>
      </MetadataSection>

      <MetadataSection title="Actions">
        <div className="space-y-2">
          <Button size="sm" className="w-full">
            <Play className="mr-2 h-4 w-4" />
            Run Ingestion
          </Button>
          {selectedSource.status === 'active' ? (
            <Button variant="outline" size="sm" className="w-full">
              Pause Source
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="w-full">
              Resume Source
            </Button>
          )}
        </div>
      </MetadataSection>
    </>
  ) : (
    <div className="text-center text-muted-foreground">
      <p className="text-sm">Select a source to view details</p>
    </div>
  )

  return (
    <WorkspaceLayout 
      dockContext="default" 
      rightPanelContent={rightPanelContent}
      rightPanelTitle={selectedSource ? 'Source Details' : 'Details'}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sources</h1>
            <p className="text-muted-foreground">
              Monitor and manage ingestion sources
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Source
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Sources</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Records Today</p>
                  <p className="text-2xl font-bold">215</p>
                </div>
                <Database className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Latency</p>
                  <p className="text-2xl font-bold">34s</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Issues</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search sources..."
              className="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Sources List */}
        <div className="space-y-4">
          {mockSources.map((source) => {
            const Icon = getSourceIcon(source.type)
            return (
              <Card 
                key={source.id}
                className={`cursor-pointer transition-all hover:border-primary/50 ${
                  selectedSource?.id === source.id ? 'border-primary ring-1 ring-primary' : ''
                }`}
                onClick={() => setSelectedSource(source)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{source.name}</h3>
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            source.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : source.status === 'paused'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {source.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{source.url}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-sm font-medium">{source.recordsToday}</p>
                        <p className="text-xs text-muted-foreground">records today</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{Math.round(source.reliability * 100)}%</p>
                        <p className="text-xs text-muted-foreground">reliability</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Activity className={`h-4 w-4 ${
                            source.health === 'healthy' ? 'text-green-500' :
                            source.health === 'degraded' ? 'text-yellow-500' :
                            'text-red-500'
                          }`} />
                          <span className="text-sm capitalize">{source.health}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{source.lastIngested}</p>
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
