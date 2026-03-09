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
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
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
      <div className="metis-page">
        <div className="metis-page-header">
          <div>
            <div className="metis-kicker">Knowledge Base</div>
            <h1 className="metis-title">Documentation</h1>
            <p className="metis-subtitle">Operational guidance, report workflows, and platform references for analysts and administrators.</p>
          </div>
          <Badge variant="gold">Report-ready reference</Badge>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="metis-input h-12 w-full pl-10 text-base"
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
                      {section.articles.map((article) => (
                        <div
                          key={`${section.id}-${article.title}`}
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

        <Card className="bg-secondary/45">
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
                  <div className="mt-4 flex gap-3">
                    <Button>
                      Contact Support
                    </Button>
                    <Button variant="outline">
                      Community Forum
                    </Button>
                  </div>
                </div>
              </div>
          </CardContent>
        </Card>
      </div>
    </WorkspaceLayout>
  )
}
