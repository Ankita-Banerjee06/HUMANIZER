import re


def calculate_ai_score(text: str):

    sentences = text.split(".")

    if len(sentences) == 0:
        return {
            "ai_score": 0,
            "human_score": 100
        }

    avg_length = sum(
        len(sentence.split())
        for sentence in sentences
    ) / len(sentences)

    repetition = len(
        re.findall(
            r'\b(\w+)\b.*\b\1\b',
            text.lower()
        )
    )

    score = min(
        int(avg_length + repetition),
        100
    )

    return {
        "ai_score": score,
        "human_score": 100 - score
    }