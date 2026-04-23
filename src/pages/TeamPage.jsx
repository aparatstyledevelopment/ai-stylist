import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Plus } from '../components/icons.jsx';
import { PageTopBar } from '../components/PageTopBar.jsx';
import { useOnboarding } from '../context/OnboardingContext.jsx';

export function TeamPage() {
  const { goBack, toast } = useLegacyActions();
  const { isEmpty } = useOnboarding();

  if (isEmpty) return (
    <>
      <PageTopBar onBack={() => goBack('dashboard')} title="پرسنل"
        right={<button className="icon-btn" onClick={() => toast('فرم افزودن عضو')}><Plus /></button>} />
      <div className="ob-empty">
        <div className="ob-empty-illus">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="32" height="32"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <h3>هنوز عضوی نداری</h3>
        <p>اعضای تیم فروش خودت رو<br />از اینجا اضافه کن.</p>
        <button className="btn primary" onClick={() => toast('فرم افزودن عضو')}>
          <Plus size={14} />
          افزودن عضو جدید
        </button>
      </div>
    </>
  );

  return (
    <>
          <PageTopBar
            onBack={() => goBack('dashboard')}
            title="پرسنل"
            right={<button className="icon-btn" onClick={() => toast('فرم افزودن عضو باز شد')}><Plus /></button>}
          />

          <div className="content">
            <div className="team-stat">
              <div className="stat-box">
                <div className="lbl">تعداد کل</div>
                <div className="val">۴</div>
              </div>
              <div className="stat-box">
                <div className="lbl">فعال</div>
                <div className="val" style={{color:'var(--success-600)'}}>۴</div>
              </div>
              <div className="stat-box">
                <div className="lbl">منتظر دعوت</div>
                <div className="val" style={{color:'var(--warning-600)'}}>۰</div>
              </div>
            </div>

            <div className="section-header">
              <span></span>
              <div><h3>لیست پرسنل</h3></div>
            </div>

            <div style={{padding:'0 20px 20px'}}>
              <div className="follower-row">
                <div className="info">
                  <div className="name">علی محمدی</div>
                  <div className="phone">@1111</div>
                </div>
                <span className="chip primary">تیم فروش</span>
                <div className="kebab" onClick={() => { toast('گزینه‌های عضو') }}>⋯</div>
              </div>

              <div className="follower-row">
                <div className="info">
                  <div className="name">رضا قاسمی</div>
                  <div className="phone">@2222</div>
                </div>
                <span className="chip primary">تیم فروش</span>
                <div className="kebab" onClick={() => { toast('گزینه‌های عضو') }}>⋯</div>
              </div>

              <div className="follower-row">
                <div className="info">
                  <div className="name">سمیرا احمدی</div>
                  <div className="phone">@3333</div>
                </div>
                <span className="chip accent">حسابدار</span>
                <div className="kebab" onClick={() => { toast('گزینه‌های عضو') }}>⋯</div>
              </div>

              <div className="follower-row">
                <div className="info">
                  <div className="name">محسن کریمی</div>
                  <div className="phone">@4444</div>
                </div>
                <span className="chip info">انباردار</span>
                <div className="kebab" onClick={() => { toast('گزینه‌های عضو') }}>⋯</div>
              </div>
            </div>

            <div className="tip">
              <b>نکته:</b> هر نقش فقط به بخش مربوط به کار خودش دسترسی داره.
            </div>
          </div></>
  );
}
