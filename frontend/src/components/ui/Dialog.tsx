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
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative z-10 w-full max-w-lg rounded-lg border bg-card p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
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
          <label className="text-sm font-medium">Case Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter case title..."
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter case description..."
            rows={3}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Priority</label>
          <select
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
          <label className="text-sm font-medium">Event Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title..."
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Event Type</label>
          <select
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
          <label className="text-sm font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location..."
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
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
          <label className="text-sm font-medium">Watchlist Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter watchlist name..."
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Watchlist Type</label>
          <select
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
          <label className="text-sm font-medium">Description</label>
          <textarea
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
          <label className="text-sm font-medium">Task Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Task Type</label>
          <select
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
          <label className="text-sm font-medium">Priority</label>
          <select
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
          <label className="text-sm font-medium">Description</label>
          <textarea
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
          <label className="text-sm font-medium">Narrative Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter narrative title..."
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
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
