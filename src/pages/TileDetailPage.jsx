import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Edit, Plus, Minus, Check, ArrowUp, ArrowDown } from '../components/icons.jsx';
import { PageTopBar } from '../components/PageTopBar.jsx';

export function TileDetailPage() {
  const { goBack, quickAdd, toast } = useLegacyActions();
  return (
    <>
          <PageTopBar onBack={() => goBack('warehouse')} title="جزئیات کاشی" />

          <div className="content" style={{padding:'12px 0 32px'}}>
            
            {/* Card 1: Tile info summary */}
            <div className="td-card">
              <div className="td-card-head">
                <h4>اطلاعات کاشی</h4>
                <button className="td-card-action" onClick={() => { toast('صفحه ویرایش کاشی') }}>
                  <Edit size={12} />
                  ویرایش
                </button>
              </div>
              <div className="td-card-body">
                <div className="td-info-row">
                  <div className="td-img-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8" cy="8" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                  </div>
                  <div className="td-info-txt">
                    <div className="td-name">کاشی سرامیک — پله ۸۳۴</div>
                    <div className="td-sku-txt">6029301028342120</div>
                  </div>
                </div>
                <div className="td-specs-grid">
                  <div className="td-spec"><span className="tds-k">سایز</span><span className="tds-v">۱۰۰×۳۰</span></div>
                  <div className="td-spec"><span className="tds-k">بدنه</span><span className="tds-v">سرامیک</span></div>
                  <div className="td-spec"><span className="tds-k">لعاب</span><span className="tds-v">مات</span></div>
                  <div className="td-spec"><span className="tds-k">کاربرد</span><span className="tds-v">کف، پله</span></div>
                  <div className="td-spec"><span className="tds-k">ضخامت</span><span className="tds-v">۹ mm</span></div>
                  <div className="td-spec"><span className="tds-k">هر کارتن</span><span className="tds-v">۸ عدد</span></div>
                </div>
              </div>
            </div>

            {/* Card 2: Stock update (simplified) */}
            <div className="td-card">
              <div className="td-card-head">
                <h4>بروزرسانی موجودی</h4>
                <span className="td-current-inline">فعلی: <b>۱۲۶</b></span>
              </div>
              <div className="td-card-body">
                <div className="stock-quick-grid">
                  <button className="sqg-btn plus" onClick={() => { quickAdd(1) }} aria-label="افزایش">
                    <Plus size={18} strokeWidth={2.5} />
                  </button>
                  <input type="text" className="sqg-input" id="new-stock" defaultValue="۱۲۶" onClick={(e) => { e.currentTarget.select() }} />
                  <button className="sqg-btn minus" onClick={() => { quickAdd(-1) }} aria-label="کاهش">
                    <Minus size={18} strokeWidth={2.5} />
                  </button>
                </div>
                <button className="td-submit-btn" onClick={() => { toast('✓ موجودی بروز شد') }}>
                  <Check size={14} strokeWidth={2.5} />
                  ثبت تغییر موجودی
                </button>
              </div>
            </div>

            {/* Card: Assigned reps (compact) */}
            <div className="td-card">
              <div className="td-card-head">
                <h4>نماینده‌های دارنده</h4>
                <span className="td-current-inline"><b>۳</b> نماینده</span>
              </div>
              <div className="td-card-body" style={{padding:'10px 12px 12px'}}>
                <div className="td-reps">
                  <div className="td-rep">
                    <div className="tdr-avatar">م</div>
                    <div className="tdr-info">
                      <div className="tdr-name">مارال رحیمی</div>
                      <div className="tdr-meta">قیمت: <b>۷۵۰,۰۰۰</b> ت · موجودی ۱۲</div>
                    </div>
                    <span className="tdr-profit">+۲۱٪</span>
                  </div>
                  <div className="td-rep">
                    <div className="tdr-avatar">ا</div>
                    <div className="tdr-info">
                      <div className="tdr-name">احمد کریمی</div>
                      <div className="tdr-meta">قیمت: <b>۸۲۰,۰۰۰</b> ت · موجودی ۲۰</div>
                    </div>
                    <span className="tdr-profit">+۳۲٪</span>
                  </div>
                  <div className="td-rep">
                    <div className="tdr-avatar">ر</div>
                    <div className="tdr-info">
                      <div className="tdr-name">رضا کیانی</div>
                      <div className="tdr-meta">هنوز قیمت نزده · موجودی ۵</div>
                    </div>
                    <span className="tdr-profit pending">—</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Transactions (wide, no card wrap) */}
            <div className="td-tx-section">
              <div className="td-tx-head">
                <h4>تاریخچه تراکنش‌ها</h4>
              </div>
              <div className="tx-list wide">
                <div className="tx-item">
                  <div className="tx-icon up">
                    <ArrowUp strokeWidth={2.5} />
                  </div>
                  <div className="tx-info">
                    <div className="tx-type">ورود از کارخانه</div>
                    <div className="tx-meta">امروز ۱۴:۲۳ · پالت تبریز کاشی</div>
                  </div>
                  <div className="tx-amount up">+۵۰</div>
                </div>

                <div className="tx-item">
                  <div className="tx-icon down">
                    <ArrowDown strokeWidth={2.5} />
                  </div>
                  <div className="tx-info">
                    <div className="tx-type">خروج حواله</div>
                    <div className="tx-meta">دیروز ۱۶:۱۰ · ord-b88a</div>
                  </div>
                  <div className="tx-amount down">−۲۰</div>
                </div>

                <div className="tx-item">
                  <div className="tx-icon up">
                    <ArrowUp strokeWidth={2.5} />
                  </div>
                  <div className="tx-info">
                    <div className="tx-type">ورود اولیه</div>
                    <div className="tx-meta">۱۴۰۵/۱/۴ · بروزرسانی گروهی</div>
                  </div>
                  <div className="tx-amount up">+۱۰۰</div>
                </div>

                <div className="tx-item">
                  <div className="tx-icon down">
                    <ArrowDown strokeWidth={2.5} />
                  </div>
                  <div className="tx-info">
                    <div className="tx-type">خروج حواله</div>
                    <div className="tx-meta">۱۴۰۵/۱/۲ · ord-a47f</div>
                  </div>
                  <div className="tx-amount down">−۴</div>
                </div>

                <div className="tx-item">
                  <div className="tx-icon up">
                    <ArrowUp strokeWidth={2.5} />
                  </div>
                  <div className="tx-info">
                    <div className="tx-type">ورود از کارخانه</div>
                    <div className="tx-meta">۱۴۰۴/۱۲/۲۸ · پالت یزد سرام</div>
                  </div>
                  <div className="tx-amount up">+۸۰</div>
                </div>

                <div className="tx-item">
                  <div className="tx-icon down">
                    <ArrowDown strokeWidth={2.5} />
                  </div>
                  <div className="tx-info">
                    <div className="tx-type">خروج حواله</div>
                    <div className="tx-meta">۱۴۰۴/۱۲/۲۵ · ord-77c2</div>
                  </div>
                  <div className="tx-amount down">−۱۲</div>
                </div>

                <div className="tx-item">
                  <div className="tx-icon down">
                    <ArrowDown strokeWidth={2.5} />
                  </div>
                  <div className="tx-info">
                    <div className="tx-type">خروج حواله</div>
                    <div className="tx-meta">۱۴۰۴/۱۲/۲۰ · ord-43b1</div>
                  </div>
                  <div className="tx-amount down">−۳۰</div>
                </div>
              </div>
            </div>

          </div></>
  );
}
