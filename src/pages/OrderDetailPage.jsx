import { useLegacyActions } from '../hooks/useLegacyActions.js';

export function OrderDetailPage() {
  const { approveOrder, goBack, rejectOrder, toast, toggleTimeline } = useLegacyActions();
  return (
    <>
          <div className="topbar">
            <button className="icon-btn" onClick={() => { goBack('orders') }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6" /></svg>
            </button>
            <div className="ttl-wrap center"><h2>جزئیات حواله</h2></div>
            <button className="icon-btn" onClick={() => { toast('گزینه‌های بیشتر') }}>
              <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" /></svg>
            </button>
          </div>

          <div className="content" style={{paddingTop:'0'}}>
            <div className="invoice-sheet">
              <div className="invoice-meta">
                <span style={{fontSize:'11px', color:'var(--text-muted)'}}>حواله فروش</span>
                <span className="id">ord-b88a#</span>
              </div>
              
              <div className="invoice-divider"></div>
              
              <div className="invoice-rows">
                <div className="invoice-row">
                  <span className="key">مشتری</span>
                  <span className="val">یزد مهرآوران</span>
                </div>
                <div className="invoice-row">
                  <span className="key">تماس</span>
                  <span className="val ltr">09131527538</span>
                </div>
                <div className="invoice-row">
                  <span className="key">نماینده</span>
                  <span className="val">مارال رحیمی</span>
                </div>
                <div className="invoice-row">
                  <span className="key">تاریخ ثبت</span>
                  <span className="val ltr">۱۴۰۵/۱/۷ <span className="sub">۱۴:۲۲</span></span>
                </div>
                <div className="invoice-row">
                  <span className="key">
                    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                    نوع سفارش
                  </span>
                  <span className="val accent">صادراتی</span>
                </div>
                <div className="invoice-row">
                  <span className="key">
                    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    مقصد
                  </span>
                  <span className="val accent">عراق · موسوی</span>
                </div>
              </div>
              
              <div className="invoice-divider dashed"></div>
              
              <div className="invoice-section expandable" id="timeline-toggle" onClick={() => { toggleTimeline() }}>
                <h4>چرخه تایید</h4>
                <div className="left">
                  <span className="progress-pill">منتظر تایید مالی</span>
                  <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              </div>
              
              <div className="invoice-collapsible" id="timeline-content">
                <div className="invoice-timeline">
                  <div className="inv-tl-item">
                    <div className="inv-tl-node done">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="11" height="11"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <div className="inv-tl-text">
                      <div className="title">نماینده تایید کرد</div>
                      <div className="sub">۱۴:۳۰ · رحیمی</div>
                    </div>
                  </div>
                  <div className="inv-tl-item">
                    <div className="inv-tl-node done">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="11" height="11"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <div className="inv-tl-text">
                      <div className="title">تیم فروش کارخانه</div>
                      <div className="sub">۱۵:۱۰ · علی محمدی</div>
                    </div>
                  </div>
                  <div className="inv-tl-item">
                    <div className="inv-tl-node active">
                      <div style={{width:'5px', height:'5px', borderRadius:'50%', background:'#fff'}}></div>
                    </div>
                    <div className="inv-tl-text active">
                      <div className="title">تایید مالی / حسابداری</div>
                      <div className="sub">در انتظار بررسی شما…</div>
                    </div>
                  </div>
                  <div className="inv-tl-item">
                    <div className="inv-tl-node pending"></div>
                    <div className="inv-tl-text muted">
                      <div className="title">انباردار و ثبت خروج</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="invoice-divider dashed"></div>
              
              <div className="invoice-section">
                <h4>اقلام سفارش</h4>
                <span className="meta">۲ قلم</span>
              </div>
              
              <div className="invoice-items">
                <div className="inv-item">
                  <div className="left">
                    <div className="name">کاشی خاک‌سفید — پله ۸۰۵</div>
                    <div className="specs">۱۰۰×۳۵ · ۲۰ عدد</div>
                    <div className="area">۲۰.۰۰ m²</div>
                  </div>
                  <div className="right">
                    <div className="price">۸,۵۰۰,۰۰۰</div>
                    <div className="price-unit">تومان</div>
                  </div>
                </div>
                <div className="inv-item">
                  <div className="left">
                    <div className="name">کاشی خاک‌سفید — پله ۸۴۶</div>
                    <div className="specs">۱۰۰×۳۵ · ۳۵ عدد</div>
                    <div className="area">۲۰.۰۰ m²</div>
                  </div>
                  <div className="right">
                    <div className="price">۱۶,۰۰۰,۰۰۰</div>
                    <div className="price-unit">تومان</div>
                  </div>
                </div>
              </div>
              
              <div className="invoice-divider dashed"></div>
              
              <div className="invoice-totals">
                <div className="invoice-row">
                  <span className="key">جمع متراژ</span>
                  <span className="val ltr">۴۰.۰۰ m²</span>
                </div>
                <div className="invoice-row">
                  <span className="key">وزن تقریبی</span>
                  <span className="val ltr">۸۸۰ kg</span>
                </div>
              </div>
              
              <div className="invoice-grand">
                <span className="label">مبلغ نهایی</span>
                <div className="value-wrap">
                  <span className="value">۲۴,۵۰۰,۰۰۰</span>
                  <span className="unit">تومان</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{background:'#fff', padding:'16px 20px 24px', display:'flex', gap:'10px', flexShrink:'0'}}>
            <button className="btn success" style={{flex:'1.3'}} onClick={() => { approveOrder() }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12" /></svg>
              تایید و ارسال
            </button>
            <button className="btn outline-danger" style={{flex:'1'}} onClick={() => { rejectOrder() }}>رد حواله</button>
          </div></>
  );
}
