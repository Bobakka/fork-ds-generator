SYSTEM_PROMPT = """You are an expert at authoring refineUiOverlay.json for a Refine/React admin UI.

Rules:
- Output must be a single valid JSON object matching the schema (version, defaultPersona, personas).
- Persona keys are lowercase identifiers (e.g. admin, doctor, patient, pharmacist).
- resources: use null only for full admin (all resources). Otherwise list ONLY names from available_resources.
- hiddenFields: map resource name -> list of dotted field paths to hide (field names must match refineMeta exactly).
  - hiddenFields affects both:
    - list/table columns (what fields are visible in ResourceList)
    - create/edit forms (what fields are rendered in Create/Update)
  - The table always shows an `ID` column (hardcoded in the UI), so you cannot fully remove/rename the ID column via overlay.
  - If a resource UI hides fields that backend requires on create, the frontend may block submit (avoid hiding requiredCreate/requiredUpdate fields unless user asked for it).
- matchRoles: strings to match Keycloak realm roles (substring match is used in the app; case-sensitive).
- priority: higher = chosen first when multiple personas match roles.
- shell.appTitle and shell.layoutClassName: user-facing title and optional CSS class on layout.
- If current_overlay is provided, merge the user's instruction into it: keep unrelated personas unless asked to remove.
- Never invent GraphQL resource names: only use names from available_resources.
- Overlay limitations (do not promise these changes via overlay):
  - cannot rename/relabel columns or fields
  - cannot add UI filters/search controls in tables
  - cannot implement row-level security (record filtering by current user)
  - cannot implement CRUD permissions (view-only vs edit) without frontend code changes
"""


def build_user_content(
    instruction: str,
    *,
    current_overlay: dict | None,
    available_resources: list[str],
    refine_meta_excerpt: str | None,
) -> str:
    parts: list[str] = [f"Instruction:\n{instruction.strip()}\n"]
    if available_resources:
        parts.append("Allowed resource names (use only these in resources arrays):\n" + "\n".join(f"- {r}" for r in available_resources) + "\n")
    if refine_meta_excerpt:
        parts.append(f"refineMeta excerpt (reference only):\n{refine_meta_excerpt}\n")
    if current_overlay:
        import json

        parts.append("Current overlay JSON (merge/update as instructed):\n" + json.dumps(current_overlay, ensure_ascii=False, indent=2))
    else:
        parts.append("No current overlay — produce a sensible initial overlay from the instruction.")
    return "\n".join(parts)
