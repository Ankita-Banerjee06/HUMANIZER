# conditional_edges

# Without a retry cap, a mediocre ai_score kept the graph bouncing
# between "scoring" and "humanize" forever: each pass re-runs 5 LLM
# calls, so a stuck request would run past Render's request timeout.
# The proxy's timeout response never reaches FastAPI/CORSMiddleware,
# so the browser saw it as a CORS failure instead of a slow request.
MAX_RETRIES = 2


def should_retry(ai_score, retry_count=0):

    return ai_score > 60 and retry_count < MAX_RETRIES