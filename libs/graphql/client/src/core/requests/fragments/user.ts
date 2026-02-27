import { gql } from "../__generated__/index";

export const userFragment = gql(/* GraphQL */ `
  fragment User on UserInfo {
    id
    email
    role
    status
    createdAt
    updatedAt
  }
`);
