import React, { useEffect, useState } from 'react';
import './Header.css';

export default function Header() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <header className="header">
      <div className="header__left">
        <span className="header__mark">◈</span>
        <span className="header__wordmark">Humanizer</span>
        <span className="header__pipe">|</span>
        <span className="header__sub">LangGraph AI</span>
      </div>
      <div className="header__right">
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <span className="header__status-dot" />
        <span className="header__status-text">Connected</span>
      </div>
    </header>
  );
}