import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { cache } from './cache'
import { AppRefine } from './refine/AppRefine';

export const App: React.FC = () => {
  const [apolloClient, setAppoloClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const runtimeEnv = (globalThis as any).process?.env ?? {}

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

  if (apolloClient)
  return (
    <ApolloProvider client={apolloClient}>
      <AppRefine apolloClient={apolloClient} />
    </ApolloProvider>
  )

  return (<>{"Loading..."}</>)
}