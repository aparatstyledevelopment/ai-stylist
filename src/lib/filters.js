import { BodyTypeSvg, BudgetSvg, GenderSvg, StyleSvg } from '../components/icons.jsx';

export const FILTER_CATEGORIES = [
  {
    id: 'gender',
    label: 'جنسیت',
    icon: GenderSvg,
    items: [
      { id: 'female', label: 'زن' },
      { id: 'male', label: 'مرد' },
    ],
  },
  {
    id: 'style',
    label: 'سبک',
    icon: StyleSvg,
    items: [
      { id: 'minimal', label: 'مینیمال' },
      { id: 'classic', label: 'کلاسیک' },
      { id: 'street', label: 'استریت' },
      { id: 'casual', label: 'کژوال' },
      { id: 'avantgarde', label: 'آوانگارد' },
      { id: 'maximal', label: 'ماکسیمال' },
      { id: 'formal', label: 'رسمی' },
    ],
  },
  {
    id: 'body_type',
    label: 'نوع اندام',
    icon: BodyTypeSvg,
    items: [
      { id: 'skinny', label: 'لاغر' },
      { id: 'average', label: 'متوسط' },
      { id: 'plus_size', label: 'پلاس سایز' },
    ],
  },
  {
    id: 'budget',
    label: 'بودجه',
    icon: BudgetSvg,
    items: [
      { id: 'economic', label: 'اقتصادی' },
      { id: 'luxurious', label: 'لوکس' },
    ],
  },
];

export function isFilterActive(category, itemId, filters) {
  switch (category) {
    case 'style':
      return filters.style === itemId;
    case 'gender':
      return filters.gender === itemId;
    case 'body_type':
      return filters.body_type === itemId;
    case 'budget':
      return filters.budget === itemId;
    default:
      return false;
  }
}
