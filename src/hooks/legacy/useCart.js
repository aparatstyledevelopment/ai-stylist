import { useToast } from '../../context/ToastContext.jsx';
import { fmtPersian, parseFaNum } from '../../utils/format.js';

function updateCartTotals() {
  const items = document.querySelectorAll('.cart-item');
  let totalW = 0;
  let totalP = 0;
  items.forEach((it) => {
    totalW += Number(it.dataset.finalWeight || 0);
    totalP += Number(it.dataset.finalPrice || 0);
  });
  const wEl = document.getElementById('cart-total-weight');
  const pEl = document.getElementById('cart-total-price');
  if (wEl) wEl.textContent = `${fmtPersian(totalW)} کیلوگرم`;
  if (pEl) pEl.textContent = `${fmtPersian(totalP)} تومان`;
}

export function useCart() {
  const { toast } = useToast();

  const updateCartCalc = (cartId) => {
    const item = document.querySelector(`[data-cart-id="${cartId}"]`);
    if (!item) {
      updateCartTotals();
      return;
    }
    const mode = item.dataset.mode;
    const pcsPerCarton = Number(item.dataset.pcsPerCarton);
    const cartonsPerPallet = Number(item.dataset.cartonsPerPallet);
    const weightPerPc = Number(item.dataset.weightPerPc);
    const pricePerPc = Number(item.dataset.pricePerPc);
    const stockPcs = Number(item.dataset.stockPcs);
    const input = item.querySelector('.ci-step-input');
    const qty = parseFaNum(input.value);
    const calcEl = document.getElementById(`${cartId}-calc`);
    const calcUnit = calcEl ? calcEl.parentElement.querySelector('.cid-u') : null;
    const finalEl = document.getElementById(`${cartId}-final`);
    const weightEl = document.getElementById(`${cartId}-weight`);
    const priceEl = document.getElementById(`${cartId}-price`);
    let finalPcs = 0;
    let calcVal = 0;
    let calcUnitTxt = '';
    if (mode === 'unit') {
      const cartons = Math.ceil(qty / pcsPerCarton);
      finalPcs = cartons * pcsPerCarton;
      calcVal = cartons;
      calcUnitTxt = 'کارتن';
    } else {
      const pallets = qty;
      finalPcs = pallets * cartonsPerPallet * pcsPerCarton;
      calcVal = pallets;
      calcUnitTxt = 'پالت';
    }
    if (finalPcs > stockPcs) item.classList.add('error');
    else item.classList.remove('error');
    if (calcEl) calcEl.textContent = fmtPersian(calcVal);
    if (calcUnit) calcUnit.textContent = calcUnitTxt;
    if (finalEl) finalEl.textContent = fmtPersian(finalPcs);
    const weight = Math.round(finalPcs * weightPerPc * 10) / 10;
    if (weightEl) weightEl.textContent = fmtPersian(weight);
    const price = finalPcs * pricePerPc;
    if (priceEl) priceEl.textContent = fmtPersian(price);
    item.dataset.finalPcs = finalPcs;
    item.dataset.finalWeight = weight;
    item.dataset.finalPrice = price;
    updateCartTotals();
  };

  const selectCartMode = (e, cartId, mode) => {
    const btn = e.currentTarget;
    const item = document.querySelector(`[data-cart-id="${cartId}"]`);
    if (!item) return;
    const tabs = btn.closest('.ci-mode-tabs');
    tabs.querySelectorAll('.cmt').forEach((t) => t.classList.remove('active'));
    btn.classList.add('active');
    item.dataset.mode = mode;
    const label = item.querySelector('.ci-step-label');
    if (mode === 'pallet') label.innerHTML = 'تعداد پالت <span>(پالت کامل)</span>';
    else label.innerHTML = 'مقدار مورد نیاز <span>(عدد)</span>';
    item.querySelector('.ci-step-input').value = '';
    updateCartCalc(cartId);
  };

  const cartStep = (cartId, delta) => {
    const item = document.querySelector(`[data-cart-id="${cartId}"]`);
    if (!item) return;
    const input = item.querySelector('.ci-step-input');
    let val = parseFaNum(input.value) + delta;
    if (val < 0) val = 0;
    input.value = val;
    updateCartCalc(cartId);
  };

  const removeCartItem = (cartId) => {
    const item = document.querySelector(`[data-cart-id="${cartId}"]`);
    if (!item) return;
    item.style.transition = 'all .25s';
    item.style.opacity = '0';
    item.style.transform = 'scale(.95)';
    setTimeout(() => {
      item.remove();
      updateCartTotals();
      toast('آیتم حذف شد');
    }, 250);
  };

  return { updateCartCalc, selectCartMode, cartStep, removeCartItem };
}
