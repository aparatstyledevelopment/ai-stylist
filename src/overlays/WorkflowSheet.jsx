import { useState } from 'react';
import { useOverlay } from '../context/OverlayContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export function WorkflowSheet() {
  const { openSheetId, closeSheet } = useOverlay();
  const { toast } = useToast();
  const [on, setOn] = useState(true);
  const isOpen = openSheetId === 'workflow-sheet';

  const toggle = () => {
    setOn((prev) => {
      const next = !prev;
      toast(next ? 'چرخه چندمرحله‌ای فعال شد' : 'حالت ساده فعال شد');
      return next;
    });
  };

  return (
    <div
      className={`sheet-backdrop${isOpen ? ' open' : ''}`}
      id="workflow-sheet"
      onClick={closeSheet}
    >
      <div className="sheet workflow-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle"></div>
        <div className="ws-header">
          <h3>چرخه تایید سفارش</h3>
          <div className="ws-sub">ترتیب بررسی هر حواله توسط پرسنل</div>
        </div>

        <div className={`ws-toggle ${on ? 'active' : 'off'}`} id="wf-toggle-card" onClick={toggle}>
          <div className="info">
            <div className="title">چرخه چندمرحله‌ای</div>
            <div className="sub" id="wf-sub">
              {on
                ? 'سفارش‌ها از پرسنل شما عبور می‌کنند'
                : 'برای کنترل بیشتر، این قابلیت رو روشن کنید'}
            </div>
            <div className={`status ${on ? 'on' : 'off'}`} id="wf-status">
              {on ? '● فعال' : '● غیرفعال'}
            </div>
          </div>
          <div className={`switch ${on ? 'on' : 'off'}`} id="wf-switch"></div>
        </div>

        <div id="wf-steps" style={{ opacity: on ? 1 : 0.4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 4px 12px' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--primary-600)', cursor: 'pointer' }}>
              + افزودن مرحله
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>ترتیب تایید</span>
          </div>

          <div className="workflow-step">
            <span className="grip">⋮⋮</span>
            <div className="remove">×</div>
            <div className="info">
              <div className="title">تیم فروش</div>
              <div className="sub">۲ نفر عضو · بررسی اولیه</div>
            </div>
            <div className="num">۱</div>
          </div>
          <div className="arrow-down">↓</div>
          <div className="workflow-step">
            <span className="grip">⋮⋮</span>
            <div className="remove">×</div>
            <div className="info">
              <div className="title">مالی / حسابداری</div>
              <div className="sub">۱ نفر عضو · بررسی صورت‌حساب</div>
            </div>
            <div className="num">۲</div>
          </div>
          <div className="arrow-down">↓</div>
          <div className="workflow-step">
            <span className="grip">⋮⋮</span>
            <div className="remove">×</div>
            <div className="info">
              <div className="title">انبار و ثبت خروج</div>
              <div className="sub">۳ نفر عضو · ثبت بارنامه</div>
            </div>
            <div className="num">۳</div>
          </div>
        </div>
      </div>
    </div>
  );
}
