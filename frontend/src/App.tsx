import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Alerts } from './pages/Alerts'
import { Dashboard } from './pages/Dashboard'
import { Events } from './pages/Events'
import { Evidence } from './pages/Evidence'
import { Graph } from './pages/Graph'
import { Investigations } from './pages/Investigations'
import { Narratives } from './pages/Narratives'
import { Operations } from './pages/Operations'
import { Settings } from './pages/Settings'
import { Sources } from './pages/Sources'
import { Watchlists } from './pages/Watchlists'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/investigations" element={<Investigations />} />
          <Route path="/events" element={<Events />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/watchlists" element={<Watchlists />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/narratives" element={<Narratives />} />
          <Route path="/docs" element={<div className="p-8">Documentation Page - Coming Soon</div>} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
