const fs = require("fs");
const path = require("path");
const { parse } = require("graphql");
const glob = require("glob");
const { getFormData } = require("./tsgen/build/FormGenFunc");

const primitiveTypeList = ["String", "Int", "Float", "Boolean", "ID", "BigDecimal", "_Date", "_DateTime"];
const referencePrefix = "_G_";
const referencePostfix = "Reference";
const rootDictionaryTypeName = "RootDictionary";

const createPrefix = "create";
const updatePrefix = "update";
const deletePrefix = "delete";
const updateOrCreatePrefix = "updateOrCreate";

const mapInputType = (inputType) => {
  if (primitiveTypeList.includes(inputType)) return inputType;
  if (inputType.startsWith("_EN_")) return inputType;
  return "Object";
};

const getReferenceResource = (refEntityName) => {
  if (!refEntityName) return undefined;
  const isExternalRef = refEntityName.startsWith(referencePrefix) && refEntityName.endsWith(referencePostfix);
  if (isExternalRef) {
    return refEntityName.substring(referencePrefix.length).slice(0, -referencePostfix.length);
  }
  return refEntityName;
};

const flattenInputs = (list, parentPath = "", inheritedRefEntityName = "") => {
  const result = [];
  list.forEach((item) => {
    const name = parentPath ? `${parentPath}.${item.inputName}` : item.inputName;
    const explicitRef =
      item.inputRefTypeName && item.inputRefTypeName.refEntityName
        ? item.inputRefTypeName.refEntityName
        : null;
    const isPrimitiveScalar =
      typeof item.inputType === "string" && primitiveTypeList.includes(item.inputType);
    // _G_Address-style embedded value types: nested strings are not FKs. _G_*Reference wrappers (e.g. _G_CustomerReference)
    // still pass entity ref down to entityId String fields.
    const parentRefIsEmbeddedValue =
      !!inheritedRefEntityName
      && inheritedRefEntityName.startsWith(referencePrefix)
      && !inheritedRefEntityName.endsWith(referencePostfix);
    const refEntityName =
      explicitRef ??
      (isPrimitiveScalar && item.inputType !== "ID"
        ? parentRefIsEmbeddedValue
          ? ""
          : inheritedRefEntityName
        : inheritedRefEntityName);
    const isReference =
      !!refEntityName
      && !primitiveTypeList.includes(refEntityName)
      && !refEntityName.startsWith("_EN_");

    if (typeof item.inputType === "string") {
      result.push({
        name,
        type: mapInputType(item.inputType),
        required: item.inputType === "ID",
        isReference,
        referenceResource: isReference ? getReferenceResource(refEntityName) : undefined,
      });
      return;
    }

    result.push(...flattenInputs(item.inputType, name, refEntityName));
  });
  return result;
};

const uniqFields = (fields) => {
  const map = new Map();
  fields.forEach((field) => {
    if (!map.has(field.name)) map.set(field.name, field);
  });
  return Array.from(map.values());
};

const main = () => {
  const schemaPath = path.join(__dirname, "src/graphql/schema.graphql");
  const gqlDocs = glob.sync(path.join(__dirname, "src/graphql/**/*.graphql")).filter(
    (p) => !p.includes(`${path.sep}schema.graphql`)
  );

  const schemaStr = fs.readFileSync(schemaPath, "utf8");
  const astNode = parse(schemaStr);
  const documents = gqlDocs.map((docPath) => ({
    location: docPath.replace(/\\/g, "/"),
    document: parse(fs.readFileSync(docPath, "utf8")),
  }));

  const formGenResultStr = getFormData(astNode, documents, {
    generateChildCollectionField: true,
  });

  const parsed = JSON.parse(formGenResultStr);
  const outDir = path.join(__dirname, "src/refine/__generate");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outDir, "FormGenResult.json"), JSON.stringify(parsed, null, 2));

  const refineMeta = { resources: [] };

  parsed.aggList.forEach((agg) => {
    const isDictionary = agg.aggName === rootDictionaryTypeName;

    agg.entityList.forEach((entity) => {
      const listOp = entity.queryList.find((q) => q.queryName && q.queryName.startsWith("search"))?.queryName;
      const getOneOp = entity.mutationList.find((m) => m.mutationName && m.mutationName.startsWith("getForUpdate"))?.mutationName;
      const createOp = entity.mutationList.find((m) => m.mutationName === createPrefix + entity.name)?.mutationName;
      const updateOp = entity.mutationList.find((m) => m.mutationName === updatePrefix + entity.name)?.mutationName;
      const deleteOp = entity.mutationList.find((m) => m.mutationName === deletePrefix + entity.name)?.mutationName;
      const upsertOp = entity.mutationList.find((m) => m.mutationName === updateOrCreatePrefix + entity.name)?.mutationName;

      const createInput = entity.mutationList
        .find((m) => m.mutationName === (isDictionary ? updateOrCreatePrefix : createPrefix) + entity.name)
        ?.inputList.find((i) => i.inputName === "input");

      const updateInput = entity.mutationList
        .find((m) => m.mutationName === (isDictionary ? updateOrCreatePrefix : updatePrefix) + entity.name)
        ?.inputList.find((i) => i.inputName === "input");

      const fields = uniqFields([
        ...(createInput && typeof createInput.inputType !== "string" ? flattenInputs(createInput.inputType) : []),
        ...(updateInput && typeof updateInput.inputType !== "string" ? flattenInputs(updateInput.inputType) : []),
      ]);

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
        fields,
      });
    });
  });

  fs.writeFileSync(path.join(outDir, "refineMeta.json"), JSON.stringify(refineMeta, null, 2));
  console.log(`Generated refine metadata: ${path.join(outDir, "refineMeta.json")}`);
};

main();

