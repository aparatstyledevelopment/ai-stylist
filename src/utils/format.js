export function toPersianNum(n) {
  return n.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

export function parseFaNum(s) {
  const p = '۰۱۲۳۴۵۶۷۸۹';
  let n = 0;
  let found = false;
  for (const ch of String(s)) {
    const pi = p.indexOf(ch);
    if (pi >= 0) {
      n = n * 10 + pi;
      found = true;
    } else if (ch >= '0' && ch <= '9') {
      n = n * 10 + Number(ch);
      found = true;
    }
  }
  return found ? n : 0;
}

export function fmtPersian(n, sep = true) {
  const s = sep ? Number(n).toLocaleString('en-US') : String(n);
  return s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
}
