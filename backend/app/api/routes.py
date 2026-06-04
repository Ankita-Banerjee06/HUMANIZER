# routes
from fastapi import APIRouter
from app.graph.workflow import app_graph
from app.schemas.request_schema import HumanizeRequest
from app.services.validator import validate_tone 

router = APIRouter()


@router.post("/humanize")
async def humanize_text(data: HumanizeRequest):
    validate_tone(data.tone)
    result = app_graph.invoke(
        {
            "original_text": data.text,
            "selected_tone": data.tone,
            "target_words":data.target_words or 0,
            "retry_count":0
        }
    )

    return {
        "final_output": result["final_output"],
        "ai_score": result["ai_score"],
        "human_score": result["human_score"]
    }