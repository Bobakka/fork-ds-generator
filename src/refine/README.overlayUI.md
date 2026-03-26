# Оверлей пользовательского интерфейса (`refineUiOverlay.json`)

`overlayUI` — это декларативный JSON, который управляет тем, *что именно показывается* в сгенерированном refine UI: какие сущности доступны в меню и какие поля видны в таблицах и формах.

Он используется фронтендом: `src/refine/PersonaContext.tsx` читает файл `src/refine/refineUiOverlay.json`.

## Где применяется

- **Выбор персоны** (admin/doctor/patient и т.п.) — `src/refine/personaResolve.ts`
- **Ограничение ресурсов в меню/роутинге** — `src/refine/PersonaContext.tsx` + `src/refine/AppRefine.tsx`
- **Скрытие полей в списках и формах** — `src/refine/personaFields.ts` + рендер в `src/refine/AppRefine.tsx`
- **Внешний вид “оболочки” persona** — `shell.layoutClassName` (CSS задаётся в `src/refine/AppRefine.css`)

## Формат файла

Файл: `src/refine/refineUiOverlay.json`

Основная схема:

```jsonc
{
  "version": 1,
  "defaultPersona": "admin",
  "personas": {
    "admin": {
      "priority": 100,
      "matchRoles": ["admin", "ADMIN", "realm-admin"],
      "resources": null,
      "hiddenFields": {},
      "shell": {
        "appTitle": "DS Admin",
        "layoutClassName": "persona-admin"
      }
    },
    "doctor": {
      "priority": 20,
      "matchRoles": ["doctor", "DOCTOR", "physician"],
      "resources": ["Clinic", "ClinicOffice"],
      "hiddenFields": {
        "Person": ["birthDate"]
      },
      "shell": {
        "appTitle": "Clinic — Doctor",
        "layoutClassName": "persona-doctor"
      }
    }
  }
}
```

### Поля верхнего уровня

- `version` — версия схемы overlay (сейчас используется `1`)
- `defaultPersona` — persona, которая применяется, если матчинга ролей нет
- `personas` — набор персон, каждая имеет свои правила

### Конфигурация персоны (`PersonaConfig`)

Persona описывается через:

- `priority?: number`
  - чем больше значение, тем выше приоритет при совпадении ролей
- `matchRoles?: string[]`
  - список фрагментов/имен realm-ролей Keycloak
  - логика выбора: персону выбирает, если **хотя бы один** элемент `matchRoles` совпал с одной из realm-ролей пользователя (допускается подстрочное совпадение)
- `resources?: string[] | null`
  - whitelist имён ресурсов из `refineMeta.json`
  - `null` или `undefined` означает “все ресурсы”
  - `[]` означает “нет ресурсов”
- `hiddenFields?: Record<string, string[]>`
  - ключ: имя ресурса (как в `refineMeta.json`, например `"Person"`)
  - значение: список имён полей этого ресурса, которые нужно скрыть
  - влияет одновременно на:
    - колонки таблицы в `ResourceList`
    - поля в форме создания/редактирования (create/edit)
- `shell?: { appTitle, layoutClassName }`
  - `appTitle` — заголовок в шапке
  - `layoutClassName` — добавляется к CSS-подложке (`<Layout className="app-shell ...">`)
  - в `AppRefine.css` уже есть примеры для `persona-doctor` и `persona-patient`

## Как выбирается персоны (personaResolve)

Алгоритм:

1. Если есть realm roles в Keycloak токене (`realm_access.roles`), то выбирается persona по `matchRoles` с учётом `priority`.
2. Если совпадений нет — используется `?persona=...` (параметр URL).
3. Если параметр не задан — используется `localStorage` (`refine.devPersona`).
4. Иначе — `defaultPersona`.

Важно: если Keycloak не инициализирован/не работает, то персону определяют по параметру в URL/значению в `localStorage`/`defaultPersona`.

## Скрытие полей и важные ограничения

1. **`hiddenFields` скрывает поля по точному имени поля из `refineMeta.json`.**
   - Пример: `hiddenFields: { "Person": ["birthDate"] }` скрывает `Person.birthDate`.
2. В списке (таблице) есть дополнительное правило:
   - колонка `ID` добавляется всегда и overlay её не убирает (она формируется в `src/refine/AppRefine.tsx`).
3. overlay НЕ умеет:
  - переименовывать колонки и текст подписи полей
  - добавлять полноценные элементы фильтрации в таблицах
  - реализовывать разграничение доступа на уровне отдельных записей (row-level security)
  - управлять правами CRUD (например “только просмотр без редактирования”) без доработок фронтенда

## Практические советы

- Чтобы быстро проверить действие `hiddenFields`, выберите persona через `?persona=doctor` и откройте страницы ресурсов.
- Для сценария “клиника: пациент и доктор видят разное” обычно достаточно:
  - указать список разрешённых ресурсов в `resources` для каждой персоны
  - скрыть чувствительные поля через `hiddenFields`
- Если требуется:
  - переименование/лейблы,
  - дополнительные фильтры,
  - разграничение доступа на уровне отдельных записей,
  - права на редактирование (в смысле “мне показывают, но не дают менять”)
 то это потребует доработок фронтенда: оверлей останется лишь входными параметрами.

