import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Trash, Plus, Minus, AlertCircle, Check } from '../components/icons.jsx';
import { PageTopBar } from '../components/PageTopBar.jsx';

export function CartPage() {
  const { cartStep, goBack, removeCartItem, selectCartMode, toast, updateCartCalc } = useLegacyActions();
  return (
    <>
          <PageTopBar onBack={() => goBack('shop')} title="سبد خرید" />

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
                  <Trash size={14} />
                </button>
              </div>
              
              <div className="ci-mode-tabs">
                <button className="cmt active" onClick={(e) => { selectCartMode(e, 'ci1', 'unit') }}>خرید عدد</button>
                <button className="cmt" onClick={(e) => { selectCartMode(e, 'ci1', 'pallet') }}>خرید پالتی</button>
              </div>

              <div className="ci-stepper">
                <button className="ci-step-btn" onClick={() => { cartStep('ci1', 1) }}>
                  <Plus size={14} strokeWidth={2.5} />
                </button>
                <div className="ci-step-center">
                  <div className="ci-step-label">مقدار مورد نیاز <span>(عدد)</span></div>
                  <input type="text" className="ci-step-input" defaultValue="2" onInput={() => { updateCartCalc('ci1') }} onClick={(e) => { e.currentTarget.select() }} />
                  <div className="ci-step-stock">موجودی: <b>۷۲۰</b> عدد</div>
                </div>
                <button className="ci-step-btn" onClick={() => { cartStep('ci1', -1) }}>
                  <Minus size={14} strokeWidth={2.5} />
                </button>
              </div>

              <div className="ci-error">
                <AlertCircle size={12} />
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
                  <Trash size={14} />
                </button>
              </div>
              
              <div className="ci-mode-tabs">
                <button className="cmt" onClick={(e) => { selectCartMode(e, 'ci2', 'unit') }}>خرید عدد</button>
                <button className="cmt active" onClick={(e) => { selectCartMode(e, 'ci2', 'pallet') }}>خرید پالتی</button>
              </div>

              <div className="ci-stepper">
                <button className="ci-step-btn" onClick={() => { cartStep('ci2', 1) }}>
                  <Plus size={14} strokeWidth={2.5} />
                </button>
                <div className="ci-step-center">
                  <div className="ci-step-label">تعداد پالت <span>(پالت کامل)</span></div>
                  <input type="text" className="ci-step-input" defaultValue="4" onInput={() => { updateCartCalc('ci2') }} onClick={(e) => { e.currentTarget.select() }} />
                  <div className="ci-step-stock">موجودی: <b>۱,۲۶۰</b> عدد</div>
                </div>
                <button className="ci-step-btn" onClick={() => { cartStep('ci2', -1) }}>
                  <Minus size={14} strokeWidth={2.5} />
                </button>
              </div>

              <div className="ci-error">
                <AlertCircle size={12} />
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
              <Check size={14} strokeWidth={2.5} />
              ثبت سفارش
            </button>
          </div></>
  );
}
