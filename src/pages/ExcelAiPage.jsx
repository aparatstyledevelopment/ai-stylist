import { useLegacyActions } from '../hooks/useLegacyActions.js';

export function ExcelAiPage() {
  const { goBack, resetAiUpload, simulateAiUpload, submitAiUpload, toggleAnalyze } = useLegacyActions();
  return (
    <>
          <div className="topbar">
            <button className="icon-btn" onClick={() => { goBack('warehouse'); resetAiUpload(); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 18l6-6-6-6" /></svg>
            </button>
            <div className="ttl-wrap center"><h2>بروزرسانی هوشمند</h2></div>
            <div style={{width:'36px'}}></div>
          </div>

          <div className="content" style={{paddingTop:'8px'}}>
            
            <div className="ai-head" style={{padding:'0 24px 20px'}}>
              <div className="ai-titl">
                <h3>بروزرسانی هوشمند موجودی</h3>
                <div className="ai-brand">AVAL AI ENGINE</div>
              </div>
              <div className="ai-ico">
                <svg viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" /><path d="M19 14l.9 2.7L22 18l-2.1.3L19 21l-.9-2.7L16 18l2.1-.3z" opacity=".7" /></svg>
              </div>
            </div>

            <div style={{padding:'0 24px 20px'}}>
              {/* Step 1: Upload drop zone */}
              <div className="ai-dropzone" id="ai-dropzone" onClick={() => { simulateAiUpload() }}>
                <div className="ai-dz-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--danger-500)" strokeWidth="1.6"><path d="M22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                </div>
                <div className="ai-dz-title">فایل اکسل را انتخاب کنید</div>
                <div className="ai-dz-sub">هوش مصنوعی ستون‌ها را تشخیص می‌دهد</div>
              </div>
              
              {/* Step 2: After upload (hidden) */}
              <div className="ai-preview" id="ai-preview" style={{display:'none'}}>
                <div className="ai-file-row">
                  <div className="ai-file-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--success-600)" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  </div>
                  <div className="ai-file-info">
                    <div className="ai-file-name">inventory_jan.xlsx</div>
                    <div className="ai-file-size">۲۴ ردیف · ۵ ستون شناسایی شد</div>
                  </div>
                  <button className="ai-file-close" onClick={() => { resetAiUpload() }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
                
                <div className="ai-analyze collapsed" id="ai-analyze">
                  <div className="ai-analyze-header" onClick={() => { toggleAnalyze() }}>
                    <div className="ai-analyze-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--info-600)" strokeWidth="2" width="13" height="13"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                      تشخیص هوشمند ستون‌ها
                    </div>
                    <svg className="ai-analyze-chevron" viewBox="0 0 24 24" fill="none" stroke="var(--info-600)" strokeWidth="2" width="14" height="14"><polyline points="6 9 12 15 18 9" /></svg>
                  </div>
                  <div className="ai-analyze-body">
                    <div className="ai-map-row"><span className="ai-map-k">ستون ۱:</span><span className="ai-map-v">SKU / کد کالا</span></div>
                    <div className="ai-map-row"><span className="ai-map-k">ستون ۲:</span><span className="ai-map-v">نام محصول</span></div>
                    <div className="ai-map-row"><span className="ai-map-k">ستون ۳:</span><span className="ai-map-v">موجودی فیزیکی</span></div>
                    <div className="ai-map-row"><span className="ai-map-k">ستون ۴:</span><span className="ai-map-v">قیمت واحد</span></div>
                  </div>
                </div>
                
                {/* Preview rows */}
                <div className="ai-preview-header">
                  <span className="aph-label">پیش‌نمایش</span>
                  <span className="aph-count">۲۴ آیتم</span>
                </div>
                <div className="ai-rows">
                  <div className="ai-row">
                    <div className="ai-row-main">
                      <div className="ai-row-name">کاشی سرامیک — پله ۸۳۴</div>
                      <div className="ai-row-meta">
                        <span className="arm-chip sku">6029301028342120</span>
                        <span className="arm-chip">۱۰۰×۳۰</span>
                      </div>
                    </div>
                    <div className="ai-row-vals">
                      <div className="ai-row-v"><span className="arv-lbl">موجودی</span><span className="arv-val">۱۲۶</span></div>
                      <div className="ai-row-v"><span className="arv-lbl">قیمت</span><span className="arv-val">۵۸۰,۰۰۰</span></div>
                    </div>
                  </div>
                  <div className="ai-row">
                    <div className="ai-row-main">
                      <div className="ai-row-name">کاشی خاک‌سفید — زیرپله ۴۸۰</div>
                      <div className="ai-row-meta">
                        <span className="arm-chip sku">6029201024802120</span>
                        <span className="arm-chip">۱۰۰×۳۵</span>
                      </div>
                    </div>
                    <div className="ai-row-vals">
                      <div className="ai-row-v"><span className="arv-lbl">موجودی</span><span className="arv-val">۱۶۸</span></div>
                      <div className="ai-row-v"><span className="arv-lbl">قیمت</span><span className="arv-val">۶۲۰,۰۰۰</span></div>
                    </div>
                  </div>
                  <div className="ai-row">
                    <div className="ai-row-main">
                      <div className="ai-row-name">کاشی سرامیک — پله ۸۰۵</div>
                      <div className="ai-row-meta">
                        <span className="arm-chip sku">6029351028052120</span>
                        <span className="arm-chip">۱۰۰×۳۵</span>
                      </div>
                    </div>
                    <div className="ai-row-vals">
                      <div className="ai-row-v"><span className="arv-lbl">موجودی</span><span className="arv-val">۷۲۰</span></div>
                      <div className="ai-row-v"><span className="arv-lbl">قیمت</span><span className="arv-val">۵۴۰,۰۰۰</span></div>
                    </div>
                  </div>
                  <div className="ai-row">
                    <div className="ai-row-main">
                      <div className="ai-row-name">کاشی پرسلان کلکته گلد</div>
                      <div className="ai-row-meta">
                        <span className="arm-chip sku">6029301028822120</span>
                        <span className="arm-chip">۱۲۰×۶۰</span>
                      </div>
                    </div>
                    <div className="ai-row-vals">
                      <div className="ai-row-v"><span className="arv-lbl">موجودی</span><span className="arv-val">۹۲</span></div>
                      <div className="ai-row-v"><span className="arv-lbl">قیمت</span><span className="arv-val">۱,۲۵۰,۰۰۰</span></div>
                    </div>
                  </div>
                  <div className="ai-row">
                    <div className="ai-row-main">
                      <div className="ai-row-name">کاشی خاک‌سفید — پله ۸۴۶</div>
                      <div className="ai-row-meta">
                        <span className="arm-chip sku">6029351028462120</span>
                        <span className="arm-chip">۱۰۰×۳۵</span>
                      </div>
                    </div>
                    <div className="ai-row-vals">
                      <div className="ai-row-v"><span className="arv-lbl">موجودی</span><span className="arv-val">۴۵۰</span></div>
                      <div className="ai-row-v"><span className="arv-lbl">قیمت</span><span className="arv-val">۶۴۰,۰۰۰</span></div>
                    </div>
                  </div>
                </div>
                <div className="ai-more-hint">و ۱۹ آیتم دیگر…</div>
              </div>
            </div>
          </div>
          
          <div style={{background:'#fff', padding:'14px 24px 24px', flexShrink:'0', borderTop:'1px solid var(--border-soft)'}}>
            <button className="ai-submit-btn" id="ai-submit" onClick={() => { submitAiUpload() }} disabled>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" /></svg>
              <span id="ai-submit-text">شروع تحلیل هوشمند</span>
            </button>
          </div></>
  );
}
