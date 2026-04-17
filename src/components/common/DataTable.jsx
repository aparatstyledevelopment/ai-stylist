import { useState } from 'react';
import './DataTable.css';

export default function DataTable({ columns, rows, highlightId, onRowClick, emptyMsg = 'No records' }) {
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  function handleSort(col) {
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  }

  const sorted = sortCol
    ? [...rows].sort((a, b) => {
        const av = a[sortCol], bv = b[sortCol];
        if (av == null) return 1;
        if (bv == null) return -1;
        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : rows;

  if (!rows.length) {
    return <div className="datatable-empty">{emptyMsg}</div>;
  }

  return (
    <div className="datatable-wrap">
      <table className="datatable">
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className={col.numeric ? 'num' : ''}
                onClick={() => col.sortable !== false && handleSort(col.key)}
                style={{ cursor: col.sortable === false ? 'default' : 'pointer', width: col.width }}
              >
                <span className="datatable-th-inner">
                  {col.label}
                  {sortCol === col.key && (
                    <span className="datatable-sort">{sortDir === 'asc' ? '↑' : '↓'}</span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={row.id || i}
              className={
                (onRowClick ? 'clickable ' : '') +
                (highlightId && (row.id === highlightId || row.investorId === highlightId) ? 'highlighted' : '')
              }
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map(col => (
                <td key={col.key} className={col.numeric ? 'num' : ''}>
                  {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
