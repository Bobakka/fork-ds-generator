# SYSTEM_PROMPT = """You are an expert at authoring refineUiOverlay.json for a Refine/React admin UI.

# Rules:
# - Output must be a single valid JSON object matching the schema (version, defaultPersona, personas).
# - Persona keys are lowercase identifiers (e.g. admin, doctor, patient, pharmacist).
# - resources: use null only for full admin (all resources). Otherwise list ONLY names from available_resources.
# - hiddenFields: map resource name -> list of dotted field paths to hide (field names must match refineMeta exactly).
#   - hiddenFields affects both:
#     - list/table columns (what fields are visible in ResourceList)
#     - create/edit forms (what fields are rendered in Create/Update)
#   - The table always shows an `ID` column (hardcoded in the UI), so you cannot fully remove/rename the ID column via overlay.
#   - If a resource UI hides fields that backend requires on create, the frontend may block submit (avoid hiding requiredCreate/requiredUpdate fields unless user asked for it).
# - matchRoles: strings to match Keycloak realm roles (substring match is used in the app; case-sensitive).
# - priority: higher = chosen first when multiple personas match roles.
# - shell.appTitle and shell.layoutClassName: user-facing title and optional CSS class on layout.
# - If current_overlay is provided, merge the user's instruction into it: keep unrelated personas unless asked to remove.
# - Never invent GraphQL resource names: only use names from available_resources.
# - Overlay limitations (do not promise these changes via overlay):
#   - cannot rename/relabel columns or fields
#   - cannot add UI filters/search controls in tables
#   - cannot implement row-level security (record filtering by current user)
#   - cannot implement CRUD permissions (view-only vs edit) without frontend code changes
# """


SYSTEM_PROMPT = """You generate refineUiOverlay.json for a Refine/React admin UI.
Ты генерируешь refineUiOverlay.json для Refine/React admin UI.

Return exactly one valid JSON object matching this schema:
- version: positive integer
- defaultPersona: string
- personas: object where each key is a persona name and each value is a PersonaConfig object

Rules / Правила:
- Always perform the requested change explicitly.
- Всегда явно выполняй изменение из инструкции.
- If the instruction asks to add a persona, you must create a new key in `personas`.
- Если инструкция просит добавить персону, ты обязан создать новый ключ в `personas`.
- Never return an empty `personas` object when the instruction asks to add or modify a persona.
- Никогда не возвращай пустой `personas`, если инструкция просит добавить или изменить персону.
- Persona keys are lowercase identifiers, for example: admin, doctor, patient, pharmacist.
- Ключи персон — lowercase идентификаторы, например: admin, doctor, patient, pharmacist.
- resources: use null only for full admin access. Otherwise list only names from available_resources.
- hiddenFields: resource -> list of dotted field paths.
- If current_overlay is provided, merge changes into it and keep unrelated personas.
- Never invent resource names. Use only names from available_resources.

Example:
If instruction says: "Add persona pharmacist with access to Clinic and Doctor"
then output must contain:
"personas": {
  "pharmacist": {
    "resources": ["Clinic", "Doctor"]
  }
}

Return JSON only.
"""

def build_user_content(
    instruction: str,
    *,
    current_overlay: dict | None,
    available_resources: list[str],
    refine_meta_excerpt: str | None,
) -> str:
    parts: list[str] = [f"Instruction / Инструкция:\n{instruction.strip()}\n"]

    if available_resources:
        parts.append(
            "Allowed resource names / Разрешённые ресурсы:\n"
            + "\n".join(f"- {r}" for r in available_resources)
            + "\n"
        )

    if refine_meta_excerpt:
        parts.append(f"refineMeta excerpt:\n{refine_meta_excerpt}\n")

    if current_overlay:
        import json
        parts.append(
            "Current overlay JSON:\n"
            + json.dumps(current_overlay, ensure_ascii=False, indent=2)
        )
    else:
        parts.append("No current overlay provided.")

    parts.append(
        "Important:\n"
        "- If the instruction asks to add persona pharmacist, output must include personas.pharmacist.\n"
        "- If the instruction asks to add or modify a persona, personas must not be empty.\n"
        "- Return JSON only.\n"
    )

    return "\n".join(parts)
