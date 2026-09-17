# routes
from fastapi import APIRouter, HTTPException
from app.graph.workflow import app_graph
from app.schemas.request_schema import HumanizeRequest
from app.services.validator import validate_tone

router = APIRouter()


@router.post("/humanize")
async def humanize_text(data: HumanizeRequest):
    # Any unhandled exception here would propagate past FastAPI's
    # CORSMiddleware (Starlette only attaches CORS headers to responses
    # that flow back out through the middleware stack normally), so the
    # browser reports a CORS error even though the real cause is a
    # backend failure. Converting failures into HTTPExceptions keeps
    # the CORS headers on error responses too.
    try:
        validate_tone(data.tone)

        result = app_graph.invoke(
            {
                "original_text": data.text,
                "selected_tone": data.tone,
                "target_words": data.target_words or 0,
                "retry_count": 0
            }
        )

        return {
            "final_output": result["final_output"],
            "ai_score": result["ai_score"],
            "human_score": result["human_score"]
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Humanize failed: {e}")