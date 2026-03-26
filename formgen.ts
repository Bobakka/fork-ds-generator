import { CodegenConfig } from '@graphql-codegen/cli'
import { parse } from 'graphql'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { AggList, FormGenConfig, TypedInput } from './tsgen/src/utils/types/Basic';
import { createPrefix, deletePrefix, primitiveTypeList, referencePostfix, referencePrefix, rootDictionaryTypeName, updateOrCreatePrefix, updatePrefix } from './tsgen/src/utils/Constants'
const formgenPlugin = require('./formgen-plugin.js')

interface RefineGeneratedField {
  name: string
  type: string
  required: boolean
  requiredCreate?: boolean
  requiredUpdate?: boolean
  isReference: boolean
  referenceResource?: string
}

interface RefineGeneratedResource {
  name: string
  aggregate: string
  kind: "standard" | "dictionary"
  operations: {
    list?: string
    getOne?: string
    create?: string
    update?: string
    deleteOne?: string
    upsert?: string
  }
  fields: RefineGeneratedField[]
}

interface RefineGeneratedMeta {
  resources: RefineGeneratedResource[]
}

const mapInputType = (inputType: string): string => {
  if (primitiveTypeList.includes(inputType)) return inputType
  if (inputType.startsWith("_EN_")) return inputType
  return "Object"
}

const getReferenceResource = (refEntityName: string): string | undefined => {
  const realEntityName = (refEntityName.startsWith(referencePrefix) && refEntityName.endsWith(referencePostfix))
    ? refEntityName.substring(referencePrefix.length).slice(0, -referencePostfix.length)
    : refEntityName
  return realEntityName || undefined
}

const flattenInputs = (
  list: TypedInput[],
  parentPath = "",
  inheritedRefEntityName = "",
): RefineGeneratedField[] => {
  const result: RefineGeneratedField[] = []
  list.forEach((item) => {
    const path = parentPath ? `${parentPath}.${item.inputName}` : item.inputName
    const explicitRef = item.inputRefTypeName?.refEntityName ?? null
    const isPrimitiveScalar =
      typeof item.inputType === "string" && primitiveTypeList.includes(item.inputType)
    const parentRefIsEmbeddedValue =
      !!inheritedRefEntityName
      && inheritedRefEntityName.startsWith(referencePrefix)
      && !inheritedRefEntityName.endsWith(referencePostfix)
    const refEntityName =
      explicitRef ??
      (isPrimitiveScalar && item.inputType !== "ID"
        ? parentRefIsEmbeddedValue
          ? ""
          : inheritedRefEntityName
        : inheritedRefEntityName)
    const isReference =
      !!refEntityName
      && !primitiveTypeList.includes(refEntityName)
      && !refEntityName.startsWith(enumPrefix)

    if (typeof item.inputType === "string") {
      result.push({
        name: path,
        type: mapInputType(item.inputType),
        required: item.inputType === "ID",
        isReference,
        referenceResource: isReference ? getReferenceResource(refEntityName) : undefined,
      })
      return
    }

    result.push(...flattenInputs(item.inputType, path, refEntityName))
  })
  return result
}

const uniqFields = (fields: RefineGeneratedField[]): RefineGeneratedField[] => {
  const map = new Map<string, RefineGeneratedField>()
  fields.forEach((field) => {
    if (!map.has(field.name)) {
      map.set(field.name, field)
    }
  })
  return Array.from(map.values())
}

const buildUiOverlayFromMeta = (refineMeta: RefineGeneratedMeta) => {
  const allResourceNames = Array.from(
    new Set(refineMeta.resources.map((resource) => resource.name).filter(Boolean)),
  )
  const sortedResourceNames = allResourceNames.sort((a, b) => a.localeCompare(b))

  return {
    version: 1,
    defaultPersona: "admin",
    personas: {
      admin: {
        priority: 100,
        matchRoles: ["admin", "ADMIN", "realm-admin"],
        // Keep explicit list to make generated overlay deterministic to current schema.
        resources: sortedResourceNames,
        hiddenFields: {},
        shell: {
          appTitle: "DS Admin",
          layoutClassName: "persona-admin",
        },
      },
    },
  }
}

const config: CodegenConfig = {

  overwrite: true,
  schema: 'src/graphql/schema.graphql',
  documents: ['src/graphql/**/*.graphql'],
  pluginMap: {
    formgen: formgenPlugin,
  },
  generates: {
    'src/refine/__generate/FormGenResult.json': {
      plugins: ['formgen'],
      config: { 
        generateChildCollectionField: true
      } as FormGenConfig
    }
  },
  hooks: {
    afterAllFileWrite: (args) => {
      const basePath = args.slice(0, args.lastIndexOf('/') + 1)
      const generatedFcForApp = JSON.parse(readFileSync(args, { encoding: "utf8" })) as AggList

      // Required-field detection must match GraphQL non-null input fields.
      // Current implementation previously treated only `ID` as required, which makes UI
      // omit other mandatory values (e.g. Person.firstName / lastName / sex).
      const schemaStr = readFileSync('src/graphql/schema.graphql', { encoding: 'utf8' })
      const schemaAst = parse(schemaStr)
      const inputTypeDefMap = new Map<string, any>(
        (schemaAst.definitions as any[]).filter((d) => d.kind === 'InputObjectTypeDefinition').map((d) => [d.name.value, d]),
      )
      const primitiveSet = new Set(primitiveTypeList)
      const enumPrefix = '_EN_'

      const isNonNullTop = (typeNode: any): boolean => typeNode?.kind === 'NonNullType'
      const getNamedTypeName = (typeNode: any): string => {
        if (!typeNode) return ''
        if (typeNode.kind === 'NamedType') return typeNode.name.value
        if (typeNode.kind === 'NonNullType' || typeNode.kind === 'ListType') return getNamedTypeName(typeNode.type)
        return ''
      }

      const collectRequiredLeafPaths = (inputTypeName: string, prefix = ''): Set<string> => {
        const def = inputTypeDefMap.get(inputTypeName)
        if (!def?.fields) return new Set()

        const out = new Set<string>()
        for (const fieldDef of def.fields) {
          const fieldName = fieldDef.name.value
          const namedType = getNamedTypeName(fieldDef.type)
          const childPrefix = prefix ? `${prefix}.${fieldName}` : fieldName

          if (inputTypeDefMap.has(namedType)) {
            for (const nested of collectRequiredLeafPaths(namedType, childPrefix)) out.add(nested)
            continue
          }

          const isPrimitiveOrEnum = primitiveSet.has(namedType) || namedType.startsWith(enumPrefix)
          if (isPrimitiveOrEnum && isNonNullTop(fieldDef.type)) {
            out.add(childPrefix)
          }
        }
        return out
      }

      const requiredForEntityCreate = (entityName: string): Set<string> => {
        const createTypeName = `_Create${entityName}Input`
        return collectRequiredLeafPaths(createTypeName)
      }

      const requiredForEntityUpdate = (entityName: string): Set<string> => {
        const updateTypeName = `_Update${entityName}Input`
        return collectRequiredLeafPaths(updateTypeName)
      }

      if (!existsSync(basePath)) {
        mkdirSync(basePath, { recursive: true })
      }

      const refineMeta: RefineGeneratedMeta = { resources: [] }

      generatedFcForApp.aggList.forEach((agg) => {
        const isDictionary = agg.aggName === rootDictionaryTypeName

        agg.entityList.forEach((entity) => {
          const listOp = entity.queryList.find((q) => q.queryName.startsWith("search"))?.queryName
          const getOneOp = entity.mutationList.find((m) => m.mutationName.startsWith("getForUpdate"))?.mutationName
          const createOp = entity.mutationList.find((m) => m.mutationName === createPrefix + entity.name)?.mutationName
          const updateOp = entity.mutationList.find((m) => m.mutationName === updatePrefix + entity.name)?.mutationName
          const deleteOp = entity.mutationList.find((m) => m.mutationName === deletePrefix + entity.name)?.mutationName
          const upsertOp = entity.mutationList.find((m) => m.mutationName === updateOrCreatePrefix + entity.name)?.mutationName

          const createInput = entity.mutationList
            .find((m) => m.mutationName === (isDictionary ? updateOrCreatePrefix : createPrefix) + entity.name)
            ?.inputList.find((i) => i.inputName === "input")

          const updateInput = entity.mutationList
            .find((m) => m.mutationName === (isDictionary ? updateOrCreatePrefix : updatePrefix) + entity.name)
            ?.inputList.find((i) => i.inputName === "input")

          const inputFields = uniqFields([
            ...(createInput && typeof createInput.inputType !== "string" ? flattenInputs(createInput.inputType) : []),
            ...(updateInput && typeof updateInput.inputType !== "string" ? flattenInputs(updateInput.inputType) : []),
          ])

          // Override required flags using schema non-null definitions.
          // Create and update use different nullability, so keep both separately.
          const requiredCreate = requiredForEntityCreate(entity.name)
          const requiredUpdate = requiredForEntityUpdate(entity.name)
          inputFields.forEach((f) => {
            f.requiredCreate = requiredCreate.has(f.name)
            f.requiredUpdate = requiredUpdate.has(f.name)
            // Backward-compat: keep `required` as create-requiredness.
            f.required = f.requiredCreate
          })

          refineMeta.resources.push({
            name: entity.name,
            aggregate: agg.aggName,
            kind: isDictionary ? "dictionary" : "standard",
            operations: {
              list: listOp,
              getOne: getOneOp,
              create: createOp,
              update: updateOp,
              deleteOne: deleteOp,
              upsert: upsertOp,
            },
            fields: inputFields,
          })
        })
      })

      writeFileSync(basePath + "refineMeta.json", JSON.stringify(refineMeta, null, 2))
      const overlay = buildUiOverlayFromMeta(refineMeta)
      writeFileSync(basePath + "../refineUiOverlay.json", `${JSON.stringify(overlay, null, 2)}\n`)
    }
  }
}

export default config