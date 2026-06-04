from pydantic import BaseModel


class HumanizeResponse(BaseModel):
    final_output: str