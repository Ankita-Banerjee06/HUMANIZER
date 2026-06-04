import React, { useState, useRef, useEffect } from 'react';
import { exportTxt, exportPdf, exportDoc, exportImage } from '../services/exporter';
import './ExportMenu.css';

const OPTIONS = [
  { id: 'txt',   label: '.txt',      icon: '📄', desc: 'Plain text file' },
  { id: 'pdf',   label: '.pdf',      icon: '📕', desc: 'PDF document'    },
  { id: 'doc',   label: '.doc',      icon: '📝', desc: 'Word document'   },
  { id: 'image', label: '.png',      icon: '🖼️',  desc: 'Image snapshot'  },
];

export default function ExportMenu({ result, tone }) {
  const [open, setOpen]   = useState(false);
  const [busy, setBusy]   = useState(null);
  const menuRef           = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handle = async (id) => {
    if (busy) return;
    setBusy(id);
    setOpen(false);
    try {
      const payload = { ...result, tone };
      if (id === 'txt')   await exportTxt(payload);
      if (id === 'pdf')   await exportPdf(payload);
      if (id === 'doc')   await exportDoc(payload);
      if (id === 'image') await exportImage(payload);
    } catch (e) {
      console.error('Export failed:', e);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="export-wrap" ref={menuRef}>
      <button
        className={`export-btn ${open ? 'export-btn--open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        disabled={!!busy}
      >
        {busy ? (
          <><span className="export-spinner" />Exporting…</>
        ) : (
          <>Export <span className="export-caret">{open ? '▲' : '▼'}</span></>
        )}
      </button>

      {open && (
        <div className="export-dropdown">
          {OPTIONS.map((o) => (
            <button key={o.id} className="export-option" onClick={() => handle(o.id)}>
              <span className="export-option__icon">{o.icon}</span>
              <span className="export-option__info">
                <span className="export-option__label">{o.label}</span>
                <span className="export-option__desc">{o.desc}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
