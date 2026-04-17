import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArtifactViewer from '../components/artifact/ArtifactViewer.jsx';
import CitationPanel from '../components/artifact/CitationPanel.jsx';
import Badge from '../components/common/Badge.jsx';
import { getArtifact, deleteArtifact } from '../api/artifacts.js';
import './ArtifactPage.css';

const TYPE_LABEL = {
  'meeting-brief': 'Meeting Brief',
  'investor-targeting': 'Investor Targeting',
  'board-pack': 'Board Pack',
  'post-meeting': 'Post-Meeting',
  'regulatory-monitor': 'Regulatory Monitor',
};

export default function ArtifactPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getArtifact(id)
      .then(setArtifact)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!confirm('Delete this artifact?')) return;
    await deleteArtifact(id);
    navigate('/workspace');
  }

  if (loading) return <div className="artifact-page-state">Loading artifact…</div>;
  if (error) return <div className="artifact-page-state negative">Error: {error}</div>;
  if (!artifact) return <div className="artifact-page-state muted">Artifact not found</div>;

  return (
    <div className="artifact-page">
      <div className="artifact-page-header">
        <div className="artifact-page-header-left">
          <button className="artifact-back-btn" onClick={() => navigate('/workspace')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Workspace
          </button>
          <div className="artifact-page-meta">
            <Badge label={TYPE_LABEL[artifact.type] || artifact.type} variant={artifact.type} />
            <span className="artifact-page-date muted num">{new Date(artifact.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <h1 className="artifact-page-title">{artifact.title}</h1>
        </div>
        <div className="artifact-page-actions">
          <button className="artifact-page-del" onClick={handleDelete} title="Delete artifact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </div>

      <div className="artifact-page-body">
        <ArtifactViewer artifact={artifact} />
        <CitationPanel citations={artifact.citations || []} />
      </div>
    </div>
  );
}
