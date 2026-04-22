import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Star, Users, Check } from '../components/icons.jsx';

export function SubscriptionPage() {
  const { goBack, toast } = useLegacyActions();
  return (
    <>
          <div className="topbar">
            <button className="icon-btn" onClick={() => { goBack('dashboard') }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6" /></svg>
            </button>
            <div className="ttl-wrap center"><h2>وضعیت اشتراک</h2></div>
            <div style={{width:'36px'}}></div>
          </div>
          
          <div className="content">
            {/* Current plan hero */}
            <div className="sub-hero">
              <div className="sub-hero-decor"></div>
              <div className="sub-hero-decor2"></div>
              <div className="sub-hero-row">
                <div>
                  <div className="sh-label">پلن فعلی</div>
                  <div className="sh-title">
                    <Star size={14} />
                    حرفه‌ای
                  </div>
                </div>
                <div className="sh-expiry">
                  <div className="she-label">اعتبار تا</div>
                  <div className="she-date">۱۴۰۵/۲/۳۱</div>
                  <div className="she-days"><b>۲۹</b> روز باقیمانده</div>
                </div>
              </div>
              <div className="sub-hero-progress">
                <div className="shp-track">
                  <div className="shp-fill" style={{width:'3%'}}></div>
                </div>
              </div>
              <button className="sub-hero-renew" onClick={() => { toast('درگاه تمدید اشتراک') }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                تمدید اشتراک
              </button>
            </div>
            
            {/* Usage section */}
            <div className="sub-section-title">مصرف این ماه</div>
            <div className="sub-usage-card">
              <div className="sub-usage-item">
                <div className="suu-head">
                  <div className="suu-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /></svg>
                    کالاهای ثبت شده
                  </div>
                  <div className="suu-value"><b>۷۳</b> <small>/ ∞</small></div>
                </div>
                <div className="suu-bar">
                  <div className="suu-bar-fill" style={{width:'65%'}}></div>
                </div>
                <div className="suu-hint">در پلن حرفه‌ای نامحدود</div>
              </div>
              
              <div className="sub-usage-item">
                <div className="suu-head">
                  <div className="suu-label">
                    <Users size={15} strokeWidth={1.8} />
                    تامین‌کنندگان متصل
                  </div>
                  <div className="suu-value"><b>۲</b> <small>/ ∞</small></div>
                </div>
                <div className="suu-bar">
                  <div className="suu-bar-fill" style={{width:'100%'}}></div>
                </div>
                <div className="suu-hint">ارتباط با کارخانه‌های عمده</div>
              </div>
              
              <div className="sub-usage-item">
                <div className="suu-head">
                  <div className="suu-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                    آپلود فایل اکسل
                  </div>
                  <div className="suu-value"><b>۲</b> <small>/ ۵ در روز</small></div>
                </div>
                <div className="suu-bar">
                  <div className="suu-bar-fill" style={{width:'40%'}}></div>
                </div>
                <div className="suu-hint">۳ آپلود باقی‌مانده امروز</div>
              </div>
              
              <div className="sub-usage-item">
                <div className="suu-head">
                  <div className="suu-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                    تولید تصویر AI
                  </div>
                  <div className="suu-value"><b>۱۸</b> <small>/ ۵۰ در ماه</small></div>
                </div>
                <div className="suu-bar">
                  <div className="suu-bar-fill" style={{width:'36%'}}></div>
                </div>
                <div className="suu-hint">۳۲ تولید باقی‌مانده این ماه</div>
              </div>
            </div>
            
            {/* Active features */}
            <div className="sub-section-title">قابلیت‌های فعال</div>
            <div className="sub-features">
              <div className="sub-feat-chip">
                <Check size={12} strokeWidth={2.5} />
                مدیریت نقش‌ها
              </div>
              <div className="sub-feat-chip">
                <Check size={12} strokeWidth={2.5} />
                کارتابل تاییدیه
              </div>
              <div className="sub-feat-chip">
                <Check size={12} strokeWidth={2.5} />
                قیمت‌گذاری اختصاصی
              </div>
              <div className="sub-feat-chip">
                <Check size={12} strokeWidth={2.5} />
                ایمپورت اکسل
              </div>
              <div className="sub-feat-chip">
                <Check size={12} strokeWidth={2.5} />
                پنل اختصاصی برند
              </div>
              <div className="sub-feat-chip">
                <Check size={12} strokeWidth={2.5} />
                پشتیبانی ویژه
              </div>
            </div>
            
            {/* Upgrade prompt */}
            <div className="sub-upgrade">
              <div className="su-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><polyline points="17 11 12 6 7 11" /><polyline points="17 18 12 13 7 18" /></svg>
                ارتقا به پلن Enterprise
              </div>
              <div className="su-title">دسترسی نامحدود و پشتیبانی اختصاصی</div>
              <div className="su-desc">
                API اختصاصی · SLA ۹۹.۹٪ · مدیر اختصاصی پروژه · پنل سفارشی با برندینگ شما
              </div>
              <button className="su-btn" onClick={() => { toast('تماس با تیم فروش') }}>
                مشاهده پلن Enterprise
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
            </div>
          </div></>
  );
}
