from pydantic import BaseModel
from typing import Optional

class HumanizeRequest(BaseModel):
    text: str
    tone: str = "professional"
    target_words: Optional[int] = None