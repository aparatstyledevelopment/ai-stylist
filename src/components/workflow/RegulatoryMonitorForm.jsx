import Button from '../common/Button.jsx';
import './WorkflowForm.css';

export default function RegulatoryMonitorForm({ onSubmit, loading }) {
  return (
    <form className="wf-form" onSubmit={e => { e.preventDefault(); onSubmit({}); }}>
      <div className="wf-form-field">
        <div className="wf-info-box">
          <span className="label">Data sources monitored</span>
          <div className="wf-monitor-sources">
            {[
              { label: 'Short Position Register', desc: 'Finansinspektionen / FCA short disclosures ≥0.5%' },
              { label: 'Insider Transactions', desc: 'Insynsregistret — PDMR buy/sell activity' },
              { label: 'Major Shareholder Disclosures', desc: 'Flaggningsanmälningar — threshold crossings' },
              { label: 'Activist Filings', desc: 'Cross-referenced against known activist history' },
            ].map((s, i) => (
              <div key={i} className="wf-monitor-source">
                <span className="accent" style={{fontSize:12,fontWeight:600}}>{s.label}</span>
                <span className="muted" style={{fontSize:11}}>{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="wf-form-footer">
        <Button type="submit" variant="primary" size="lg" loading={loading}>
          Run Regulatory Monitor
        </Button>
        <span className="wf-form-credits muted">~150 credits</span>
      </div>
    </form>
  );
}
