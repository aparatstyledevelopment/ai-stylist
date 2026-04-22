import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { ChevronRight, Info, TrendingUp } from '../components/icons.jsx';

export function PriceManagementPage() {
  const { calcProfit, goBack, savePriceNew } = useLegacyActions();
  return (
    <>
          <div className="topbar">
            <button className="icon-btn" onClick={() => { goBack('warehouse') }}>
              <ChevronRight />
            </button>
            <div className="ttl-wrap center"><h2>قیمت فروش</h2></div>
            <div style={{width:'36px'}}></div>
          </div>

          <div className="content">
            {/* Pending notice banner */}
            <div className="pm-notice">
              <div className="pm-notice-ico">
                <Info size={14} />
              </div>
              <div className="pm-notice-txt">
                <b>۳ کاشی منتظر قیمت‌گذاری</b>
                <span>قیمت کارخانه فقط برای اطلاع شماست. مشتری فقط قیمت فروش شما رو می‌بینه.</span>
              </div>
            </div>

            {/* Price card 1 (empty) */}
            <div className="pm-card">
              <div className="pm-info">
                <div className="pm-title">کاشی خاک‌سفید — زیرپله ۴۰۲</div>
                <div className="pm-meta-chips">
                  <span className="pm-chip sku">6029201024022120</span>
                  <span className="pm-chip">۱۰۰×۳۵</span>
                </div>
              </div>
              <div className="pm-ref">
                <span className="pm-ref-lbl">قیمت کارخانه</span>
                <span className="pm-ref-val">۵۸۰,۰۰۰ <small>ت</small></span>
              </div>
              <div className="pm-input-wrap">
                <input className="pm-input" placeholder="قیمت فروش شما" onInput={(e) => { calcProfit(e, 580000) }} />
                <span className="pm-input-unit">تومان</span>
                <button className="pm-save-btn" onClick={(e) => { savePriceNew(e) }}>ثبت</button>
              </div>
              <div className="pm-profit-wrap"></div>
            </div>

            {/* Price card 2 (filled with profit) */}
            <div className="pm-card filled">
              <div className="pm-info">
                <div className="pm-title">کاشی خاک‌سفید — زیرپله ۴۰۵</div>
                <div className="pm-meta-chips">
                  <span className="pm-chip sku">6029201024052120</span>
                  <span className="pm-chip">۱۰۰×۳۵</span>
                </div>
              </div>
              <div className="pm-ref">
                <span className="pm-ref-lbl">قیمت کارخانه</span>
                <span className="pm-ref-val">۶۲۰,۰۰۰ <small>ت</small></span>
              </div>
              <div className="pm-input-wrap">
                <input className="pm-input" defaultValue="750000" style={{textAlign:'left', direction:'ltr'}} onInput={(e) => { calcProfit(e, 620000) }} />
                <span className="pm-input-unit">تومان</span>
                <button className="pm-save-btn" onClick={(e) => { savePriceNew(e) }}>ثبت</button>
              </div>
              <div className="pm-profit-wrap">
                <span className="pm-profit-chip">
                  <TrendingUp size={10} strokeWidth={2.5} />
                  سود ۲۱٪
                </span>
                <span className="pm-profit-amt">۱۳۰,۰۰۰ <small>ت</small></span>
              </div>
            </div>

            {/* Price card 3 (empty) */}
            <div className="pm-card">
              <div className="pm-info">
                <div className="pm-title">کاشی خاک‌سفید — زیرپله ۴۰۷</div>
                <div className="pm-meta-chips">
                  <span className="pm-chip sku">6029201024072120</span>
                  <span className="pm-chip">۱۰۰×۳۵</span>
                </div>
              </div>
              <div className="pm-ref">
                <span className="pm-ref-lbl">قیمت کارخانه</span>
                <span className="pm-ref-val">۵۴۰,۰۰۰ <small>ت</small></span>
              </div>
              <div className="pm-input-wrap">
                <input className="pm-input" placeholder="قیمت فروش شما" onInput={(e) => { calcProfit(e, 540000) }} />
                <span className="pm-input-unit">تومان</span>
                <button className="pm-save-btn" onClick={(e) => { savePriceNew(e) }}>ثبت</button>
              </div>
              <div className="pm-profit-wrap"></div>
            </div>
          </div></>
  );
}
