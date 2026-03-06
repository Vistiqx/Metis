import { useState } from 'react'
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Search, 
  Video,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Shield
} from 'lucide-react'
import { WorkspaceLayout } from '../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'

const docSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: BookOpen,
    articles: [
      { title: 'Platform Overview', description: 'Introduction to Metis OSINT Platform', readTime: '5 min' },
      { title: 'Quick Start Guide', description: 'Learn the basics in 10 minutes', readTime: '10 min' },
      { title: 'User Interface Tour', description: 'Navigate the workspace efficiently', readTime: '8 min' },
      { title: 'Setting Up Your First Case', description: 'Create and configure investigations', readTime: '15 min' },
    ]
  },
  {
    id: 'features',
    title: 'Core Features',
    icon: FileText,
    articles: [
      { title: 'Investigations & Cases', description: 'Manage cases and track progress', readTime: '12 min' },
      { title: 'Event Management', description: 'Track and analyze events', readTime: '10 min' },
      { title: 'Graph Analysis', description: 'Visualize relationships and networks', readTime: '15 min' },
      { title: 'Evidence Management', description: 'Store and analyze evidence', readTime: '8 min' },
      { title: 'Watchlists', description: 'Monitor entities of interest', readTime: '10 min' },
      { title: 'Alert System', description: 'Configure and respond to alerts', readTime: '12 min' },
    ]
  },
  {
    id: 'data-sources',
    title: 'Data Sources',
    icon: ExternalLink,
    articles: [
      { title: 'Social Media Connectors', description: 'Twitter, Facebook, Instagram, TikTok', readTime: '15 min' },
      { title: 'RSS Feed Integration', description: 'Monitor news and blog sources', readTime: '10 min' },
      { title: 'Geospatial Sources', description: 'Maps and location-based data', readTime: '12 min' },
      { title: 'Custom API Connections', description: 'Integrate third-party APIs', readTime: '20 min' },
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Topics',
    icon: Shield,
    articles: [
      { title: 'AI Analysis Features', description: 'Automated entity extraction and linking', readTime: '18 min' },
      { title: 'Pattern Recognition', description: 'Detect anomalies and patterns', readTime: '15 min' },
      { title: 'Export & Reporting', description: 'Generate comprehensive reports', readTime: '12 min' },
      { title: 'API Reference', description: 'Programmatic access to Metis', readTime: '25 min' },
    ]
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: HelpCircle,
    articles: [
      { title: 'FAQ', description: 'Frequently asked questions', readTime: '10 min' },
      { title: 'Troubleshooting', description: 'Common issues and solutions', readTime: '15 min' },
      { title: 'Contact Support', description: 'Get help from our team', readTime: '5 min' },
    ]
  },
]

const quickLinks = [
  { title: 'Video Tutorials', icon: Video, count: 12 },
  { title: 'API Documentation', icon: FileText, count: 48 },
  { title: 'Best Practices', icon: Shield, count: 8 },
  { title: 'Release Notes', icon: BookOpen, count: 24 },
]

export function Docs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSection, setExpandedSection] = useState<string | null>('getting-started')

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id)
  }

  return (
    <WorkspaceLayout dockContext="default" showRightPanel={false}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground">
            Learn how to use Metis OSINT Platform effectively
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 w-full rounded-lg border bg-background pl-10 pr-4 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Quick Links */}
        <div className="grid gap-4 md:grid-cols-4">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Card key={link.title} className="cursor-pointer hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{link.title}</p>
                      <p className="text-xs text-muted-foreground">{link.count} articles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Documentation Sections */}
        <div className="space-y-4">
          {docSections.map((section) => {
            const Icon = section.icon
            const isExpanded = expandedSection === section.id
            
            return (
              <Card key={section.id} className="overflow-hidden">
                <CardHeader 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <CardDescription>{section.articles.length} articles</CardDescription>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                
                {isExpanded && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {section.articles.map((article, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                          <div>
                            <p className="font-medium">{article.title}</p>
                            <p className="text-sm text-muted-foreground">{article.description}</p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <BookOpen className="h-3 w-3" />
                            {article.readTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {/* Help Box */}
        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Need Help?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Can't find what you're looking for? Contact our support team or check the community forum for assistance.
                </p>
                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                    Contact Support
                  </button>
                  <button className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-muted">
                    Community Forum
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </WorkspaceLayout>
  )
}
