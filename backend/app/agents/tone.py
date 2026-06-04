# tone
from app.services.llm import llm
from app.prompts.tone_prompt import TONE_PROMPT



def tone_node(state):

    prompt = TONE_PROMPT.format(
        tone=state["selected_tone"],
        text=state["proofread_text"]
    )

    response = llm.invoke(prompt)

    return {
        "tone_adjusted_text": response.content
    }