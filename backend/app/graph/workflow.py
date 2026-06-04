from langgraph.graph import StateGraph, END

from app.graph.state import AgentState

from app.agents.detector import detector_node
from app.agents.humanizer import humanizer_node
from app.agents.proofreader import proofreader_node
from app.agents.tone import tone_node
from app.agents.qa import qa_node
from app.agents.scoring import scoring_node

from app.graph.graph_router import ai_score_router


workflow = StateGraph(AgentState)

workflow.add_node("detect", detector_node)
workflow.add_node("humanize", humanizer_node)
workflow.add_node("proofread", proofreader_node)
workflow.add_node("tone", tone_node)
workflow.add_node("qa", qa_node)
workflow.add_node("scoring", scoring_node)

workflow.set_entry_point("detect")

workflow.add_edge("detect", "humanize")
workflow.add_edge("humanize", "proofread")
workflow.add_edge("proofread", "tone")
workflow.add_edge("tone", "qa")
workflow.add_edge("qa", "scoring")


workflow.add_conditional_edges(
    "scoring",
    ai_score_router,
    {
        "retry": "humanize",
        "approved": END
    }
)

app_graph = workflow.compile()