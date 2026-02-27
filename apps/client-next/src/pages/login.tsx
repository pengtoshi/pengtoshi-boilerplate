import clsx from "clsx";
import { LoaderIcon } from "lucide-react";
import type { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { Button, Icon } from "@libs/ui-web";
import KakaoIcon from "~/client-next/public/shared/images/kakao.png";
import {
  KAKAO_AUTHORIZE_URL,
  KAKAO_OAUTH_REDIRECT_KEY,
  KAKAO_OAUTH_STATE_KEY,
  createOauthState,
  getDefaultRedirectUri,
  hasAccessToken,
  setClientSessionCookie,
  toSafeReturnPath,
} from "../utils/auth";

const AUTH_ERROR_MESSAGE: Record<string, string> = {
  ACCESS_DENIED: "카카오 인증이 취소되었습니다. 다시 시도해주세요.",
  AUTH_CODE_NOT_FOUND: "인가 코드를 받지 못했습니다. 다시 로그인해주세요.",
  OAUTH_STATE_MISMATCH: "보안 검증에 실패했습니다. 다시 로그인해주세요.",
  AUTH_TOKEN_NOT_FOUND: "토큰 발급에 실패했습니다. 잠시 후 다시 시도해주세요.",
  SIGN_IN_FAILED: "서버 로그인 처리 중 오류가 발생했습니다.",
  SESSION_EXPIRED: "세션이 만료되어 다시 로그인해야 합니다.",
};

const LoginPage = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const nextPath = useMemo(() => toSafeReturnPath(router.query.next), [router.query.next]);
  const queryError = useMemo(() => {
    const rawError = router.query.error;
    if (typeof rawError !== "string") return null;
    return AUTH_ERROR_MESSAGE[rawError] ?? `로그인 중 오류가 발생했습니다. (${rawError})`;
  }, [router.query.error]);

  const kakaoRestApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const kakaoRedirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ?? getDefaultRedirectUri();

  const handleKakaoLogin = useCallback(() => {
    setLocalError(null);

    if (!kakaoRestApiKey || !kakaoRedirectUri) {
      setLocalError("NEXT_PUBLIC_KAKAO_REST_API_KEY / NEXT_PUBLIC_KAKAO_REDIRECT_URI 설정을 확인하세요.");
      return;
    }

    const oauthState = createOauthState();
    const returnUrl = `${window.location.origin}${nextPath}`;

    setClientSessionCookie(KAKAO_OAUTH_STATE_KEY, oauthState);
    setClientSessionCookie(KAKAO_OAUTH_REDIRECT_KEY, returnUrl);

    const params = new URLSearchParams({
      client_id: kakaoRestApiKey,
      redirect_uri: kakaoRedirectUri,
      response_type: "code",
      state: oauthState,
    });

    setIsPending(true);
    window.location.href = `${KAKAO_AUTHORIZE_URL}?${params.toString()}`;
  }, [kakaoRedirectUri, kakaoRestApiKey, nextPath]);

  return (
    <div className="relative flex min-h-full items-center justify-center overflow-hidden bg-background-strong dark:bg-dark-background-strong">
      <div className="flex w-full max-w-[480px] items-center justify-center rounded-3xl border border-line-normal bg-normal px-16 py-12 dark:border-dark-line-normal dark:bg-dark-normal">
        <div className="flex w-full flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <span className="text-20/heading text-label-normal dark:text-dark-label-normal">관리자 페이지</span>
            <span className="text-16/body text-label-assertive dark:text-dark-label-assertive">
              관리자 페이지 예시 로그인 화면이예요.
            </span>
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            <Button
              size="large"
              className={clsx("w-full max-w-[320px] !bg-[#FEE500]", isPending && "opacity-50")}
              onClick={handleKakaoLogin}
              leftIcon={
                isPending ? (
                  <Icon component={LoaderIcon} size={24} className="text-black" />
                ) : (
                  <Image src={KakaoIcon} alt="kakao" width={24} height={24} />
                )
              }
            >
              <span className="text-center text-black">카카오로 계속하기</span>
            </Button>
            {queryError || localError ? (
              <span className="text-12/body text-status-negative dark:text-dark-status-negative">
                {queryError ?? localError}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = (context) => {
  if (hasAccessToken(context)) {
    const destination = toSafeReturnPath(context.query.next);
    return Promise.resolve({
      redirect: {
        destination: destination === "/login" ? "/" : destination,
        permanent: false,
      },
    });
  }

  return Promise.resolve({ props: {} });
};

export default LoginPage;
