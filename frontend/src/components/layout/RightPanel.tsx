import { X, ChevronRight, ChevronLeft } from 'lucide-react'
import { useState } from 'react'

interface RightPanelProps {
  children?: React.ReactNode
  title?: string
  onClose?: () => void
}

export function RightPanel({ children, title = 'Details', onClose }: RightPanelProps) {
  const [collapsed, setCollapsed] = useState(false)

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="flex h-full w-8 items-center justify-center border-l bg-card hover:bg-accent"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    )
  }

  return (
    <aside className="flex h-full w-80 flex-col border-l bg-card">
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        <h2 className="font-semibold">{title}</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCollapsed(true)}
            className="rounded p-1 hover:bg-accent"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          {onClose && (
            <button onClick={onClose} className="rounded p-1 hover:bg-accent">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {children || (
          <div className="text-center text-muted-foreground">
            <p className="text-sm">Select an item to view details</p>
          </div>
        )}
      </div>
    </aside>
  )
}

// Pre-built sections for the right panel
export function MetadataSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

export function MetadataItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
