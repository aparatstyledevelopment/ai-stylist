import { useLegacyActions } from '../hooks/useLegacyActions.js';

export function CartPage() {
  const { cartStep, goBack, removeCartItem, selectCartMode, toast, updateCartCalc } = useLegacyActions();
  return (
    <>
          <div className="topbar">
            <button className="icon-btn" onClick={() => { goBack('shop') }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6" /></svg>
            </button>
            <div className="ttl-wrap center"><h2>سبد خرید</h2></div>
            <div style={{width:'36px'}}></div>
          </div>

          <div className="content" style={{padding:'12px 0 240px'}}>
            
            {/* Cart Item 1 */}
            <div className="cart-item" data-cart-id="ci1" data-pcs-per-carton="3" data-cartons-per-pallet="60" data-weight-per-pc="0.5" data-price-per-pc="580000" data-stock-pcs="720" data-mode="unit">
              <div className="ci-head">
                <div className="ci-media pattern-a">
                  <div className="sc-pattern-inner"></div>
                </div>
                <div className="ci-info">
                  <div className="ci-name">کاشی خاک‌سفید — پله ۸۰۵</div>
                  <div className="ci-meta">
                    <span className="ci-chip sku">6029351028052120</span>
                    <span className="ci-chip">۱۰۰×۳۵</span>
                  </div>
                  <div className="ci-ratio">هر کارتن ۳ عدد · هر پالت ۶۰ کارتن</div>
                </div>
                <button className="ci-remove" onClick={() => { removeCartItem('ci1') }} title="حذف">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1.45 13.16A2 2 0 0 1 15.56 21H8.44a2 2 0 0 1-1.99-1.84L5 6" /></svg>
                </button>
              </div>
              
              <div className="ci-mode-tabs">
                <button className="cmt active" onClick={(e) => { selectCartMode(e, 'ci1', 'unit') }}>خرید عدد</button>
                <button className="cmt" onClick={(e) => { selectCartMode(e, 'ci1', 'pallet') }}>خرید پالتی</button>
              </div>

              <div className="ci-stepper">
                <button className="ci-step-btn" onClick={() => { cartStep('ci1', 1) }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                </button>
                <div className="ci-step-center">
                  <div className="ci-step-label">مقدار مورد نیاز <span>(عدد)</span></div>
                  <input type="text" className="ci-step-input" defaultValue="2" onInput={() => { updateCartCalc('ci1') }} onClick={(e) => { e.currentTarget.select() }} />
                  <div className="ci-step-stock">موجودی: <b>۷۲۰</b> عدد</div>
                </div>
                <button className="ci-step-btn" onClick={() => { cartStep('ci1', -1) }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                </button>
              </div>

              <div className="ci-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                مقدار درخواستی بیشتر از موجودی است
              </div>

              <div className="ci-details">
                <span className="cid-item"><span className="cid-v" id="ci1-calc">۱</span> <span className="cid-u">کارتن</span></span>
                <span className="cid-sep">•</span>
                <span className="cid-item"><span className="cid-v" id="ci1-final">۳</span> <span className="cid-u">عدد</span></span>
                <span className="cid-sep">•</span>
                <span className="cid-item"><span className="cid-v" id="ci1-weight">۱.۵</span> <span className="cid-u">کیلوگرم</span></span>
              </div>

              <div className="ci-price-hero">
                <div className="cph-label">قیمت نهایی</div>
                <div className="cph-value">
                  <span id="ci1-price">۱,۷۴۰,۰۰۰</span>
                  <small>تومان</small>
                </div>
              </div>
            </div>

            {/* Cart Item 2 */}
            <div className="cart-item" data-cart-id="ci2" data-pcs-per-carton="4" data-cartons-per-pallet="60" data-weight-per-pc="0.6" data-price-per-pc="640000" data-stock-pcs="1260" data-mode="pallet">
              <div className="ci-head">
                <div className="ci-media pattern-b">
                  <div className="sc-pattern-inner"></div>
                </div>
                <div className="ci-info">
                  <div className="ci-name">کاشی خاک‌سفید — پله ۸۴۶</div>
                  <div className="ci-meta">
                    <span className="ci-chip sku">6029351028462120</span>
                    <span className="ci-chip">۱۰۰×۳۵</span>
                  </div>
                  <div className="ci-ratio">هر کارتن ۴ عدد · هر پالت ۶۰ کارتن</div>
                </div>
                <button className="ci-remove" onClick={() => { removeCartItem('ci2') }} title="حذف">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1.45 13.16A2 2 0 0 1 15.56 21H8.44a2 2 0 0 1-1.99-1.84L5 6" /></svg>
                </button>
              </div>
              
              <div className="ci-mode-tabs">
                <button className="cmt" onClick={(e) => { selectCartMode(e, 'ci2', 'unit') }}>خرید عدد</button>
                <button className="cmt active" onClick={(e) => { selectCartMode(e, 'ci2', 'pallet') }}>خرید پالتی</button>
              </div>

              <div className="ci-stepper">
                <button className="ci-step-btn" onClick={() => { cartStep('ci2', 1) }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                </button>
                <div className="ci-step-center">
                  <div className="ci-step-label">تعداد پالت <span>(پالت کامل)</span></div>
                  <input type="text" className="ci-step-input" defaultValue="4" onInput={() => { updateCartCalc('ci2') }} onClick={(e) => { e.currentTarget.select() }} />
                  <div className="ci-step-stock">موجودی: <b>۱,۲۶۰</b> عدد</div>
                </div>
                <button className="ci-step-btn" onClick={() => { cartStep('ci2', -1) }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                </button>
              </div>

              <div className="ci-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                مقدار درخواستی بیشتر از موجودی است
              </div>

              <div className="ci-details">
                <span className="cid-item"><span className="cid-v" id="ci2-calc">۴</span> <span className="cid-u">پالت</span></span>
                <span className="cid-sep">•</span>
                <span className="cid-item"><span className="cid-v" id="ci2-final">۹۶۰</span> <span className="cid-u">عدد</span></span>
                <span className="cid-sep">•</span>
                <span className="cid-item"><span className="cid-v" id="ci2-weight">۵۷۶</span> <span className="cid-u">کیلوگرم</span></span>
              </div>

              <div className="ci-price-hero">
                <div className="cph-label">قیمت نهایی</div>
                <div className="cph-value">
                  <span id="ci2-price">۶۱۴,۴۰۰,۰۰۰</span>
                  <small>تومان</small>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom summary + submit */}
          <div className="cart-summary">
            <div className="cs-rows">
              <div className="cs-row">
                <span className="cs-lbl">وزن کل سفارش</span>
                <span className="cs-val" id="cart-total-weight">۵۷۷.۵ کیلوگرم</span>
              </div>
              <div className="cs-row">
                <span className="cs-lbl">مبلغ قابل پرداخت</span>
                <span className="cs-val big" id="cart-total-price">۶۱۶,۱۴۰,۰۰۰ تومان</span>
              </div>
            </div>
            <button className="cart-submit-btn" onClick={() => { toast('✓ سفارش ثبت شد') }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12" /></svg>
              ثبت سفارش
            </button>
          </div></>
  );
}
