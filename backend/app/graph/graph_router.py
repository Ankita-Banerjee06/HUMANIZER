# graph_router

def qa_router(state):

    if state.get("qa_status") == "approved":
        return "approved"

    return "retry"
from app.graph.conditional_edges import should_retry


def ai_score_router(state):

    ai_score = state.get("ai_score", 0)
    retry_count = state.get("retry_count", 0)

    if should_retry(ai_score, retry_count):
        return "retry"

    return "approved"

  