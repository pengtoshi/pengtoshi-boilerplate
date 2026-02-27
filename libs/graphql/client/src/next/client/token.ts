import type { AuthToken } from "@libs/model";
import { getCookie, removeCookie, setCookie } from "@libs/utils-client-web";
import type { CookieContext } from "@libs/utils-client-web";
import { authCookieKey } from "../../core/client/auth-cookie-key";
import type { AuthTokenStorage } from "../../core/client/token-storage";

export interface AuthCookieContext extends CookieContext {
  authCookieKey: {
    accessToken: string;
    refreshToken: string;
  };
}

export const getCurrentToken = (cookieContext?: CookieContext) => {
  const context: AuthCookieContext = { authCookieKey, ...cookieContext };

  const accessToken = getCookie(context.authCookieKey.accessToken, context) as string | undefined;
  const refreshToken = getCookie(context.authCookieKey.refreshToken, context) as string | undefined;

  return {
    accessToken,
    refreshToken,
  };
};

export const removeToken = (cookieContext?: CookieContext) => {
  const context: AuthCookieContext = { authCookieKey, ...cookieContext };
  removeCookie(context.authCookieKey.accessToken, context);
  removeCookie(context.authCookieKey.refreshToken, context);
};

export const setToken = (token: AuthToken, cookieContext?: CookieContext) => {
  const context: AuthCookieContext = { authCookieKey, ...cookieContext };
  setCookie(
    context.authCookieKey.accessToken,
    token.accessToken,
    new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    context,
  );
  setCookie(
    context.authCookieKey.refreshToken,
    token.refreshToken,
    new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    context,
  );
};

export const createWebTokenStorage = (cookieContext?: CookieContext): AuthTokenStorage => {
  return {
    getToken: () => getCurrentToken(cookieContext),
    setToken: (token: AuthToken) => setToken(token, cookieContext),
    removeToken: () => removeToken(cookieContext),
  };
};
