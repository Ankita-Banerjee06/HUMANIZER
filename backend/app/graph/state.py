# state


from typing import TypedDict


class AgentState(TypedDict):

    original_text: str

    humanized_text: str

    proofread_text: str

    tone_adjusted_text: str

    final_output: str

    selected_tone: str

    qa_status: str

    ai_score: int

    human_score: int

    retry_count: int

    target_words:int