import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/Badge";

interface RightPanelProps {
  children?: React.ReactNode;
  title?: string;
  onClose?: () => void;
}

export function RightPanel({
  children,
  title = "Details",
  onClose,
}: RightPanelProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        aria-label="Expand inspector"
        title="Expand inspector"
        className="hidden h-full w-10 items-center justify-center border-l border-border/70 bg-card/90 text-muted-foreground transition hover:bg-secondary/70 hover:text-foreground xl:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    );
  }

  return (
    <aside className="hidden h-screen w-[300px] flex-col border-l border-border/70 bg-card/92 backdrop-blur xl:flex">
      <div className="border-b border-border/70 px-4 py-4">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <div className="metis-kicker">Right Intelligence Region</div>
            <h2 className="text-[20px] font-semibold">{title}</h2>
          </div>
          <Badge variant="neutral">Live context</Badge>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCollapsed(true)}
            aria-label="Collapse inspector"
            title="Collapse inspector"
            className="rounded-md border border-transparent p-2 text-muted-foreground transition hover:border-border/80 hover:bg-secondary/70 hover:text-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          {onClose && (
            <button
              aria-label="Close inspector"
              title="Close inspector"
              onClick={onClose}
              className="rounded-md border border-transparent p-2 text-muted-foreground transition hover:border-border/80 hover:bg-secondary/70 hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {children || (
          <div className="metis-empty min-h-[260px] border-dashed bg-transparent">
            <p className="text-sm">Select an item to view details</p>
          </div>
        )}
      </div>
    </aside>
  );
}

// Pre-built sections for the right panel
export function MetadataSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 rounded-lg border border-border/70 bg-secondary/45 p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function MetadataItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge key={tag} variant="neutral">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
