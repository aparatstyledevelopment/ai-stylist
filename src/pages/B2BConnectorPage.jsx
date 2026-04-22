import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Network, Link, Info } from '../components/icons.jsx';

export function B2BConnectorPage() {
  const { goBack, simulateB2bConnect } = useLegacyActions();
  return (
    <>
          <div className="topbar">
            <button className="icon-btn" onClick={() => { goBack('dashboard') }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6" /></svg>
            </button>
            <div className="ttl-wrap center"><h2>شبکه تأمین‌کنندگان</h2></div>
            <div style={{width:'36px'}}></div>
          </div>

          <div className="content" style={{paddingTop:'16px'}}>
            
            {/* Brand hero */}
            <div className="b2b-hero">
              <div className="b2b-ico">
                <Network size={32} strokeWidth={1.6} />
              </div>
              <h3>شبکه تأمین‌کنندگان</h3>
              <div className="b2b-sub">B2B CONNECTOR</div>
            </div>

            {/* Invite code input card */}
            <div className="b2b-card">
              <label className="b2b-label">کد دعوت کارخانه</label>
              <input className="b2b-input" placeholder="INV-XXXXX" type="text" />
              <button className="b2b-connect-btn" onClick={() => { simulateB2bConnect() }}>
                <Link size={14} />
                برقراری اتصال
              </button>
            </div>

            {/* My suppliers section */}
            <div className="section-header">
              <span></span>
              <div><h3>تأمین‌کنندگان من</h3></div>
            </div>

            {/* Empty state (initial) */}
            <div className="b2b-empty" id="b2b-empty">
              <div className="b2b-empty-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /><line x1="4" y1="4" x2="20" y2="20" strokeDasharray="2 2" /></svg>
              </div>
              <div className="b2b-empty-txt">
                شما هنوز به هیچ تأمین‌کننده‌ای متصل نشده‌اید
              </div>
              <div className="b2b-empty-sub">
                از تأمین‌کننده خود کد دعوت دریافت کنید
              </div>
            </div>

            {/* Info banner */}
            <div className="b2b-info">
              <div className="b2b-info-head">
                <Info size={14} />
                مزایای اتصال به شبکه
              </div>
              <p>با اتصال به کارخانه، می‌توانید تمامی محصولات آن‌ها را با قیمت پایه مشاهده کرده و قیمت فروش نهایی خود را برای مشتریان تنظیم کنید.</p>
            </div>
          </div></>
  );
}
