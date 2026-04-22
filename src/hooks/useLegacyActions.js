import { useNavigation } from '../context/NavigationContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useOverlay } from '../context/OverlayContext.jsx';
import { fmtPersian, parseFaNum, toPersianNum } from '../utils/format.js';

// These actions mutate the DOM directly, mirroring the original prototype's JS.
// Because every page preserves the same markup / classNames / ids, these work as-is.
export function useLegacyActions() {
  const { goTo, goBack } = useNavigation();
  const { toast } = useToast();
  const { openSheet, closeSheet, openModal, closeModal } = useOverlay();

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

  // ========== Stepper (AddTile) ==========
  const stepNames = { 1: 'اطلاعات پایه', 2: 'ویژگی‌ها و بسته‌بندی', 3: 'قیمت و دسترسی' };
  const totalSteps = 3;

  const updateStepper = (currentStep) => {
    document.querySelectorAll('.form-step').forEach((s) => s.classList.remove('active'));
    const step = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (step) step.classList.add('active');
    for (let i = 1; i <= totalSteps; i++) {
      const seg = document.getElementById(`seg-${i}`);
      if (!seg) continue;
      seg.classList.remove('active', 'done');
      if (i < currentStep) seg.classList.add('done');
      else if (i === currentStep) seg.classList.add('active');
    }
    const num = document.getElementById('step-num');
    const name = document.getElementById('step-name');
    if (num) num.textContent = `قدم ${toPersianNum(currentStep)} از ${toPersianNum(totalSteps)}`;
    if (name) name.textContent = stepNames[currentStep];
    const back = document.getElementById('step-back');
    const next = document.getElementById('step-next');
    const submit = document.getElementById('step-submit');
    if (back) back.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    if (next) next.style.display = currentStep < totalSteps ? 'inline-flex' : 'none';
    if (submit) submit.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
    const content = document.querySelector('.page[data-page="add-tile"] .content');
    if (content) content.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let stepperRef = { current: 1 };
  const nextStep = () => {
    if (stepperRef.current < totalSteps) {
      stepperRef.current++;
      updateStepper(stepperRef.current);
    }
  };
  const prevStep = () => {
    if (stepperRef.current > 1) {
      stepperRef.current--;
      updateStepper(stepperRef.current);
    }
  };

  const saveTile = () => {
    toast('کاشی جدید ذخیره شد');
    setTimeout(() => goBack('warehouse'), 800);
  };

  const approveOrder = () => {
    toast('حواله تایید و به انباردار ارسال شد');
    setTimeout(() => goBack('orders'), 1000);
  };

  const rejectOrder = () => {
    toast('حواله رد شد — دلیل به نماینده ارسال می‌شود');
    setTimeout(() => goBack('orders'), 1200);
  };

  const toggleTimeline = () => {
    const toggle = document.getElementById('timeline-toggle');
    const content = document.getElementById('timeline-content');
    if (!toggle || !content) return;
    toggle.classList.toggle('open');
    content.classList.toggle('open');
  };

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
    const icon = isLoss
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="10" height="10"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="10" height="10"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>';
    wrap.innerHTML = `
      <span class="${chipClass}">${icon}${label} ${toPersianNum(Math.abs(pct))}٪</span>
      <span class="pm-profit-amt">${toPersianNum(Math.abs(diff).toLocaleString())} <small>ت</small></span>
    `;
    if (val > factoryPrice) card.classList.add('filled');
    else card.classList.remove('filled');
  };

  // ========== Cart ==========
  const updateCartTotals = () => {
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
  };

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

  // ========== Shop ==========
  let shopCartCount = 2;
  const updateShopCartIcon = () => {
    const icon = document.getElementById('shop-cart-icon');
    const badge = document.getElementById('shop-cart-badge');
    if (!icon || !badge) return;
    badge.textContent = toPersianNum(shopCartCount);
    if (shopCartCount > 0) {
      icon.classList.add('has-items');
      badge.classList.remove('hidden');
    } else {
      icon.classList.remove('has-items');
      badge.classList.add('hidden');
    }
  };

  const addToCart = () => {
    shopCartCount++;
    updateShopCartIcon();
    const icon = document.getElementById('shop-cart-icon');
    if (icon) {
      icon.classList.remove('pulse');
      void icon.offsetWidth;
      icon.classList.add('pulse');
    }
    toast('به سبد اضافه شد');
  };

  // ========== Filter Sheet ==========
  const filterData = {
    size: {
      title: 'فیلتر سایز',
      options: [
        { k: '100x30', label: '۱۰۰ × ۳۰', count: 24 },
        { k: '100x35', label: '۱۰۰ × ۳۵', count: 18 },
        { k: '60x60', label: '۶۰ × ۶۰', count: 12 },
        { k: '120x60', label: '۱۲۰ × ۶۰', count: 9 },
        { k: '50x100', label: '۵۰ × ۱۰۰', count: 7 },
        { k: '30x60', label: '۳۰ × ۶۰', count: 5 },
      ],
    },
    body: {
      title: 'فیلتر نوع بدنه',
      options: [
        { k: 'ceramic', label: 'سرامیک', count: 32 },
        { k: 'porcelain', label: 'پرسلان', count: 28 },
        { k: 'full-body', label: 'تمام بدنه', count: 11 },
      ],
    },
    glaze: {
      title: 'فیلتر نوع لعاب',
      options: [
        { k: 'matte', label: 'مات', count: 22 },
        { k: 'glossy', label: 'براق', count: 19 },
        { k: 'polish', label: 'پولیش', count: 14 },
        { k: 'nano-polish', label: 'نانو پولیش', count: 8 },
        { k: 'sugar', label: 'شوگر', count: 6 },
      ],
    },
    usage: {
      title: 'فیلتر کاربرد',
      options: [
        { k: 'floor', label: 'کف', count: 35 },
        { k: 'wall', label: 'دیوار', count: 28 },
        { k: 'stairs', label: 'پله', count: 18 },
        { k: 'kitchen', label: 'آشپزخانه', count: 15 },
        { k: 'bathroom', label: 'سرویس بهداشتی', count: 12 },
        { k: 'facade', label: 'نما', count: 7 },
      ],
    },
  };

  const openFilterSheet = (filterKey) => {
    openSheet('filter-sheet', { filterKey, data: filterData[filterKey] });
  };

  // ========== Warehouse / Menu + Assign mode ==========
  const toggleWhMenu = () => {
    const btn = document.getElementById('wh-menu-btn');
    const dropdown = document.getElementById('wh-menu-dropdown');
    const backdrop = document.getElementById('wh-menu-backdrop');
    if (!btn || !dropdown || !backdrop) return;
    const isOpen = dropdown.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    backdrop.classList.toggle('show', isOpen);
  };

  const closeWhMenu = () => {
    document.getElementById('wh-menu-btn')?.classList.remove('open');
    document.getElementById('wh-menu-dropdown')?.classList.remove('open');
    document.getElementById('wh-menu-backdrop')?.classList.remove('show');
  };

  let assignModeActive = false;
  let selectedRep = null;
  let assignChanges = {};

  const toggleAssignMode = () => {
    assignModeActive = !assignModeActive;
    const topbar = document.querySelector('[data-page="warehouse"] .wh-topbar');
    const overlay = document.getElementById('assign-overlay');
    const pill = document.getElementById('rep-pill');
    if (!overlay) return;
    if (assignModeActive) {
      topbar?.classList.add('disabled');
      overlay.classList.add('active');
      document.body.classList.add('assign-active');
      closeWhMenu();
    } else {
      topbar?.classList.remove('disabled');
      overlay.classList.remove('active');
      if (pill) pill.style.display = 'none';
      document.body.classList.remove('assign-active');
      const dd = document.getElementById('rep-dropdown');
      const chevron = document.getElementById('rep-chevron');
      dd?.classList.remove('open');
      if (chevron) chevron.style.transform = '';
      selectedRep = null;
      assignChanges = {};
      document.querySelectorAll('#wh-tiles .tile-card').forEach((t) => {
        t.classList.remove('marked-add', 'marked-remove');
      });
      document.querySelectorAll('.rep-dropdown-item').forEach((i) => i.classList.remove('selected'));
      document.getElementById('assign-actionbar')?.classList.remove('show');
    }
  };

  const toggleRepDropdown = (forceOpen) => {
    const dd = document.getElementById('rep-dropdown');
    const chevron = document.getElementById('rep-chevron');
    if (!dd) return;
    const isOpen = dd.classList.contains('open');
    if (forceOpen || !isOpen) {
      dd.classList.add('open');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    } else {
      dd.classList.remove('open');
      if (chevron) chevron.style.transform = '';
    }
  };

  const selectRep = (e, name) => {
    selectedRep = name;
    document.getElementById('rep-dropdown')?.classList.remove('open');
    const chevron = document.getElementById('rep-chevron');
    if (chevron) chevron.style.transform = '';
    document.querySelectorAll('.rep-dropdown-item').forEach((i) => i.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
    document.getElementById('assign-overlay')?.classList.remove('active');
    const pillName = document.getElementById('rep-pill-name');
    if (pillName) pillName.textContent = name;
    const pill = document.getElementById('rep-pill');
    if (pill) pill.style.display = 'flex';
    toast(`${name} انتخاب شد — کاشی‌هارو تیک بزن`);
  };

  const updateAssignActionbar = () => {
    const ab = document.getElementById('assign-actionbar');
    if (!ab) return;
    const count = document.getElementById('ab-count');
    const sub = document.getElementById('ab-sub');
    const addBtn = document.getElementById('ab-confirm-btn');
    const removeBtn = document.getElementById('ab-remove-btn');
    const adds = Object.values(assignChanges).filter((v) => v === 'add').length;
    const removes = Object.values(assignChanges).filter((v) => v === 'remove').length;
    const total = adds + removes;
    if (total === 0) {
      ab.classList.remove('show');
      return;
    }
    ab.classList.add('show');
    if (count) count.textContent = `${toPersianNum(total)} تغییر`;
    const parts = [];
    if (adds > 0) parts.push(`+${toPersianNum(adds)} افزودن`);
    if (removes > 0) parts.push(`−${toPersianNum(removes)} حذف`);
    if (sub) sub.textContent = parts.join(' · ');
    if (addBtn) addBtn.style.display = adds > 0 ? 'inline-flex' : 'none';
    if (removeBtn) removeBtn.style.display = removes > 0 ? 'inline-flex' : 'none';
    if (adds > 0 && removes === 0 && addBtn) {
      addBtn.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>ثبت تغییرات';
    } else if (adds > 0 && removes > 0 && addBtn && removeBtn) {
      addBtn.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>ثبت همه';
      removeBtn.style.display = 'none';
    } else if (addBtn) {
      addBtn.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>ثبت';
    }
  };

  const handleTileClick = (e, detailPage) => {
    if (!document.body.classList.contains('assign-active')) {
      goTo(detailPage);
      return;
    }
    if (!selectedRep) {
      toast('اول نماینده رو انتخاب کن');
      toggleRepDropdown(true);
      return;
    }
    const el = e.currentTarget;
    const tileId = el.getAttribute('data-tile-id');
    const isAssigned = el.getAttribute('data-assigned') === 'true';
    if (isAssigned) {
      if (el.classList.contains('marked-remove')) {
        el.classList.remove('marked-remove');
        delete assignChanges[tileId];
      } else {
        el.classList.add('marked-remove');
        assignChanges[tileId] = 'remove';
      }
    } else {
      if (el.classList.contains('marked-add')) {
        el.classList.remove('marked-add');
        delete assignChanges[tileId];
      } else {
        el.classList.add('marked-add');
        assignChanges[tileId] = 'add';
      }
    }
    updateAssignActionbar();
  };

  const confirmAssignChanges = () => {
    const adds = Object.values(assignChanges).filter((v) => v === 'add').length;
    const removes = Object.values(assignChanges).filter((v) => v === 'remove').length;
    Object.keys(assignChanges).forEach((tileId) => {
      const tile = document.querySelector(`.tile-card[data-tile-id="${tileId}"]`);
      if (!tile) return;
      if (assignChanges[tileId] === 'add') {
        tile.setAttribute('data-assigned', 'true');
        tile.classList.remove('marked-add');
        tile.classList.add('assigned');
      } else if (assignChanges[tileId] === 'remove') {
        tile.setAttribute('data-assigned', 'false');
        tile.classList.remove('marked-remove');
      }
    });
    const msg = [];
    if (adds > 0) msg.push(`${toPersianNum(adds)} کاشی اضافه شد`);
    if (removes > 0) msg.push(`${toPersianNum(removes)} حذف شد`);
    toast(`${msg.join(' · ')} برای ${selectedRep}`);
    assignChanges = {};
    document.getElementById('assign-actionbar')?.classList.remove('show');
  };

  // ========== Workflow toggle ==========
  const toggleWorkflow = () => {
    const sw = document.getElementById('wf-switch');
    const tc = document.getElementById('wf-toggle-card');
    const status = document.getElementById('wf-status');
    const sub = document.getElementById('wf-sub');
    const steps = document.getElementById('wf-steps');
    if (!sw || !tc || !status || !sub || !steps) return;
    const isOn = sw.classList.contains('on');
    if (isOn) {
      sw.classList.replace('on', 'off');
      tc.classList.replace('active', 'off');
      status.className = 'status off';
      status.textContent = '● غیرفعال';
      sub.textContent = 'برای کنترل بیشتر، این قابلیت رو روشن کنید';
      steps.style.opacity = '.4';
      toast('حالت ساده فعال شد');
    } else {
      sw.classList.replace('off', 'on');
      tc.classList.replace('off', 'active');
      status.className = 'status on';
      status.textContent = '● فعال';
      sub.textContent = 'سفارش‌ها از پرسنل شما عبور می‌کنند';
      steps.style.opacity = '1';
      toast('چرخه چندمرحله‌ای فعال شد');
    }
  };

  // ========== Remove rep modal ==========
  const showRemoveModal = (name, initials, phone, orders) => {
    openModal('remove-modal', { name, initials, phone, orders });
  };

  const confirmRemove = () => {
    closeModal();
    toast('نماینده با موفقیت حذف شد');
  };

  // ========== Excel AI ==========
  const simulateAiUpload = () => {
    const dz = document.getElementById('ai-dropzone');
    const preview = document.getElementById('ai-preview');
    const submit = document.getElementById('ai-submit');
    if (!dz || !preview || !submit) return;
    dz.style.display = 'none';
    preview.style.display = 'block';
    submit.disabled = false;
    const text = document.getElementById('ai-submit-text');
    if (text) text.textContent = 'ایمپورت ۲۴ آیتم';
  };

  const resetAiUpload = () => {
    const dz = document.getElementById('ai-dropzone');
    const preview = document.getElementById('ai-preview');
    const submit = document.getElementById('ai-submit');
    if (!dz || !preview || !submit) return;
    dz.style.display = 'block';
    preview.style.display = 'none';
    submit.disabled = true;
    const text = document.getElementById('ai-submit-text');
    if (text) text.textContent = 'شروع تحلیل هوشمند';
    const analyze = document.getElementById('ai-analyze');
    if (analyze) analyze.classList.remove('open');
  };

  const toggleAnalyze = () => {
    document.getElementById('ai-analyze')?.classList.toggle('open');
  };

  const submitAiUpload = () => {
    const btnText = document.getElementById('ai-submit-text');
    const btn = document.getElementById('ai-submit');
    if (!btn || !btnText) return;
    btnText.textContent = 'در حال ایمپورت…';
    btn.disabled = true;
    setTimeout(() => {
      toast('✓ ۲۴ آیتم با موفقیت ایمپورت شد');
      goBack('warehouse');
      setTimeout(resetAiUpload, 400);
    }, 1500);
  };

  // ========== B2B ==========
  const simulateB2bConnect = () => {
    const input = document.querySelector('.b2b-input');
    if (!input || !input.value.trim()) {
      toast('کد دعوت را وارد کنید');
      input?.focus();
      return;
    }
    toast('✓ اتصال به کارخانه برقرار شد');
    input.value = '';
  };

  // ========== Orders filter ==========
  const filterOrders = (e, filter) => {
    const btn = e.currentTarget;
    document.querySelectorAll('#order-tabs .tab').forEach((t) => t.classList.remove('active'));
    btn.classList.add('active');
    // emit custom event so Orders page can re-render
    window.dispatchEvent(new CustomEvent('orders-filter-change', { detail: filter }));
  };

  return {
    goTo,
    goBack,
    toast,
    openSheet,
    closeSheet,
    openModal,
    closeModal,
    selectSize,
    chipSelect,
    chipMulti,
    numStep,
    selectVisCard,
    quickAdd,
    nextStep,
    prevStep,
    saveTile,
    approveOrder,
    rejectOrder,
    toggleTimeline,
    savePriceNew,
    calcProfit,
    updateCartCalc,
    selectCartMode,
    cartStep,
    removeCartItem,
    addToCart,
    openFilterSheet,
    toggleWhMenu,
    closeWhMenu,
    toggleAssignMode,
    toggleRepDropdown,
    selectRep,
    handleTileClick,
    confirmAssignChanges,
    toggleWorkflow,
    showRemoveModal,
    confirmRemove,
    simulateAiUpload,
    resetAiUpload,
    toggleAnalyze,
    submitAiUpload,
    simulateB2bConnect,
    filterOrders,
  };
}
