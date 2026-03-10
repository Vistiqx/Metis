import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  HelpCircle,
  Search,
  Shield,
  Video,
} from "lucide-react";
import { MetadataSection, WorkspaceLayout } from "../components/layout";
import { OperationalSurfaceArchetype } from "../components/archetypes";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Panel } from "../components/ui/Panel";
import { SectionHeader } from "../components/ui/SectionHeader";

const docSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: BookOpen,
    articles: [
      { title: "Platform Overview", description: "Introduction to Metis OSINT Platform", readTime: "5 min" },
      { title: "Quick Start Guide", description: "Learn the basics in 10 minutes", readTime: "10 min" },
      { title: "User Interface Tour", description: "Navigate the workspace efficiently", readTime: "8 min" },
      { title: "Setting Up Your First Case", description: "Create and configure investigations", readTime: "15 min" },
    ],
  },
  {
    id: "features",
    title: "Core Features",
    icon: FileText,
    articles: [
      { title: "Investigations & Cases", description: "Manage cases and track progress", readTime: "12 min" },
      { title: "Event Management", description: "Track and analyze events", readTime: "10 min" },
      { title: "Graph Analysis", description: "Visualize relationships and networks", readTime: "15 min" },
      { title: "Evidence Management", description: "Store and analyze evidence", readTime: "8 min" },
      { title: "Watchlists", description: "Monitor entities of interest", readTime: "10 min" },
      { title: "Alert System", description: "Configure and respond to alerts", readTime: "12 min" },
    ],
  },
  {
    id: "data-sources",
    title: "Data Sources",
    icon: ExternalLink,
    articles: [
      { title: "Social Media Connectors", description: "Twitter, Facebook, Instagram, TikTok", readTime: "15 min" },
      { title: "RSS Feed Integration", description: "Monitor news and blog sources", readTime: "10 min" },
      { title: "Geospatial Sources", description: "Maps and location-based data", readTime: "12 min" },
      { title: "Custom API Connections", description: "Integrate third-party APIs", readTime: "20 min" },
    ],
  },
  {
    id: "advanced",
    title: "Advanced Topics",
    icon: Shield,
    articles: [
      { title: "AI Analysis Features", description: "Automated entity extraction and linking", readTime: "18 min" },
      { title: "Pattern Recognition", description: "Detect anomalies and patterns", readTime: "15 min" },
      { title: "Export & Reporting", description: "Generate comprehensive reports", readTime: "12 min" },
      { title: "API Reference", description: "Programmatic access to Metis", readTime: "25 min" },
    ],
  },
  {
    id: "help",
    title: "Help & Support",
    icon: HelpCircle,
    articles: [
      { title: "FAQ", description: "Frequently asked questions", readTime: "10 min" },
      { title: "Troubleshooting", description: "Common issues and solutions", readTime: "15 min" },
      { title: "Contact Support", description: "Get help from our team", readTime: "5 min" },
    ],
  },
];

const quickLinks = [
  { title: "Video Tutorials", icon: Video, count: 12 },
  { title: "API Documentation", icon: FileText, count: 48 },
  { title: "Best Practices", icon: Shield, count: 8 },
  { title: "Release Notes", icon: BookOpen, count: 24 },
];

export function Docs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>("getting-started");

  const visibleSections = useMemo(
    () =>
      docSections.map((section) => ({
        ...section,
        articles: section.articles.filter(
          (article) =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      })),
    [searchQuery],
  );

  return (
    <WorkspaceLayout
      dockContext="default"
      layer="platform"
      rightPanelTitle="Support"
      rightPanelContent={
        <>
          <MetadataSection title="Need Help?">
            <p className="text-sm text-muted-foreground">
              Contact support for workflow blockers that affect mission delivery or analyst access.
            </p>
          </MetadataSection>
          <MetadataSection title="Policy">
            <p className="text-sm text-muted-foreground">
              Community guidance remains secondary to official operational procedures.
            </p>
          </MetadataSection>
          <MetadataSection title="Actions">
            <div className="flex gap-2">
              <Button>Contact Support</Button>
              <Button variant="outline">Community Forum</Button>
            </div>
          </MetadataSection>
        </>
      }
    >
      <OperationalSurfaceArchetype
        header={
          <SectionHeader
            kicker="Knowledge Base"
            title="Documentation"
            subtitle="Operational guidance and platform references arranged as a dense knowledge workspace instead of a consumer docs landing page."
            meta={<Badge variant="gold">Report-ready reference</Badge>}
          />
        }
        commandStrip={
          <div className="metis-command-strip">
            <div className="relative min-w-[260px] flex-[2]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="metis-input h-11 w-full pl-10"
              />
            </div>
            {quickLinks.map((link) => (
              <div key={link.title} className="min-w-[120px] flex-1">
                <div className="flex items-center gap-2 text-primary">
                  <link.icon className="h-4 w-4" />
                  <span className="metis-micro-label text-primary/80">{link.title}</span>
                </div>
                <div className="mt-1 text-xl font-semibold text-foreground">{link.count}</div>
              </div>
            ))}
          </div>
        }
        leftRail={
          <Panel>
            <div className="mb-3">
              <div className="metis-kicker">Navigation</div>
              <h2 className="text-xl">Knowledge Domains</h2>
            </div>
            <div className="space-y-2.5">
              {docSections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setExpandedSection(section.id)}
                  className={`metis-list-row w-full text-left ${expandedSection === section.id ? "border-primary/35 bg-secondary/45" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <section.icon className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{section.title}</p>
                      <p className="text-xs text-muted-foreground">{section.articles.length} articles</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Panel>
        }
        centerPrimary={
          <Panel>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Reference Stack</div>
                <h2 className="text-2xl">Documentation Sections</h2>
              </div>
              <Badge variant="gold">Operational reference view</Badge>
            </div>
            <div className="space-y-3">
              {visibleSections.map((section) => {
                const isExpanded = expandedSection === section.id;

                return (
                  <div key={section.id} className="rounded-xl border border-border/80 bg-card/70">
                    <button
                      type="button"
                      onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <section.icon className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{section.title}</p>
                          <p className="text-xs text-muted-foreground">{section.articles.length} visible articles</p>
                        </div>
                      </div>
                      {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </button>

                    {isExpanded ? (
                      <div className="border-t border-border/70 px-4 py-3">
                        <div className="space-y-2">
                          {section.articles.map((article) => (
                            <div key={`${section.id}-${article.title}`} className="metis-list-row">
                              <div>
                                <p className="text-sm font-semibold text-foreground">{article.title}</p>
                                <p className="mt-1 text-xs text-muted-foreground">{article.description}</p>
                              </div>
                              <Badge variant="neutral">{article.readTime}</Badge>
                            </div>
                          ))}
                          {section.articles.length === 0 ? (
                            <div className="metis-pane-muted text-sm text-muted-foreground">No articles in this section match your current search.</div>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Panel>
        }
      />
    </WorkspaceLayout>
  );
}
