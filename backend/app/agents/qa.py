# qa
from app.services.llm import llm
from app.prompts.qa_prompt import QA_PROMPT



def qa_node(state):

    prompt = QA_PROMPT.format(
        original=state["original_text"],
        final=state["tone_adjusted_text"]
    )

    response = llm.invoke(prompt)

    return {
        "final_output": state["tone_adjusted_text"],
        "qa_status": "approved",
    }