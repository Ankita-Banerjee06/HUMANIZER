# proofreader
from app.services.llm import llm
from app.prompts.proofreader_prompt import PROOFREADER_PROMPT



def proofreader_node(state):

    prompt = PROOFREADER_PROMPT.format(
        text=state["humanized_text"]
    )

    response = llm.invoke(prompt)

    return {
        "proofread_text": response.content
    }