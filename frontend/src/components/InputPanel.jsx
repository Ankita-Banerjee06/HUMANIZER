import React, { useRef } from 'react';
import ToneSelector from './ToneSelector';
import './InputPanel.css';

const MAX = 5000;

export default function InputPanel({
  text, tone, status,
  targetWords, onTargetWordsChange,          // ✅ added
  onTextChange, onToneChange, onHumanize, onReset, hasResult,
}) {
  const textareaRef = useRef(null);
  const loading = status === 'loading';
  const isEmpty = !text.trim();
  const over = text.length > MAX;
  const pct = Math.min(100, (text.length / MAX) * 100);

  const handlePaste = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      onTextChange(clip);
      textareaRef.current?.focus();
    } catch {
      textareaRef.current?.focus();
    }
  };

  return (
    <div className="input-panel">
      {/* Top bar */}
      <div className="panel-bar panel-bar--top">
        <span className="panel-tag">Input</span>
        <div className="bar-actions">
          {text && (
            <button className="bar-btn" onClick={() => onTextChange('')} title="Clear">
              clear
            </button>
          )}
          {!text && (
            <button className="bar-btn" onClick={handlePaste} title="Paste from clipboard">
              paste
            </button>
          )}
          {hasResult && (
            <button className="bar-btn" onClick={onReset} title="Start over">
              reset
            </button>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div className="textarea-wrap">
        <textarea
          ref={textareaRef}
          className="main-textarea"
          placeholder="Paste your AI-generated text here..."
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          disabled={loading}
          spellCheck={false}
        />
        {isEmpty && (
          <div className="textarea-hint">
            <div className="hint-box">
              <span className="hint-icon">◈</span>
              <p>Paste any AI-written text and let the agent pipeline rewrite it to sound genuinely human.</p>
            </div>
          </div>
        )}
      </div>

      {/* Char meter */}
      <div className="char-row">
        <div className="char-track">
          <div
            className={`char-fill ${over ? 'char-fill--over' : pct > 80 ? 'char-fill--warn' : ''}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className={`char-count ${over ? 'char-count--over' : ''}`}>
          {text.length.toLocaleString()} / {MAX.toLocaleString()}
        </span>
      </div>

      {/* Target word count */}
      <div className="target-words-row">
        <span className="target-label">Target words</span>
        <div className="target-input-wrap">
          <input
            type="number"
            className="target-input"
            placeholder="optional"
            value={targetWords}
            onChange={(e) => onTargetWordsChange(e.target.value)}
            min={50}
            max={MAX}
            disabled={loading}
          />
          {targetWords && (
            <button
              className="target-clear"
              onClick={() => onTargetWordsChange('')}
              title="Remove limit"
            >✕</button>
          )}
        </div>
        {targetWords && text && (
          <span className="target-hint">
            {Math.round(parseInt(targetWords) / text.trim().split(/\s+/).length * 100)}% of input
          </span>
        )}
      </div>

      {/* Tone selector */}
      <div className="tone-wrap">
        <ToneSelector value={tone} onChange={onToneChange} disabled={loading} />
      </div>

      {/* Bottom action */}
      <div className="panel-bar panel-bar--bottom">
        <span className="word-count">{isEmpty ? '' : `${text.trim().split(/\s+/).length} words`}</span>
        <button
          className={`humanize-btn ${loading ? 'humanize-btn--loading' : ''}`}
          onClick={onHumanize}
          disabled={isEmpty || over || loading}
        >
          {loading ? (
            <>
              <span className="spinner" />
              <span>Processing…</span>
            </>
          ) : (
            <>
              <span>Humanize</span>
              <span className="btn-arrow">→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}