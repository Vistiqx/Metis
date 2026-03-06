import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Events } from './pages/Events'
import { Investigations } from './pages/Investigations'
import { Sources } from './pages/Sources'

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
          <Route path="/graph" element={<div className="p-8">Graph Page</div>} />
          <Route path="/evidence" element={<div className="p-8">Evidence Page</div>} />
          <Route path="/watchlists" element={<div className="p-8">Watchlists Page</div>} />
          <Route path="/alerts" element={<div className="p-8">Alerts Page</div>} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/operations" element={<div className="p-8">Operations Page</div>} />
          <Route path="/narratives" element={<div className="p-8">Narratives Page</div>} />
          <Route path="/docs" element={<div className="p-8">Documentation Page</div>} />
          <Route path="/settings" element={<div className="p-8">Settings Page</div>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
