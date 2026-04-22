import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Search, Plus, ChevronLeft, Upload, Close, User, ChevronDown, Check } from '../components/icons.jsx';

export function WarehousePage() {
  const { closeWhMenu, confirmAssignChanges, goTo, handleTileClick, resetAiUpload, selectRep, toggleAssignMode, toggleRepDropdown, toggleWhMenu } = useLegacyActions();
  return (
    <>

          {/* Top row: search + menu */}
          <div className="wh-topbar">
            <div className="search" id="wh-search">
              <input placeholder="جستجو کالا (نام، SKU…)" />
              <Search />
            </div>
            <button className="wh-menu-btn" id="wh-menu-btn" onClick={() => { toggleWhMenu() }} aria-label="منو">
              <svg className="wmb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
          </div>
          
          {/* Action menu dropdown (shown below wh-topbar) */}
          <div className="wh-menu-dropdown" id="wh-menu-dropdown">
            <button className="wh-menu-item" onClick={() => { closeWhMenu(); goTo('add-tile'); }}>
              <span className="wmi-icon">
                <Plus />
              </span>
              <span className="wmi-content">
                <span className="wmi-title">کاشی جدید</span>
                <span className="wmi-sub">اضافه کردن دستی محصول</span>
              </span>
              <ChevronLeft className="wmi-chev" size={13} />
            </button>
            <button className="wh-menu-item" onClick={() => { closeWhMenu(); toggleAssignMode(); }}>
              <span className="wmi-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></svg>
              </span>
              <span className="wmi-content">
                <span className="wmi-title">اختصاص به نماینده</span>
                <span className="wmi-sub">سپردن کاشی‌ها به نمایندگان شبکه</span>
              </span>
              <ChevronLeft className="wmi-chev" size={13} />
            </button>
            <button className="wh-menu-item" onClick={() => { closeWhMenu(); goTo('excel-ai'); resetAiUpload(); }}>
              <span className="wmi-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
              </span>
              <span className="wmi-content">
                <span className="wmi-title">بروزرسانی از اکسل</span>
                <span className="wmi-sub">ایمپورت گروهی موجودی با هوش مصنوعی</span>
              </span>
              <ChevronLeft className="wmi-chev" size={13} />
            </button>
          </div>
          <div className="wh-menu-backdrop" id="wh-menu-backdrop" onClick={() => { closeWhMenu() }}></div>

          {/* ASSIGN OVERLAY (hidden by default) */}
          <div className="assign-overlay" id="assign-overlay">
            <div className="assign-overlay-header">
              <h3>اختصاص کاشی به نماینده</h3>
              <button className="cancel-btn" onClick={() => { toggleAssignMode() }}>
                <Close strokeWidth={2.5} />
                انصراف
              </button>
            </div>
            <div className="sub">نماینده رو انتخاب کن و کاشی‌های مورد نظر رو تیک بزن</div>
            
            <div className="rep-selector" id="rep-selector" onClick={() => { toggleRepDropdown() }}>
              <div className="sel-ico">
                <User />
              </div>
              <div className="sel-info">
                <div className="sel-placeholder" id="rep-placeholder">نماینده‌ای انتخاب کن…</div>
                <div className="sel-name" id="rep-name" style={{display:'none'}}></div>
                <div className="sel-stats" id="rep-stats" style={{display:'none'}}></div>
              </div>
              <div className="sel-chevron" id="rep-chevron">
                <ChevronDown size={16} />
              </div>
            </div>
            
            <div className="rep-dropdown" id="rep-dropdown">
              <div className="rep-dropdown-item" onClick={(e) => { selectRep(e, 'مارال رحیمی', '۰۹۱۰۳۶۶۵۳۱۹', 12) }}>
                <div className="rp-info">
                  <div className="rp-name">مارال رحیمی</div>
                  <div className="rp-sub">۰۹۱۰۳۶۶۵۳۱۹ · فعال</div>
                </div>
                <span className="rp-count">۱۲</span>
              </div>
              <div className="rep-dropdown-item" onClick={(e) => { selectRep(e, 'احمد کریمی', 'تهران مصالح البرز', 20) }}>
                <div className="rp-info">
                  <div className="rp-name">احمد کریمی</div>
                  <div className="rp-sub">تهران مصالح البرز · فعال</div>
                </div>
                <span className="rp-count">۲۰</span>
              </div>
              <div className="rep-dropdown-item" onClick={(e) => { selectRep(e, 'رضا کیانی', '۰۹۱۳۳۴۵۶۷۸۹', 5) }}>
                <div className="rp-info">
                  <div className="rp-name">رضا کیانی</div>
                  <div className="rp-sub">۰۹۱۳۳۴۵۶۷۸۹ · فعال</div>
                </div>
                <span className="rp-count">۵</span>
              </div>
              <div className="rep-dropdown-item" onClick={(e) => { selectRep(e, 'حسین محمدی', '۰۹۱۳۱۵۲۷۵۳۸', 0) }}>
                <div className="rp-info">
                  <div className="rp-name" style={{opacity:'.6'}}>حسین محمدی</div>
                  <div className="rp-sub">۰۹۱۳۱۵۲۷۵۳۸ · غیرفعال</div>
                </div>
                <span className="rp-count" style={{background:'var(--surf-2)', color:'var(--text-muted)'}}>۰</span>
              </div>
            </div>
          </div>

          {/* COMPACT REP BAR (shown after rep selected, overlay collapsed) */}
          <div className="rep-pill" id="rep-pill" style={{display:'none'}}>
            <div className="rp-left">
              <div className="rp-ico">
                <User size={12} />
              </div>
              <div className="rp-txt">
                <span className="rp-label">در حال اختصاص به:</span>
                <span className="rp-nm" id="rep-pill-name">—</span>
              </div>
            </div>
            <button className="rp-cancel" onClick={() => { toggleAssignMode() }}>
              <Close size={12} strokeWidth={2.5} />
              انصراف
            </button>
          </div>

          <div className="content" style={{paddingTop:'0', paddingBottom:'90px'}} id="wh-tiles">
            
            {/* Notification banner — new tiles from factory */}
            <div className="pending-banner" onClick={() => { goTo('price-management') }}>
              <div className="pb-info">
                <div className="pb-title">۳ کاشی جدید از کارخونه</div>
                <div className="pb-sub">تعیین قیمت کن تا تو انبار ظاهر بشن</div>
              </div>
              <div className="pb-arrow">
                <ChevronLeft size={14} />
              </div>
            </div>

            <div className="tile-card" data-tile-id="t1" data-assigned="true" onClick={(e) => { handleTileClick(e, 'tile-detail') }}>
              <div className="meta-chips">
                <span className="meta-chip sku">6029301028342120</span>
                <span className="meta-chip">۱۰۰×۳۰</span>
              </div>
              <div className="title-wrap">کاشی سرامیک — پله ۸۳۴</div>
              <div className="stats-row">
                <div className="sub-stats">
                  <span className="sub-cell"><span className="sub-dot physical"></span><span className="sub-lbl">فیزیکی</span><span className="sub-val">۱۲۶</span></span>
                  <span className="sub-cell"><span className="sub-dot freeze"></span><span className="sub-lbl">فریز</span><span className="sub-val">۱۲</span></span>
                </div>
                <span className="available-chip">
                  <span className="ac-val">۱۱۴</span>
                  <span className="ac-lbl">قابل فروش</span>
                </span>
              </div>
              <div className="assign-check">
                <Check strokeWidth={3} />
              </div>
              <div className="tc-arrow">
                <ChevronLeft size={16} />
              </div>
            </div>

            <div className="tile-card" data-tile-id="t2" data-assigned="true" onClick={(e) => { handleTileClick(e, 'tile-detail') }}>
              <div className="meta-chips">
                <span className="meta-chip sku">6029201024802120</span>
                <span className="meta-chip">۱۰۰×۳۵</span>
              </div>
              <div className="title-wrap">کاشی خاک‌سفید — زیرپله ۴۸۰</div>
              <div className="stats-row">
                <div className="sub-stats">
                  <span className="sub-cell"><span className="sub-dot physical"></span><span className="sub-lbl">فیزیکی</span><span className="sub-val">۱۶۸</span></span>
                  <span className="sub-cell"><span className="sub-dot freeze"></span><span className="sub-lbl">فریز</span><span className="sub-val">۰</span></span>
                </div>
                <span className="available-chip">
                  <span className="ac-val">۱۶۸</span>
                  <span className="ac-lbl">قابل فروش</span>
                </span>
              </div>
              <div className="assign-check">
                <Check strokeWidth={3} />
              </div>
              <div className="tc-arrow">
                <ChevronLeft size={16} />
              </div>
            </div>

            <div className="tile-card" data-tile-id="t3" data-assigned="false" onClick={(e) => { handleTileClick(e, 'tile-detail') }}>
              <div className="meta-chips">
                <span className="meta-chip sku">6029201030302120</span>
                <span className="meta-chip">۱۰۰×۳۰</span>
              </div>
              <div className="title-wrap">کاشی خاک‌سفید — پله ۸۳۰ پرسلان مات ممتاز</div>
              <div className="stats-row">
                <div className="sub-stats">
                  <span className="sub-cell"><span className="sub-dot physical"></span><span className="sub-lbl">فیزیکی</span><span className="sub-val">۱۵</span></span>
                  <span className="sub-cell"><span className="sub-dot freeze"></span><span className="sub-lbl">فریز</span><span className="sub-val">۵</span></span>
                </div>
                <span className="available-chip low">
                  <span className="ac-val">۱۰</span>
                  <span className="ac-lbl">قابل فروش</span>
                </span>
              </div>
              <div className="assign-check">
                <Check strokeWidth={3} />
              </div>
              <div className="tc-arrow">
                <ChevronLeft size={16} />
              </div>
            </div>

            <div className="tile-card" data-tile-id="t4" data-assigned="false" onClick={(e) => { handleTileClick(e, 'tile-detail') }}>
              <div className="meta-chips">
                <span className="meta-chip sku">6029301028822120</span>
                <span className="meta-chip">۱۲۰×۶۰</span>
              </div>
              <div className="title-wrap">کاشی پرسلان کلکته گلد لعاب‌دار صیقلی</div>
              <div className="stats-row">
                <div className="sub-stats">
                  <span className="sub-cell"><span className="sub-dot physical"></span><span className="sub-lbl">فیزیکی</span><span className="sub-val">۹۲</span></span>
                  <span className="sub-cell"><span className="sub-dot freeze"></span><span className="sub-lbl">فریز</span><span className="sub-val">۸</span></span>
                </div>
                <span className="available-chip">
                  <span className="ac-val">۸۴</span>
                  <span className="ac-lbl">قابل فروش</span>
                </span>
              </div>
              <div className="assign-check">
                <Check strokeWidth={3} />
              </div>
              <div className="tc-arrow">
                <ChevronLeft size={16} />
              </div>
            </div>
          </div>

          {/* ASSIGN ACTION BAR */}
          <div className="assign-actionbar" id="assign-actionbar">
            <div className="ab-info">
              <div className="ab-count" id="ab-count">۰ تغییر</div>
              <div className="ab-sub" id="ab-sub">کاشی‌ای انتخاب نشده</div>
            </div>
            <button className="ab-btn remove" id="ab-remove-btn" onClick={() => { confirmAssignChanges('remove') }} style={{display:'none'}}>
              <Close strokeWidth={2.5} />
              حذف
            </button>
            <button className="ab-btn confirm" id="ab-confirm-btn" onClick={() => { confirmAssignChanges('add') }} style={{display:'none'}}>
              <Check strokeWidth={2.5} />
              ثبت
            </button>
          </div></>
  );
}
