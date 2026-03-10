import { useState } from "react";
import {
  BookOpen,
  Calendar,
  Download,
  Edit,
  FileText,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Share2,
  Tag,
  Trash2,
  Users,
} from "lucide-react";
import { WorkspaceLayout } from "../components/layout";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";

// Mock narratives data
const mockNarratives = [
  {
    id: "NAR-001",
    title: "District 7 Protest Timeline",
    description:
      "Chronological account of events leading up to and during the protest",
    status: "published",
    author: "Analyst A",
    caseId: "CASE-2024-001",
    events: 12,
    actors: 8,
    tags: ["protest", "timeline", "analysis"],
    lastModified: "2 hours ago",
    createdAt: "5 days ago",
    views: 45,
  },
  {
    id: "NAR-002",
    title: "Organizer Network Connections",
    description: "Analysis of relationships between key protest organizers",
    status: "draft",
    author: "Analyst B",
    caseId: "CASE-2024-002",
    events: 24,
    actors: 15,
    tags: ["network", "organizers", "connections"],
    lastModified: "1 day ago",
    createdAt: "3 days ago",
    views: 0,
  },
  {
    id: "NAR-003",
    title: "Social Media Campaign Impact",
    description: "Assessment of social media influence on event participation",
    status: "published",
    author: "Analyst A",
    caseId: "CASE-2024-003",
    events: 18,
    actors: 32,
    tags: ["social-media", "impact", "analysis"],
    lastModified: "3 days ago",
    createdAt: "1 week ago",
    views: 128,
  },
  {
    id: "NAR-004",
    title: "Cross-Border Activity Analysis",
    description: "Investigation of international connections and movements",
    status: "review",
    author: "Reviewer C",
    caseId: "CASE-2024-004",
    events: 9,
    actors: 6,
    tags: ["cross-border", "international", "tracking"],
    lastModified: "5 hours ago",
    createdAt: "2 days ago",
    views: 12,
  },
  {
    id: "NAR-005",
    title: "Evidence Correlation Report",
    description:
      "Correlation of physical and digital evidence from multiple sources",
    status: "draft",
    author: "Analyst B",
    caseId: "CASE-2024-001",
    events: 15,
    actors: 10,
    tags: ["evidence", "correlation", "sources"],
    lastModified: "12 hours ago",
    createdAt: "4 days ago",
    views: 0,
  },
];

export function Narratives() {
  const [filter, setFilter] = useState<
    "all" | "published" | "draft" | "review"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNarratives = mockNarratives.filter((narrative) => {
    const matchesFilter = filter === "all" || narrative.status === filter;
    const matchesSearch =
      narrative.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      narrative.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    published: mockNarratives.filter((n) => n.status === "published").length,
    drafts: mockNarratives.filter((n) => n.status === "draft").length,
    review: mockNarratives.filter((n) => n.status === "review").length,
    totalViews: mockNarratives.reduce((acc, n) => acc + n.views, 0),
  };

  return (
    <WorkspaceLayout dockContext="narratives" showRightPanel={true}>
      <div className="metis-page">
        <div className="metis-page-header">
          <div>
            <div className="metis-kicker">Reporting</div>
            <h1 className="metis-title">Narratives</h1>
            <p className="metis-subtitle">
              Draft, review, and publish report-ready analytical narratives
              grounded in live case data.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Narrative
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.published}</div>
              <p className="text-xs text-muted-foreground">Live narratives</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.drafts}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Review</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.review}</div>
              <p className="text-xs text-muted-foreground">Pending approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews}</div>
              <p className="text-xs text-muted-foreground">All narratives</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search narratives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="metis-input w-full pl-10"
              />
            </div>
            <div className="flex gap-1 rounded-lg border bg-card p-1">
              <Button
                variant={filter === "all" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant={filter === "published" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter("published")}
              >
                Published
              </Button>
              <Button
                variant={filter === "draft" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter("draft")}
              >
                Drafts
              </Button>
              <Button
                variant={filter === "review" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter("review")}
              >
                Review
              </Button>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Narratives Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredNarratives.map((narrative) => (
            <Card
              key={narrative.id}
              className="hover:border-primary/50 transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-mono text-muted-foreground">
                        {narrative.id}
                      </p>
                      <Badge
                        variant={
                          narrative.status === "published" ? "gold" : "neutral"
                        }
                      >
                        {narrative.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-1">
                      {narrative.title}
                    </CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="Share narrative"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="More narrative actions"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {narrative.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{narrative.events} events</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{narrative.actors} actors</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{narrative.views} views</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {narrative.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-border/80 bg-secondary/60 px-2 py-1 text-xs"
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>By {narrative.author}</span>
                      {narrative.caseId && <span>{narrative.caseId}</span>}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Delete narrative"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
