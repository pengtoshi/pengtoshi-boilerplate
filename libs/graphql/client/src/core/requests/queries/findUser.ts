import { useLazyQuery, useQuery } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const findUser = gql(/* GraphQL */ `
  query FindUser {
    findUser {
      ...User
    }
  }
`);

export const useFindUser = (isAuthenticated: boolean) => {
  return useQuery(findUser, {
    skip: !isAuthenticated,
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useLazyFindUser = (options?: GQLOptions<typeof findUser>) => {
  return useLazyQuery(findUser, {
    ...options,
    fetchPolicy: "cache-and-network",
  });
};
