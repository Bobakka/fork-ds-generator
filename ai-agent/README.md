# refine-template-agent

Отдельный сервис на **Python** (**uv**), **FastAPI** + **uvicorn**, **LangGraph**, **LangChain**, **Pydantic**. Агенты дополняют JSON-шаблоны: **`refineUiOverlay.json`** (персоны, ресурсы, поля) и **`refineAuth.json`** (включение авторизации Refine, mock / Keycloak).

## Требования

- Python 3.13+
- [uv](https://docs.astral.sh/uv/)
- Переменная `OPENAI_API_KEY` (или файл `.env` в корне этого проекта)

## Установка и запуск API

```bash
cd ai-agent
cp .env.example .env
# Укажите OPENAI_API_KEY в .env

uv sync
uv run refine-agent-api
```

Сервис слушает `http://0.0.0.0:8000`. Документация OpenAPI: `http://127.0.0.1:8000/docs`.

## Пример запроса

```bash
curl -s -X POST http://127.0.0.1:8000/v1/complete-template ^
  -H "Content-Type: application/json" ^
  -d "{\"instruction\": \"Add persona pharmacist with resources Clinic and Doctor only, title Pharmacy desk\", \"available_resources\": [\"Clinic\", \"Doctor\", \"Person\"]}"
```

Передайте `current_overlay` с существующим JSON, чтобы агент **мержил** изменения, а не создавал с нуля. Список `available_resources` должен совпадать с именами из `refineMeta.json`, чтобы модель не выдумывала сущности.

### Авторизация (`refineAuth.json`)

`POST /v1/complete-auth-config` — тело: `instruction`, опционально `current_auth`.

```bash
curl -s -X POST http://127.0.0.1:8000/v1/complete-auth-config -H "Content-Type: application/json" -d "{\"instruction\": \"Enable demo login for development\"}"
```

Результат сохраните в `src/refine/refineAuth.json` фронтового проекта.

## Программный вызов графа

```python
from refine_template_agent import run_template_agent

overlay = run_template_agent(
    instruction="Restrict patient persona to Customer and Person only",
    current_overlay={...},
    available_resources=["Customer", "Person", "Clinic"],
)
print(overlay.model_dump())
```

```python
from refine_template_agent import run_auth_config_agent

auth = run_auth_config_agent(
    instruction="Use Keycloak SSO with public config at /keycloak.json",
    current_auth=None,
)
print(auth.model_dump())
```

## Структура

| Модуль | Назначение |
|--------|------------|
| `schemas.py` | Pydantic: `RefineUiOverlay`, `RefineAuthConfig`, запросы |
| `prompts.py` | Промпт для overlay |
| `graph.py` | LangGraph для overlay |
| `auth_graph.py` | LangGraph для `refineAuth.json` |
| `api.py` | `POST /v1/complete-template`, `POST /v1/complete-auth-config` |
| `config.py` | Настройки из окружения |
