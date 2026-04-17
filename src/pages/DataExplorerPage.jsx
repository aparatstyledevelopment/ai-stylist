import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ExplorerTabs from '../components/explorer/ExplorerTabs.jsx';
import DataTable from '../components/common/DataTable.jsx';
import Sparkline from '../components/common/Sparkline.jsx';
import { useAppStore } from '../store/appStore.jsx';
import { getHoldings, getInvestors, getPeers, getMeetings, getCRM } from '../api/data.js';
import './DataExplorerPage.css';

function fmt(n) { return n != null ? n.toLocaleString() : '—'; }
function fmtPct(n) { return n != null ? (n * 100).toFixed(2) + '%' : '—'; }
function fmtEUR(n) { return n != null ? '€' + (n / 1e6).toFixed(1) + 'M' : '—'; }

const CHANGE_COLORS = {
  Increase: 'positive', Decrease: 'negative', New: 'accent', Exited: 'negative', Unchanged: 'muted'
};

function buildColumns(allRows) {
  // Group holdings by investor for sparklines
  const holdingsByInvestor = {};
  if (allRows?.length) {
    allRows.forEach(h => {
      if (!holdingsByInvestor[h.investorId || h.investorName]) holdingsByInvestor[h.investorId || h.investorName] = [];
      holdingsByInvestor[h.investorId || h.investorName].push(h.pct);
    });
  }
  return {
  holdings: [
    { key: 'investorName', label: 'Investor' },
    { key: 'quarter', label: 'Quarter', numeric: true },
    { key: 'shares', label: 'Shares Held', numeric: true, render: v => fmt(v) },
    { key: 'pct', label: '% of Co.', numeric: true, render: v => fmtPct(v) },
    { key: 'changeType', label: 'Change', render: (v) => <span className={CHANGE_COLORS[v] || ''}>{v}</span> },
  ],
  investors: [
    { key: 'name', label: 'Investor', render: (v, row) => (
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontWeight: 500 }}>{v}</span>
      </span>
    )},
    { key: 'country', label: 'Country' },
    { key: 'type', label: 'Type' },
    { key: 'style', label: 'Style' },
    { key: 'aum', label: 'AUM', numeric: true, render: v => v >= 1e9 ? '€' + (v / 1e9).toFixed(1) + 'B' : '€' + (v / 1e6).toFixed(0) + 'M' },
    { key: 'lastMeeting', label: 'Last Meeting' },
    { key: 'sentiment', label: 'Sentiment', render: v => {
      const cls = { positive: 'positive', Positive: 'positive', constructive: 'positive', Constructive: 'positive', cautious: 'warn', Cautious: 'warn', negative: 'negative', Negative: 'negative' };
      return <span className={cls[v] || 'muted'}>{v || '—'}</span>;
    }},
    { key: 'holdingNXTK', label: 'Trend', sortable: false, render: (v) => {
      if (!v?.history?.length) return <span className="muted dim">—</span>;
      return <Sparkline data={v.history.map(h => h.pct)} width={72} height={24} />;
    }},
  ],
  peers: [
    { key: 'investorName', label: 'Investor' },
    { key: 'peerId', label: 'Peer Ticker' },
    { key: 'peerName', label: 'Peer Company' },
    { key: 'shares', label: 'Shares Held', numeric: true, render: v => fmt(v) },
    { key: 'pct', label: '% of Peer', numeric: true, render: v => fmtPct(v) },
    { key: 'quarter', label: 'Quarter' },
    { key: 'changeType', label: 'Change', render: v => <span className={CHANGE_COLORS[v] || ''}>{v}</span> },
  ],
  meetings: [
    { key: 'investorName', label: 'Investor' },
    { key: 'date', label: 'Date', numeric: true },
    { key: 'format', label: 'Format' },
    { key: 'location', label: 'Location' },
    { key: 'sentiment', label: 'Sentiment', render: v => {
      const cls = { Positive: 'positive', Constructive: 'positive', Cautious: 'warn', Negative: 'negative', Neutral: 'muted' };
      return <span className={cls[v] || 'muted'}>{v}</span>;
    }},
    { key: 'keyTakeaways', label: 'Key Takeaway', sortable: false, render: v => v ? v.slice(0, 80) + (v.length > 80 ? '…' : '') : '—' },
  ],
  crm: [
    { key: 'name', label: 'Contact' },
    { key: 'investorName', label: 'Investor' },
    { key: 'title', label: 'Title' },
    { key: 'lastTouchDate', label: 'Last Touch', numeric: true },
    { key: 'coverageStatus', label: 'Status', render: v => {
      const cls = { Active: 'positive', Lapsed: 'warn', Inactive: 'muted', Prospect: 'accent' };
      return <span className={cls[v] || ''}>{v}</span>;
    }},
    { key: 'nextStep', label: 'Next Step', sortable: false, render: v => v ? v.slice(0, 70) + (v.length > 70 ? '…' : '') : '—' },
  ],
  }; // end buildColumns return
} // end buildColumns

export default function DataExplorerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useAppStore();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'holdings';
  const highlightId = searchParams.get('highlight');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchers = { holdings: getHoldings, investors: getInvestors, peers: getPeers, meetings: getMeetings, crm: getCRM };

  const load = useCallback(async (tab) => {
    setLoading(true);
    try {
      const data = await fetchers[tab]();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(activeTab); }, [activeTab, load]);

  function handleTabChange(tab) {
    setSearchParams({ tab });
    setSearch('');
  }

  function handleRowClick(row) {
    const investorId = row.id || row.investorId;
    if (activeTab === 'investors' && investorId) navigate(`/investor/${investorId}`);
    if (activeTab === 'meetings' && row.investorId) navigate(`/investor/${row.investorId}`);
    if (activeTab === 'crm' && row.investorId) navigate(`/investor/${row.investorId}`);
  }

  const COLUMNS = buildColumns(rows);

  const filtered = search
    ? rows.filter(r => Object.values(r).some(v => String(v) && String(v).toLowerCase().includes(search.toLowerCase())))
    : rows;

  return (
    <div className="explorer-page">
      <div className="explorer-header">
        <div>
          <h1 className="explorer-title">Data Explorer</h1>
          <p className="explorer-sub">Source-of-truth tabular data — click any citation to drill down here</p>
        </div>
        {highlightId && (
          <div className="explorer-drilldown-banner">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            Viewing source for citation
          </div>
        )}
      </div>

      <ExplorerTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="explorer-toolbar">
        <input
          className="explorer-search"
          placeholder={`Search ${activeTab}…`}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="explorer-count muted">{filtered.length} records</span>
      </div>

      <div className="explorer-table-area">
        {loading ? (
          <div className="explorer-loading">Loading…</div>
        ) : (
          <DataTable
            columns={COLUMNS[activeTab] || []}
            rows={filtered}
            highlightId={highlightId}
            onRowClick={['investors', 'meetings', 'crm'].includes(activeTab) ? handleRowClick : undefined}
          />
        )}
      </div>
    </div>
  );
}
