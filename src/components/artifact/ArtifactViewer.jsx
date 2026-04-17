import CitationTag from './CitationTag.jsx';
import './ArtifactViewer.css';

// Parses text containing [[CIT:...]] markers and renders them as CitationTag components
function renderWithCitations(text, citations) {
  if (!text) return null;
  const parts = text.split(/(\[\[CIT:[^\]]+\]\])/g);
  return parts.map((part, i) => {
    const match = part.match(/\[\[CIT:([^\]]+)\]\]/);
    if (match) {
      const [source, entityId, period, field] = match[1].split(':');
      const cit = citations?.find(c => c.source === source && c.entityId === entityId && c.period === period) || {
        source, entityId, period, field,
        displayLabel: `${source}, ${period}`,
      };
      return <CitationTag key={i} citation={cit} />;
    }
    // Render markdown-lite: bold, code
    return <span key={i} dangerouslySetInnerHTML={{ __html: part
      .replace(/\[DATA NOT AVAILABLE: ([^\]]+)\]/g, '<span class="data-unavailable">[Data not available: $1]</span>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
    }} />;
  });
}

function renderSection(content, citations) {
  const lines = content.split('\n');
  return lines.map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    if (line.startsWith('### ')) return <h4 key={i} className="artifact-h4">{renderWithCitations(line.slice(4), citations)}</h4>;
    if (line.startsWith('## ')) return <h3 key={i} className="artifact-h3">{renderWithCitations(line.slice(3), citations)}</h3>;
    if (line.startsWith('# ')) return <h2 key={i} className="artifact-h2">{renderWithCitations(line.slice(2), citations)}</h2>;
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return <li key={i} className="artifact-li">{renderWithCitations(line.slice(2), citations)}</li>;
    }
    if (line.match(/^\d+\. /)) {
      return <li key={i} className="artifact-li artifact-oli">{renderWithCitations(line.replace(/^\d+\. /, ''), citations)}</li>;
    }
    return <p key={i} className="artifact-p">{renderWithCitations(line, citations)}</p>;
  });
}

export default function ArtifactViewer({ artifact, streaming }) {
  if (!artifact) return null;
  const text = artifact.rawText || '';
  const citations = artifact.citations || [];

  // For targeting artifacts with parsed JSON, defer to special renderer
  if (artifact.type === 'investor-targeting' && artifact.parsedResult) {
    return <TargetingResultViewer result={artifact.parsedResult} citations={citations} />;
  }

  return (
    <div className="artifact-viewer">
      {streaming && <div className="artifact-streaming-indicator"><span className="artifact-cursor" /></div>}
      <div className="artifact-body">
        {renderSection(text, citations)}
      </div>
    </div>
  );
}

function TargetingResultViewer({ result, citations }) {
  const { results = [], queryInterpretation, notMatched = [] } = result;
  return (
    <div className="artifact-viewer">
      {queryInterpretation && (
        <div className="targeting-interpretation">
          <span className="label">Query interpreted as</span>
          <p>{queryInterpretation}</p>
        </div>
      )}
      <div className="targeting-results">
        {results.map(r => (
          <TargetingResultRow key={r.rank} result={r} citations={citations} />
        ))}
      </div>
      {notMatched.length > 0 && (
        <div className="targeting-not-matched">
          <span className="label">Not matched</span>
          {notMatched.map((nm, i) => <p key={i} className="muted" style={{fontSize:12}}>{nm}</p>)}
        </div>
      )}
    </div>
  );
}

function TargetingResultRow({ result, citations }) {
  const scoreClass = result.score >= 70 ? 'positive' : result.score >= 40 ? 'warn' : 'negative';
  return (
    <div className="targeting-row">
      <div className="targeting-row-header">
        <span className="targeting-rank">#{result.rank}</span>
        <span className="targeting-investor">{result.investorId}</span>
        <span className={`targeting-score num ${scoreClass}`}>{result.score}/100</span>
      </div>
      {result.keySignals?.length > 0 && (
        <div className="targeting-signals">
          {result.keySignals.map((s, i) => <span key={i} className="targeting-signal">{s}</span>)}
        </div>
      )}
      {result.reasoning && (
        <div className="targeting-reasoning">
          {renderSection(result.reasoning, citations)}
        </div>
      )}
    </div>
  );
}
