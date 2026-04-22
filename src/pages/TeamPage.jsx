import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { ChevronRight, Plus } from '../components/icons.jsx';

export function TeamPage() {
  const { goBack, toast } = useLegacyActions();
  return (
    <>
          <div className="topbar">
            <button className="icon-btn" onClick={() => { goBack('dashboard') }}>
              <ChevronRight />
            </button>
            <div className="ttl-wrap center"><h2>پرسنل</h2></div>
            <button className="icon-btn" onClick={() => { toast('فرم افزودن عضو باز شد') }}>
              <Plus />
            </button>
          </div>

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
