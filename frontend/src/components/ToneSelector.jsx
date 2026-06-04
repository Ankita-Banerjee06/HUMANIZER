import React from 'react';
import './ToneSelector.css';

export const TONES = [
  { value: 'professional', label: 'Professional', icon: '💼' },
  { value: 'casual',       label: 'Casual',       icon: '☕' },
  { value: 'friendly',     label: 'Friendly',     icon: '👋' },
  { value: 'academic',     label: 'Academic',     icon: '📚' },
  { value: 'formal',       label: 'Formal',       icon: '🎩' },
  { value: 'creative',     label: 'Creative',     icon: '✨' },
  { value: 'persuasive',   label: 'Persuasive',   icon: '🎯' },
  { value: 'storytelling', label: 'Storytelling', icon: '📖' },
];

export default function ToneSelector({ value, onChange, disabled }) {
  return (
    <div className="tone-selector">
      <p className="tone-selector__label">Tone</p>
      <div className="tone-selector__pills">
        {TONES.map((t) => (
          <button
            key={t.value}
            className={`tone-pill ${value === t.value ? 'tone-pill--active' : ''}`}
            onClick={() => onChange(t.value)}
            disabled={disabled}
            type="button"
            title={t.label}
          >
            <span className="tone-pill__icon">{t.icon}</span>
            <span className="tone-pill__label">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
