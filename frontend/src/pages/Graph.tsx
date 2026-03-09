import { useState } from 'react'
import { Download, Filter, Fullscreen, Network, Plus, RefreshCw, Search, Settings, ZoomIn, ZoomOut } from 'lucide-react'
import { WorkspaceLayout } from '../components/layout'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

// Mock data for graph nodes and edges
const mockNodes = [
  { id: 1, label: 'Actor A', type: 'actor', x: 100, y: 100, connections: 5 },
  { id: 2, label: 'Event 1', type: 'event', x: 250, y: 150, connections: 3 },
  { id: 3, label: 'Location X', type: 'location', x: 400, y: 100, connections: 4 },
  { id: 4, label: 'Actor B', type: 'actor', x: 150, y: 300, connections: 2 },
  { id: 5, label: 'Evidence 1', type: 'evidence', x: 350, y: 250, connections: 1 },
  { id: 6, label: 'Actor C', type: 'actor', x: 500, y: 200, connections: 3 },
  { id: 7, label: 'Event 2', type: 'event', x: 300, y: 400, connections: 2 },
  { id: 8, label: 'Source A', type: 'source', x: 50, y: 200, connections: 2 },
]

const mockEdges = [
  { from: 1, to: 2, label: 'participated' },
  { from: 2, to: 3, label: 'occurred at' },
  { from: 1, to: 4, label: 'connected to' },
  { from: 2, to: 5, label: 'has evidence' },
  { from: 4, to: 7, label: 'participated' },
  { from: 6, to: 3, label: 'visited' },
  { from: 8, to: 1, label: 'reported' },
  { from: 3, to: 6, label: 'linked' },
]

const nodeColors: Record<string, string> = {
  actor: '#d4a73a',
  event: '#ff7a18',
  location: '#32d1cc',
  evidence: '#ffd400',
  source: '#ff2d8f',
}

export function Graph() {
  const [zoom, setZoom] = useState(1)
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const filteredNodes = filter === 'all' 
    ? mockNodes 
    : mockNodes.filter(n => n.type === filter)

  return (
    <WorkspaceLayout dockContext="graph" showRightPanel={true}>
      <div className="metis-page">
        <div className="metis-page-header">
          <div>
            <div className="metis-kicker">Explorer Layout</div>
            <h1 className="metis-title">Graph Analysis</h1>
            <p className="metis-subtitle">Relationship discovery workspace with disciplined signal colors and a premium focal canvas.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Node
            </Button>
          </div>
        </div>

        <div className="metis-toolbar">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search nodes..."
                className="metis-input h-10 w-64 pl-10"
              />
            </div>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="metis-input h-10 rounded-xl px-3"
            >
              <option value="all">All Types</option>
              <option value="actor">Actors</option>
              <option value="event">Events</option>
              <option value="location">Locations</option>
              <option value="evidence">Evidence</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">Wisdom Gold focus</Badge>
            <Button variant="ghost" size="icon" aria-label="Zoom out" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
            <Button variant="ghost" size="icon" aria-label="Zoom in" onClick={() => setZoom(z => Math.min(2, z + 0.1))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Toggle fullscreen">
              <Fullscreen className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Refresh graph">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Graph settings">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-4">
          <Card className="lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Network Visualization
              </CardTitle>
              <CardDescription>
                {filteredNodes.length} nodes, {mockEdges.length} relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="relative h-[620px] w-full overflow-hidden rounded-2xl border border-border/80 bg-metis-grid bg-[size:32px_32px] bg-secondary/35"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary/8 to-transparent" />
                <svg className="h-full w-full" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}>
                  {mockEdges.map((edge) => {
                    const fromNode = mockNodes.find(n => n.id === edge.from)
                    const toNode = mockNodes.find(n => n.id === edge.to)
                    if (!fromNode || !toNode) return null
                    return (
                      <g key={`${edge.from}-${edge.to}-${edge.label}`}>
                        <line
                          x1={fromNode.x}
                          y1={fromNode.y}
                          x2={toNode.x}
                          y2={toNode.y}
                          stroke="rgba(148, 163, 184, 0.45)"
                          strokeWidth="1.5"
                          strokeDasharray="4,5"
                        />
                        <text
                          x={(fromNode.x + toNode.x) / 2}
                          y={(fromNode.y + toNode.y) / 2 - 5}
                          className="fill-slate-400 text-[10px]"
                          textAnchor="middle"
                        >
                          {edge.label}
                        </text>
                      </g>
                    )
                  })}
                  
                  {filteredNodes.map((node) => (
                    <g 
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      className="cursor-pointer"
                      onClick={() => setSelectedNode(node.id)}
                    >
                      <circle
                        r="25"
                        fill={nodeColors[node.type]}
                        fillOpacity={node.type === 'actor' ? '0.95' : '0.82'}
                        stroke={selectedNode === node.id ? '#ffd977' : 'rgba(15, 23, 42, 0.8)'}
                        strokeWidth={selectedNode === node.id ? '4' : '2'}
                      />
                      <text
                        y="5"
                        className="fill-slate-950 text-[11px] font-semibold"
                        textAnchor="middle"
                      >
                        {node.label.substring(0, 8)}
                      </text>
                      <text
                        y="40"
                        className="fill-slate-300 text-[10px] uppercase"
                        textAnchor="middle"
                      >
                        {node.type}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(nodeColors).map(([type, color]) => (
                    <div key={type} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-sm capitalize">{type}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Node Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedNode ? (
                    <div className="space-y-2">
                      {(() => {
                        const node = mockNodes.find(n => n.id === selectedNode)
                      if (!node) return null
                        return (
                          <>
                            <p className="font-medium">{node.label}</p>
                            <Badge variant={node.type === 'actor' ? 'gold' : 'info'}>{node.type}</Badge>
                            <p className="text-sm text-muted-foreground">Connections: {node.connections}</p>
                          </>
                        )
                    })()}
                    <div className="pt-2">
                      <Button size="sm" className="w-full">View Details</Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Click a node to view details</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Graph Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Nodes</span>
                    <span className="font-medium">{mockNodes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Relationships</span>
                    <span className="font-medium">{mockEdges.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Clusters</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Density</span>
                    <span className="font-medium">0.34</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  )
}
