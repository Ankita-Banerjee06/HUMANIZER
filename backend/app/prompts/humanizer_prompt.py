HUMANIZER_PROMPT = """
Rewrite the following text naturally and human-like.

Rules:
- Return ONLY the rewritten text
- Do NOT explain anything
- Do NOT add notes
- Do NOT add introductions
- Do NOT add bullet points
- Keep the meaning same
- Make it natural and readable
{word_limit_instruction}

TEXT:
{text}
"""

def build_humanizer_prompt(text: str, target_words: int = 0) -> str:
    if target_words and target_words > 0:
        word_limit_instruction = f"""- You MUST write EXACTLY around {target_words} words. This is STRICT.
- Count your words carefully before responding.
- If the original text is shorter, EXPAND it with more details, examples, and explanations to reach {target_words} words.
- If the original text is longer, COMPRESS it while keeping all key meaning to reach {target_words} words.
- Do NOT stop writing until you have reached approximately {target_words} words."""
    else:
        word_limit_instruction = ""

    return HUMANIZER_PROMPT.format(
        text=text,
        word_limit_instruction=word_limit_instruction
    )