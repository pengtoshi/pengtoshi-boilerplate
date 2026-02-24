import type { AuthToken } from "@libs/model";

export type AuthTokenState = {
  accessToken?: string;
  refreshToken?: string;
};

export type MaybePromise<T> = T | Promise<T>;

export interface AuthTokenStorage {
  getToken: () => MaybePromise<AuthTokenState>;
  setToken: (token: AuthToken) => MaybePromise<void>;
  removeToken: () => MaybePromise<void>;
}
