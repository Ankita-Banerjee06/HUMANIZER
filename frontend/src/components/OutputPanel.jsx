import React, { useState } from 'react';
import ScoreRing from './ScoreRing';
import ExportMenu from './ExportMenu';
import './OutputPanel.css';

const LOADING_STEPS = [
  'Running detector agent…',
  'Rewriting with humanizer…',
  'Applying tone layer…',
  'Proofreading output…',
  'Scoring result…',
];

function LoadingSkeleton() {
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setCurrentStep((s) => (s + 1) % LOADING_STEPS.length), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="output-loading">
      <div className="skel-lines">
        {[100, 90, 100, 75, 100, 88, 60].map((w, i) => (
          <div key={i} className="skel-line" style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
      <div className="loading-step">
        <span className="step-spinner" />
        <span className="step-text">{LOADING_STEPS[currentStep]}</span>
      </div>
    </div>
  );
}

export default function OutputPanel({ result, status, error, inputText, tone, onRetry }) {
  const [copied, setCopied] = useState(false);

  // count output words
  const outputWordCount = result?.final_output
    ? result.final_output.trim().split(/\s+/).length
    : 0;

  const handleCopy = async () => {
    if (!result?.final_output) return;       // ✅ fixed typo
    await navigator.clipboard.writeText(result.final_output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="output-panel">
      {/* Top bar */}
      <div className="panel-bar panel-bar--top">
        <span className="panel-tag">Output</span>
        <div className="bar-actions">
          {status === 'success' && (
            <button className="bar-btn" onClick={handleCopy}>
              {copied ? '✓ copied' : 'copy'}
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="output-body">
        {status === 'loading' && <LoadingSkeleton />}

        {status === 'error' && (
          <div className="error-state">
            <div className="error-icon">⚠</div>
            <p className="error-msg">{error}</p>
            <button className="retry-btn" onClick={onRetry}>
              ↩ Try again
            </button>
          </div>
        )}

        {status === 'success' && result && (
          <div className="result-content">
            <p className="result-text">{result.final_output}</p>
          </div>
        )}
      </div>

      {/* Scores + footer — only when done */}
      {status === 'success' && result && (
        <>
          <div className="scores-bar">
            <div className="scores-left">
              <ScoreRing value={result.human_score ?? 0} label="Human" variant="human" />
              <ScoreRing value={result.ai_score ?? 0}    label="AI"    variant="ai"    />
            </div>
            <div className="scores-verdict">
              {(result.human_score ?? 0) >= 70
                ? <span className="verdict verdict--pass">Passes detection</span>
                : (result.human_score ?? 0) >= 45
                ? <span className="verdict verdict--warn">Borderline</span>
                : <span className="verdict verdict--fail">Likely detected</span>
              }
              <p className="verdict-sub">
                {tone && <span style={{textTransform:'capitalize'}}>{tone}</span>}
              </p>
            </div>
          </div>

          {/* Bottom bar with word count */}
          <div className="panel-bar panel-bar--bottom">
            <span className="word-count">          {/* ✅ output word count */}
              {outputWordCount > 0 ? `${outputWordCount} words` : ''}
            </span>
            <div className="bottom-actions">
              <button className="retry-btn-sm" onClick={onRetry}>
                ↩ Retry
              </button>
              <ExportMenu result={result} tone={tone} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}