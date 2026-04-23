import { useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { toPersianNum } from '../../utils/format.js';

const CHECK_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';

function closeWhMenu() {
  document.getElementById('wh-menu-btn')?.classList.remove('open');
  document.getElementById('wh-menu-dropdown')?.classList.remove('open');
  document.getElementById('wh-menu-backdrop')?.classList.remove('show');
}

function toggleRepDropdown(forceOpen) {
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
}

export function useWarehouseAssign() {
  const { goTo } = useNavigation();
  const { toast } = useToast();
  const activeRef = useRef(false);
  const repRef = useRef(null);
  const changesRef = useRef({});

  const toggleWhMenu = () => {
    const btn = document.getElementById('wh-menu-btn');
    const dropdown = document.getElementById('wh-menu-dropdown');
    const backdrop = document.getElementById('wh-menu-backdrop');
    if (!btn || !dropdown || !backdrop) return;
    const isOpen = dropdown.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    backdrop.classList.toggle('show', isOpen);
  };

  const toggleAssignMode = () => {
    activeRef.current = !activeRef.current;
    const topbar = document.querySelector('[data-page="warehouse"] .wh-topbar');
    const overlay = document.getElementById('assign-overlay');
    const pill = document.getElementById('rep-pill');
    if (!overlay) return;
    if (activeRef.current) {
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
      repRef.current = null;
      changesRef.current = {};
      document.querySelectorAll('#wh-tiles .tile-card').forEach((t) => {
        t.classList.remove('marked-add', 'marked-remove');
      });
      document.querySelectorAll('.rep-dropdown-item').forEach((i) => i.classList.remove('selected'));
      document.getElementById('assign-actionbar')?.classList.remove('show');
    }
  };

  const selectRep = (e, name) => {
    repRef.current = name;
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
    const values = Object.values(changesRef.current);
    const adds = values.filter((v) => v === 'add').length;
    const removes = values.filter((v) => v === 'remove').length;
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
      addBtn.innerHTML = `${CHECK_ICON}ثبت تغییرات`;
    } else if (adds > 0 && removes > 0 && addBtn && removeBtn) {
      addBtn.innerHTML = `${CHECK_ICON}ثبت همه`;
      removeBtn.style.display = 'none';
    } else if (addBtn) {
      addBtn.innerHTML = `${CHECK_ICON}ثبت`;
    }
  };

  const handleTileClick = (e, detailPage) => {
    if (!document.body.classList.contains('assign-active')) {
      goTo(detailPage);
      return;
    }
    if (!repRef.current) {
      toast('اول نماینده رو انتخاب کن');
      toggleRepDropdown(true);
      return;
    }
    const el = e.currentTarget;
    const tileId = el.getAttribute('data-tile-id');
    const isAssigned = el.getAttribute('data-assigned') === 'true';
    const markClass = isAssigned ? 'marked-remove' : 'marked-add';
    const changeKind = isAssigned ? 'remove' : 'add';
    if (el.classList.contains(markClass)) {
      el.classList.remove(markClass);
      delete changesRef.current[tileId];
    } else {
      el.classList.add(markClass);
      changesRef.current[tileId] = changeKind;
    }
    updateAssignActionbar();
  };

  const confirmAssignChanges = () => {
    const changes = changesRef.current;
    const values = Object.values(changes);
    const adds = values.filter((v) => v === 'add').length;
    const removes = values.filter((v) => v === 'remove').length;
    Object.keys(changes).forEach((tileId) => {
      const tile = document.querySelector(`.tile-card[data-tile-id="${tileId}"]`);
      if (!tile) return;
      if (changes[tileId] === 'add') {
        tile.setAttribute('data-assigned', 'true');
        tile.classList.remove('marked-add');
        tile.classList.add('assigned');
      } else if (changes[tileId] === 'remove') {
        tile.setAttribute('data-assigned', 'false');
        tile.classList.remove('marked-remove');
      }
    });
    const msg = [];
    if (adds > 0) msg.push(`${toPersianNum(adds)} کاشی اضافه شد`);
    if (removes > 0) msg.push(`${toPersianNum(removes)} حذف شد`);
    toast(`${msg.join(' · ')} برای ${repRef.current}`);
    changesRef.current = {};
    document.getElementById('assign-actionbar')?.classList.remove('show');
  };

  return {
    toggleWhMenu,
    closeWhMenu,
    toggleAssignMode,
    toggleRepDropdown,
    selectRep,
    handleTileClick,
    confirmAssignChanges,
  };
}
