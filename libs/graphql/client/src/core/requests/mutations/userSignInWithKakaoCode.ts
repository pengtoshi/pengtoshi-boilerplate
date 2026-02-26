import { useMutation } from "@apollo/client";
import type { GQLOptions } from "../../client/graphql";
import { gql } from "../__generated__/index";

export const userSignInWithKakaoCode = gql(/* GraphQL */ `
  mutation UserSignInWithKakaoCode($input: UserSignInWithKakaoCodeInput!) {
    userSignInWithKakaoCode(input: $input) {
      accessToken
      refreshToken
    }
  }
`);

export const useSignInWithKakaoCode = (options?: GQLOptions<typeof userSignInWithKakaoCode>) => {
  return useMutation(userSignInWithKakaoCode, {
    ...options,
  });
};
