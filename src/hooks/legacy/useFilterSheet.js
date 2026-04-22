import { useOverlay } from '../../context/OverlayContext.jsx';

const FILTER_DATA = {
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

export function useFilterSheet() {
  const { openSheet } = useOverlay();

  const openFilterSheet = (filterKey) => {
    openSheet('filter-sheet', { filterKey, data: FILTER_DATA[filterKey] });
  };

  return { openFilterSheet };
}
