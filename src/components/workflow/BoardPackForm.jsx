import { useState } from 'react';
import Button from '../common/Button.jsx';
import './WorkflowForm.css';

const PERIODS = ['October 2024', 'September 2024', 'August 2024', 'Q3 2024 (Full Quarter)', 'Q2 2024 (Full Quarter)'];

const SECTIONS = [
  { id: 'ownership', label: 'Ownership Snapshot' },
  { id: 'changes', label: 'Ownership Changes' },
  { id: 'peers', label: 'Peer Comparison' },
  { id: 'consensus', label: 'Analyst Consensus' },
  { id: 'shorts', label: 'Short Interest' },
  { id: 'insider', label: 'Insider Activity' },
  { id: 'crm', label: 'CRM & Engagement' },
  { id: 'actions', label: 'Recommended Actions' },
];

export default function BoardPackForm({ onSubmit, loading }) {
  const [period, setPeriod] = useState(PERIODS[0]);
  const [sections, setSections] = useState(SECTIONS.map(s => s.id));

  function toggleSection(id) {
    setSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }

  return (
    <form className="wf-form" onSubmit={e => { e.preventDefault(); onSubmit({ period, sections }); }}>
      <div className="wf-form-field">
        <label className="wf-form-label label">Period</label>
        <select className="wf-form-select" value={period} onChange={e => setPeriod(e.target.value)}>
          {PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <p className="wf-form-hint">The pack will cover ownership changes, analyst consensus, short interest, insider transactions, and CRM activity for this period.</p>
      </div>

      <div className="wf-form-field">
        <label className="wf-form-label label">Sections to Include</label>
        <div className="wf-section-grid">
          {SECTIONS.map(s => (
            <label key={s.id} className={`wf-section-toggle ${sections.includes(s.id) ? 'active' : ''}`}>
              <input type="checkbox" checked={sections.includes(s.id)} onChange={() => toggleSection(s.id)} />
              {s.label}
            </label>
          ))}
        </div>
      </div>

      <div className="wf-form-footer">
        <Button type="submit" variant="primary" size="lg" loading={loading} disabled={!sections.length}>
          Generate Board Pack
        </Button>
        <span className="wf-form-credits muted">~500 credits</span>
      </div>
    </form>
  );
}
