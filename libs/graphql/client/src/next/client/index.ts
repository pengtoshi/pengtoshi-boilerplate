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
