"""HTTP API for the template-completion agent."""

from __future__ import annotations

from fastapi import FastAPI, HTTPException
from refine_template_agent.config import settings
from refine_template_agent.auth_graph import run_auth_config_agent
from refine_template_agent.graph import run_template_agent
from refine_template_agent.schemas import (
    CompleteAuthConfigRequest,
    CompleteAuthConfigResponse,
    CompleteTemplateRequest,
    CompleteTemplateResponse,
)

app = FastAPI(
    title="Refine UI overlay template agent",
    version="0.1.0",
    description="Completes or updates refineUiOverlay.json using LangGraph + structured LLM output.",
)


@app.get("/health")
def health():
    return {"status": "ok", "model": settings.openai_model, "api_key_configured": bool(settings.openai_api_key)}


@app.post("/v1/complete-template", response_model=CompleteTemplateResponse)
def complete_template(body: CompleteTemplateRequest):
    if not settings.openai_api_key:
        raise HTTPException(
            status_code=503,
            detail="OPENAI_API_KEY is not configured. Set it in the environment or .env file.",
        )
    try:
        overlay = run_template_agent(
            instruction=body.instruction,
            current_overlay=body.current_overlay,
            available_resources=body.available_resources,
            refine_meta_excerpt=body.refine_meta_excerpt,
        )
        return CompleteTemplateResponse(overlay=overlay)
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent failed: {e!s}") from e


@app.post("/v1/complete-auth-config", response_model=CompleteAuthConfigResponse)
def complete_auth_config(body: CompleteAuthConfigRequest):
    if not settings.openai_api_key:
        raise HTTPException(
            status_code=503,
            detail="OPENAI_API_KEY is not configured. Set it in the environment or .env file.",
        )
    try:
        auth = run_auth_config_agent(
            instruction=body.instruction,
            current_auth=body.current_auth,
        )
        return CompleteAuthConfigResponse(auth=auth)
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent failed: {e!s}") from e
