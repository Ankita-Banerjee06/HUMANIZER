import React from 'react';
import './ScoreRing.css';

export default function ScoreRing({ value = 0, label, variant }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, value));
  const dash = (pct / 100) * circ;

  const colorMap = {
    human: 'var(--green)',
    ai:    'var(--red)',
  };
  const color = colorMap[variant] || 'var(--text-2)';

  return (
    <div className="score-ring">
      <svg viewBox="0 0 72 72" className="ring-svg">
        <circle className="ring-bg" cx="36" cy="36" r={r} />
        <circle
          className="ring-fill"
          cx="36" cy="36" r={r}
          style={{
            stroke: color,
            strokeDasharray: `${dash} ${circ}`,
          }}
        />
      </svg>
      <div className="ring-label">
        <span className="ring-value" style={{ color }}>{Math.round(pct)}</span>
        <span className="ring-pct">%</span>
      </div>
      <p className="ring-name">{label}</p>
    </div>
  );
}
