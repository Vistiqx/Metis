import { Bell, Search, User, LogOut, Command } from 'lucide-react'
import { useState } from 'react'

export function TopBar() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      {/* Search */}
      <div className="flex max-w-xl flex-1 items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search cases, events, actors, evidence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border bg-background pl-10 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <kbd className="hidden rounded border bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground sm:inline-block">
              <Command className="inline h-3 w-3" />K
            </kbd>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative rounded-lg p-2 hover:bg-accent">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 border-l pl-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium">Analyst User</p>
            <p className="text-xs text-muted-foreground">analyst@metis.local</p>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <User className="h-5 w-5" />
          </button>
          <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
