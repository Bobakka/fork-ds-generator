"""LangGraph workflow: prepare context → LLM structured output → validated overlay."""

from __future__ import annotations

from typing import TypedDict

from langchain_core.messages import AnyMessage, HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import END, START, StateGraph

from refine_template_agent.config import settings
from refine_template_agent.prompts import SYSTEM_PROMPT, build_user_content
from refine_template_agent.schemas import RefineUiOverlay


class GraphState(TypedDict, total=False):
    instruction: str
    available_resources: list[str]
    current_overlay: dict | None
    refine_meta_excerpt: str | None
    messages: list[AnyMessage]
    overlay: dict | None


def node_prepare(state: GraphState) -> GraphState:
    user = build_user_content(
        state["instruction"],
        current_overlay=state.get("current_overlay"),
        available_resources=list(state.get("available_resources") or []),
        refine_meta_excerpt=state.get("refine_meta_excerpt"),
    )
    return {
        "messages": [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=user),
        ]
    }


def node_generate(state: GraphState) -> GraphState:
    import json

    if not settings.openai_api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")

    llm_kwargs: dict = {
        "model": settings.openai_model,
        "api_key": settings.openai_api_key,
        "temperature": 0.15,
    }
    if settings.openai_base_url:
        llm_kwargs["base_url"] = settings.openai_base_url

    llm = ChatOpenAI(**llm_kwargs)
    resp = llm.invoke(state["messages"])

    print("RAW MODEL OUTPUT:")
    print(resp.content)

    try:
        raw = json.loads(resp.content)
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Model returned invalid JSON: {e}") from e

    result = RefineUiOverlay.model_validate(raw)
    return {"overlay": result.model_dump(mode="json")}

def build_graph():
    g = StateGraph(GraphState)
    g.add_node("prepare", node_prepare)
    g.add_node("generate", node_generate)
    g.add_edge(START, "prepare")
    g.add_edge("prepare", "generate")
    g.add_edge("generate", END)
    return g.compile()


_graph = None


def get_graph():
    global _graph
    if _graph is None:
        _graph = build_graph()
    return _graph


def run_template_agent(
    *,
    instruction: str,
    current_overlay: dict | None = None,
    available_resources: list[str] | None = None,
    refine_meta_excerpt: str | None = None,
) -> RefineUiOverlay:
    """Run the graph and return a validated Pydantic model."""
    final = get_graph().invoke(
        {
            "instruction": instruction,
            "available_resources": available_resources or [],
            "current_overlay": current_overlay,
            "refine_meta_excerpt": refine_meta_excerpt,
        },
        {"recursion_limit": settings.max_graph_steps},
    )
    raw = final.get("overlay")
    if not raw:
        raise RuntimeError("Agent produced no overlay")
    return RefineUiOverlay.model_validate(raw)
