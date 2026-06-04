from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

app = FastAPI(title="LangGraph AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                "https://humanizer-pujlptjxb-ankita-r-projects6.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.get("/")
def home():
    return {"message": "LangGraph AI Backend Running"} 