// Pure SVG sparkline — no external library
export default function Sparkline({ data = [], width = 80, height = 28, color = 'var(--accent)', positive, negative }) {
  if (data.length < 2) return null;

  const vals = data.map(d => (typeof d === 'object' ? d.value ?? d.pct ?? d.shares ?? 0 : d));
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;

  const pad = 2;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const points = vals.map((v, i) => {
    const x = pad + (i / (vals.length - 1)) * w;
    const y = pad + (1 - (v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');

  const trend = vals[vals.length - 1] - vals[0];
  const strokeColor = trend > 0 ? (positive || 'var(--positive)') : trend < 0 ? (negative || 'var(--negative)') : color;

  return (
    <svg width={width} height={height} style={{ display: 'block', overflow: 'visible' }}>
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* end dot */}
      <circle
        cx={pad + w}
        cy={pad + (1 - (vals[vals.length - 1] - min) / range) * h}
        r={2}
        fill={strokeColor}
      />
    </svg>
  );
}
