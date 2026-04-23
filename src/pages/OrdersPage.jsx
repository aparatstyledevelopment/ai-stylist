import { useState } from 'react';
import { useLegacyActions } from '../hooks/useLegacyActions.js';
import { Search, Check } from '../components/icons.jsx';
import { OrderCard } from '../components/OrderCard.jsx';
import { useOnboarding } from '../context/OnboardingContext.jsx';

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
  const { toast, goTo, openSheet } = useLegacyActions();
  const { isEmpty } = useOnboarding();
  const [filter, setFilter] = useState('mine');

  if (isEmpty) return (
    <div className="ob-empty">
      <div className="ob-empty-illus">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="32" height="32"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
      </div>
      <h3>هنوز حواله‌ای نیست</h3>
      <p>با دعوت از نمایندگان،<br />سفارش‌ها اینجا ظاهر میشن.</p>
      <button className="btn primary" onClick={() => openSheet('qr-sheet')}>
        دعوت از نماینده
      </button>
    </div>
  );
  const data = ordersData[filter] || [];
  const isMineEmpty = filter === 'mine' && data.length === 0;

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
        {isMineEmpty ? (
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
            <OrderCard key={o.id} o={o} onPress={() => goTo('order-detail')} />
          ))
        )}
      </div>
    </>
  );
}
