import { ChevronRight } from './icons.jsx';

export function PageTopBar({ onBack, title, right, backIcon }) {
  return (
    <div className="topbar">
      <button className="icon-btn" onClick={onBack}>
        {backIcon ?? <ChevronRight />}
      </button>
      <div className="ttl-wrap center"><h2>{title}</h2></div>
      {right ?? <div style={{ width: '36px' }} />}
    </div>
  );
}
