import { useAppStore } from '../../store/appStore.jsx';
import './TopNav.css';

export default function TopNav() {
  const { state, dispatch } = useAppStore();
  const unread = state.alerts.length;

  return (
    <header className="topnav">
      <div className="topnav-left">
        <span className="topnav-logo">
          <span className="topnav-logo-mark">M</span>
          <span className="topnav-logo-text">MONITOR <span className="topnav-logo-iq">IQ</span></span>
        </span>
        <span className="topnav-company">NexTech AB · NXTK</span>
      </div>
      <div className="topnav-right">
        <button
          className="topnav-icon-btn"
          onClick={() => dispatch({ type: 'TOGGLE_CHAT' })}
          title="Open AI chat"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>Ask</span>
        </button>
        <button className="topnav-icon-btn topnav-alert-btn" title="Alerts">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {unread > 0 && <span className="topnav-badge">{unread}</span>}
        </button>
        <div className="topnav-avatar" title="Anna Lindqvist — Head of IR">AL</div>
      </div>
    </header>
  );
}
