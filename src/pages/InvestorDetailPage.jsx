import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInvestors, getHoldings, getPeers, getMeetings, getCRM } from '../api/data.js';
import HoldingsChart from '../components/common/HoldingsChart.jsx';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import './InvestorDetailPage.css';

function fmt(n) { return n != null ? Number(n).toLocaleString() : '—'; }
function fmtPct(n) { return n != null ? (n * 100).toFixed(2) + '%' : '—'; }
function fmtAUM(n) { return n != null ? '€' + (n / 1e9).toFixed(1) + 'B' : '—'; }

const SENTIMENT_CLASS = { Positive: 'positive', Constructive: 'positive', Cautious: 'warn', Negative: 'negative', Neutral: 'muted' };
const CHANGE_CLASS = { Increase: 'positive', New: 'positive', Decrease: 'negative', Exited: 'negative', Unchanged: 'muted' };
const COVERAGE_CLASS = { Active: 'positive', Lapsed: 'warn', Prospect: 'accent', Inactive: 'muted' };

export default function InvestorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [investor, setInvestor] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [peers, setPeers] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [crm, setCRM] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getInvestors(),
      getHoldings({ investorId: id }),
      getPeers({ investorId: id }),
      getMeetings({ investorId: id }),
      getCRM({ investorId: id }),
    ]).then(([invs, h, p, m, c]) => {
      setInvestor(invs.find(i => i.id === id) || null);
      setHoldings(h.sort((a, b) => a.quarter.localeCompare(b.quarter)));
      setPeers(p);
      setMeetings(m);
      setCRM(c);
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="investor-detail-state">Loading…</div>;
  if (!investor) return <div className="investor-detail-state negative">Investor not found: {id}</div>;

  const latestHolding = holdings[holdings.length - 1];
  const prevHolding = holdings[holdings.length - 2];
  const sharesDelta = latestHolding && prevHolding ? latestHolding.shares - prevHolding.shares : null;

  const TABS = ['overview', 'holdings', 'peers', 'meetings', 'crm'];

  return (
    <div className="investor-detail">
      {/* Header */}
      <div className="investor-detail-header">
        <button className="investor-detail-back" onClick={() => navigate(-1)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
        <div className="investor-detail-title-row">
          <h1 className="investor-detail-name">{investor.name}</h1>
          <div className="investor-detail-meta">
            <Badge label={investor.type || 'Institutional'} variant="default" />
            <Badge label={investor.country} variant="default" />
            {investor.style && <Badge label={investor.style} variant="accent" />}
            {investor.sentiment && <Badge label={investor.sentiment} variant={SENTIMENT_CLASS[investor.sentiment] || 'default'} />}
          </div>
        </div>

        {/* KPI strip */}
        <div className="investor-detail-kpis">
          <div className="investor-kpi">
            <span className="investor-kpi-label label">AUM</span>
            <span className="investor-kpi-value num">{fmtAUM(investor.aum)}</span>
          </div>
          <div className="investor-kpi">
            <span className="investor-kpi-label label">Current Position</span>
            <span className="investor-kpi-value num">{latestHolding ? fmtPct(latestHolding.pct) : '—'}</span>
          </div>
          <div className="investor-kpi">
            <span className="investor-kpi-label label">Shares Held</span>
            <span className="investor-kpi-value num">{latestHolding ? fmt(latestHolding.shares) : '—'}</span>
          </div>
          <div className="investor-kpi">
            <span className="investor-kpi-label label">QoQ Change</span>
            <span className={`investor-kpi-value num ${sharesDelta > 0 ? 'positive' : sharesDelta < 0 ? 'negative' : 'muted'}`}>
              {sharesDelta != null ? (sharesDelta > 0 ? '+' : '') + fmt(sharesDelta) : '—'}
            </span>
          </div>
          <div className="investor-kpi">
            <span className="investor-kpi-label label">Meetings</span>
            <span className="investor-kpi-value num">{meetings.length}</span>
          </div>
          <div className="investor-kpi">
            <span className="investor-kpi-label label">Last Meeting</span>
            <span className="investor-kpi-value">{investor.lastMeeting || '—'}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="investor-detail-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`investor-detail-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        <div className="investor-detail-tab-actions">
          <Button variant="primary" size="sm" onClick={() => navigate(`/workflow/meeting-brief?investorId=${id}`)}>
            Generate Meeting Brief
          </Button>
        </div>
      </div>

      {/* Tab content */}
      <div className="investor-detail-body">
        {activeTab === 'overview' && <OverviewTab investor={investor} holdings={holdings} peers={peers} meetings={meetings} crm={crm} />}
        {activeTab === 'holdings' && <HoldingsTab holdings={holdings} />}
        {activeTab === 'peers' && <PeersTab peers={peers} />}
        {activeTab === 'meetings' && <MeetingsTab meetings={meetings} />}
        {activeTab === 'crm' && <CRMTab crm={crm} />}
      </div>
    </div>
  );
}

function OverviewTab({ investor, holdings, peers, meetings, crm }) {
  const latestHolding = holdings[holdings.length - 1];
  const primaryContact = crm.find(c => c.isPrimary) || crm[0];
  const lastMeeting = meetings[0];

  return (
    <div className="investor-overview">
      <div className="investor-overview-left">
        {/* Holdings chart */}
        {holdings.length >= 2 && (
          <div className="investor-section">
            <h3 className="investor-section-title">Position History (NXTK)</h3>
            <div className="investor-chart-wrap">
              <HoldingsChart data={holdings} width={520} height={140} />
            </div>
            <div className="investor-chart-legend">
              {holdings.slice(-3).map((h, i) => (
                <div key={i} className="investor-chart-legend-item">
                  <span className="muted num">{h.quarter}</span>
                  <span className="num">{(h.pct * 100).toFixed(2)}%</span>
                  <span className={`num ${CHANGE_CLASS[h.changeType] || ''}`}>{h.changeType}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Peer holdings */}
        {peers.length > 0 && (
          <div className="investor-section">
            <h3 className="investor-section-title">Peer Holdings</h3>
            <div className="investor-peer-grid">
              {peers.map((p, i) => (
                <div key={i} className="investor-peer-card">
                  <span className="investor-peer-ticker accent num">{p.peerId}</span>
                  <span className="investor-peer-name muted">{p.peerName}</span>
                  <span className="investor-peer-pct num">{fmtPct(p.pct)}</span>
                  <span className={`investor-peer-change ${CHANGE_CLASS[p.changeType] || ''}`}>{p.changeType}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="investor-overview-right">
        {/* Primary contact */}
        {primaryContact && (
          <div className="investor-section investor-contact-card">
            <h3 className="investor-section-title">Primary Contact</h3>
            <div className="investor-contact-name">{primaryContact.name}</div>
            <div className="investor-contact-title muted">{primaryContact.title}</div>
            <a className="investor-contact-email accent" href={`mailto:${primaryContact.email}`}>{primaryContact.email}</a>
            <div className="investor-contact-status">
              <Badge label={primaryContact.coverageStatus} variant={COVERAGE_CLASS[primaryContact.coverageStatus] || 'default'} />
            </div>
            {primaryContact.nextStep && (
              <div className="investor-contact-next">
                <span className="label">Next Step</span>
                <p className="investor-contact-next-text">{primaryContact.nextStep}</p>
                {primaryContact.nextStepDue && <span className="muted" style={{fontSize:11}}>{primaryContact.nextStepDue}</span>}
              </div>
            )}
          </div>
        )}

        {/* Last meeting */}
        {lastMeeting && (
          <div className="investor-section investor-last-meeting">
            <h3 className="investor-section-title">Last Meeting</h3>
            <div className="investor-meeting-meta">
              <span className="num">{lastMeeting.date}</span>
              <span className="muted">·</span>
              <span className="muted">{lastMeeting.format}</span>
              <span className="muted">·</span>
              <span className={SENTIMENT_CLASS[lastMeeting.sentiment] || ''}>{lastMeeting.sentiment}</span>
            </div>
            <p className="investor-meeting-takeaway">{lastMeeting.keyTakeaways}</p>
            {lastMeeting.actionItems?.length > 0 && (
              <div className="investor-meeting-actions">
                <span className="label">Open Action Items</span>
                {lastMeeting.actionItems.map((a, i) => (
                  <div key={i} className="investor-meeting-action-item">
                    <span className="investor-meeting-action-dot" />
                    {a}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Investor notes */}
        {investor.tags?.length > 0 && (
          <div className="investor-section">
            <h3 className="investor-section-title">Tags</h3>
            <div className="investor-tags">
              {investor.tags.map((t, i) => <Badge key={i} label={t} variant="default" />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HoldingsTab({ holdings }) {
  return (
    <div className="investor-tab-content">
      <HoldingsChart data={holdings} width={680} height={180} />
      <table className="investor-holdings-table">
        <thead>
          <tr>
            <th>Quarter</th><th className="num">Shares</th><th className="num">% of Co.</th><th>Change</th>
          </tr>
        </thead>
        <tbody>
          {[...holdings].reverse().map((h, i) => (
            <tr key={i}>
              <td className="num">{h.quarter}</td>
              <td className="num">{fmt(h.shares)}</td>
              <td className="num">{fmtPct(h.pct)}</td>
              <td><span className={CHANGE_CLASS[h.changeType] || ''}>{h.changeType}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PeersTab({ peers }) {
  if (!peers.length) return <div className="investor-tab-empty">No peer holdings on record.</div>;
  return (
    <div className="investor-tab-content">
      <table className="investor-holdings-table">
        <thead>
          <tr><th>Peer</th><th>Company</th><th className="num">Shares</th><th className="num">% of Peer</th><th>Quarter</th><th>Change</th></tr>
        </thead>
        <tbody>
          {peers.map((p, i) => (
            <tr key={i}>
              <td className="num accent">{p.peerId}</td>
              <td>{p.peerName}</td>
              <td className="num">{fmt(p.shares)}</td>
              <td className="num">{fmtPct(p.pct)}</td>
              <td className="num">{p.quarter}</td>
              <td><span className={CHANGE_CLASS[p.changeType] || ''}>{p.changeType}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MeetingsTab({ meetings }) {
  if (!meetings.length) return <div className="investor-tab-empty">No meetings on record.</div>;
  return (
    <div className="investor-tab-content investor-meetings-list">
      {meetings.map((m, i) => (
        <div key={i} className="investor-meeting-record">
          <div className="investor-meeting-record-header">
            <span className="num">{m.date}</span>
            <Badge label={m.sentiment} variant={SENTIMENT_CLASS[m.sentiment] || 'default'} />
            <span className="muted">{m.format} · {m.location}</span>
            <span className="muted">Attendees: {m.attendees?.join(', ')}</span>
          </div>
          <div className="investor-meeting-record-topics">
            <span className="label">Topics</span>
            <span className="muted">{m.topicsDiscussed?.join(' · ')}</span>
          </div>
          {m.investorQuestions?.length > 0 && (
            <div className="investor-meeting-record-qs">
              <span className="label">Investor Questions</span>
              {m.investorQuestions.map((q, j) => (
                <div key={j} className="investor-meeting-q">"{q}"</div>
              ))}
            </div>
          )}
          {m.keyTakeaways && (
            <div className="investor-meeting-record-takeaway">
              <span className="label">Key Takeaway</span>
              <p>{m.keyTakeaways}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CRMTab({ crm }) {
  if (!crm.length) return <div className="investor-tab-empty">No CRM contacts on record.</div>;
  return (
    <div className="investor-tab-content">
      {crm.map((c, i) => (
        <div key={i} className="investor-crm-card">
          <div className="investor-crm-header">
            <div>
              <div className="investor-crm-name">{c.name} {c.isPrimary && <span className="accent" style={{fontSize:10,marginLeft:4}}>PRIMARY</span>}</div>
              <div className="muted" style={{fontSize:12}}>{c.title}</div>
            </div>
            <Badge label={c.coverageStatus} variant={COVERAGE_CLASS[c.coverageStatus] || 'default'} />
          </div>
          <div className="investor-crm-contact">
            <a href={`mailto:${c.email}`} className="accent">{c.email}</a>
            {c.phone && <span className="muted num">{c.phone}</span>}
          </div>
          <div className="investor-crm-touch">
            <span className="label">Last Touch</span>
            <span className="num">{c.lastTouchDate || '—'} {c.lastTouchType ? `· ${c.lastTouchType}` : ''}</span>
          </div>
          {c.nextStep && (
            <div className="investor-crm-next">
              <span className="label">Next Step</span>
              <p>{c.nextStep}</p>
              {c.nextStepDue && <span className={`num ${new Date(c.nextStepDue) < new Date() ? 'negative' : 'muted'}`}>Due: {c.nextStepDue}</span>}
            </div>
          )}
          {c.notes && <p className="investor-crm-notes muted">{c.notes}</p>}
        </div>
      ))}
    </div>
  );
}
