import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { DataProvider } from "@refinedev/core";
import { resourceConfigMap } from "./resourceConfig";

const getByPath = (obj: any, path: string[]) => {
  return path.reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
};

const ensureResource = (resource: string) => {
  const cfg = resourceConfigMap[resource];
  if (!cfg) {
    throw new Error(`Resource not configured: ${resource}`);
  }
  return cfg;
};

export const createDataProvider = (
  apolloClient: ApolloClient<NormalizedCacheObject>
): DataProvider => {
  return {
    getApiUrl: () => "",

    getList: async ({ resource, filters }) => {
      const cfg = ensureResource(resource);
      const condFilter = filters?.[0];
      let cond: string | null = null;
      if (condFilter && "value" in condFilter) {
        const value = (condFilter as any).value;
        const field = (condFilter as any).field as string | undefined;
        if (field && value != null && value !== "") {
          cond = `it.${field}.id=='${String(value)}'`;
        } else if (value != null && value !== "") {
          cond = String(value);
        }
      }

      const result = await apolloClient.query({
        query: cfg.operations.list,
        variables: { cond },
        fetchPolicy: "network-only",
      });

      const data = getByPath(result.data, cfg.responsePath.list) ?? [];
      return { data, total: data.length };
    },

    getOne: async ({ resource, id }) => {
      const cfg = ensureResource(resource);
      const result = await apolloClient.mutate({
        mutation: cfg.operations.getOne,
        variables: { id },
      });
      const data = getByPath(result.data, cfg.responsePath.getOne);
      return { data };
    },

    create: async ({ resource, variables }) => {
      const cfg = ensureResource(resource);

      if (cfg.kind === "dictionary") {
        const result = await apolloClient.mutate({
          mutation: cfg.operations.upsert,
          variables: { input: variables },
        });
        const data = getByPath(result.data, cfg.responsePath.upsert ?? []);
        return { data };
      }

      const result = await apolloClient.mutate({
        mutation: cfg.operations.create,
        variables: { input: variables },
      });
      const data = getByPath(result.data, cfg.responsePath.create ?? []);
      return { data };
    },

    update: async ({ resource, variables }) => {
      const cfg = ensureResource(resource);

      if (cfg.kind === "dictionary") {
        const result = await apolloClient.mutate({
          mutation: cfg.operations.upsert,
          variables: { input: variables },
        });
        const data = getByPath(result.data, cfg.responsePath.upsert ?? []);
        return { data };
      }

      const result = await apolloClient.mutate({
        mutation: cfg.operations.update,
        variables: { input: variables },
      });
      const data = getByPath(result.data, cfg.responsePath.update ?? []);
      return { data };
    },

    deleteOne: async ({ resource, id }) => {
      const cfg = ensureResource(resource);
      if (cfg.kind === "dictionary" || !cfg.operations.deleteOne) {
        throw new Error(`Delete is not available for resource: ${resource}`);
      }

      const result = await apolloClient.mutate({
        mutation: cfg.operations.deleteOne,
        variables: { id },
      });
      const data = getByPath(result.data, cfg.responsePath.deleteOne ?? []);
      return { data: { id, result: data } as any };
    },

    getMany: async ({ resource, ids }) => {
      const rows = await Promise.all(
        ids.map(async (id) => {
          const result = await (createDataProvider(apolloClient).getOne as any)({
            resource,
            id,
          });
          return result.data;
        })
      );
      return { data: rows };
    },
  };
};

