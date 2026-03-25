import * as GraphqlFrontend from "../__generate/graphql-frontend";
import refineMeta from "./__generate/refineMeta.json";

export type ResourceKind = "standard" | "dictionary";

export interface ResourceConfig {
  name: string;
  kind: ResourceKind;
  routes: {
    list: string;
    create: string;
    edit: string;
  };
  operations: {
    list: any;
    getOne: any;
    create?: any;
    update?: any;
    deleteOne?: any;
    upsert?: any;
  };
  responsePath: {
    list: string[];
    getOne: string[];
    create?: string[];
    update?: string[];
    deleteOne?: string[];
    upsert?: string[];
  };
}

export interface ResourceField {
  name: string;
  type: string;
  required: boolean;
  requiredCreate?: boolean;
  requiredUpdate?: boolean;
  isReference: boolean;
  referenceResource?: string;
}

export interface ChildRelation {
  childResource: string;
  parentField: string;
}

const toKebabCase = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();

const getDocumentByOperation = (operationName?: string): any => {
  if (!operationName) return undefined;
  const symbolName = `${operationName.charAt(0).toUpperCase()}${operationName.slice(1)}Document`;
  return (GraphqlFrontend as any)[symbolName];
};

const getGetOnePath = (resourceName: string, kind: ResourceKind): string[] =>
  kind === "dictionary" ? ["packet", `get${resourceName}`] : ["packet", `get${resourceName}`];

type MetaResource = {
  name: string;
  aggregate: string;
  kind: ResourceKind;
  operations: {
    list?: string;
    getOne?: string;
    create?: string;
    update?: string;
    deleteOne?: string;
    upsert?: string;
  };
  fields: ResourceField[];
};

export const resourceConfigMap: Record<string, ResourceConfig & { fields: ResourceField[] }> = {};

(refineMeta.resources as MetaResource[]).forEach((r) => {
  const routeBase = `/${toKebabCase(r.name)}`;
  resourceConfigMap[r.name] = {
    name: r.name,
    kind: r.kind,
    routes: {
      list: routeBase,
      create: `${routeBase}/create`,
      edit: `${routeBase}/edit/:id`,
    },
    operations: {
      list: getDocumentByOperation(r.operations.list),
      getOne: getDocumentByOperation(r.operations.getOne),
      create: getDocumentByOperation(r.operations.create),
      update: getDocumentByOperation(r.operations.update),
      deleteOne: getDocumentByOperation(r.operations.deleteOne),
      upsert: getDocumentByOperation(r.operations.upsert),
    },
    responsePath: {
      list: [r.operations.list ?? "", "elems"],
      getOne: getGetOnePath(r.name, r.kind),
      create: ["packet", r.operations.create ?? ""],
      update: ["packet", r.operations.update ?? ""],
      deleteOne: ["packet", r.operations.deleteOne ?? ""],
      upsert: ["dictionaryPacket", r.operations.upsert ?? "", "returning"],
    },
    fields: r.fields ?? [],
  };
});

export const resources = Object.keys(resourceConfigMap).map((key) => {
  const resource = resourceConfigMap[key];
  return {
    name: resource.name,
    list: resource.routes.list,
    create: resource.routes.create,
    edit: resource.routes.edit,
    meta: {
      kind: resource.kind,
    },
  };
});

export const getChildRelations = (parentResource: string): ChildRelation[] => {
  const result: ChildRelation[] = [];
  Object.keys(resourceConfigMap).forEach((resourceName) => {
    const cfg = resourceConfigMap[resourceName];
    cfg.fields
      .filter((field) => field.isReference && field.referenceResource === parentResource)
      .forEach((field) => {
        result.push({
          childResource: resourceName,
          parentField: field.name,
        });
      });
  });
  return result;
};

