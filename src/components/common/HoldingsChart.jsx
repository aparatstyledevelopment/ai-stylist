// SVG bar+line chart for holdings history — no library
export default function HoldingsChart({ data = [], width = 400, height = 120 }) {
  if (!data.length) return null;

  const vals = data.map(d => d.shares || d.pct || 0);
  const max = Math.max(...vals) * 1.15;
  const padL = 48, padR = 12, padT = 12, padB = 32;
  const w = width - padL - padR;
  const h = height - padT - padB;
  const barW = Math.max(4, (w / vals.length) * 0.55);
  const gap = w / vals.length;

  const CHANGE_COLORS = {
    Increase: 'var(--positive)', New: 'var(--positive)',
    Decrease: 'var(--negative)', Exited: 'var(--negative)',
    Unchanged: 'var(--text-dim)',
  };

  const fmt = n => {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return n;
  };

  // y axis ticks
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(t => ({ val: max * t, y: padT + h - t * h }));

  // line path
  const linePoints = vals.map((v, i) => {
    const x = padL + i * gap + gap / 2;
    const y = padT + h - (v / max) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ overflow: 'visible', display: 'block' }}>
      {/* y-axis gridlines */}
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={padL} y1={t.y} x2={padL + w} y2={t.y} stroke="var(--border)" strokeWidth="1" strokeDasharray="3,3" />
          <text x={padL - 5} y={t.y + 4} textAnchor="end" fontSize="9" fill="var(--text-dim)" fontFamily="var(--font-mono)">
            {fmt(t.val)}
          </text>
        </g>
      ))}

      {/* bars */}
      {vals.map((v, i) => {
        const x = padL + i * gap + gap / 2 - barW / 2;
        const barH = (v / max) * h;
        const y = padT + h - barH;
        const color = CHANGE_COLORS[data[i]?.changeType] || 'var(--accent)';
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} fill={color} opacity={0.25} rx={2} />
            {/* x label */}
            <text
              x={padL + i * gap + gap / 2}
              y={padT + h + 18}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-dim)"
              fontFamily="var(--font-mono)"
            >
              {data[i]?.quarter?.replace('20', "'") || ''}
            </text>
          </g>
        );
      })}

      {/* line overlay */}
      <polyline points={linePoints} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* dots */}
      {vals.map((v, i) => (
        <circle
          key={i}
          cx={padL + i * gap + gap / 2}
          cy={padT + h - (v / max) * h}
          r={2.5}
          fill="var(--accent)"
        />
      ))}
    </svg>
  );
}
