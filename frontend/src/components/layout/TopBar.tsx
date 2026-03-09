import { Bell, Search, User, LogOut, Command } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../ui/Badge'

export function TopBar() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-metis-ink/90 px-4 py-3 backdrop-blur xl:px-8">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex max-w-2xl flex-1 items-center gap-3">
          <div className="hidden xl:block">
            <div className="metis-kicker">Operational Search</div>
          </div>
          <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search cases, events, actors, evidence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="metis-input h-11 w-full pl-10 pr-14"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <kbd className="hidden rounded-lg border border-border/80 bg-secondary/80 px-2 py-1 text-[0.7rem] font-semibold text-muted-foreground sm:inline-flex sm:items-center sm:gap-1">
              <Command className="inline h-3 w-3" />K
            </kbd>
          </div>
        </div>
      </div>

        <div className="flex items-center justify-between gap-3 xl:justify-end">
          <div className="hidden items-center gap-2 lg:flex">
            <Badge variant="gold" dot>
              Analyst workspace secure
            </Badge>
          </div>

          <button aria-label="Open notifications" title="Open notifications" className="relative rounded-xl border border-border/80 bg-secondary/60 p-2.5 text-muted-foreground transition hover:border-primary/30 hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Open notifications</span>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
          </button>

          <div className="flex items-center gap-3 border-l border-border/70 pl-3 sm:pl-4">
            <div className="hidden text-right md:block">
              <p className="text-sm font-semibold">Analyst User</p>
              <p className="text-xs tracking-[0.08em] text-muted-foreground">analyst@metis.local</p>
            </div>
            <button aria-label="Open user profile" title="Open user profile" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/35 bg-primary/12 text-primary transition hover:bg-primary/18">
            <User className="h-5 w-5" />
            <span className="sr-only">Open user profile</span>
            </button>
            <button aria-label="Log out" title="Log out" className="rounded-xl border border-transparent p-2 text-muted-foreground transition hover:border-border/80 hover:bg-secondary/70 hover:text-foreground">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Log out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
