import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Alerts } from "./pages/Alerts";
import { Analytics } from "./pages/Analytics";
import { Dashboard } from "./pages/Dashboard";
import { Docs } from "./pages/Docs";
import { Entities } from "./pages/Entities";
import { Events } from "./pages/Events";
import { Evidence } from "./pages/Evidence";
import { Graph } from "./pages/Graph";
import { Investigations } from "./pages/Investigations";
import { Narratives } from "./pages/Narratives";
import { Operations } from "./pages/Operations";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import { Sources } from "./pages/Sources";
import { Timeline } from "./pages/Timeline";
import { Watchlists } from "./pages/Watchlists";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/investigations" element={<Investigations />} />
          <Route path="/investigations/:id" element={<Investigations />} />
          <Route path="/events" element={<Events />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/entities" element={<Entities />} />
          <Route path="/entities/:id" element={<Entities />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/sources/:id" element={<Sources />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:id" element={<Reports />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/evidence" element={<Evidence />} />
          <Route path="/watchlists" element={<Watchlists />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/narratives" element={<Narratives />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
