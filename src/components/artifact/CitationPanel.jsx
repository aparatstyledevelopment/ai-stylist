import { useNavigate } from 'react-router-dom';
import './CitationPanel.css';

export default function CitationPanel({ citations }) {
  const navigate = useNavigate();

  if (!citations?.length) {
    return (
      <div className="citation-panel">
        <div className="citation-panel-header">
          <span className="label">Sources</span>
        </div>
        <div className="citation-panel-empty">No citations yet</div>
      </div>
    );
  }

  const unique = citations.filter((c, i, arr) => arr.findIndex(x => x.displayLabel === c.displayLabel && x.entityId === c.entityId) === i);

  return (
    <div className="citation-panel">
      <div className="citation-panel-header">
        <span className="label">Sources</span>
        <span className="citation-panel-count">{unique.length}</span>
      </div>
      <div className="citation-panel-list">
        {unique.map((cit, i) => (
          <button
            key={i}
            className="citation-panel-item"
            onClick={() => navigate(`/explorer?tab=${cit.source}&highlight=${encodeURIComponent(cit.entityId)}`)}
          >
            <div className="citation-panel-source">{cit.source.toUpperCase()}</div>
            <div className="citation-panel-label">{cit.displayLabel}</div>
            <div className="citation-panel-entity muted">{cit.entityId} · {cit.field}</div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="citation-panel-arrow">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
