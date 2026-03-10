import { useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Download,
  FileText,
  Filter,
  MoreVertical,
  Play,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react";
import {
  MetadataItem,
  MetadataSection,
  WorkspaceLayout,
} from "../components/layout";
import { OperationalSurfaceArchetype } from "../components/archetypes";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { CreateTaskDialog } from "../components/ui/Dialog";
import { Panel } from "../components/ui/Panel";
import { SectionHeader } from "../components/ui/SectionHeader";

interface Operation {
  id: string;
  title: string;
  description: string;
  type: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  assignee: string;
  caseId: string | null;
  dueDate: string;
  progress: number;
  createdAt: string;
}

const initialOperations: Operation[] = [
  {
    id: "OP-001",
    title: "Analyze District 7 Protest Footage",
    description: "Review and tag video evidence from protest events",
    type: "analysis",
    status: "in-progress",
    priority: "high",
    assignee: "Analyst A",
    caseId: "CASE-2024-001",
    dueDate: "Today",
    progress: 65,
    createdAt: "2 days ago",
  },
  {
    id: "OP-002",
    title: "Cross-reference Social Media Accounts",
    description: "Link social profiles across platforms for target network",
    type: "investigation",
    status: "pending",
    priority: "medium",
    assignee: "Analyst B",
    caseId: "CASE-2024-002",
    dueDate: "Tomorrow",
    progress: 0,
    createdAt: "1 day ago",
  },
  {
    id: "OP-003",
    title: "Generate Weekly Intelligence Report",
    description: "Compile findings from all active cases",
    type: "reporting",
    status: "completed",
    priority: "low",
    assignee: "Analyst A",
    caseId: null,
    dueDate: "Yesterday",
    progress: 100,
    createdAt: "5 days ago",
  },
  {
    id: "OP-004",
    title: "Verify Source Reliability",
    description: "Assess credibility of new RSS feed source",
    type: "verification",
    status: "in-progress",
    priority: "medium",
    assignee: "Reviewer C",
    caseId: "CASE-2024-003",
    dueDate: "In 2 days",
    progress: 30,
    createdAt: "3 days ago",
  },
  {
    id: "OP-005",
    title: "Update Watchlist Criteria",
    description: "Refine monitoring rules based on recent findings",
    type: "maintenance",
    status: "pending",
    priority: "high",
    assignee: "Analyst A",
    caseId: null,
    dueDate: "Today",
    progress: 0,
    createdAt: "1 day ago",
  },
];

const typeIcons: Record<string, React.ElementType> = {
  analysis: FileText,
  investigation: Search,
  reporting: FileText,
  verification: CheckCircle2,
  maintenance: Settings,
};

export function Operations() {
  const [operations, setOperations] = useState<Operation[]>(initialOperations);
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(initialOperations[0]?.id ?? "");

  const handleCreateTask = (taskData: {
    title: string;
    description: string;
    priority: string;
    type: string;
  }) => {
    const newTask: Operation = {
      id: `OP-${String(operations.length + 1).padStart(3, "0")}`,
      title: taskData.title,
      description: taskData.description,
      type: taskData.type,
      status: "pending",
      priority: taskData.priority as "low" | "medium" | "high",
      assignee: "Unassigned",
      caseId: null,
      dueDate: "Not set",
      progress: 0,
      createdAt: "Just now",
    };
    setOperations((current) => [newTask, ...current]);
    setSelectedId(newTask.id);
  };

  const filteredOperations = useMemo(
    () =>
      operations.filter((operation) => {
        const matchesFilter = filter === "all" || operation.status === filter;
        const matchesSearch =
          operation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          operation.id.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
      }),
    [filter, operations, searchQuery],
  );

  const selected =
    filteredOperations.find((operation) => operation.id === selectedId) ??
    filteredOperations[0] ??
    null;

  const stats = {
    pending: operations.filter((item) => item.status === "pending").length,
    inProgress: operations.filter((item) => item.status === "in-progress").length,
    completed: operations.filter((item) => item.status === "completed").length,
    highPriority: operations.filter(
      (item) => item.priority === "high" && item.status !== "completed",
    ).length,
  };

  return (
    <WorkspaceLayout
      dockContext="operations"
      layer="platform"
      rightPanelTitle="Selected Task"
      rightPanelContent={
        selected ? (
          <>
            <MetadataSection title="Selected Task">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{selected.id}</span>
                <Badge variant="neutral">{selected.status}</Badge>
                <Badge variant={selected.priority === "high" ? "gold" : "neutral"}>
                  {selected.priority}
                </Badge>
              </div>
              <p className="text-base font-semibold text-foreground">{selected.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{selected.description}</p>
            </MetadataSection>
            <MetadataSection title="Operational Detail">
              <MetadataItem label="Assignee" value={selected.assignee} />
              <MetadataItem label="Due date" value={selected.dueDate} />
              <MetadataItem label="Created" value={selected.createdAt} />
              <MetadataItem label="Linked case" value={selected.caseId ?? "None"} />
            </MetadataSection>
            <MetadataSection title="Actions">
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="sm">
                  <Play className="mr-1 h-4 w-4" /> Start
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="mr-1 h-4 w-4" /> More
                </Button>
              </div>
            </MetadataSection>
          </>
        ) : undefined
      }
    >
      <OperationalSurfaceArchetype
        header={
          <SectionHeader
            kicker="Task Orchestration"
            title="Operations"
            subtitle="Administrative operations surface with compact task sequencing, clear ownership, and a standing detail region for the selected work item."
            meta={
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </div>
            }
          />
        }
        commandStrip={
          <div className="metis-command-strip">
            <div className="min-w-[150px] flex-1">
              <div className="metis-micro-label">Pending</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">{stats.pending}</div>
            </div>
            <div className="min-w-[150px] flex-1">
              <div className="metis-micro-label">In progress</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">{stats.inProgress}</div>
            </div>
            <div className="min-w-[150px] flex-1">
              <div className="metis-micro-label">Completed</div>
              <div className="mt-1 text-2xl font-semibold text-foreground">{stats.completed}</div>
            </div>
            <div className="min-w-[220px] flex-1">
              <div className="metis-micro-label">Operations note</div>
              <p className="mt-2 text-sm text-muted-foreground">
                This is a platform layer surface, so status and priority stay in neutral authority styling.
              </p>
            </div>
          </div>
        }
        leftRail={
          <Panel>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Queue Controls</div>
                <h2 className="text-xl">Filter Scope</h2>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Refine
              </Button>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tasks"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="metis-input w-full pl-10"
                />
              </div>
              <div className="metis-tablist w-full justify-between">
                {(["all", "pending", "in-progress", "completed"] as const).map((value) => (
                  <Button
                    key={value}
                    variant={filter === value ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilter(value)}
                    className="flex-1"
                  >
                    {value}
                  </Button>
                ))}
              </div>
              <div className="metis-pane-muted text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>High-priority open</span>
                  <Badge variant="gold">{stats.highPriority}</Badge>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>Visible rows</span>
                  <Badge variant="neutral">{filteredOperations.length}</Badge>
                </div>
              </div>
            </div>
          </Panel>
        }
        centerPrimary={
          <Panel>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="metis-kicker">Task Queue</div>
                <h2 className="text-2xl">Operational Worklist</h2>
              </div>
              <Badge variant="gold">Administrative clarity</Badge>
            </div>

            <div className="space-y-3">
              {filteredOperations.map((operation) => {
                const TypeIcon = typeIcons[operation.type] || FileText;

                return (
                  <button
                    key={operation.id}
                    type="button"
                    onClick={() => setSelectedId(operation.id)}
                    className={`metis-list-row w-full text-left ${selected?.id === operation.id ? "border-primary/35 bg-secondary/45" : ""}`}
                  >
                    <div className="relative flex h-12 w-12 items-center justify-center">
                      <svg className="h-12 w-12 -rotate-90">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/20" />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray={`${operation.progress * 1.26} 126`}
                          className="text-primary"
                        />
                      </svg>
                      <span className="absolute text-xs font-medium text-foreground">{operation.progress}%</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">{operation.id}</span>
                        <Badge variant="neutral">{operation.status}</Badge>
                        <Badge variant={operation.priority === "high" ? "gold" : "neutral"}>{operation.priority}</Badge>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{operation.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{operation.description}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <TypeIcon className="h-3 w-3" /> {operation.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" /> {operation.assignee}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Due {operation.dueDate}
                        </span>
                        {operation.caseId ? <span>{operation.caseId}</span> : null}
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition hover:border-border/80 hover:bg-secondary/70 hover:text-foreground"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </span>
                  </button>
                );
              })}
            </div>

            {filteredOperations.length === 0 ? (
              <div className="metis-empty mt-4 border-dashed bg-transparent py-12">
                <p className="text-muted-foreground">No tasks found matching your search.</p>
              </div>
            ) : null}
          </Panel>
        }
      />

      <CreateTaskDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleCreateTask}
      />
    </WorkspaceLayout>
  );
}
