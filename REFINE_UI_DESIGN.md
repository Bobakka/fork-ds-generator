# Refine UI Integration Design

## Goal

Integrate `refine` as the runtime UI framework for CRUD pages and forms, while keeping the existing GraphQL generation pipeline (`gqlgen` + `codegen`) and domain-specific schema logic.

Main target:

- Stop generating many static React pages per entity.
- Keep generated GraphQL operations/types.
- Render list/create/edit/delete screens through a shared refine layer.

## Current Baseline

Existing pipeline:

1. `gqlgen` -> generates `src/graphql/__generate/**/*.graphql` from schema.
2. `codegen` -> generates `src/__generate/graphql-frontend.ts` with Apollo hooks/types.
3. `formgen` -> currently intended to generate `src/components/__generate/**/*.tsx`.

Important domain specifics:

- Regular entities use `packet` and `create/update/delete`.
- Dictionary entities use `dictionaryPacket` and `updateOrCreate`.
- Search operations have `search<Entity>(cond: String)`.

## Target Architecture

### Layers

1. **Schema & GraphQL ops generation (unchanged)**  
   Keep:
   - `gqlgen.ts`
   - `codegen.ts`
   - generated `.graphql` + `graphql-frontend.ts`

2. **Refine runtime app (new)**  
   Add:
   - `src/refine/AppRefine.tsx`
   - `src/refine/resources.ts`
   - `src/refine/dataProvider.ts`
   - `src/refine/formSchema.ts`
   - `src/refine/components/DynamicForm.tsx`

3. **Metadata generation (replace TSX generation)**  
   Change `formgen` output:
   - from generated TSX pages
   - to generated JSON metadata:
     - resource definitions
     - field schemas for forms/tables
     - mutation strategy (`standard` vs `dictionary`)

## Migration Strategy

### Phase 1: Minimum Viable Integration

- Install refine core packages and AntD integration.
- Build custom refine `dataProvider` that maps resource methods to existing generated GraphQL operations.
- Add 2 pilot resources:
  - `Clinic` (standard CRUD)
  - `DoctorType` (dictionary with `updateOrCreate`)
- Use manual form definitions first (hardcoded in `formSchema.ts`).

Success criteria:

- `list/create/edit/delete` works for `Clinic`.
- `list/create/edit` works for `DoctorType` via `updateOrCreate`.

### Phase 2: Metadata-Driven Forms

- Update `formgen` plugin to output JSON metadata only, e.g. `src/__generate/form-meta.json`.
- Implement `DynamicForm` that renders controls by metadata.
- Auto-generate resource config from metadata.

Success criteria:

- No per-entity generated TSX UI files required.
- New schema fields appear in UI after regenerate without manual page coding.

### Phase 3: Decommission Legacy Generated UI

- Remove import dependency on `src/components/__generate/MainMenu`.
- Route app through refine shell.
- Keep fallback feature flag for rollback during rollout.

## Data Contracts

### Generated Metadata (`form-meta.json`)

Proposed shape:

```json
{
  "resources": [
    {
      "name": "Clinic",
      "aggregate": "Clinic",
      "kind": "standard",
      "operations": {
        "list": "searchClinic",
        "getOne": "getForUpdateClinic",
        "create": "createClinic",
        "update": "updateClinic",
        "delete": "deleteClinic"
      },
      "fields": [
        { "name": "id", "type": "ID", "readOnly": true },
        { "name": "name", "type": "String", "required": true },
        { "name": "address.city", "type": "String" }
      ]
    },
    {
      "name": "DoctorType",
      "aggregate": "RootDictionary",
      "kind": "dictionary",
      "operations": {
        "list": "searchDoctorType",
        "getOne": "getForUpdateDoctorType",
        "upsert": "updateOrCreateDoctorType"
      },
      "fields": [
        { "name": "id", "type": "ID", "required": true },
        { "name": "name", "type": "String", "required": true },
        { "name": "descr", "type": "String" }
      ]
    }
  ]
}
```

Notes:

- `kind` drives mutation strategy.
- `fields` are flat paths for renderer simplicity.
- For references, use `type: "Reference"` + `targetResource`.

## Refine `dataProvider` Mapping

Implement a custom `dataProvider` on top of Apollo Client using generated DocumentNodes from `graphql-frontend.ts`.

### Standard Entity Mapping

- `getList(resource, params)` -> `search<Resource>`
  - map filters/sort/pagination to `cond` expression initially (minimal support).
- `getOne(resource, params)` -> `getForUpdate<Resource>`
- `create(resource, params)` -> `create<Resource>`
- `update(resource, params)` -> `update<Resource>`
- `deleteOne(resource, params)` -> `delete<Resource>`

### Dictionary Entity Mapping

- `create` and `update` -> same op `updateOrCreate<Resource>`
- `deleteOne`:
  - either unsupported in UI, or conditionally hidden if API lacks delete.

### Error/Result Normalization

Return shape expected by refine:

- list: `{ data: T[], total?: number }`
- one: `{ data: T }`
- create/update/delete: `{ data: T | { id: string } }`

## Dynamic Form Rendering

Use metadata -> AntD controls:

- `String`, `ID` -> `Input`
- `Boolean` -> `Checkbox`
- `_Date` -> `DatePicker` date mode
- `_DateTime` -> `DatePicker` datetime mode
- enum -> `Select`
- reference -> `Select` (remote options via resource list)

Rules:

- `readOnly` for immutable fields in edit mode.
- `required` to derive AntD `rules`.
- nested paths (`address.city`) converted to nested object on submit.

## Routing and App Shell

Replace current generated menu with refine resource-driven navigation.

Suggested app entry:

- `src/App.tsx` keeps Apollo init.
- render `<Refine>` + `<RouterProvider>` and register resources from generated metadata.

Resource example:

```ts
{
  name: "Clinic",
  list: "/clinic",
  create: "/clinic/create",
  edit: "/clinic/edit/:id",
  meta: { kind: "standard" }
}
```

## File Plan

### New files

- `src/refine/AppRefine.tsx`
- `src/refine/dataProvider.ts`
- `src/refine/resources.ts`
- `src/refine/formSchema.ts`
- `src/refine/components/DynamicForm.tsx`
- `src/refine/pages/ResourceList.tsx`
- `src/refine/pages/ResourceCreate.tsx`
- `src/refine/pages/ResourceEdit.tsx`

### Updated files

- `src/App.tsx` -> switch from generated `MainMenu` to refine app shell.
- `formgen.ts` / `tsgen/src/FormGenFunc.ts` -> output metadata JSON instead of TSX files.

## Risks and Mitigations

- **Risk:** dictionary semantics differ from standard CRUD.  
  **Mitigation:** explicit `kind` + operation map per resource.

- **Risk:** `cond` filter syntax is custom and brittle.  
  **Mitigation:** start with minimal filter support and progressively add mapper tests.

- **Risk:** schema edge-cases (nested input, collections, custom scalars).  
  **Mitigation:** support whitelist first, log unsupported field types, and keep manual override config.

- **Risk:** generated hooks naming mismatch due to case conversion.  
  **Mitigation:** operation names from metadata, not inferred string templates.

## Testing Plan

1. Unit tests for `dataProvider` mapping logic.
2. Unit tests for form path mapping (`flat <-> nested`).
3. Integration tests:
   - `Clinic` list/create/edit/delete
   - `DoctorType` list/create/edit via upsert
4. Smoke test after regenerate from schema update.

## Rollout Plan

1. Add refine in parallel with old UI behind flag `USE_REFINE_UI`.
2. Migrate 2 pilot resources.
3. Migrate all resources.
4. Remove generated TSX UI and old menu wiring.

## Effort Estimate

- Phase 1: 1-2 days
- Phase 2: 2-4 days
- Phase 3: 0.5-1 day

Total: ~1 week with buffer for schema-specific edge cases.

