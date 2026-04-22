import { useState } from 'react';
import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Search, Check, Close, ChevronLeft } from '../components/icons.jsx';

const ordersData = {
  mine: [
    { id: 'b88a', chip: 'warning', chipLabel: 'تایید مالی', amount: '۲۴,۵۰۰,۰۰۰', customer: 'یزد مهرآوران', summary: { items: '۲', area: '۴۰ m²', date: '۱۴۰۵/۱/۷' }, meta: '۲ ساعت پیش', action: true },
    { id: '9c89', chip: 'warning', chipLabel: 'تایید تیم فروش', amount: '۱۸,۷۰۰,۰۰۰', customer: 'مارال رحیمی', summary: { items: '۳', area: '۶۲ m²', date: '۱۴۰۵/۱/۶' }, meta: 'دیروز', action: true },
    { id: 'e112', chip: 'warning', chipLabel: 'تایید مالی', amount: '۶,۴۵۰,۰۰۰', customer: 'تعاونی مسکن', summary: { items: '۱', area: '۱۵ m²', date: '۱۴۰۵/۱/۷' }, meta: '۳ ساعت پیش', action: true },
    { id: 'f887', chip: 'warning', chipLabel: 'تایید تیم فروش', amount: '۴۲,۱۰۰,۰۰۰', customer: 'پروژه صدف', summary: { items: '۶', area: '۹۸ m²', date: '۱۴۰۵/۱/۷' }, meta: 'امروز', action: true },
  ],
  all: [
    { id: 'b88a', chip: 'warning', chipLabel: 'تایید مالی', amount: '۲۴,۵۰۰,۰۰۰', customer: 'یزد مهرآوران', summary: { items: '۲', area: '۴۰ m²', date: '۱۴۰۵/۱/۷' }, meta: '۲ ساعت پیش', action: true },
    { id: 'a47f', chip: 'danger', chipLabel: 'رد شد', amount: '۱۵,۸۰۰,۰۰۰', customer: 'تهران مصالح البرز', summary: { items: '۴', area: '۴۵ m²', date: '۱۴۰۵/۱/۴' }, meta: '۳ روز پیش', rejected: 'بدهی قبلی تسویه نشده است', rejectBy: 'حسابداری' },
    { id: '9c89', chip: 'warning', chipLabel: 'تایید تیم فروش', amount: '۱۸,۷۰۰,۰۰۰', customer: 'مارال رحیمی', summary: { items: '۳', area: '۶۲ m²', date: '۱۴۰۵/۱/۶' }, meta: 'دیروز', action: true },
    { id: '2bee', chip: 'info', chipLabel: 'خارج شد از انبار', amount: '۹,۲۰۰,۰۰۰', customer: 'خریدار اصفهان', summary: { items: '۱', area: '۲۰ m²', date: '۱۴۰۵/۱/۵' }, meta: '۲ روز پیش' },
    { id: '358f', chip: 'success', chipLabel: 'تکمیل شد', amount: '۸,۵۰۰,۰۰۰', customer: 'علیرضا قاسمی', summary: { items: '۲', area: '۲۵ m²', date: '۱۴۰۵/۱/۲' } },
  ],
  progress: [
    { id: 'b88a', chip: 'warning', chipLabel: 'تایید مالی', amount: '۲۴,۵۰۰,۰۰۰', customer: 'یزد مهرآوران', summary: { items: '۲', area: '۴۰ m²', date: '۱۴۰۵/۱/۷' }, meta: '۲ ساعت پیش', action: true },
    { id: '2bee', chip: 'info', chipLabel: 'خارج شد از انبار', amount: '۹,۲۰۰,۰۰۰', customer: 'خریدار اصفهان', summary: { items: '۱', area: '۲۰ m²', date: '۱۴۰۵/۱/۵' }, meta: '۲ روز پیش' },
  ],
  closed: [
    { id: '358f', chip: 'success', chipLabel: 'تکمیل شد', amount: '۸,۵۰۰,۰۰۰', customer: 'علیرضا قاسمی', summary: { items: '۲', area: '۲۵ m²', date: '۱۴۰۵/۱/۲' } },
    { id: 'a47f', chip: 'danger', chipLabel: 'رد شد', amount: '۱۵,۸۰۰,۰۰۰', customer: 'تهران مصالح البرز', summary: { items: '۴', area: '۴۵ m²', date: '۱۴۰۵/۱/۴' }, meta: '۳ روز پیش', rejected: 'بدهی قبلی تسویه نشده است', rejectBy: 'حسابداری' },
  ],
};

const TABS = [
  { key: 'closed', label: 'بسته' },
  { key: 'progress', label: 'در جریان' },
  { key: 'all', label: 'همه' },
  { key: 'mine', label: 'نوبت من', badge: '۴' },
];

export function OrdersPage() {
  const { toast, goTo } = useLegacyActions();
  const [filter, setFilter] = useState('mine');
  const data = ordersData[filter] || [];
  const isEmpty = filter === 'mine' && data.length === 0;

  return (
    <>
      <div className="search" style={{ marginTop: '12px' }}>
        <input
          placeholder="جستجو در حواله‌ها…"
          onFocus={() => toast('جستجوی زنده فعال شد')}
        />
        <Search />
      </div>

      <div className="tabs-wrap">
        <div className="tabs" id="order-tabs">
          {TABS.map((t) => (
            <div
              key={t.key}
              className={`tab${filter === t.key ? ' active' : ''}`}
              data-filter={t.key}
              onClick={() => setFilter(t.key)}
            >
              {t.label}
              {t.badge && <span className="badge">{t.badge}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="content" style={{ paddingTop: '8px' }} id="orders-list">
        {isEmpty ? (
          <>
            <div className="zero-state">
              <div className="illus">
                <div className="check-circle">
                  <Check />
                </div>
              </div>
              <h3>همه کارها تمومه!</h3>
              <p>
                هیچ حواله‌ای منتظر اقدام شما نیست.<br />
                روز خوبی داشته باشید ☕
              </p>
            </div>
            <div className="stats-card">
              <div className="item"><div className="v success">۷</div><div className="l">تایید شد</div></div>
              <div className="divider"></div>
              <div className="item"><div className="v info">۳</div><div className="l">در جریان</div></div>
              <div className="divider"></div>
              <div className="item"><div className="v">۴۲ m²</div><div className="l">بارگیری شد</div></div>
            </div>
          </>
        ) : (
          data.map((o) => (
            <div className="order-card" key={o.id} onClick={() => goTo('order-detail')}>
              <div className="oc-header">
                <span className={`chip ${o.chip}`}><span className="dot"></span>{o.chipLabel}</span>
                <span className="oc-id">ord-{o.id}#</span>
              </div>
              <div className="oc-body">
                <div className="oc-info">
                  <div className="oc-customer">{o.customer}</div>
                  {o.summary && (
                    <div className="oc-meta">
                      <span className="m-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="12" height="12">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <line x1="3" y1="9" x2="21" y2="9" />
                          <line x1="9" y1="21" x2="9" y2="9" />
                        </svg>
                        {' '}{o.summary.items} قلم
                      </span>
                      <span className="m-sep">·</span>
                      <span className="m-item" style={{ direction: 'ltr' }}>{o.summary.area}</span>
                    </div>
                  )}
                </div>
                <div className="oc-amount">
                  <div className="val">{o.amount}</div>
                  <div className="unit">تومان</div>
                </div>
              </div>
              {o.rejected && (
                <div className="reject-note">
                  <div className="body">
                    <div className="lbl">رد توسط {o.rejectBy}</div>
                    <div className="reason">{o.rejected}</div>
                  </div>
                  <div className="ico-r">
                    <Close size={10} strokeWidth={3} />
                  </div>
                </div>
              )}
              <div className="oc-footer">
                <span className="oc-time">{o.meta || o.summary?.date || ''}</span>
                <div className={`oc-arrow${!o.action ? ' ghost' : ''}`}>
                  <ChevronLeft strokeWidth={2.2} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
