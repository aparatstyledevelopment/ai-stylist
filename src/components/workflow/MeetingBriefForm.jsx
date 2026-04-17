import { useState, useEffect } from 'react';
import { getInvestors } from '../../api/data.js';
import Button from '../common/Button.jsx';
import './WorkflowForm.css';

export default function MeetingBriefForm({ onSubmit, loading }) {
  const [investors, setInvestors] = useState([]);
  const [investorId, setInvestorId] = useState('');
  const [meetingDate, setMeetingDate] = useState('');

  useEffect(() => {
    getInvestors().then(setInvestors).catch(() => {});
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!investorId) return;
    onSubmit({ investorId, meetingDate });
  }

  return (
    <form className="wf-form" onSubmit={handleSubmit}>
      <div className="wf-form-field">
        <label className="wf-form-label label">Investor</label>
        <select
          className="wf-form-select"
          value={investorId}
          onChange={e => setInvestorId(e.target.value)}
          required
        >
          <option value="">Select investor…</option>
          {investors.map(inv => (
            <option key={inv.id} value={inv.id}>{inv.name} — {inv.country}</option>
          ))}
        </select>
        <p className="wf-form-hint">The brief will include their full position history, peer holdings, meeting history, and CRM contacts.</p>
      </div>

      <div className="wf-form-field">
        <label className="wf-form-label label">Meeting Date (optional)</label>
        <input
          type="date"
          className="wf-form-input"
          value={meetingDate}
          onChange={e => setMeetingDate(e.target.value)}
        />
      </div>

      <div className="wf-form-footer">
        <Button type="submit" variant="primary" size="lg" loading={loading} disabled={!investorId}>
          Generate Meeting Brief
        </Button>
        <span className="wf-form-credits muted">~100 credits</span>
      </div>
    </form>
  );
}
