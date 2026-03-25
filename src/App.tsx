import 'antd/dist/antd.css';
import React, { useEffect, useMemo, useState } from 'react';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import type { AuthProvider } from '@refinedev/core';
import Keycloak from 'keycloak-js';
import { cache } from './cache'
import { AppRefine } from './refine/AppRefine';
import { getAuthConfig } from './refine/authConfig';
import { createRefineAuthProvider } from './refine/authProviderFactory';
import { initKeycloak } from './refine/keycloakInit';

export const App: React.FC = () => {
  const [apolloClient, setAppoloClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const runtimeEnv = (globalThis as any).process?.env ?? {}
  const authCfg = getAuthConfig();
  const [keycloak, setKeycloak] = useState<Keycloak.KeycloakInstance | null | undefined>(undefined);

  const initEnv = async () => {
    const res = await fetch("/env.json")
    const json = JSON.parse(await res.text())
    runtimeEnv.DS_ENDPOINT = json.DS_ENDPOINT
  }

  const initClient = async () => {
    if (runtimeEnv.NODE_ENV === 'production')
      await initEnv()

    if (!apolloClient) {
      return new ApolloClient({
        cache: cache,
        uri: runtimeEnv.NODE_ENV === 'production' ? runtimeEnv.DS_ENDPOINT : '/graphql',
      })
    }
  }

  useEffect(() => {
    const appoloClientInit = async () => {
      const apolloClient = await initClient()
      setAppoloClient(apolloClient)
    }

    appoloClientInit()
    
  }, [])

  useEffect(() => {
    if (!authCfg.enabled || authCfg.provider !== "keycloak") {
      setKeycloak(null);
      return;
    }
    let cancelled = false;
    initKeycloak(authCfg.keycloakClientPath).then((kc) => {
      if (!cancelled) setKeycloak(kc);
    });
    return () => {
      cancelled = true;
    };
  }, [authCfg.enabled, authCfg.provider, authCfg.keycloakClientPath]);

  const authProvider: AuthProvider | undefined = useMemo(() => {
    try {
      return createRefineAuthProvider(authCfg, keycloak ?? null);
    } catch {
      return undefined;
    }
  }, [authCfg, keycloak]);

  const authBlocking =
    authCfg.enabled &&
    authCfg.provider === "keycloak" &&
    keycloak === undefined;

  if (apolloClient && authBlocking) {
    return <>Loading authentication…</>;
  }

  if (apolloClient && authCfg.enabled && authCfg.provider === "keycloak" && keycloak === null) {
    return (
      <div style={{ padding: 24 }}>
        Keycloak client could not be loaded. Ensure <code>{authCfg.keycloakClientPath}</code> exists in <code>public/</code>{" "}
        and points to your realm (see <code>public/keycloak.json.example</code>).
      </div>
    );
  }

  if (apolloClient)
  return (
    <ApolloProvider client={apolloClient}>
      <AppRefine apolloClient={apolloClient} authProvider={authProvider} />
    </ApolloProvider>
  )

  return (<>{"Loading..."}</>)
}
