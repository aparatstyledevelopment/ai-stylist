import { useState } from 'react';
import Button from '../common/Button.jsx';
import './WorkflowForm.css';

const EXAMPLE_QUERIES = [
  'Find Nordic institutional investors who hold our top 3 peers, have been net buyers of Swedish healthcare in the past 6 months, and haven\'t met with us in 18+ months',
  'Find UK-based active funds with AUM >€1B who hold at least 2 peer companies but have no current NXTK position',
  'Rank all current holders by likelihood to increase position based on peer holdings and recent meeting sentiment',
];

export default function InvestorTargetingForm({ onSubmit, loading }) {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    onSubmit({ query: query.trim() });
  }

  return (
    <form className="wf-form" onSubmit={handleSubmit}>
      <div className="wf-form-field">
        <label className="wf-form-label label">Targeting Query</label>
        <textarea
          className="wf-form-textarea"
          placeholder="Describe the investors you're looking for in plain language…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          rows={5}
          required
        />
        <p className="wf-form-hint">Use natural language. The system will search your holdings, CRM, and peer data, then rank matches with cited reasoning traces.</p>
      </div>

      <div className="wf-form-examples">
        <span className="label">Examples</span>
        {EXAMPLE_QUERIES.map((q, i) => (
          <button
            key={i}
            type="button"
            className="wf-form-example"
            onClick={() => setQuery(q)}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="wf-form-footer">
        <Button type="submit" variant="primary" size="lg" loading={loading} disabled={!query.trim()}>
          Run Targeting
        </Button>
        <span className="wf-form-credits muted">~300 credits</span>
      </div>
    </form>
  );
}
