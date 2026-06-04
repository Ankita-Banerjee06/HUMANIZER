from app.services.ai_score_service import calculate_ai_score


def scoring_node(state):

    scores = calculate_ai_score(
        state["final_output"]
    )

    return {
        "ai_score": scores["ai_score"],
        "human_score": scores["human_score"]
    }