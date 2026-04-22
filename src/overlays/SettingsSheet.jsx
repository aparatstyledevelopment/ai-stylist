import { useOverlay } from '../context/OverlayContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { ChevronLeft } from '../components/icons.jsx';

export function SettingsSheet() {
  const { openSheetId, openSheet, closeSheet } = useOverlay();
  const { toast } = useToast();
  const isOpen = openSheetId === 'settings-sheet';

  const openWorkflow = () => {
    closeSheet();
    setTimeout(() => openSheet('workflow-sheet'), 100);
  };

  return (
    <div
      className={`sheet-backdrop${isOpen ? ' open' : ''}`}
      id="settings-sheet"
      onClick={closeSheet}
    >
      <div className="sheet settings-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle"></div>
        <div className="ss-header">
          <h3>تنظیمات و پروفایل</h3>
        </div>
        <div className="ss-user-card">
          <div className="ssu-avatar"><span>پ</span></div>
          <div className="ssu-info">
            <div className="ssu-name">پارلاسرام</div>
            <div className="ssu-phone">۰۹۱۳۱۲۳۴۵۶۷</div>
          </div>
          <button className="ssu-edit" onClick={() => toast('ویرایش پروفایل')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>

        <div className="ss-menu">
          <div className="ss-item" onClick={openWorkflow}>
            <div className="ssi-icon success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <div className="ssi-body">
              <div className="ssi-title">چرخه تایید سفارش</div>
              <div className="ssi-sub">۳ مرحله فعال</div>
            </div>
            <ChevronLeft size={14} className="ssi-chev" />
          </div>
          <div className="ss-item" onClick={() => toast('اعلان‌ها')}>
            <div className="ssi-icon accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div className="ssi-body">
              <div className="ssi-title">اعلان‌ها</div>
              <div className="ssi-sub">پیامک، ایمیل، push</div>
            </div>
            <ChevronLeft size={14} className="ssi-chev" />
          </div>
          <div className="ss-item" onClick={() => toast('پلن و صورت‌حساب')}>
            <div className="ssi-icon info">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                <rect x="1" y="4" width="22" height="16" rx="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <div className="ssi-body">
              <div className="ssi-title">پلن و صورت‌حساب</div>
              <div className="ssi-sub">حرفه‌ای · تا ۲۵ فروردین</div>
            </div>
            <ChevronLeft size={14} className="ssi-chev" />
          </div>
          <div className="ss-item" onClick={() => toast('راهنما و پشتیبانی')}>
            <div className="ssi-icon primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div className="ssi-body">
              <div className="ssi-title">راهنما و پشتیبانی</div>
              <div className="ssi-sub">چت با پشتیبان</div>
            </div>
            <ChevronLeft size={14} className="ssi-chev" />
          </div>
        </div>

        <button className="ss-logout" onClick={() => toast('خروج از حساب کاربری')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          خروج از حساب
        </button>
      </div>
    </div>
  );
}
