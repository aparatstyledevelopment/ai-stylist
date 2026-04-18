export function formatNumber(n) {
  return new Intl.NumberFormat('fa-IR').format(n);
}

export const toFarsiDigits = (input) =>
  String(input).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);

export const COLOR_LABELS = {
  black: 'مشکی',
  white: 'سفید',
  gray: 'خاکستری',
  cream: 'کرم',
  beige: 'شنی',
  brown: 'قهوه‌ای',
  navy: 'سرمه‌ای',
};

const COLOR_MAP = {
  black: '#1a1a1a',
  white: '#eee',
  gray: '#888',
  cream: '#f5f0e1',
  beige: '#d2b48c',
  brown: '#6b3a2a',
  navy: '#1b2a4a',
  red: '#c0392b',
  blue: '#2980b9',
  green: '#27ae60',
  pink: '#e84393',
  yellow: '#f1c40f',
  orange: '#e67e22',
  purple: '#8e44ad',
  silver: '#c0c0c0',
  gold: '#d4af37',
  multi: '#8e44ad',
  nude: '#e8d5c4',
  olive: '#6b8e23',
  burgundy: '#800020',
  mustard: '#ffdb58',
  coral: '#ff7f50',
  mint: '#98ff98',
  lavender: '#e6e6fa',
};

export function colorFromName(name) {
  const mapped = COLOR_MAP[name.toLowerCase()];
  if (mapped) return mapped;
  if (/^#[0-9a-fA-F]{3}$/.test(name) || /^#[0-9a-fA-F]{6}$/.test(name)) return name;
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash << 5) - hash + name.charCodeAt(i);
  const h = Math.abs(hash % 360);
  const s = 45 + (Math.abs(hash >> 8) % 25);
  const l = 45 + (Math.abs(hash >> 16) % 25);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export const SIZE_LABELS = {
  S: 'اسمال',
  M: 'مدیوم',
  L: 'لارج',
  XL: 'اکسترا لارج',
  XXL: 'دوبل اکسترا لارج',
};
