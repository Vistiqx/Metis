import { motion } from 'framer-motion'
import { 
  Map, 
  Clock, 
  FileImage, 
  Users, 
  BookMarked, 
  GitBranch,
  Maximize2,
  Filter,
  LayoutGrid,
  Plus
} from 'lucide-react'
import { useState } from 'react'

interface DockItem {
  icon: React.ElementType
  label: string
  onClick?: () => void
}

interface DockProps {
  context?: 'watchlists' | 'alerts' | 'operations' | 'narratives' | 'settings' | 'graph' | 'evidence' | 'default' | 'event'
  onItemClick?: (item: string) => void
}

const contextItems: Record<string, DockItem[]> = {
  event: [
    { icon: Map, label: 'Map' },
    { icon: Clock, label: 'Timeline' },
    { icon: FileImage, label: 'Evidence' },
    { icon: Users, label: 'Actors' },
    { icon: BookMarked, label: 'Narratives' },
    { icon: GitBranch, label: 'Related' },
    { icon: LayoutGrid, label: 'Graph' },
  ],
  graph: [
    { icon: Plus, label: 'Add Node' },
    { icon: Maximize2, label: 'Expand' },
    { icon: GitBranch, label: 'Pivot' },
    { icon: LayoutGrid, label: 'Cluster' },
    { icon: Filter, label: 'Filter' },
    { icon: Clock, label: 'Layout' },
  ],
  evidence: [
    { icon: FileImage, label: 'Viewer' },
    { icon: Map, label: 'Location' },
    { icon: Clock, label: 'Timeline' },
    { icon: Users, label: 'Related' },
    { icon: GitBranch, label: 'Network' },
  ],
  default: [
    { icon: Map, label: 'Map' },
    { icon: Clock, label: 'Timeline' },
    { icon: FileImage, label: 'Evidence' },
    { icon: Users, label: 'Actors' },
    { icon: GitBranch, label: 'Graph' },
  ],
}

export function Dock({ context = 'default', onItemClick }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const items = contextItems[context] || contextItems.default

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-end gap-2 rounded-2xl bg-background/80 p-3 backdrop-blur-xl border shadow-2xl"
      >
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index
          const isNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1

          return (
            <motion.button
              key={item.label}
              onClick={() => onItemClick?.(item.label)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col items-center"
              animate={{
                scale: isHovered ? 1.3 : isNeighbor ? 1.15 : 1,
                y: isHovered ? -10 : 0,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Tooltip */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? -35 : -20 }}
                className="absolute whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs font-medium text-popover-foreground shadow-md"
              >
                {item.label}
              </motion.span>

              {/* Icon Container */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/50 transition-colors group-hover:bg-accent">
                <item.icon className="h-6 w-6 text-foreground" />
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
