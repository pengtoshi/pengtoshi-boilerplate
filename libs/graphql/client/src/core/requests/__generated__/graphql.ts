/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: { input: any; output: any; }
};

/** 인증 방식 */
export type AuthProvider =
  | 'KAKAO';

export type AuthToken = {
  /** Access token */
  accessToken: Scalars['JWT']['output'];
  /** Refresh token */
  refreshToken: Scalars['JWT']['output'];
};

export type AuthTokenInput = {
  /** Access token */
  accessToken?: InputMaybe<Scalars['String']['input']>;
  /** Refresh token */
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  refreshTokens: AuthToken;
  requestLogin: UserInfo;
  verifyLogin: AuthToken;
};


export type MutationRefreshTokensArgs = {
  input: AuthTokenInput;
};


export type MutationRequestLoginArgs = {
  input: UserInput;
};


export type MutationVerifyLoginArgs = {
  input: VerifyUserInput;
};

export type Query = {
  findAllUsers: Array<UserInfo>;
  findUser: UserInfo;
};

/** 사용자 역할 */
export type Role =
  | 'ADMIN'
  | 'USER';

/** 사용자 상태 */
export type Status =
  | 'ACTIVE'
  | 'DELETE'
  | 'INACTIVE';

/** User Model */
export type UserInfo = {
  /** Auth Provider */
  authProvider: AuthProvider;
  /** Created At */
  createdAt: Scalars['DateTime']['output'];
  /** Email */
  email?: Maybe<Scalars['String']['output']>;
  /** User Id */
  id: Scalars['String']['output'];
  /** Kakao User Id */
  kakaoId?: Maybe<Scalars['String']['output']>;
  /** Role */
  role: Role;
  /** Status */
  status: Status;
  /** Updated At */
  updatedAt: Scalars['DateTime']['output'];
};

export type UserInput = {
  /** 카카오 액세스 토큰 */
  kakaoAccessToken: Scalars['String']['input'];
};

export type VerifyUserInput = {
  /** 카카오 액세스 토큰 */
  kakaoAccessToken: Scalars['String']['input'];
};

export type UserFragment = { id: string, email?: string | null, role: Role, status: Status, createdAt: any, updatedAt: any };

export type RefreshTokensMutationVariables = Exact<{
  input: AuthTokenInput;
}>;


export type RefreshTokensMutation = { refreshTokens: { accessToken: any, refreshToken: any } };

export type RequestLoginMutationVariables = Exact<{
  input: UserInput;
}>;


export type RequestLoginMutation = { requestLogin: { id: string, email?: string | null, role: Role, status: Status, createdAt: any, updatedAt: any } };

export type VerifyLoginMutationVariables = Exact<{
  input: VerifyUserInput;
}>;


export type VerifyLoginMutation = { verifyLogin: { accessToken: any, refreshToken: any } };

export type FindUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserQuery = { findUser: { id: string, email?: string | null, role: Role, status: Status, createdAt: any, updatedAt: any } };

export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const RefreshTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const RequestLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<RequestLoginMutation, RequestLoginMutationVariables>;
export const VerifyLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<VerifyLoginMutation, VerifyLoginMutationVariables>;
export const FindUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<FindUserQuery, FindUserQueryVariables>;