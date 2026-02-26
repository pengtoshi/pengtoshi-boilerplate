import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AuthTokenManager } from "@libs/graphql-next";

export const KAKAO_AUTHORIZE_URL = "https://kauth.kakao.com/oauth/authorize";
export const KAKAO_OAUTH_STATE_KEY = "kakao_oauth_state";
export const KAKAO_OAUTH_REDIRECT_KEY = "oauth_redirect";

export const createOauthState = () => {
  const bytes = new Uint8Array(16);
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export const setClientSessionCookie = (key: string, value: string) => {
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/; samesite=lax`;
};

export const getDefaultRedirectUri = () => {
  if (typeof window === "undefined") return undefined;
  return `${window.location.origin}/api/auth/callback/kakao`;
};

export const hasAccessToken = (context: GetServerSidePropsContext) => {
  const token = AuthTokenManager.getCurrentToken({
    req: context.req,
    res: context.res,
  });
  return Boolean(token.accessToken);
};

export const toSafeReturnPath = (value?: string | string[]) => {
  const rawPath = Array.isArray(value) ? value[0] : value;

  if (!rawPath || !rawPath.startsWith("/")) {
    return "/";
  }

  if (rawPath.startsWith("//")) {
    return "/";
  }

  return rawPath;
};

export const withAuthServerSideProps =
  <P extends Record<string, unknown> = Record<string, never>>(inner?: GetServerSideProps<P>): GetServerSideProps<P> =>
  async (context) => {
    if (!hasAccessToken(context)) {
      const nextPath = toSafeReturnPath(context.resolvedUrl);
      return {
        redirect: {
          destination: `/login?next=${encodeURIComponent(nextPath)}`,
          permanent: false,
        },
      };
    }
    return inner ? inner(context) : { props: {} as P };
  };
