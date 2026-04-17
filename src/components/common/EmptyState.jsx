import './EmptyState.css';

export default function EmptyState({ message = 'No data available', action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>
      </div>
      <p className="empty-state-msg">{message}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}
