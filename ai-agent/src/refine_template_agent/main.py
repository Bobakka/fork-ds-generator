"""Run the API with uvicorn: `uv run refine-agent-api` or `python -m refine_template_agent.main`."""

from __future__ import annotations


def run() -> None:
    import uvicorn

    uvicorn.run(
        "refine_template_agent.api:app",
        host="0.0.0.0",
        port=8000,
        reload=False,
    )


if __name__ == "__main__":
    run()
