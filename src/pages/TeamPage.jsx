import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Plus } from '../components/icons.jsx';
import { PageTopBar } from '../components/PageTopBar.jsx';

export function TeamPage() {
  const { goBack, toast } = useLegacyActions();
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
