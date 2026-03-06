import { useState } from 'react'
import { 
  Download, 
  Eye, 
  FileText, 
  Filter, 
  Grid3X3, 
  Image as ImageIcon, 
  List, 
  MoreVertical, 
  Search, 
  Tag,
  Trash2,
  Upload,
  Video
} from 'lucide-react'
import { WorkspaceLayout } from '../components/layout'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

// Mock evidence data
const mockEvidence = [
  { 
    id: 'EV-001', 
    title: 'Protest Photo Set A', 
    type: 'image', 
    format: 'JPG', 
    size: '12.4 MB',
    caseId: 'CASE-2024-001',
    tags: ['protest', 'district-7', 'photo'],
    uploaded: '2 hours ago',
    thumbnail: '📷'
  },
  { 
    id: 'EV-002', 
    title: 'Social Media Video', 
    type: 'video', 
    format: 'MP4', 
    size: '45.2 MB',
    caseId: 'CASE-2024-001',
    tags: ['video', 'twitter', 'viral'],
    uploaded: '5 hours ago',
    thumbnail: '🎥'
  },
  { 
    id: 'EV-003', 
    title: 'Network Communication Log', 
    type: 'document', 
    format: 'PDF', 
    size: '2.1 MB',
    caseId: 'CASE-2024-002',
    tags: ['document', 'communication', 'log'],
    uploaded: '1 day ago',
    thumbnail: '📄'
  },
  { 
    id: 'EV-004', 
    title: 'Aerial Surveillance', 
    type: 'image', 
    format: 'PNG', 
    size: '8.7 MB',
    caseId: 'CASE-2024-004',
    tags: ['drone', 'aerial', 'surveillance'],
    uploaded: '2 days ago',
    thumbnail: '📷'
  },
  { 
    id: 'EV-005', 
    title: 'Interview Recording', 
    type: 'video', 
    format: 'MOV', 
    size: '156.3 MB',
    caseId: 'CASE-2024-002',
    tags: ['interview', 'audio', 'witness'],
    uploaded: '3 days ago',
    thumbnail: '🎥'
  },
  { 
    id: 'EV-006', 
    title: 'Financial Records', 
    type: 'document', 
    format: 'XLSX', 
    size: '1.2 MB',
    caseId: 'CASE-2024-003',
    tags: ['financial', 'spreadsheet', 'records'],
    uploaded: '4 days ago',
    thumbnail: '📊'
  },
]

const typeIcons: Record<string, React.ElementType> = {
  image: ImageIcon,
  video: Video,
  document: FileText,
}

const typeColors: Record<string, string> = {
  image: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  video: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  document: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
}

export function Evidence() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEvidence = mockEvidence.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const toggleSelection = (id: string) => {
    setSelectedEvidence(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  return (
    <WorkspaceLayout dockContext="evidence" showRightPanel={true}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Evidence</h1>
            <p className="text-muted-foreground">
              Browse, analyze, and manage case evidence
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload
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
                placeholder="Search evidence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-80 rounded-lg border bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline">
              <Tag className="mr-2 h-4 w-4" />
              Tags
            </Button>
            {selectedEvidence.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {selectedEvidence.length} selected
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Evidence</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockEvidence.length}</div>
              <p className="text-xs text-muted-foreground">Across all cases</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Images</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockEvidence.filter(e => e.type === 'image').length}
              </div>
              <p className="text-xs text-muted-foreground">Photos & screenshots</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Videos</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockEvidence.filter(e => e.type === 'video').length}
              </div>
              <p className="text-xs text-muted-foreground">Recordings & clips</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">226.9 MB</div>
              <p className="text-xs text-muted-foreground">Of 10 GB limit</p>
            </CardContent>
          </Card>
        </div>

        {/* Evidence Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvidence.map((item) => {
              const TypeIcon = typeIcons[item.type]
              return (
                <Card 
                  key={item.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedEvidence.includes(item.id) ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => toggleSelection(item.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-2xl">
                          {item.thumbnail}
                        </div>
                        <div>
                          <p className="text-xs font-mono text-muted-foreground">{item.id}</p>
                          <CardTitle className="text-base">{item.title}</CardTitle>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedEvidence.includes(item.id)}
                        onChange={() => {}}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[item.type]}`}>
                          <TypeIcon className="mr-1 h-3 w-3" />
                          {item.format}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.size}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Case: {item.caseId}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(tag => (
                          <span 
                            key={tag}
                            className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-muted-foreground">
                          {item.uploaded}
                        </span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="w-12 px-4 py-3"></th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Evidence</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Case</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Size</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Tags</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Uploaded</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvidence.map((item) => {
                    const TypeIcon = typeIcons[item.type]
                    return (
                      <tr 
                        key={item.id}
                        className={`border-b last:border-0 hover:bg-muted/50 ${
                          selectedEvidence.includes(item.id) ? 'bg-primary/5' : ''
                        }`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedEvidence.includes(item.id)}
                            onChange={() => toggleSelection(item.id)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{item.thumbnail}</div>
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[item.type]}`}>
                            <TypeIcon className="mr-1 h-3 w-3" />
                            {item.format}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{item.caseId}</td>
                        <td className="px-4 py-3 text-sm">{item.size}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 2).map(tag => (
                              <span 
                                key={tag}
                                className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{item.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{item.uploaded}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </div>
    </WorkspaceLayout>
  )
}
