DETECTOR_PROMPT = """
Analyze the following text.

Check whether the text:
- sounds AI-generated
- feels robotic
- contains repetitive phrasing
- lacks natural human tone

Return ONLY:
- AI-like
OR
- Human-like

TEXT:
{text}
"""