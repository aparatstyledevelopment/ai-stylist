import { toPersianNum } from '../../utils/format.js';

export function useFormPrimitives() {
  const selectSize = (e) => {
    const el = e.currentTarget;
    el.parentElement.querySelectorAll('.size-opt').forEach((o) => o.classList.remove('selected'));
    el.classList.add('selected');
  };

  const chipSelect = (e) => {
    const el = e.currentTarget;
    el.parentElement.querySelectorAll('.chip-opt').forEach((o) => o.classList.remove('selected'));
    el.classList.add('selected');
  };

  const chipMulti = (e) => {
    e.currentTarget.classList.toggle('selected');
  };

  const numStep = (e, dir) => {
    const input = e.currentTarget.parentElement.querySelector('input');
    const current = parseInt(input.value) || 0;
    input.value = Math.max(0, current + dir);
  };

  const selectVisCard = (e, mode) => {
    const card = e.currentTarget;
    card.parentElement.querySelectorAll('.vis-card').forEach((c) => c.classList.remove('selected'));
    card.classList.add('selected');
    const search = document.getElementById('customer-search');
    if (search) search.style.display = mode === 'select' ? 'flex' : 'none';
  };

  const quickAdd = (amount) => {
    const input = document.getElementById('new-stock');
    if (!input) return;
    const current = parseInt(input.value.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))) || 0;
    input.value = toPersianNum(current + amount);
    input.focus();
  };

  return { selectSize, chipSelect, chipMulti, numStep, selectVisCard, quickAdd };
}
