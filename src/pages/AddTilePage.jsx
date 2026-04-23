import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Close, World, Check, Search, ChevronLeft } from '../components/icons.jsx';
import { PageTopBar } from '../components/PageTopBar.jsx';

export function AddTilePage() {
  const { chipMulti, chipSelect, goBack, nextStep, prevStep, saveTile, selectSize, selectVisCard, toast } = useLegacyActions();
  return (
    <>
          <PageTopBar onBack={() => goBack('warehouse')} title="کاشی جدید" backIcon={<Close />} />

          <div className="stepper">
            <div className="stepper-bar">
              <div className="stepper-segment active" id="seg-1"></div>
              <div className="stepper-segment" id="seg-2"></div>
              <div className="stepper-segment" id="seg-3"></div>
            </div>
            <div className="stepper-label">
              <span className="step-name" id="step-name">اطلاعات پایه</span>
              <span className="step-num" id="step-num">قدم ۱ از ۳</span>
            </div>
          </div>

          <div className="content" style={{paddingTop:'8px'}}>

            {/* ============ STEP 1: BASE INFO ============ */}
            <div className="form-step active" data-step="1">
              <div className="form-intro">
                <h3>کاشی رو معرفی کن</h3>
                <p>اطلاعات اصلی محصول رو وارد کن. می‌تونی بعداً ویرایش کنی.</p>
              </div>

              <div className="upload-compact" onClick={() => { toast('گالری باز شد') }}>
                <div className="ico-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M7 5l2-2h6l2 2" /></svg>
                </div>
                <div className="main">آپلود تصویر</div>
                <div className="sub">چند عکس مجاز است</div>
              </div>

              <div className="field">
                <label><span className="req">*</span>نام محصول</label>
                <input className="input" placeholder="مثال: کلکته گلد" />
              </div>

              <div className="field-row">
                <div className="field">
                  <label>کد محصول (SKU)</label>
                  <input className="input ltr" defaultValue="CL-01" />
                </div>
                <div className="field">
                  <label>طرح</label>
                  <input className="input" placeholder="کلکته" />
                </div>
              </div>

              <div className="field">
                <label>کارخانه تولیدکننده</label>
                <input className="input" placeholder="مثال: تبریز کاشی" />
              </div>

              <div className="field">
                <label>سایز (cm)</label>
                <div className="size-grid">
                  <div className="size-opt" onClick={(e) => { selectSize(e) }}>۳۰<span className="x">×</span>۹۰</div>
                  <div className="size-opt" onClick={(e) => { selectSize(e) }}>۶۰<span className="x">×</span>۶۰</div>
                  <div className="size-opt" onClick={(e) => { selectSize(e) }}>۸۰<span className="x">×</span>۸۰</div>
                  <div className="size-opt selected" onClick={(e) => { selectSize(e) }}>۱۲۰<span className="x">×</span>۶۰</div>
                </div>
                <div className="hint">یا سایز سفارشی وارد کن:</div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label>طول (cm)</label>
                  <input className="input center" defaultValue="120" />
                </div>
                <div className="field">
                  <label>عرض (cm)</label>
                  <input className="input center" defaultValue="60" />
                </div>
              </div>

              <div className="field">
                <label>ضخامت (mm)</label>
                <input className="input center" defaultValue="9" />
              </div>
            </div>

            {/* ============ STEP 2: PROPERTIES ============ */}
            <div className="form-step" data-step="2">
              <div className="form-intro">
                <h3>ویژگی‌ها و بسته‌بندی</h3>
                <p>نوع کاشی و اطلاعات بسته‌بندی برای انبارداری.</p>
              </div>

              <div className="field">
                <label>نوع بدنه</label>
                <div className="chip-group">
                  <div className="chip-opt selected" onClick={(e) => { chipSelect(e) }}>پرسلان</div>
                  <div className="chip-opt" onClick={(e) => { chipSelect(e) }}>سرامیک / خاک قرمز</div>
                  <div className="chip-opt" onClick={(e) => { chipSelect(e) }}>خاک سفید</div>
                </div>
              </div>

              <div className="field">
                <label>نوع لعاب</label>
                <div className="chip-group">
                  <div className="chip-opt selected" onClick={(e) => { chipSelect(e) }}>مات</div>
                  <div className="chip-opt" onClick={(e) => { chipSelect(e) }}>براق</div>
                  <div className="chip-opt" onClick={(e) => { chipSelect(e) }}>پولیش</div>
                  <div className="chip-opt" onClick={(e) => { chipSelect(e) }}>نانو پولیش</div>
                  <div className="chip-opt" onClick={(e) => { chipSelect(e) }}>شوگر</div>
                </div>
              </div>

              <div className="field">
                <label>واحد فروش</label>
                <div className="chip-group">
                  <div className="chip-opt selected" onClick={(e) => { chipSelect(e) }}>متر مربع</div>
                  <div className="chip-opt" onClick={(e) => { chipSelect(e) }}>متر طول</div>
                  <div className="chip-opt" onClick={(e) => { chipSelect(e) }}>عدد</div>
                </div>
              </div>

              <div className="field">
                <label>کاربرد <span className="opt">(چند انتخاب)</span></label>
                <div className="chip-group">
                  <div className="chip-opt selected" onClick={(e) => { chipMulti(e) }}>کف</div>
                  <div className="chip-opt" onClick={(e) => { chipMulti(e) }}>بدنه</div>
                  <div className="chip-opt" onClick={(e) => { chipMulti(e) }}>پله</div>
                  <div className="chip-opt" onClick={(e) => { chipMulti(e) }}>زیر پله</div>
                  <div className="chip-opt" onClick={(e) => { chipMulti(e) }}>قرنیز</div>
                  <div className="chip-opt" onClick={(e) => { chipMulti(e) }}>سرویس</div>
                  <div className="chip-opt" onClick={(e) => { chipMulti(e) }}>استخری</div>
                </div>
              </div>

              {/* مشخصات بسته‌بندی */}
              <div className="packaging-box">
                <div className="packaging-title">مشخصات بسته‌بندی</div>

                <div className="pack-row">
                  <div className="pack-field">
                    <label>تعداد در کارتن</label>
                    <input className="input center" defaultValue="0" />
                  </div>
                  <div className="pack-field">
                    <label>مقدار هر کارتن (m²)</label>
                    <input className="input center disabled-calc" defaultValue="0" disabled />
                  </div>
                </div>

                <div className="pack-row">
                  <div className="pack-field">
                    <label>تعداد کارتن در پالت</label>
                    <input className="input center" defaultValue="0" />
                  </div>
                  <div className="pack-field">
                    <label>مقدار هر پالت (m²)</label>
                    <input className="input center disabled-calc" defaultValue="0" disabled />
                  </div>
                </div>

                <div className="pack-row">
                  <div className="pack-field">
                    <label>وزن حدودی پالت (kg)</label>
                    <input className="input center" defaultValue="0" />
                  </div>
                  <div className="pack-field">
                    <label>ضخامت (mm)</label>
                    <input className="input center" defaultValue="9" />
                  </div>
                </div>
              </div>
            </div>

            {/* ============ STEP 3: PRICE & VISIBILITY ============ */}
            <div className="form-step" data-step="3">
              <div className="form-intro">
                <h3>قیمت و دسترسی</h3>
                <p>قیمت پایه و این که چه کسانی این کاشی رو ببینن.</p>
              </div>

              <div className="price-hero">
                <div className="label">قیمت پایه (هر متر مربع)</div>
                <div className="input-wrap">
                  <input placeholder="0" />
                  <span className="unit">تومان</span>
                </div>
              </div>
              <div style={{textAlign:'center', fontSize:'11px', color:'var(--text-muted)', margin:'0 24px 22px'}}>
                نمایندگان می‌تونن قیمت اختصاصی خودشون رو روی این بذارن
              </div>

              <div className="price-hero">
                <div className="label">موجودی اولیه</div>
                <div className="input-wrap">
                  <input placeholder="0" />
                  <span className="unit">m²</span>
                </div>
              </div>
              <div style={{textAlign:'center', fontSize:'11px', color:'var(--text-muted)', margin:'0 24px 22px'}}>
                موجودی فیزیکی فعلی شما در انبار
              </div>

              <div className="form-section" style={{padding:'8px 24px 12px'}}>
                <h4 style={{fontSize:'13px', fontWeight:'500', margin:'0', color:'var(--text)'}}>نمایش به مشتریان</h4>
              </div>

              <div className="visibility-group">
                <div className="vis-card" onClick={(e) => { selectVisCard(e, 'all') }}>
                  <div className="ico-wrap">
                    <World strokeWidth={1.8} />
                  </div>
                  <div className="text">
                    <div className="title">نمایش به همه</div>
                    <div className="sub">تمام مشتریان فروشگاه می‌تونن این کاشی رو ببینن و سفارش بدن</div>
                  </div>
                  <div className="check">
                    <Check strokeWidth={3} />
                  </div>
                </div>

                <div className="vis-card selected" onClick={(e) => { selectVisCard(e, 'select') }}>
                  <div className="ico-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 11l-3-3m0 0l-3 3m3-3v8" /></svg>
                  </div>
                  <div className="text">
                    <div className="title">انتخاب مشتری</div>
                    <div className="sub">فقط مشتریان مشخص‌شده می‌تونن ببینن (مناسب حواله‌های ویژه)</div>
                  </div>
                  <div className="check">
                    <Check strokeWidth={3} />
                  </div>
                </div>
              </div>

              <div className="search" id="customer-search" style={{margin:'0 24px 24px'}}>
                <input placeholder="جستجوی مشتری برای اضافه کردن…" />
                <Search />
              </div>
            </div>

          </div>

          <div style={{background:'#fff', padding:'14px 20px 24px', display:'flex', gap:'10px', flexShrink:'0', borderTop:'1px solid var(--border-soft)'}}>
            <button className="btn outline" id="step-back" style={{flex:'1', display:'none'}} onClick={() => { prevStep() }}>قبلی</button>
            <button className="btn primary" id="step-next" style={{flex:'2'}} onClick={() => { nextStep() }}>
              ادامه
              <ChevronLeft size={14} strokeWidth={2.5} />
            </button>
            <button className="btn accent" id="step-submit" style={{flex:'2', display:'none'}} onClick={() => { saveTile() }}>
              <Check size={14} strokeWidth={2.5} />
              ثبت کاشی
            </button>
          </div></>
  );
}
