# Humanizer Frontend

Dark, minimal React UI for the LangGraph AI humanizer backend.

## Quick start

```bash
npm install
cp .env.example .env      # set REACT_APP_API_URL if needed
npm start                  # runs on localhost:3000
```

The app proxies `/api/*` to `localhost:8000` via `package.json "proxy"` field.
Change `REACT_APP_API_URL` in `.env` for a different backend host.

---

## Folder structure

```
src/
├── index.js
├── index.css                  ← design tokens, resets
├── App.jsx / App.css          ← layout, state orchestration
├── components/
│   ├── Header.jsx/.css        ← sticky top bar
│   ├── InputPanel.jsx/.css    ← textarea + tone pills + char counter + button
│   ├── ToneSelector.jsx/.css  ← pill-based tone picker
│   ├── OutputPanel.jsx/.css   ← loading skeleton + result text + verdict
│   ├── ScoreRing.jsx/.css     ← circular AI / Human score rings
│   └── ExportMenu.jsx/.css    ← dropdown: .txt .pdf .doc .png
└── services/
    ├── api.js                 ← fetch calls to backend
    └── exporter.js            ← all export logic (client-side, no deps)
```

---

## Backend API contract

### `POST /api/humanize`

**Request**
```json
{ "text": "string", "tone": "professional" }
```

**Response**
```json
{
  "humanized_text": "string",
  "ai_score":       12,
  "human_score":    88,
  "tone":           "professional",
  "word_count":     134
}
```

Supported tones: `professional` `casual` `friendly` `academic` `formal` `creative` `persuasive` `storytelling`

---

## Export formats

All exports are **100% client-side** — no additional dependencies needed.

| Format | Method |
|--------|--------|
| `.txt` | Blob download |
| `.pdf` | Opens print dialog in new tab |
| `.doc` | HTML-in-Word blob download |
| `.png` | Canvas render, blob download |

---

## CORS (FastAPI)

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Environment variables

| Variable | Default | Notes |
|---|---|---|
| `REACT_APP_API_URL` | `''` (uses proxy) | Override for deployed backend |
