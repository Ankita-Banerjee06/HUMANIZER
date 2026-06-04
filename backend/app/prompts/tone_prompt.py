TONE_PROMPT = """
Rewrite the following text in {tone} tone.

Available tones:
- professional
- casual
- academic
- marketing
- executive
- friendly
- persuasive

Rules:
- Return ONLY rewritten text
- Keep meaning same
- Improve readability
- Make it natural

TEXT:
{text}
"""