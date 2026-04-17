import { useState } from 'react';
import Button from '../common/Button.jsx';
import './WorkflowForm.css';

const PERIODS = ['Q3 2024 Roadshow', 'Q2 2024 Earnings', 'Q1 2024 Roadshow', 'Full Year 2023 Results', 'Custom Period'];

export default function PostMeetingForm({ onSubmit, loading }) {
  const [period, setPeriod] = useState(PERIODS[0]);

  return (
    <form className="wf-form" onSubmit={e => { e.preventDefault(); onSubmit({ period }); }}>
      <div className="wf-form-field">
        <label className="wf-form-label label">Roadshow / Earnings Period</label>
        <select className="wf-form-select" value={period} onChange={e => setPeriod(e.target.value)}>
          {PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <p className="wf-form-hint">
          The system will synthesize all meetings from this period — identifying recurring themes, sentiment trends, and ownership action correlation.
        </p>
      </div>

      <div className="wf-form-field">
        <div className="wf-info-box">
          <span className="label">What this generates</span>
          <ul style={{ marginTop: 8, paddingLeft: 16 }}>
            <li style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Sentiment analysis across all investors met</li>
            <li style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Recurring concerns (mentioned in 2+ meetings)</li>
            <li style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Bullish signals and conviction builders</li>
            <li style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Ownership action correlation (who sold after concerns)</li>
          </ul>
        </div>
      </div>

      <div className="wf-form-footer">
        <Button type="submit" variant="primary" size="lg" loading={loading}>
          Generate Synthesis
        </Button>
        <span className="wf-form-credits muted">~200 credits</span>
      </div>
    </form>
  );
}
