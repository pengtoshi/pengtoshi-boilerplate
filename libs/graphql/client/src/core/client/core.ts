import type { ApolloCache, NormalizedCacheObject } from "@apollo/client";
import { ApolloClient, InMemoryCache, createHttpLink, from, fromPromise } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import type { AuthToken } from "@libs/model";
import type { AuthTokenStorage } from "./token-storage";
import { refreshTokens } from "../requests/mutations/refreshTokens";

const REFRESH_TOKEN_OPERATIONS = new Set(["refreshTokens", "RefreshTokens"]);

const resolveGraphqlUri = (uri?: string) => {
  const inputUrl = uri ?? process.env.NEXT_PUBLIC_SERVER_URL ?? process.env.EXPO_PUBLIC_SERVER_URL;
  if (!inputUrl) return undefined;
  return inputUrl.endsWith("/graphql") ? inputUrl : `${inputUrl}/graphql`;
};

const getNewToken = async (client: ApolloClient<NormalizedCacheObject>, refreshToken: string) => {
  const { data } = await client.mutate({
    mutation: refreshTokens,
    variables: { input: { refreshToken } },
    fetchPolicy: "no-cache",
  });

  return {
    accessToken: data?.refreshTokens.accessToken as string,
    refreshToken: data?.refreshTokens.refreshToken as string,
  };
};

export type GraphqlClientOptions = {
  uri?: string;
  tokenStorage: AuthTokenStorage;
  onAuthFailed?: () => void;
  cache?: ApolloCache<NormalizedCacheObject>;
};

export const getApolloCoreClient = ({ uri, tokenStorage, onAuthFailed, cache }: GraphqlClientOptions) => {
  let client: ApolloClient<NormalizedCacheObject>;
  const graphqlUrl = resolveGraphqlUri(uri);

  const serverLink = createHttpLink({
    uri: graphqlUrl,
    fetchOptions: {
      mode: "cors",
    },
    fetch,
  });

  const authLink = setContext(async (_, { headers }) => {
    const { accessToken } = await tokenStorage.getToken();
    if (!accessToken) {
      return { headers };
    }

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    const graphQLError = graphQLErrors?.[0];
    if (!graphQLError) return;
    if (REFRESH_TOKEN_OPERATIONS.has(operation.operationName)) return;

    const errorCode = graphQLError.extensions.code as string;

    const handleRemoveToken = async () => {
      await tokenStorage.removeToken();
      if (onAuthFailed) {
        onAuthFailed();
        return;
      }

      if (typeof window !== "undefined") {
        window.location.reload();
      }
    };

    return fromPromise(Promise.resolve(tokenStorage.getToken()))
      .filter((token) => Boolean(token))
      .flatMap((token) => {
        const { accessToken, refreshToken } = token;

        if (!accessToken && !refreshToken) return forward(operation);

        if (!(accessToken && refreshToken) || errorCode === "UNAUTHENTICATED") {
          return fromPromise(handleRemoveToken()).flatMap(() => {
            const oldHeaders = operation.getContext()?.headers || {};
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: "",
              },
            });
            return forward(operation);
          });
        }

        if (["TOKEN_EXPIRED_ERROR", "UNAUTHORIZED"].includes(errorCode)) {
          return fromPromise(
            getNewToken(client, refreshToken)
              .then(async (newToken) => {
                await tokenStorage.setToken(newToken);
                return newToken;
              })
              .catch(async () => {
                await handleRemoveToken();
                return undefined;
              }),
          )
            .filter((value) => Boolean(value))
            .flatMap((nextToken) => {
              const newToken = nextToken as AuthToken;
              const oldHeaders = operation.getContext()?.headers || {};
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${newToken.accessToken}`,
                },
              });
              return forward(operation);
            });
        }

        return forward(operation);
      });
  });

  client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([authLink, errorLink, serverLink]),
    cache: cache ?? new InMemoryCache(),
  });

  return client;
};

export const getGraphqlCoreClient = (options: GraphqlClientOptions) => {
  return getApolloCoreClient(options);
};
