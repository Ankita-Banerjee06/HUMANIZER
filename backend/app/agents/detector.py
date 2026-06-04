# detector
from app.services.llm import llm


def detector_node(state):

    prompt = f"""
    Detect robotic or AI sounding text.

    TEXT:
    {state['original_text']}
    """

    response = llm.invoke(prompt)

    return {
        "ai_detected_text": response.content
    }