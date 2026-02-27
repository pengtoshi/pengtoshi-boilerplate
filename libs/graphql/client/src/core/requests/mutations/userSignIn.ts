import { useMutation } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const userSignIn = gql(/* GraphQL */ `
  mutation UserSignIn($input: UserSignInInput!) {
    userSignIn(input: $input) {
      accessToken
      refreshToken
    }
  }
`);

export const useSignIn = (options?: GQLOptions<typeof userSignIn>) => {
  return useMutation(userSignIn, {
    ...options,
  });
};
