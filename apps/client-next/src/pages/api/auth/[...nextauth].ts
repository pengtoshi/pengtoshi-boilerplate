/* eslint-disable no-param-reassign */
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthTokenManager, getGraphqlClient, userSignIn } from "@libs/graphql-next";
import { getCookie, removeCookie } from "@libs/utils-client-web";

type KakaoTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
const KAKAO_OAUTH_STATE_KEY = "kakao_oauth_state";
const KAKAO_OAUTH_REDIRECT_KEY = "oauth_redirect";

const getString = (value: unknown) => (typeof value === "string" ? value : undefined);

const getRequestOrigin = (req: NextApiRequest) => {
  const forwardedProto = getString(req.headers["x-forwarded-proto"]);
  const protocol = forwardedProto ?? (process.env.NODE_ENV === "development" ? "http" : "https");
  const host = req.headers.host ?? "localhost:4200";
  return `${protocol}://${host}`;
};

const resolveReturnUri = (req: NextApiRequest, res: NextApiResponse) => {
  const origin = getRequestOrigin(req);
  const fallback = new URL("/", origin);

  const oauthRedirect = getCookie(KAKAO_OAUTH_REDIRECT_KEY, { req, res }) as string | undefined;
  removeCookie(KAKAO_OAUTH_REDIRECT_KEY, { req, res });

  if (!oauthRedirect) {
    return fallback;
  }

  try {
    const parsed = new URL(oauthRedirect, origin);
    if (parsed.origin !== fallback.origin) {
      return fallback;
    }
    return parsed;
  } catch {
    return fallback;
  }
};

const redirectWithError = (res: NextApiResponse, returnUri: URL, error: string) => {
  returnUri.searchParams.set("error", error);
  return res.redirect(307, returnUri.toString());
};

const getKakaoAccessToken = async (code: string, redirectUri: string) => {
  const clientId = process.env.KAKAO_REST_API_KEY ?? process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  if (!clientId) {
    return { error: "KAKAO_REST_API_KEY_NOT_FOUND" } as const;
  }

  const clientSecret = process.env.KAKAO_CLIENT_SECRET;
  if (!clientSecret) {
    return { error: "KAKAO_CLIENT_SECRET_NOT_FOUND" } as const;
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
    client_secret: clientSecret,
  });

  const response = await fetch(KAKAO_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body,
  });

  const tokenResponse = (await response.json()) as KakaoTokenResponse;
  if (!response.ok || !tokenResponse.access_token) {
    return {
      error: tokenResponse.error ?? tokenResponse.error_description ?? "AUTH_TOKEN_NOT_FOUND",
    } as const;
  }

  return { accessToken: tokenResponse.access_token } as const;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const path = Array.isArray(req.query.nextauth) ? req.query.nextauth : [];
  const [action, provider] = path;
  if (action !== "callback" || provider !== "kakao") {
    res.status(404).json({ error: "NOT_FOUND" });
    return;
  }

  const returnUri = resolveReturnUri(req, res);

  const kakaoError = getString(req.query.error);
  if (kakaoError) {
    redirectWithError(res, returnUri, kakaoError);
    return;
  }

  const code = getString(req.query.code);
  if (!code) {
    redirectWithError(res, returnUri, "AUTH_CODE_NOT_FOUND");
    return;
  }

  const state = getString(req.query.state);
  const expectedState = getCookie(KAKAO_OAUTH_STATE_KEY, { req, res }) as string | undefined;
  removeCookie(KAKAO_OAUTH_STATE_KEY, { req, res });
  if (!expectedState || !state || expectedState !== state) {
    redirectWithError(res, returnUri, "OAUTH_STATE_MISMATCH");
    return;
  }

  const redirectUri =
    process.env.KAKAO_REDIRECT_URI ??
    process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ??
    `${getRequestOrigin(req)}/api/auth/callback/kakao`;

  const tokenResult = await getKakaoAccessToken(code, redirectUri);
  if ("error" in tokenResult) {
    redirectWithError(res, returnUri, tokenResult.error ?? "AUTH_TOKEN_NOT_FOUND");
    return;
  }

  const graphqlServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!graphqlServerUrl) {
    redirectWithError(res, returnUri, "GRAPHQL_SERVER_URL_NOT_FOUND");
    return;
  }

  try {
    const graphqlClient = getGraphqlClient(graphqlServerUrl, { req, res });
    const signInResult = await graphqlClient.mutate({
      mutation: userSignIn,
      variables: {
        input: {
          kakaoAccessToken: tokenResult.accessToken,
        },
      },
      fetchPolicy: "no-cache",
    });

    const token = signInResult.data?.userSignIn;
    if (!token) {
      redirectWithError(res, returnUri, "AUTH_TOKEN_NOT_FOUND");
      return;
    }

    AuthTokenManager.setToken(token, { req, res });
    res.redirect(307, returnUri.toString());
  } catch {
    redirectWithError(res, returnUri, "SIGN_IN_FAILED");
  }
}
