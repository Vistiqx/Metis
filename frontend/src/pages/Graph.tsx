import { useState } from 'react'
import { Download, Filter, Fullscreen, Network, Plus, RefreshCw, Search, Settings, ZoomIn, ZoomOut } from 'lucide-react'
import { WorkspaceLayout } from '../components/layout'
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
  actor: 'bg-blue-500',
  event: 'bg-red-500',
  location: 'bg-green-500',
  evidence: 'bg-yellow-500',
  source: 'bg-purple-500',
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Graph Analysis</h1>
            <p className="text-muted-foreground">
              Visualize relationships between actors, events, and evidence
            </p>
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

        {/* Toolbar */}
        <div className="flex items-center justify-between rounded-lg border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search nodes..."
                className="h-9 w-64 rounded-md border bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-9 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
            <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.min(2, z + 0.1))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Fullscreen className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Graph Canvas */}
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
                className="relative h-[600px] w-full overflow-hidden rounded-lg border bg-muted/30"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
              >
                {/* Simple SVG Graph Visualization */}
                <svg className="h-full w-full">
                  {/* Draw edges */}
                  {mockEdges.map((edge, idx) => {
                    const fromNode = mockNodes.find(n => n.id === edge.from)
                    const toNode = mockNodes.find(n => n.id === edge.to)
                    if (!fromNode || !toNode) return null
                    return (
                      <g key={idx}>
                        <line
                          x1={fromNode.x}
                          y1={fromNode.y}
                          x2={toNode.x}
                          y2={toNode.y}
                          stroke="#94a3b8"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                        <text
                          x={(fromNode.x + toNode.x) / 2}
                          y={(fromNode.y + toNode.y) / 2 - 5}
                          className="fill-muted-foreground text-xs"
                          textAnchor="middle"
                        >
                          {edge.label}
                        </text>
                      </g>
                    )
                  })}
                  
                  {/* Draw nodes */}
                  {filteredNodes.map((node) => (
                    <g 
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      className="cursor-pointer"
                      onClick={() => setSelectedNode(node.id)}
                    >
                      <circle
                        r="25"
                        className={`${nodeColors[node.type]} ${selectedNode === node.id ? 'stroke-4 stroke-primary' : ''}`}
                        fill="currentColor"
                        fillOpacity="0.8"
                      />
                      <text
                        y="5"
                        className="fill-white text-xs font-medium"
                        textAnchor="middle"
                      >
                        {node.label.substring(0, 8)}
                      </text>
                      <text
                        y="40"
                        className="fill-muted-foreground text-xs"
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

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Legend */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(nodeColors).map(([type, color]) => (
                    <div key={type} className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${color}`} />
                      <span className="text-sm capitalize">{type}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Node Info */}
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
                          <p className="text-sm text-muted-foreground capitalize">Type: {node.type}</p>
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

            {/* Graph Stats */}
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
