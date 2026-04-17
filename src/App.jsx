import { Routes, Route, Navigate } from 'react-router-dom';
import Shell from './components/layout/Shell.jsx';
import WorkspacePage from './pages/WorkspacePage.jsx';
import DataExplorerPage from './pages/DataExplorerPage.jsx';
import ArtifactPage from './pages/ArtifactPage.jsx';
import WorkflowPage from './pages/WorkflowPage.jsx';
import InvestorDetailPage from './pages/InvestorDetailPage.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <Shell>
        <Routes>
          <Route path="/" element={<Navigate to="/workspace" replace />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/explorer" element={<DataExplorerPage />} />
          <Route path="/artifact/:id" element={<ArtifactPage />} />
          <Route path="/workflow/:type" element={<WorkflowPage />} />
          <Route path="/investor/:id" element={<InvestorDetailPage />} />
        </Routes>
      </Shell>
    </ErrorBoundary>
  );
}
