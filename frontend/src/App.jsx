import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import { humanizeText } from './services/api';
import './App.css';

export default function App() {
  const [text, setText] = useState('');
  const [tone, setTone] = useState('professional');
  const [targetWords, setTargetWords] = useState('');  // ✅ added
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const handleHumanize = useCallback(async () => {
    if (!text.trim() || status === 'loading') return;
    setStatus('loading');
    setError(null);

    try {
      const data = await humanizeText(text.trim(), tone, targetWords ? parseInt(targetWords) : null);
      setResult(data);
      setStatus('success');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setStatus('error');
    }
  }, [text, tone, status, targetWords]);  // ✅ added targetWords to deps

  const handleRetry = useCallback(() => {
    setError(null);
    setStatus('idle');
    setResult(null);
  }, []);

  const handleReset = useCallback(() => {
    setText('');
    setTone('professional');
    setTargetWords('');   // ✅ reset on clear
    setResult(null);
    setStatus('idle');
    setError(null);
  }, []);

  const showOutput = status === 'loading' || status === 'success' || status === 'error';

  return (
    <div className="app">
      <Header />
      <main className={`workspace ${showOutput ? 'workspace--split' : 'workspace--centered'}`}>
        <InputPanel
          text={text}
          tone={tone}
          status={status}
          targetWords={targetWords}
          onTextChange={setText}
          onToneChange={setTone}
          onHumanize={handleHumanize}
          onReset={handleReset}
          onTargetWordsChange={setTargetWords}
          hasResult={showOutput}
        />
        {showOutput && (
          <OutputPanel
            result={result}
            status={status}
            error={error}
            inputText={text}
            tone={tone}
            onRetry={handleRetry}
          />
        )}
      </main>
    </div>
  );
}