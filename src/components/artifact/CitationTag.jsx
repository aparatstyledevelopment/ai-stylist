import { useNavigate } from 'react-router-dom';
import './CitationTag.css';

export default function CitationTag({ citation }) {
  const navigate = useNavigate();

  function handleClick(e) {
    e.stopPropagation();
    navigate(`/explorer?tab=${citation.source}&highlight=${encodeURIComponent(citation.entityId)}`);
  }

  return (
    <button className="citation-tag" onClick={handleClick} title={`View source: ${citation.displayLabel}`}>
      {citation.displayLabel}
    </button>
  );
}
