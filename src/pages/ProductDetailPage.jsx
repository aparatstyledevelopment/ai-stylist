import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Share, Home, Copy, Cube, Warehouse3d, Check, ShoppingCart } from '../components/icons.jsx';

export function ProductDetailPage() {
  const { addToCart, goBack, toast } = useLegacyActions();
  return (
    <>
          <div className="pd-topbar">
            <button className="pd-topbtn" onClick={() => { goBack('shop') }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
            <button className="pd-topbtn" onClick={() => { toast('اشتراک‌گذاری لینک') }}>
              <Share strokeWidth={1.8} />
            </button>
          </div>
          
          <div className="content pd-content">
            {/* Hero carousel */}
            <div className="pd-hero">
              <div className="pd-slides" id="pd-slides">
                
                {/* Slide 1: Product render with perspective & shadow */}
                <div className="pd-slide">
                  <div className="ph-scene ph-scene-1">
                    <div className="ph-bg-gradient"></div>
                    <div className="ph-tile-render">
                      <div className="ph-tile-face pattern-a">
                        <div className="sc-pattern-inner"></div>
                      </div>
                      <div className="ph-tile-edge"></div>
                      <div className="ph-tile-shadow"></div>
                    </div>
                    <div className="ph-light-ray"></div>
                    <div className="ph-label-pill">نمای محصول</div>
                  </div>
                </div>
                
                {/* Slide 2: Context / application (wall/floor) */}
                <div className="pd-slide">
                  <div className="ph-scene ph-scene-2">
                    <div className="ph-wall"></div>
                    <div className="ph-floor">
                      <div className="ph-floor-row pattern-a"><div className="sc-pattern-inner"></div></div>
                      <div className="ph-floor-row pattern-a"><div className="sc-pattern-inner"></div></div>
                      <div className="ph-floor-row pattern-a"><div className="sc-pattern-inner"></div></div>
                    </div>
                    <div className="ph-label-pill">نمونه اجرا</div>
                  </div>
                </div>
                
                {/* Slide 3: Close-up texture */}
                <div className="pd-slide">
                  <div className="ph-scene ph-scene-3">
                    <div className="ph-closeup pattern-a">
                      <div className="sc-pattern-inner"></div>
                      <div className="ph-closeup-glare"></div>
                    </div>
                    <div className="ph-label-pill">جزئیات بافت</div>
                  </div>
                </div>
                
                {/* Slide 4: Palette/stack */}
                <div className="pd-slide">
                  <div className="ph-scene ph-scene-4">
                    <div className="ph-bg-gradient"></div>
                    <div className="ph-stack">
                      <div className="ph-stack-layer pattern-a" style={{'--i':'0'}}><div className="sc-pattern-inner"></div></div>
                      <div className="ph-stack-layer pattern-a" style={{'--i':'1'}}><div className="sc-pattern-inner"></div></div>
                      <div className="ph-stack-layer pattern-a" style={{'--i':'2'}}><div className="sc-pattern-inner"></div></div>
                      <div className="ph-stack-layer pattern-a" style={{'--i':'3'}}><div className="sc-pattern-inner"></div></div>
                      <div className="ph-stack-layer pattern-a" style={{'--i':'4'}}><div className="sc-pattern-inner"></div></div>
                    </div>
                    <div className="ph-label-pill">پالت آماده ارسال</div>
                  </div>
                </div>
                
              </div>
              <div className="pd-dots" id="pd-dots">
                <span className="pd-dot active"></span>
                <span className="pd-dot"></span>
                <span className="pd-dot"></span>
                <span className="pd-dot"></span>
              </div>
              <div className="pd-slide-counter" id="pd-counter">۱ از ۴</div>
            </div>
            
            {/* Info sheet (rounded top over hero) */}
            <div className="pd-sheet">
              {/* Header */}
              <div className="pd-header">
                <div className="pd-brand">
                  <Home size={11} strokeWidth={1.8} />
                  پارلاسرام
                </div>
                <h1 className="pd-title">کاشی خاک‌سفید — پله ۸۰۵</h1>
                <div className="pd-status">
                  <span className="pd-stock-chip">
                    <span className="pd-stock-dot"></span>
                    <b>۷۲۰</b> عدد موجود
                  </span>
                  <span className="pd-sku" onClick={() => { toast('کپی شد') }}>
                    <Copy size={11} strokeWidth={1.8} />
                    6029351028052120
                  </span>
                </div>
              </div>
              
              {/* Price hero */}
              <div className="pd-price-card">
                <div className="pd-price-label">قیمت مصرف‌کننده</div>
                <div className="pd-price-value">
                  <span className="ppv-num">۵۸۰,۰۰۰</span>
                  <span className="ppv-unit">تومان / عدد</span>
                </div>
                <div className="pd-price-tiers">
                  <div className="pd-pt-item">
                    <span className="pd-pt-label">هر کارتن (۳ عدد)</span>
                    <span className="pd-pt-value">۱,۷۴۰,۰۰۰ تومان</span>
                  </div>
                  <div className="pd-pt-divider"></div>
                  <div className="pd-pt-item">
                    <span className="pd-pt-label">هر پالت (۱۸۰ عدد)</span>
                    <span className="pd-pt-value">۱۰۴,۴۰۰,۰۰۰ تومان</span>
                  </div>
                </div>
              </div>
              
              {/* Specs */}
              <div className="pd-section-title">مشخصات فنی</div>
              <div className="pd-specs-grid">
                <div className="pd-spec">
                  <div className="pds-icon">
                    <Cube strokeWidth={1.8} />
                  </div>
                  <div className="pds-content">
                    <div className="pds-label">سایز</div>
                    <div className="pds-value">۱۰۰ × ۳۵ cm</div>
                  </div>
                </div>
                <div className="pd-spec">
                  <div className="pds-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                  </div>
                  <div className="pds-content">
                    <div className="pds-label">طرح</div>
                    <div className="pds-value">پله ۸۰۵</div>
                  </div>
                </div>
                <div className="pd-spec">
                  <div className="pds-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /></svg>
                  </div>
                  <div className="pds-content">
                    <div className="pds-label">نوع بدنه</div>
                    <div className="pds-value">خاک سفید</div>
                  </div>
                </div>
                <div className="pd-spec">
                  <div className="pds-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M12 2a15 15 0 0 1 0 20" /><path d="M2 12h20" /></svg>
                  </div>
                  <div className="pds-content">
                    <div className="pds-label">نوع لعاب</div>
                    <div className="pds-value">مات</div>
                  </div>
                </div>
                <div className="pd-spec">
                  <div className="pds-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 18h18" /><path d="M3 14h18" /><path d="M7 14v-4l5-4 5 4v4" /></svg>
                  </div>
                  <div className="pds-content">
                    <div className="pds-label">کاربرد</div>
                    <div className="pds-value">پله · سرویس</div>
                  </div>
                </div>
                <div className="pd-spec">
                  <div className="pds-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="12" y1="2" x2="12" y2="22" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="18" x2="16" y2="18" /></svg>
                  </div>
                  <div className="pds-content">
                    <div className="pds-label">ضخامت</div>
                    <div className="pds-value">۹ mm</div>
                  </div>
                </div>
                <div className="pd-spec">
                  <div className="pds-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-5" /></svg>
                  </div>
                  <div className="pds-content">
                    <div className="pds-label">واحد فروش</div>
                    <div className="pds-value">عدد</div>
                  </div>
                </div>
                <div className="pd-spec">
                  <div className="pds-icon">
                    <Warehouse3d strokeWidth={1.8} />
                  </div>
                  <div className="pds-content">
                    <div className="pds-label">کارخانه</div>
                    <div className="pds-value">پارلاسرام</div>
                  </div>
                </div>
              </div>
              
              {/* Packaging card */}
              <div className="pd-section-title">بسته‌بندی</div>
              <div className="pd-pack-card">
                <div className="pd-pack-row">
                  <div className="pdp-left">
                    <Warehouse3d size={15} strokeWidth={1.8} />
                    <span>هر کارتن</span>
                  </div>
                  <span className="pdp-value">۳ عدد · ۱.۰۵ m²</span>
                </div>
                <div className="pd-pack-row">
                  <div className="pdp-left">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15"><rect x="2" y="3" width="20" height="6" rx="1" /><rect x="2" y="11" width="20" height="6" rx="1" /><rect x="2" y="19" width="20" height="2" rx="1" /></svg>
                    <span>هر پالت</span>
                  </div>
                  <span className="pdp-value">۶۰ کارتن · ۱۸۰ عدد</span>
                </div>
                <div className="pd-pack-row">
                  <div className="pdp-left">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15"><path d="M12 2L2 7l10 5 10-5-10-5z" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
                    <span>مساحت پالت</span>
                  </div>
                  <span className="pdp-value">۶۳ متر مربع</span>
                </div>
                <div className="pd-pack-row">
                  <div className="pdp-left">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15"><line x1="12" y1="2" x2="12" y2="22" /><polyline points="19 15 12 22 5 15" /></svg>
                    <span>وزن تقریبی پالت</span>
                  </div>
                  <span className="pdp-value">۱,۱۳۴ کیلوگرم</span>
                </div>
                <div className="pd-pack-row">
                  <div className="pdp-left">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    <span>وزن هر متر مربع</span>
                  </div>
                  <span className="pdp-value">۱۸ کیلوگرم</span>
                </div>
              </div>
              
              {/* Description / notes */}
              <div className="pd-section-title">ویژگی‌ها</div>
              <div className="pd-features">
                <div className="pd-feat">
                  <Check size={14} strokeWidth={2.5} />
                  ضدلغزش — مناسب پله و نماهای خارجی
                </div>
                <div className="pd-feat">
                  <Check size={14} strokeWidth={2.5} />
                  مقاوم در برابر سایش و خش
                </div>
                <div className="pd-feat">
                  <Check size={14} strokeWidth={2.5} />
                  جذب آب کم‌تر از ۳٪
                </div>
                <div className="pd-feat">
                  <Check size={14} strokeWidth={2.5} />
                  گارانتی یک ساله کارخانه
                </div>
              </div>
            </div>
          </div>
          
          {/* Sticky bottom CTA */}
          <div className="pd-cta-bar">
            <div className="pd-cta-price">
              <span className="pcp-v">۵۸۰,۰۰۰</span>
              <span className="pcp-u">تومان</span>
            </div>
            <button className="pd-cta-btn" onClick={() => { addToCart(); goBack('shop'); }}>
              <ShoppingCart size={16} strokeWidth={2.2} />
              افزودن به سبد
            </button>
          </div></>
  );
}
