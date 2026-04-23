import { Check, ChevronLeft } from './icons.jsx';

export function TileCard({ id, sku, size, name, physical, freeze, available, assigned, lowStock, onPress }) {
  return (
    <div
      className="tile-card"
      data-tile-id={id}
      data-assigned={String(assigned)}
      onClick={onPress}
    >
      <div className="meta-chips">
        <span className="meta-chip sku">{sku}</span>
        <span className="meta-chip">{size}</span>
      </div>
      <div className="title-wrap">{name}</div>
      <div className="stats-row">
        <div className="sub-stats">
          <span className="sub-cell">
            <span className="sub-dot physical" />
            <span className="sub-lbl">فیزیکی</span>
            <span className="sub-val">{physical}</span>
          </span>
          <span className="sub-cell">
            <span className="sub-dot freeze" />
            <span className="sub-lbl">فریز</span>
            <span className="sub-val">{freeze}</span>
          </span>
        </div>
        <span className={`available-chip${lowStock ? ' low' : ''}`}>
          <span className="ac-val">{available}</span>
          <span className="ac-lbl">قابل فروش</span>
        </span>
      </div>
      <div className="assign-check"><Check strokeWidth={3} /></div>
      <div className="tc-arrow"><ChevronLeft size={16} /></div>
    </div>
  );
}
