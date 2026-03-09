import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function Dialog({ isOpen, onClose, title, children, footer }: DialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        role="button"
        tabIndex={0}
        aria-label="Close dialog overlay"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onClose()
          }
        }}
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border/80 bg-card p-6 shadow-panel shadow-black/35">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="metis-kicker">Create</div>
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close dialog">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {children}
        </div>

        {footer && (
          <div className="mt-6 flex justify-end gap-2 border-t border-border/70 pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

interface CreateCaseDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (caseData: { title: string; description: string; priority: string }) => void
}

export function CreateCaseDialog({ isOpen, onClose, onCreate }: CreateCaseDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate({ title, description, priority })
    setTitle('')
    setDescription('')
    setPriority('medium')
    onClose()
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Case"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            Create Case
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="create-case-title" className="text-sm font-medium">Case Title *</label>
          <input
            id="create-case-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter case title..."
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="create-case-description" className="text-sm font-medium">Description</label>
          <textarea
            id="create-case-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter case description..."
            rows={3}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="create-case-priority" className="text-sm font-medium">Priority</label>
          <select
            id="create-case-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </form>
    </Dialog>
  )
}

interface CreateEventDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (eventData: { title: string; type: string; location: string; description: string }) => void
}

export function CreateEventDialog({ isOpen, onClose, onCreate }: CreateEventDialogProps) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('protest')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate({ title, type, location, description })
    setTitle('')
    setType('protest')
    setLocation('')
    setDescription('')
    onClose()
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Event"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            Create Event
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="create-event-title" className="text-sm font-medium">Event Title *</label>
          <input
            id="create-event-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title..."
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="create-event-type" className="text-sm font-medium">Event Type</label>
          <select
            id="create-event-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="protest">Protest</option>
            <option value="meeting">Meeting</option>
            <option value="viral">Viral Content</option>
            <option value="surveillance">Surveillance</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="create-event-location" className="text-sm font-medium">Location</label>
          <input
            id="create-event-location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location..."
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="create-event-description" className="text-sm font-medium">Description</label>
          <textarea
            id="create-event-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter event description..."
            rows={3}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
      </form>
    </Dialog>
  )
}

interface CreateWatchlistDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (watchlistData: { name: string; type: string; description: string }) => void
}

export function CreateWatchlistDialog({ isOpen, onClose, onCreate }: CreateWatchlistDialogProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState('actor')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate({ name, type, description })
    setName('')
    setType('actor')
    setDescription('')
    onClose()
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Watchlist"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            Create Watchlist
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="create-watchlist-name" className="text-sm font-medium">Watchlist Name *</label>
          <input
            id="create-watchlist-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter watchlist name..."
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="create-watchlist-type" className="text-sm font-medium">Watchlist Type</label>
          <select
            id="create-watchlist-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="actor">Actor/Person</option>
            <option value="account">Account</option>
            <option value="location">Location</option>
            <option value="transaction">Transaction</option>
            <option value="communication">Communication</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="create-watchlist-description" className="text-sm font-medium">Description</label>
          <textarea
            id="create-watchlist-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter watchlist description..."
            rows={3}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
      </form>
    </Dialog>
  )
}

interface CreateTaskDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (taskData: { title: string; description: string; priority: string; type: string }) => void
}

export function CreateTaskDialog({ isOpen, onClose, onCreate }: CreateTaskDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [type, setType] = useState('analysis')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate({ title, description, priority, type })
    setTitle('')
    setDescription('')
    setPriority('medium')
    setType('analysis')
    onClose()
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Task"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            Create Task
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="create-task-title" className="text-sm font-medium">Task Title *</label>
          <input
            id="create-task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="create-task-type" className="text-sm font-medium">Task Type</label>
          <select
            id="create-task-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="analysis">Analysis</option>
            <option value="investigation">Investigation</option>
            <option value="reporting">Reporting</option>
            <option value="verification">Verification</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="create-task-priority" className="text-sm font-medium">Priority</label>
          <select
            id="create-task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="create-task-description" className="text-sm font-medium">Description</label>
          <textarea
            id="create-task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description..."
            rows={3}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
      </form>
    </Dialog>
  )
}

interface CreateNarrativeDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (narrativeData: { title: string; description: string }) => void
}

export function CreateNarrativeDialog({ isOpen, onClose, onCreate }: CreateNarrativeDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate({ title, description })
    setTitle('')
    setDescription('')
    onClose()
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Narrative"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            Create Narrative
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="create-narrative-title" className="text-sm font-medium">Narrative Title *</label>
          <input
            id="create-narrative-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter narrative title..."
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="create-narrative-description" className="text-sm font-medium">Description</label>
          <textarea
            id="create-narrative-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter narrative description..."
            rows={4}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
      </form>
    </Dialog>
  )
}
