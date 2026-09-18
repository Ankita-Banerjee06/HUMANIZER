import React from 'react';
import './ToneSelector.css';

export const TONES = [
  { value: 'professional', label: 'Professional', icon: '💼', color: '#6366f1' },
  { value: 'casual',       label: 'Casual',       icon: '☕', color: '#f59e0b' },
  { value: 'friendly',     label: 'Friendly',     icon: '👋', color: '#ec4899' },
  { value: 'academic',     label: 'Academic',     icon: '📚', color: '#3b82f6' },
  { value: 'formal',       label: 'Formal',       icon: '🎩', color: '#14b8a6' },
  { value: 'creative',     label: 'Creative',     icon: '✨', color: '#a855f7' },
  { value: 'persuasive',   label: 'Persuasive',   icon: '🎯', color: '#fb923c' },
  { value: 'storytelling', label: 'Storytelling', icon: '📖', color: '#10b981' },
];

export default function ToneSelector({ value, onChange, disabled }) {
  return (
    <div className="tone-selector">
      <p className="tone-selector__label">Tone</p>
      <div className="tone-selector__pills">
        {TONES.map((t) => {
          const active = value === t.value;
          return (
            <button
              key={t.value}
              className={`tone-pill ${active ? 'tone-pill--active' : ''}`}
              style={active ? {
                background: `${t.color}22`,
                borderColor: t.color,
                color: t.color,
              } : undefined}
              onClick={() => onChange(t.value)}
              disabled={disabled}
              type="button"
              title={t.label}
            >
              <span className="tone-pill__icon">{t.icon}</span>
              <span className="tone-pill__label">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
