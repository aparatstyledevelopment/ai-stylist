import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Star, ChevronUp, Calendar, ChevronLeft, Check, Network, Users, TrendingUp } from '../components/icons.jsx';
import { useOnboarding } from '../context/OnboardingContext.jsx';

export function DashboardPage() {
  const { goTo, openSheet, showRemoveModal, toast } = useLegacyActions();
  const { isEmpty, setIsEmpty } = useOnboarding();

  return (
    <>
      <div className="content db-content">

        {/* Profile Card */}
        <div className="db-profile-v2">
          <div className="dbp2-avatar"><span>پ</span></div>
          <div className="dbp2-info">
            <div className="dbp2-name">پارلاسرام</div>
            <div className="dbp2-meta">
              <span className="dbp2-role">صاحب برند</span>
              <span className="dbp2-dot">·</span>
              <span className="dbp2-plan">
                <Star size={9} />
                پلن حرفه‌ای
              </span>
            </div>
          </div>
          <button className="dbp2-settings" onClick={() => openSheet('settings-sheet')} aria-label="تنظیمات">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
          </button>
        </div>

        {/* Empty-mode toggle */}
        <div className="ob-mode-row" onClick={() => setIsEmpty(v => !v)}>
          <div className="ob-mode-info">
            <div className="ob-mode-label">حالت کاربر جدید</div>
            <div className="ob-mode-sub">نمایش اپ بدون داده (برای دمو)</div>
          </div>
          <div className={`ob-toggle${isEmpty ? ' on' : ''}`} />
        </div>

        {isEmpty ? (
          /* ---- ONBOARDING STATE ---- */
          <>
            <div className="ob-welcome">
              <div className="ob-welcome-eyebrow">خوش اومدی به پارلاسرام 👋</div>
              <div className="ob-welcome-title">بیا شروع کنیم</div>
              <div className="ob-welcome-sub">۴ قدم تا راه‌اندازی کامل شبکه فروشت</div>
              <div className="ob-progress-track">
                <div className="ob-progress-fill" style={{ width: '0%' }} />
              </div>
              <div className="ob-progress-label">۰ از ۴ مرحله</div>
            </div>

            <div className="ob-steps">
              <div className="ob-step" onClick={() => goTo('b2b-connector')}>
                <div className="ob-step-ico info"><Network size={18} strokeWidth={1.8} /></div>
                <div className="ob-step-body">
                  <div className="ob-step-title">اتصال به کارخانه</div>
                  <div className="ob-step-sub">منابع تامین خودت رو متصل کن</div>
                </div>
                <ChevronLeft size={13} className="ob-step-chev" />
              </div>
              <div className="ob-step" onClick={() => goTo('warehouse')}>
                <div className="ob-step-ico accent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                </div>
                <div className="ob-step-body">
                  <div className="ob-step-title">اضافه کردن کاشی</div>
                  <div className="ob-step-sub">موجودی انبارت رو ثبت کن</div>
                </div>
                <ChevronLeft size={13} className="ob-step-chev" />
              </div>
              <div className="ob-step" onClick={() => goTo('price-management')}>
                <div className="ob-step-ico success"><TrendingUp size={18} strokeWidth={1.8} /></div>
                <div className="ob-step-body">
                  <div className="ob-step-title">تعیین قیمت فروش</div>
                  <div className="ob-step-sub">برای هر محصول قیمت تعیین کن</div>
                </div>
                <ChevronLeft size={13} className="ob-step-chev" />
              </div>
              <div className="ob-step last" onClick={() => openSheet('qr-sheet')}>
                <div className="ob-step-ico primary"><Users size={18} strokeWidth={1.8} /></div>
                <div className="ob-step-body">
                  <div className="ob-step-title">دعوت از نماینده</div>
                  <div className="ob-step-sub">شبکه فروشت رو راه‌اندازی کن</div>
                </div>
                <ChevronLeft size={13} className="ob-step-chev" />
              </div>
            </div>
          </>
        ) : (
          /* ---- FULL DASHBOARD ---- */
          <>
            <div className="db-hero-revenue">
              <div className="dhr-decor"></div>
              <div className="dhr-decor2"></div>
              <div className="dhr-header">
                <span className="dhr-label">درآمد این ماه</span>
                <span className="dhr-trend">
                  <ChevronUp size={10} strokeWidth={2.5} />
                  +۸٪
                </span>
              </div>
              <div className="dhr-value">
                <span className="dhr-num">۸۴</span>
                <span className="dhr-unit">میلیون تومان</span>
              </div>
              <div className="dhr-bars">
                <div className="dhr-bar" style={{ height: '30%' }}></div>
                <div className="dhr-bar" style={{ height: '55%' }}></div>
                <div className="dhr-bar" style={{ height: '42%' }}></div>
                <div className="dhr-bar" style={{ height: '68%' }}></div>
                <div className="dhr-bar" style={{ height: '48%' }}></div>
                <div className="dhr-bar" style={{ height: '75%' }}></div>
                <div className="dhr-bar" style={{ height: '62%' }}></div>
                <div className="dhr-bar active" style={{ height: '88%' }}></div>
              </div>
            </div>

            <div className="db-stats-v2">
              <div className="db-stat-v2 stat-accent">
                <div className="dbs2-icon"><Calendar strokeWidth={1.8} /></div>
                <div className="dbs2-body">
                  <div className="dbs2-label">امروز</div>
                  <div className="dbs2-num">۱۲ <small>سفارش</small></div>
                </div>
                <div className="dbs2-badge up"><ChevronUp size={9} strokeWidth={2.5} />۲۳٪</div>
              </div>
              <div className="db-stat-v2 stat-info">
                <div className="dbs2-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /></svg>
                </div>
                <div className="dbs2-body">
                  <div className="dbs2-label">موجودی</div>
                  <div className="dbs2-num">۲۴ <small>کاشی</small></div>
                </div>
                <div className="dbs2-badge neutral">۴,۲۸۰</div>
              </div>
            </div>

            <div className="db-sub-card" onClick={() => goTo('subscription')}>
              <div className="dsc-head">
                <div className="dsc-title-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4L2 9.4h7.6z" /></svg>
                  <span className="dsc-title">پلن حرفه‌ای</span>
                </div>
                <div className="dsc-days-left"><b>۲۹</b> روز باقیمانده</div>
              </div>
              <div className="dsc-bars">
                <div className="dsc-bar-item">
                  <div className="dsc-bar-head">
                    <span className="dsc-bar-label">کالاهای ثبت شده</span>
                    <span className="dsc-bar-value">۷۳ / ∞</span>
                  </div>
                  <div className="dsc-bar-track"><div className="dsc-bar-fill" style={{ width: '65%' }}></div></div>
                </div>
                <div className="dsc-bar-item">
                  <div className="dsc-bar-head">
                    <span className="dsc-bar-label">تامین‌کنندگان متصل</span>
                    <span className="dsc-bar-value">۲ / ∞</span>
                  </div>
                  <div className="dsc-bar-track"><div className="dsc-bar-fill" style={{ width: '100%' }}></div></div>
                </div>
              </div>
              <div className="dsc-footer">
                <span>مشاهده جزئیات پلن</span>
                <ChevronLeft size={12} />
              </div>
            </div>

            <div className="db-section-head">
              <h3>اعلان‌ها</h3>
              <span className="link" onClick={() => toast('همه اعلان‌ها')}>همه ←</span>
            </div>
            <div className="db-notifs-v2">
              <div className="db-notif-v2 success">
                <div className="dni2-indicator"></div>
                <div className="dni2-icon"><Check size={14} strokeWidth={2.2} /></div>
                <div className="dni2-body">
                  <div className="dni2-text">سفارش <b>#ord-96a1</b> توسط نماینده تایید شد</div>
                  <div className="dni2-time">۱۲ دقیقه پیش</div>
                </div>
              </div>
              <div className="db-notif-v2 accent">
                <div className="dni2-indicator"></div>
                <div className="dni2-icon"><Calendar size={14} /></div>
                <div className="dni2-body">
                  <div className="dni2-text">سفارش جدید از <b>مارال رحیمی</b> به مبلغ ۵.۲ میلیون</div>
                  <div className="dni2-time">۴۵ دقیقه پیش</div>
                </div>
              </div>
              <div className="db-notif-v2 warning">
                <div className="dni2-indicator"></div>
                <div className="dni2-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                </div>
                <div className="dni2-body">
                  <div className="dni2-text">موجودی <b>کاشی پله ۸۳۰</b> به زیر ۲۰ عدد رسید</div>
                  <div className="dni2-time">۲ ساعت پیش</div>
                </div>
              </div>
            </div>

            <div className="db-section-head"><h3>اقدامات سریع</h3></div>

            <div className="db-feat-action" onClick={() => openSheet('qr-sheet')}>
              <div className="dfa-content">
                <div className="dfa-title">دعوت نماینده جدید</div>
                <div className="dfa-sub">ساخت لینک یکبارمصرف امن برای اضافه کردن نماینده به شبکه فروش</div>
                <div className="dfa-cta">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  ساخت لینک
                </div>
              </div>
              <div className="dfa-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="3" height="3" /><rect x="18" y="13" width="3" height="3" /><rect x="13" y="18" width="3" height="3" /><rect x="18" y="18" width="3" height="3" /></svg>
              </div>
            </div>

            <div className="db-actions-grid-v2">
              <div className="db-action-v2" onClick={() => goTo('b2b-connector')}>
                <div className="dav-icon info"><Network size={18} strokeWidth={1.8} /></div>
                <div className="dav-info">
                  <div className="dav-title">اتصال به کارخانه</div>
                  <div className="dav-sub">۲ متصل</div>
                </div>
              </div>
              <div className="db-action-v2" onClick={() => goTo('team')}>
                <div className="dav-icon primary"><Users size={18} strokeWidth={1.8} /></div>
                <div className="dav-info">
                  <div className="dav-title">پرسنل</div>
                  <div className="dav-sub">۴ عضو فعال</div>
                </div>
              </div>
              <div className="db-action-v2" onClick={() => openSheet('workflow-sheet')}>
                <div className="dav-icon success">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                </div>
                <div className="dav-info">
                  <div className="dav-title">چرخه تایید</div>
                  <div className="dav-sub">۳ مرحله</div>
                </div>
              </div>
            </div>

            <div className="db-section-head">
              <h3>دنبال‌کنندگان</h3>
              <span className="link" onClick={() => toast('همه دنبال‌کنندگان')}>همه ←</span>
            </div>
            <div style={{ padding: '0 20px 20px' }}>
              <div className="follower-row">
                <div className="info">
                  <div className="name">مارال رحیمی</div>
                  <div className="phone">09103665319</div>
                  <div className="stats">۸ حواله در ماه · ۱۲۴ m²</div>
                </div>
                <span className="chip success"><span className="dot"></span>فعال</span>
                <div className="kebab" onClick={() => showRemoveModal('مارال رحیمی', 'مر', '09103665319', 8)}>⋯</div>
              </div>
              <div className="follower-row">
                <div className="info">
                  <div className="name">احمد کریمی</div>
                  <div className="phone">تهران مصالح البرز</div>
                  <div className="stats">۱۵ حواله در ماه · ۳۲۰ m²</div>
                </div>
                <span className="chip success"><span className="dot"></span>فعال</span>
                <div className="kebab" onClick={() => showRemoveModal('احمد کریمی', 'اح', '09135551111', 15)}>⋯</div>
              </div>
              <div className="follower-row dim">
                <div className="info">
                  <div className="name">حسین محمدی</div>
                  <div className="phone">09131527538</div>
                  <div className="stats">۳ هفته بدون فعالیت</div>
                </div>
                <span className="chip muted">غیرفعال</span>
                <div className="kebab" onClick={() => showRemoveModal('حسین محمدی', 'ح', '09131527538', 0)}>⋯</div>
              </div>
            </div>
          </>
        )}

      </div>
    </>
  );
}
