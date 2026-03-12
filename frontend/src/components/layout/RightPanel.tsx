import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/Badge";

interface RightPanelProps {
  children?: React.ReactNode;
  isDrawerOpen?: boolean;
  title?: string;
  onClose?: () => void;
}

export function RightPanel({
  children,
  isDrawerOpen = false,
  title = "Details",
  onClose,
}: RightPanelProps) {
  const [collapsed, setCollapsed] = useState(false);

  const panelContent = (
    <>
      <div className="border-b border-border/70 px-4 py-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="metis-kicker">Right Intelligence Region</div>
            <h2 className="text-[16px] font-semibold uppercase tracking-[0.1em] text-foreground/95">
              {title}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCollapsed(true)}
            aria-label="Collapse inspector"
            title="Collapse inspector"
            className="hidden rounded-md border border-transparent p-2 text-muted-foreground transition hover:border-border/80 hover:bg-secondary/70 hover:text-foreground [@media(min-width:1440px)]:inline-flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          {onClose ? (
            <button
              aria-label="Close inspector"
              title="Close inspector"
              onClick={onClose}
              className="rounded-md border border-transparent p-2 text-muted-foreground transition hover:border-border/80 hover:bg-secondary/70 hover:text-foreground [@media(min-width:1440px)]:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {children || (
          <div className="metis-empty min-h-[260px] border-dashed bg-transparent">
            <p className="text-sm">Select an item to view details</p>
          </div>
        )}
      </div>
    </>
  );

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        aria-label="Expand inspector"
        title="Expand inspector"
        className="hidden h-full w-10 items-center justify-center border-l border-border/70 bg-card/90 text-muted-foreground transition hover:bg-secondary/70 hover:text-foreground [@media(min-width:1440px)]:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    );
  }

  return (
    <>
      <div
        role="button"
        tabIndex={isDrawerOpen ? 0 : -1}
        aria-hidden={!isDrawerOpen}
        className={`fixed inset-0 z-40 bg-[rgba(6,8,12,0.62)] backdrop-blur-[2px] transition-opacity duration-200 [@media(min-width:1440px)]:hidden ${
          isDrawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClose?.();
          }
        }}
      />

      <aside
        className={`metis-right-panel fixed inset-y-0 right-0 z-50 flex w-[min(22rem,calc(100vw-1rem))] flex-col border-l border-border/70 bg-card/95 shadow-[-18px_0_48px_rgba(0,0,0,0.38)] backdrop-blur xl:w-[min(24rem,calc(100vw-1.5rem))] [@media(min-width:1440px)]:sticky [@media(min-width:1440px)]:top-0 [@media(min-width:1440px)]:z-auto [@media(min-width:1440px)]:h-[100dvh] [@media(min-width:1440px)]:w-auto [@media(min-width:1440px)]:self-start [@media(min-width:1440px)]:translate-x-0 [@media(min-width:1440px)]:shadow-none ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full [@media(min-width:1440px)]:translate-x-0"
        }`}
      >
        {panelContent}
      </aside>
    </>
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
    <div className="mb-4 rounded-[10px] border border-border/70 bg-secondary/45 p-4">
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
