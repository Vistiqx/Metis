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
import { Badge } from '../components/ui/Badge'
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
  image: 'info',
  video: 'danger',
  document: 'warning',
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
      <div className="metis-page">
        <div className="metis-page-header">
          <div>
            <div className="metis-kicker">Evidence Registry</div>
            <h1 className="metis-title">Evidence</h1>
            <p className="metis-subtitle">Browse evidence by media type, chain context, and tagged analytical relevance.</p>
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

        <div className="metis-toolbar">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search evidence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="metis-input w-80 pl-10"
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
              <Badge variant="gold">{selectedEvidence.length} selected</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              aria-label="Grid view"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              aria-label="List view"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="metis-stat-grid">
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
                         <Badge variant={typeColors[item.type] as 'info' | 'danger' | 'warning'}>
                           <TypeIcon className="h-3 w-3" />
                           {item.format}
                         </Badge>
                        <span className="text-xs text-muted-foreground">{item.size}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Case: {item.caseId}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(tag => (
                          <span 
                            key={tag}
                            className="rounded-full border border-border/80 bg-secondary/60 px-2 py-1 text-xs"
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
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Preview evidence">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More evidence actions">
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
              <table className="metis-table">
                <thead>
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
                         className={`${
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
                           <Badge variant={typeColors[item.type] as 'info' | 'danger' | 'warning'}>
                             <TypeIcon className="h-3 w-3" />
                             {item.format}
                           </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">{item.caseId}</td>
                        <td className="px-4 py-3 text-sm">{item.size}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 2).map(tag => (
                              <span 
                                key={tag}
                                 className="rounded-full border border-border/80 bg-secondary/60 px-2 py-1 text-xs"
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
                            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Preview evidence">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Download evidence">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Delete evidence">
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
