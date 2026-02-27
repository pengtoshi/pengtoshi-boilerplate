import { useMutation } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const signOut = gql(/* GraphQL */ `
  mutation SignOut {
    signOut
  }
`);

export const useSignOut = (options?: GQLOptions<typeof signOut>) => {
  return useMutation(signOut, {
    ...options,
  });
};
