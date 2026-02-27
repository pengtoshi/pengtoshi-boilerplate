import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { LocalStorageWrapper, persistCache } from "apollo3-cache-persist";
import { useState } from "react";
import { useMount } from "react-use";
import type { CookieContext } from "@libs/utils-client-web";
import { createWebTokenStorage, getCurrentToken, removeToken, setToken } from "./token";
import { authCookieKey } from "../../core/client/auth-cookie-key";
import { getApolloCoreClient, getGraphqlCoreClient } from "../../core/client/core";

export const AuthTokenManager = {
  authCookieKey,
  getCurrentToken,
  removeToken,
  setToken,
};

export const getApolloClient = (uri?: string, cookieContext?: CookieContext) => {
  return getApolloCoreClient({
    uri,
    tokenStorage: createWebTokenStorage(cookieContext),
  });
};

export const getGraphqlClient = (uri?: string, cookieContext?: CookieContext) => {
  return getGraphqlCoreClient({
    uri,
    tokenStorage: createWebTokenStorage(cookieContext),
  });
};

export const useGraphqlClient = (uri?: string, cookieContext?: CookieContext) => {
  const [cache] = useState(() => new InMemoryCache());
  const [client] = useState<ApolloClient<NormalizedCacheObject>>(() =>
    getApolloCoreClient({
      uri,
      tokenStorage: createWebTokenStorage(cookieContext),
      cache,
    }),
  );

  useMount(() => {
    if (typeof window === "undefined") return;
    persistCache({
      cache: client.cache,
      storage: new LocalStorageWrapper(window.localStorage),
    }).catch((error) => {
      console.error(error);
    });
  });
  return client;
};
