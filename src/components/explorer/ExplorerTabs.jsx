import './ExplorerTabs.css';

const TABS = [
  { id: 'holdings', label: 'Holdings' },
  { id: 'investors', label: 'Investors' },
  { id: 'peers', label: 'Peer Holdings' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'crm', label: 'CRM' },
];

export default function ExplorerTabs({ activeTab, onTabChange }) {
  return (
    <div className="explorer-tabs">
      {TABS.map(t => (
        <button
          key={t.id}
          className={'explorer-tab' + (activeTab === t.id ? ' active' : '')}
          onClick={() => onTabChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
