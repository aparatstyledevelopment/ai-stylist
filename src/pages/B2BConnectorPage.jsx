import { useLegacyActions } from '../hooks/useLegacyActions.js';

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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="32" height="32"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="4" r="2" /><circle cx="4" cy="12" r="2" /><circle cx="20" cy="12" r="2" /><circle cx="12" cy="20" r="2" /><line x1="12" y1="6" x2="12" y2="9" /><line x1="6" y1="12" x2="9" y2="12" /><line x1="15" y1="12" x2="18" y2="12" /><line x1="12" y1="15" x2="12" y2="18" /></svg>
              </div>
              <h3>شبکه تأمین‌کنندگان</h3>
              <div className="b2b-sub">B2B CONNECTOR</div>
            </div>

            {/* Invite code input card */}
            <div className="b2b-card">
              <label className="b2b-label">کد دعوت کارخانه</label>
              <input className="b2b-input" placeholder="INV-XXXXX" type="text" />
              <button className="b2b-connect-btn" onClick={() => { simulateB2bConnect() }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                مزایای اتصال به شبکه
              </div>
              <p>با اتصال به کارخانه، می‌توانید تمامی محصولات آن‌ها را با قیمت پایه مشاهده کرده و قیمت فروش نهایی خود را برای مشتریان تنظیم کنید.</p>
            </div>
          </div></>
  );
}
