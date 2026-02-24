import { createExpoTokenStorage } from "./token";
import { getApolloCoreClient, getGraphqlCoreClient } from "../../core/client/core";

export * from "./token";

export const getExpoApolloClient = (uri?: string, onAuthFailed?: () => void) => {
  return getApolloCoreClient({
    uri,
    tokenStorage: createExpoTokenStorage(),
    onAuthFailed,
  });
};

export const getExpoGraphqlClient = (uri?: string, onAuthFailed?: () => void) => {
  return getGraphqlCoreClient({
    uri,
    tokenStorage: createExpoTokenStorage(),
    onAuthFailed,
  });
};
