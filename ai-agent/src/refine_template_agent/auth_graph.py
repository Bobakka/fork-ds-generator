"""LangGraph: prepare → structured LLM for refineAuth.json."""

from __future__ import annotations

from typing import TypedDict

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import END, START, StateGraph

from refine_template_agent.config import settings
from refine_template_agent.schemas import RefineAuthConfig

AUTH_SYSTEM_PROMPT = """You output refineAuth.json for a Refine + React app.
Schema:
- version: positive int (usually 1).
- enabled: whether Refine authProvider and login route are active.
- loginPath: URL path for the login page (e.g. "/login").
- provider: "none" | "mock" | "keycloak"
  - none: no authentication (enabled should be false).
  - mock: development login with username/password stored in browser localStorage.
  - keycloak: SSO — the SPA loads public keycloak.json (url, realm, clientId); no secrets in refineAuth.
- keycloakClientPath: public URL to the keycloak-js adapter JSON (default "/keycloak.json").

Rules: never put client secrets or Keycloak passwords in JSON. If user asks for production SSO, use Keycloak and enabled true."""


class AuthGraphState(TypedDict, total=False):
    instruction: str
    current_auth: dict | None
    messages: list  # AnyMessage
    auth: dict | None


def node_prepare_auth(state: AuthGraphState) -> AuthGraphState:
    import json

    parts = [f"Instruction:\n{state['instruction'].strip()}\n"]
    if state.get("current_auth"):
        parts.append("Current auth config:\n" + json.dumps(state["current_auth"], ensure_ascii=False, indent=2))
    else:
        parts.append("No current auth config — propose a sensible default from the instruction.")
    return {
        "messages": [
            SystemMessage(content=AUTH_SYSTEM_PROMPT),
            HumanMessage(content="\n".join(parts)),
        ]
    }


def node_generate_auth(state: AuthGraphState) -> AuthGraphState:
    if not settings.openai_api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")

    llm_kwargs: dict = {
        "model": settings.openai_model,
        "api_key": settings.openai_api_key,
        "temperature": 0.1,
    }
    if settings.openai_base_url:
        llm_kwargs["base_url"] = settings.openai_base_url
    llm = ChatOpenAI(**llm_kwargs)
    structured = llm.with_structured_output(RefineAuthConfig)
    result: RefineAuthConfig = structured.invoke(state["messages"])
    return {"auth": result.model_dump(mode="json")}


def build_auth_graph():
    g = StateGraph(AuthGraphState)
    g.add_node("prepare", node_prepare_auth)
    g.add_node("generate", node_generate_auth)
    g.add_edge(START, "prepare")
    g.add_edge("prepare", "generate")
    g.add_edge("generate", END)
    return g.compile()


_auth_graph = None


def get_auth_graph():
    global _auth_graph
    if _auth_graph is None:
        _auth_graph = build_auth_graph()
    return _auth_graph


def run_auth_config_agent(
    *,
    instruction: str,
    current_auth: dict | None = None,
) -> RefineAuthConfig:
    final = get_auth_graph().invoke(
        {
            "instruction": instruction,
            "current_auth": current_auth,
        },
        {"recursion_limit": settings.max_graph_steps},
    )
    raw = final.get("auth")
    if not raw:
        raise RuntimeError("Agent produced no auth config")
    return RefineAuthConfig.model_validate(raw)
