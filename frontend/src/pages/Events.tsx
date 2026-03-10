import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  MapPin,
  Plus,
  Search,
  Shield,
  XCircle,
} from "lucide-react";
import {
  WorkspaceLayout,
  MetadataItem,
  MetadataSection,
} from "../components/layout";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { CreateEventDialog } from "../components/ui/Dialog";
import { SectionHeader } from "../components/ui/SectionHeader";
import { SignalBadge } from "../components/ui/SignalBadge";
import { SignalTag } from "../components/ui/SignalTag";

interface Event {
  id: string;
  title: string;
  type: string;
  status: "confirmed" | "monitoring";
  severity: "high" | "medium" | "low";
  location: string;
  occurredAt: string;
  confidence: number;
  evidence: number;
  caseId: string;
}

const initialEvents: Event[] = [
  {
    id: "EVT-001",
    title: "Protest at City Hall",
    type: "protest",
    status: "confirmed",
    severity: "high",
    location: "City Hall, District 7",
    occurredAt: "2024-03-06 14:00",
    confidence: 0.92,
    evidence: 12,
    caseId: "CASE-2024-001",
  },
  {
    id: "EVT-002",
    title: "Organizer Meeting",
    type: "meeting",
    status: "confirmed",
    severity: "medium",
    location: "Community Center",
    occurredAt: "2024-03-05 18:30",
    confidence: 0.78,
    evidence: 5,
    caseId: "CASE-2024-001",
  },
  {
    id: "EVT-003",
    title: "Social Media Campaign",
    type: "viral",
    status: "monitoring",
    severity: "low",
    location: "Online",
    occurredAt: "2024-03-04 09:00",
    confidence: 0.65,
    evidence: 23,
    caseId: "CASE-2024-002",
  },
];

const mockCandidates = [
  {
    id: "CAND-001",
    title: "Gathering in Central Park",
    confidence: 0.73,
    sources: 4,
    location: "Central Park, District 3",
    signals: [
      "coordination_language",
      "temporal_reference",
      "location_mention",
    ],
    firstSeen: "2 hours ago",
  },
  {
    id: "CAND-002",
    title: "Transport Disruption Planned",
    confidence: 0.58,
    sources: 2,
    location: "Metro Station, District 5",
    signals: ["escalation_language", "organizer_account"],
    firstSeen: "4 hours ago",
  },
  {
    id: "CAND-003",
    title: "Online Coordination Activity",
    confidence: 0.41,
    sources: 3,
    location: "Multiple locations",
    signals: ["volume_spike", "coordination_language"],
    firstSeen: "6 hours ago",
  },
];

export function Events() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<"events" | "candidates">("events");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateEvent = (eventData: {
    title: string;
    type: string;
    location: string;
    description: string;
  }) => {
    const newEvent: Event = {
      id: `EVT-${String(events.length + 1).padStart(3, "0")}`,
      title: eventData.title,
      type: eventData.type,
      status: "confirmed",
      severity: "medium",
      location: eventData.location || "Unknown",
      occurredAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      confidence: 0.85,
      evidence: 0,
      caseId: "Unassigned",
    };
    setEvents([newEvent, ...events]);
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const rightPanelContent = selectedEvent ? (
    <>
      <MetadataSection title="Event Details">
        <MetadataItem label="ID" value={selectedEvent.id} />
        <MetadataItem label="Type" value={selectedEvent.type} />
        <MetadataItem label="Status" value={selectedEvent.status} />
        <MetadataItem label="Severity" value={selectedEvent.severity} />
        <MetadataItem
          label="Confidence"
          value={`${Math.round(selectedEvent.confidence * 100)}%`}
        />
      </MetadataSection>

      <MetadataSection title="Location & Time">
        <MetadataItem label="Location" value={selectedEvent.location} />
        <MetadataItem label="Occurred" value={selectedEvent.occurredAt} />
      </MetadataSection>

      <MetadataSection title="Related">
        <MetadataItem label="Evidence" value={selectedEvent.evidence} />
        <MetadataItem label="Case" value={selectedEvent.caseId} />
      </MetadataSection>
    </>
  ) : (
    <div className="text-center text-muted-foreground">
      <p className="text-sm">Select an event to view details</p>
    </div>
  );

  return (
    <WorkspaceLayout
      dockContext="event"
      rightPanelContent={rightPanelContent}
      rightPanelTitle={selectedEvent ? "Event Details" : "Details"}
    >
      <div className="metis-page">
        <SectionHeader
          kicker="Event Intake"
          title="Events"
          subtitle="Review confirmed events, inspect candidate signals, and promote evidence-backed findings."
          meta={
            <div className="flex items-center gap-2">
              <div className="metis-tablist">
                <button
                  onClick={() => setActiveTab("events")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    activeTab === "events"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Events ({events.length})
                </button>
                <button
                  onClick={() => setActiveTab("candidates")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    activeTab === "candidates"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Candidates ({mockCandidates.length})
                </button>
              </div>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Event
              </Button>
            </div>
          }
        />

        <div className="metis-toolbar">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="metis-input w-full pl-10"
            />
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="gold">{activeTab}</Badge>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {activeTab === "events" ? (
          <div className="grid gap-4">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className={`cursor-pointer transition-all hover:border-primary/40 hover:bg-secondary/40 ${
                  selectedEvent?.id === event.id
                    ? "border-primary ring-1 ring-primary"
                    : ""
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <SignalBadge
                        tone={
                          event.severity === "high"
                            ? "anomaly"
                            : event.severity === "medium"
                              ? "financial"
                              : "emerging"
                        }
                        dot
                        className="mt-0.5"
                      >
                        {event.severity}
                      </SignalBadge>
                      <div>
                        <p className="text-xs font-mono text-muted-foreground">
                          {event.id}
                        </p>
                        <CardTitle className="text-lg mt-1">
                          {event.title}
                        </CardTitle>
                      </div>
                    </div>
                    <div className="flex gap-2">
                        <SignalBadge
                          tone={
                            event.status === "confirmed"
                              ? "confirmed"
                              : "emerging"
                          }
                        >
                        {event.status}
                      </SignalBadge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {event.occurredAt}
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      {Math.round(event.confidence * 100)}% confidence
                    </div>
                    <div className="ml-auto font-semibold text-foreground">
                      {event.evidence} evidence items
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredEvents.length === 0 && (
              <div className="metis-empty border-dashed bg-transparent py-12">
                <p className="text-muted-foreground">
                  No events found matching your search.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {mockCandidates.map((candidate) => (
              <Card key={candidate.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-mono text-muted-foreground">
                        {candidate.id}
                      </p>
                      <CardTitle className="text-lg mt-1">
                        {candidate.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {Math.round(candidate.confidence * 100)}% confidence
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        First seen {candidate.firstSeen}
                      </div>
                      <div>{candidate.sources} sources</div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {candidate.signals.map((signal) => (
                        <SignalTag
                          key={signal}
                          tone="emerging"
                          className="capitalize"
                        >
                          {signal.replace("_", " ")}
                        </SignalTag>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="h-8">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Promote
                      </Button>
                      <Button size="sm" variant="outline" className="h-8">
                        <Plus className="mr-1 h-3 w-3" />
                        Merge
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-muted-foreground"
                      >
                        <XCircle className="mr-1 h-3 w-3" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Event Dialog */}
      <CreateEventDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleCreateEvent}
      />
    </WorkspaceLayout>
  );
}
