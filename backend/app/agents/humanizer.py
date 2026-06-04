from app.services.llm import llm
from app.prompts.humanizer_prompt import build_humanizer_prompt

def humanizer_node(state):
    prompt = build_humanizer_prompt(
        text=state["original_text"],
        target_words=state.get("target_words", 0)
    )

    response = llm.invoke(prompt)

    return {
        "humanized_text": response.content,
        "retry_count": state.get("retry_count", 0) + 1
    }