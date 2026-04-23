import { Close, ChevronLeft } from './icons.jsx';

export function OrderCard({ o, onPress }) {
  return (
    <div className="order-card" key={o.id} onClick={onPress}>
      <div className="oc-header">
        <span className={`chip ${o.chip}`}><span className="dot" />{o.chipLabel}</span>
        <span className="oc-id">ord-{o.id}#</span>
      </div>
      <div className="oc-body">
        <div className="oc-info">
          <div className="oc-customer">{o.customer}</div>
          {o.summary && (
            <div className="oc-meta">
              <span className="m-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="12" height="12">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
                {' '}{o.summary.items} قلم
              </span>
              <span className="m-sep">·</span>
              <span className="m-item" style={{ direction: 'ltr' }}>{o.summary.area}</span>
            </div>
          )}
        </div>
        <div className="oc-amount">
          <div className="val">{o.amount}</div>
          <div className="unit">تومان</div>
        </div>
      </div>
      {o.rejected && (
        <div className="reject-note">
          <div className="body">
            <div className="lbl">رد توسط {o.rejectBy}</div>
            <div className="reason">{o.rejected}</div>
          </div>
          <div className="ico-r"><Close size={10} strokeWidth={3} /></div>
        </div>
      )}
      <div className="oc-footer">
        <span className="oc-time">{o.meta || o.summary?.date || ''}</span>
        <div className={`oc-arrow${!o.action ? ' ghost' : ''}`}>
          <ChevronLeft strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}
