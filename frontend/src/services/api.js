const API_URL = import.meta.env.VITE_API_URL;

export async function humanizeText(text, tone, targetWords = null) {
  const res = await fetch(`${API_URL}/api/humanize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      tone,
      ...(targetWords && { target_words: targetWords })
    }),
  });
  if (!res.ok) {
    let msg = `Error ${res.status}`;
    try {
      const body = await res.json();
      msg = body.detail || body.message || msg;
    } catch (_) {}
    throw new Error(msg);
  }
  return res.json();
}