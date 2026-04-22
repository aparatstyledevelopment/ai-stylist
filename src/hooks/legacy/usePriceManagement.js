import { useToast } from '../../context/ToastContext.jsx';
import { toPersianNum } from '../../utils/format.js';

const TREND_DOWN_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="10" height="10"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>';
const TREND_UP_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="10" height="10"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>';

export function usePriceManagement() {
  const { toast } = useToast();

  const savePriceNew = (e) => {
    const card = e.currentTarget.closest('.pm-card');
    if (!card) return;
    const input = card.querySelector('.pm-input');
    if (!input.value.trim()) {
      toast('قیمت را وارد کنید');
      input.focus();
      return;
    }
    toast('✓ قیمت ثبت شد');
    card.classList.add('filled');
  };

  const calcProfit = (e, factoryPrice) => {
    const input = e.currentTarget;
    const card = input.closest('.pm-card');
    const wrap = card.querySelector('.pm-profit-wrap');
    const val = parseFloat(input.value.replace(/[^\d]/g, ''));
    if (!val || val <= 0) {
      wrap.innerHTML = '';
      card.classList.remove('filled');
      return;
    }
    const diff = val - factoryPrice;
    const pct = Math.round((diff / factoryPrice) * 100);
    const isLoss = diff < 0;
    const chipClass = isLoss ? 'pm-profit-chip loss' : 'pm-profit-chip';
    const label = isLoss ? 'ضرر' : 'سود';
    const icon = isLoss ? TREND_DOWN_SVG : TREND_UP_SVG;
    wrap.innerHTML = `
      <span class="${chipClass}">${icon}${label} ${toPersianNum(Math.abs(pct))}٪</span>
      <span class="pm-profit-amt">${toPersianNum(Math.abs(diff).toLocaleString())} <small>ت</small></span>
    `;
    if (val > factoryPrice) card.classList.add('filled');
    else card.classList.remove('filled');
  };

  return { savePriceNew, calcProfit };
}
