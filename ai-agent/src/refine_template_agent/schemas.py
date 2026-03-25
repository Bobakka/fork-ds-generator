"""Pydantic models aligned with frontend refineUiOverlay.json (camelCase)."""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class PersonaShell(BaseModel):
    model_config = ConfigDict(extra="forbid")

    appTitle: str
    layoutClassName: str | None = None


class PersonaConfig(BaseModel):
    model_config = ConfigDict(extra="forbid")

    priority: int | None = None
    matchRoles: list[str] | None = None
    resources: list[str] | None = None
    hiddenFields: dict[str, list[str]] | None = None
    shell: PersonaShell | None = None


class RefineUiOverlay(BaseModel):
    model_config = ConfigDict(extra="forbid")

    version: int = Field(default=1, ge=1)
    defaultPersona: str
    personas: dict[str, PersonaConfig]


class CompleteTemplateRequest(BaseModel):
    """Input for the template-completion agent."""

    instruction: str = Field(
        ...,
        min_length=1,
        description="What to change or add (natural language).",
    )
    current_overlay: dict | None = Field(
        default=None,
        description="Existing refineUiOverlay JSON to extend or replace.",
    )
    available_resources: list[str] = Field(
        default_factory=list,
        description="Resource names from refineMeta — model must not invent new ones.",
    )
    refine_meta_excerpt: str | None = Field(
        default=None,
        description="Optional JSON snippet from refineMeta for extra context.",
    )


class CompleteTemplateResponse(BaseModel):
    overlay: RefineUiOverlay
    notes: str | None = None


class RefineAuthConfig(BaseModel):
    """Aligned with frontend src/refine/refineAuth.json."""

    model_config = ConfigDict(extra="forbid")

    version: int = Field(default=1, ge=1)
    enabled: bool
    loginPath: str = "/login"
    provider: Literal["none", "mock", "keycloak"]
    keycloakClientPath: str = "/keycloak.json"


class CompleteAuthConfigRequest(BaseModel):
    instruction: str = Field(..., min_length=1)
    current_auth: dict | None = Field(
        default=None,
        description="Existing refineAuth JSON to merge or replace.",
    )


class CompleteAuthConfigResponse(BaseModel):
    auth: RefineAuthConfig
    notes: str | None = None
