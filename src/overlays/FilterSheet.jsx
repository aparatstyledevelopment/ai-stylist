import { useEffect, useState } from 'react';
import { useOverlay } from '../context/OverlayContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { toPersianNum } from '../utils/format.js';
import { Check } from '../components/icons.jsx';

export function FilterSheet() {
  const { openSheetId, sheetData, closeSheet } = useOverlay();
  const { toast } = useToast();
  const isOpen = openSheetId === 'filter-sheet';
  const data = sheetData?.data;
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (isOpen) setSelected([]);
  }, [isOpen, sheetData?.filterKey]);

  const toggleOpt = (k) => {
    setSelected((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  };

  const clear = () => setSelected([]);

  const apply = () => {
    closeSheet();
    if (selected.length > 0) {
      toast(`فیلتر اعمال شد: ${toPersianNum(selected.length)} مورد`);
    }
  };

  const selCount = selected.length;

  return (
    <div
      className={`sheet-backdrop${isOpen ? ' open' : ''}`}
      id="filter-sheet"
      onClick={closeSheet}
    >
      <div className="sheet filter-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle"></div>
        <div className="fs-head">
          <h3 id="fs-title">{data?.title || 'فیلتر'}</h3>
          <button
            className="fs-clear-btn"
            id="fs-clear"
            onClick={clear}
            disabled={selCount === 0}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            پاک کردن
          </button>
        </div>
        <div className="fs-options" id="fs-options">
          {data?.options.map((opt) => (
            <div
              key={opt.k}
              className={`fs-opt${selected.includes(opt.k) ? ' selected' : ''}`}
              data-k={opt.k}
              onClick={() => toggleOpt(opt.k)}
            >
              <div className="fso-check">
                <Check strokeWidth={3} />
              </div>
              <span className="fso-label">{opt.label}</span>
              <span className="fso-count">{toPersianNum(opt.count)} مدل</span>
            </div>
          ))}
        </div>
        <div className="fs-footer">
          <button className="fs-apply-btn" onClick={apply}>
            <Check size={14} strokeWidth={2.5} />
            <span id="fs-apply-text">
              {selCount > 0 ? `اعمال فیلتر (${toPersianNum(selCount)} مورد)` : 'اعمال فیلتر'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
