import { useOverlay } from '../context/OverlayContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export function QrSheet() {
  const { openSheetId, closeSheet } = useOverlay();
  const { toast } = useToast();
  const isOpen = openSheetId === 'qr-sheet';

  return (
    <div className={`sheet-backdrop${isOpen ? ' open' : ''}`} id="qr-sheet" onClick={closeSheet}>
        <div className="sheet" onClick={(e) => e.stopPropagation()}>
          <div className="sheet-handle"></div>
          <h3>کد دعوت ساخته شد</h3>
          <div className="qr-display">
            <div className="qr-box">
              <svg className="qr-svg" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
                <rect width="140" height="140" fill="#fff" />
                <g fill="#2B3F5C">
                  <rect x="0" y="0" width="28" height="28" />
                  <rect x="112" y="0" width="28" height="28" />
                  <rect x="0" y="112" width="28" height="28" />
                </g>
                <g fill="#fff">
                  <rect x="4" y="4" width="20" height="20" />
                  <rect x="116" y="4" width="20" height="20" />
                  <rect x="4" y="116" width="20" height="20" />
                </g>
                <g fill="#2B3F5C">
                  <rect x="8" y="8" width="12" height="12" />
                  <rect x="120" y="8" width="12" height="12" />
                  <rect x="8" y="120" width="12" height="12" />
                </g>
                <g fill="#2B3F5C">
                  <rect x="36" y="4" width="4" height="4" /><rect x="44" y="4" width="4" height="4" />
                  <rect x="56" y="4" width="8" height="4" /><rect x="72" y="4" width="4" height="4" />
                  <rect x="84" y="4" width="4" height="4" /><rect x="96" y="4" width="8" height="4" />
                  <rect x="36" y="12" width="8" height="4" /><rect x="52" y="12" width="4" height="4" />
                  <rect x="60" y="12" width="4" height="4" /><rect x="72" y="12" width="8" height="4" />
                  <rect x="88" y="12" width="4" height="4" /><rect x="100" y="12" width="4" height="4" />
                  <rect x="36" y="20" width="4" height="4" /><rect x="48" y="20" width="8" height="4" />
                  <rect x="60" y="20" width="4" height="4" /><rect x="68" y="20" width="4" height="4" />
                  <rect x="80" y="20" width="4" height="4" /><rect x="92" y="20" width="8" height="4" />
                  <rect x="104" y="20" width="4" height="4" />
                  <rect x="4" y="36" width="4" height="4" /><rect x="12" y="36" width="8" height="4" />
                  <rect x="24" y="36" width="4" height="4" /><rect x="32" y="36" width="4" height="4" />
                  <rect x="44" y="36" width="4" height="4" /><rect x="52" y="36" width="4" height="4" />
                  <rect x="60" y="36" width="8" height="4" /><rect x="72" y="36" width="4" height="4" />
                  <rect x="84" y="36" width="8" height="4" /><rect x="100" y="36" width="4" height="4" />
                  <rect x="112" y="36" width="4" height="4" /><rect x="120" y="36" width="8" height="4" />
                  <rect x="132" y="36" width="4" height="4" />
                  <rect x="4" y="44" width="8" height="4" /><rect x="20" y="44" width="4" height="4" />
                  <rect x="28" y="44" width="8" height="4" /><rect x="40" y="44" width="4" height="4" />
                  <rect x="48" y="44" width="4" height="4" /><rect x="56" y="44" width="4" height="4" />
                  <rect x="64" y="44" width="8" height="4" /><rect x="76" y="44" width="4" height="4" />
                  <rect x="88" y="44" width="8" height="4" /><rect x="104" y="44" width="4" height="4" />
                  <rect x="116" y="44" width="8" height="4" /><rect x="128" y="44" width="4" height="4" />
                  <rect x="4" y="52" width="4" height="4" /><rect x="16" y="52" width="4" height="4" />
                  <rect x="28" y="52" width="4" height="4" /><rect x="40" y="52" width="8" height="4" />
                  <rect x="52" y="52" width="4" height="4" /><rect x="64" y="52" width="4" height="4" />
                  <rect x="76" y="52" width="8" height="4" /><rect x="92" y="52" width="4" height="4" />
                  <rect x="104" y="52" width="8" height="4" /><rect x="120" y="52" width="4" height="4" />
                  <rect x="132" y="52" width="4" height="4" />
                  <rect x="4" y="60" width="8" height="4" /><rect x="20" y="60" width="4" height="4" />
                  <rect x="32" y="60" width="8" height="4" /><rect x="48" y="60" width="4" height="4" />
                  <rect x="68" y="60" width="4" height="4" /><rect x="80" y="60" width="4" height="4" />
                  <rect x="92" y="60" width="8" height="4" /><rect x="108" y="60" width="4" height="4" />
                  <rect x="120" y="60" width="4" height="4" />
                  <rect x="12" y="68" width="4" height="4" /><rect x="24" y="68" width="8" height="4" />
                  <rect x="36" y="68" width="4" height="4" /><rect x="44" y="68" width="4" height="4" />
                  <rect x="56" y="68" width="4" height="4" /><rect x="68" y="68" width="4" height="4" />
                  <rect x="80" y="68" width="8" height="4" /><rect x="96" y="68" width="4" height="4" />
                  <rect x="108" y="68" width="4" height="4" /><rect x="120" y="68" width="8" height="4" />
                  <rect x="4" y="76" width="4" height="4" /><rect x="16" y="76" width="8" height="4" />
                  <rect x="28" y="76" width="4" height="4" /><rect x="40" y="76" width="4" height="4" />
                  <rect x="52" y="76" width="4" height="4" /><rect x="64" y="76" width="8" height="4" />
                  <rect x="76" y="76" width="4" height="4" /><rect x="84" y="76" width="4" height="4" />
                  <rect x="96" y="76" width="4" height="4" /><rect x="104" y="76" width="4" height="4" />
                  <rect x="116" y="76" width="4" height="4" /><rect x="128" y="76" width="8" height="4" />
                  <rect x="4" y="84" width="8" height="4" /><rect x="20" y="84" width="4" height="4" />
                  <rect x="28" y="84" width="4" height="4" /><rect x="36" y="84" width="8" height="4" />
                  <rect x="52" y="84" width="4" height="4" /><rect x="68" y="84" width="8" height="4" />
                  <rect x="80" y="84" width="4" height="4" /><rect x="92" y="84" width="4" height="4" />
                  <rect x="104" y="84" width="8" height="4" /><rect x="120" y="84" width="4" height="4" />
                  <rect x="132" y="84" width="4" height="4" />
                  <rect x="36" y="92" width="4" height="4" /><rect x="44" y="92" width="8" height="4" />
                  <rect x="56" y="92" width="4" height="4" /><rect x="68" y="92" width="4" height="4" />
                  <rect x="84" y="92" width="4" height="4" /><rect x="96" y="92" width="8" height="4" />
                  <rect x="108" y="92" width="4" height="4" /><rect x="120" y="92" width="8" height="4" />
                  <rect x="36" y="100" width="8" height="4" /><rect x="48" y="100" width="4" height="4" />
                  <rect x="60" y="100" width="4" height="4" /><rect x="72" y="100" width="4" height="4" />
                  <rect x="84" y="100" width="8" height="4" /><rect x="100" y="100" width="4" height="4" />
                  <rect x="112" y="100" width="4" height="4" /><rect x="124" y="100" width="8" height="4" />
                  <rect x="36" y="108" width="4" height="4" /><rect x="44" y="108" width="4" height="4" />
                  <rect x="56" y="108" width="8" height="4" /><rect x="68" y="108" width="4" height="4" />
                  <rect x="80" y="108" width="4" height="4" /><rect x="92" y="108" width="4" height="4" />
                  <rect x="104" y="108" width="8" height="4" /><rect x="120" y="108" width="4" height="4" />
                  <rect x="36" y="116" width="8" height="4" /><rect x="48" y="116" width="4" height="4" />
                  <rect x="56" y="116" width="4" height="4" /><rect x="68" y="116" width="8" height="4" />
                  <rect x="84" y="116" width="4" height="4" /><rect x="96" y="116" width="4" height="4" />
                  <rect x="108" y="116" width="8" height="4" /><rect x="124" y="116" width="4" height="4" />
                  <rect x="40" y="124" width="4" height="4" /><rect x="52" y="124" width="8" height="4" />
                  <rect x="64" y="124" width="4" height="4" /><rect x="76" y="124" width="4" height="4" />
                  <rect x="88" y="124" width="8" height="4" /><rect x="104" y="124" width="4" height="4" />
                  <rect x="116" y="124" width="4" height="4" /><rect x="128" y="124" width="4" height="4" />
                  <rect x="36" y="132" width="4" height="4" /><rect x="48" y="132" width="8" height="4" />
                  <rect x="60" y="132" width="4" height="4" /><rect x="72" y="132" width="4" height="4" />
                  <rect x="84" y="132" width="4" height="4" /><rect x="96" y="132" width="8" height="4" />
                  <rect x="112" y="132" width="4" height="4" /><rect x="124" y="132" width="4" height="4" />
                </g>
              </svg>
              <div className="qr-logo">پ</div>
            </div>
            <div className="qr-code">INV-PAZ-92X1</div>
            <div className="qr-expiry"><span className="dot"></span>یکبار مصرف · منقضی در ۷۲ ساعت</div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
            <button className="btn outline" onClick={() => { toast('لینک در کلیپ‌بورد کپی شد') }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              کپی لینک
            </button>
            <button className="btn primary" onClick={() => { toast('ارسال به واتساپ…') }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
              اشتراک‌گذاری
            </button>
          </div>
        </div>
      </div>
  );
}
