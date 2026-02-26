import clsx from "clsx";
import * as Crypto from "expo-crypto";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Image, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createExpoTokenStorage, useSignInWithKakaoCode } from "@libs/graphql-mobile";
import { Button, Text } from "@libs/ui-mobile";
import KakaoIcon from "~/client-expo/assets/shared/images/kakao.png";

const KAKAO_AUTHORIZE_URL = "https://kauth.kakao.com/oauth/authorize";
const PKCE_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

const getRandomBytes = (length: number) => {
  const bytes = new Uint8Array(length);
  try {
    Crypto.getRandomValues(bytes);
  } catch {
    // crypto를 지원하지 않는 환경 fallback
    for (let i = 0; i < length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
};

const createOauthState = () => {
  const bytes = getRandomBytes(16);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
};

const createCodeVerifier = (length = 64) => {
  const safeLength = Math.min(128, Math.max(43, length));
  const bytes = getRandomBytes(safeLength);
  return Array.from(bytes, (b) => PKCE_CHARSET[b % PKCE_CHARSET.length]).join("");
};

const createCodeChallenge = async (codeVerifier: string) => {
  const base64 = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, codeVerifier, {
    encoding: Crypto.CryptoEncoding.BASE64,
  });
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const LoginScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [signInWithKakaoCode] = useSignInWithKakaoCode();

  // PKCE 데이터를 메모리에 보관 (SecureStore 불필요)
  const pkceRef = useRef<{ state: string; codeVerifier: string } | null>(null);

  const kakaoRestApiKey = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;
  const kakaoRedirectUri = process.env.EXPO_PUBLIC_KAKAO_REDIRECT_URI;
  const appRedirectUri = process.env.EXPO_PUBLIC_KAKAO_APP_REDIRECT_URI ?? "client-expo://oauth/kakao";

  const handleKakaoSignIn = useCallback(async () => {
    setErrorMessage(null);

    if (!kakaoRestApiKey || !kakaoRedirectUri) {
      setErrorMessage("EXPO_PUBLIC_KAKAO_REST_API_KEY / EXPO_PUBLIC_KAKAO_REDIRECT_URI 설정을 확인하세요.");
      return;
    }
    if (Platform.OS === "web") {
      setErrorMessage("웹에서는 카카오 OAuth를 지원하지 않습니다. iOS/Android에서 테스트하세요.");
      return;
    }

    setLoading(true);
    try {
      const oauthState = createOauthState();
      const codeVerifier = createCodeVerifier();
      const codeChallenge = await createCodeChallenge(codeVerifier);

      pkceRef.current = { state: oauthState, codeVerifier };

      const params = new URLSearchParams({
        client_id: kakaoRestApiKey,
        redirect_uri: kakaoRedirectUri,
        response_type: "code",
        state: oauthState,
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
      });
      // TODO: Enable after Kakao Business review passes.
      // params.set("scope", "account_email");

      const authorizeUrl = `${KAKAO_AUTHORIZE_URL}?${params.toString()}`;
      const result = await WebBrowser.openAuthSessionAsync(authorizeUrl, appRedirectUri);
      if (result.type !== "success") return;

      const callbackUrl = new URL(result.url);
      const code = callbackUrl.searchParams.get("code");
      const returnedState = callbackUrl.searchParams.get("state");
      const error = callbackUrl.searchParams.get("error");
      const errorDescription = callbackUrl.searchParams.get("error_description");

      if (error) {
        setErrorMessage([error, errorDescription].filter(Boolean).join(": ") || "카카오 인증에 실패했습니다.");
        return;
      }

      const pkce = pkceRef.current;
      // useRef에 저장된 state로 CSRF 검증 (SecureStore 불필요)
      if (!code || !pkce || returnedState !== pkce.state) {
        setErrorMessage("OAuth state 검증에 실패했습니다.");
        return;
      }

      // GraphQL 직접 호출 — 별도 화면 없이 인라인 처리
      const signInResult = await signInWithKakaoCode({
        variables: {
          input: {
            authorizationCode: code,
            redirectUri: kakaoRedirectUri,
            codeVerifier: pkce.codeVerifier,
          },
        },
      });

      const token = signInResult.data?.userSignInWithKakaoCode;
      if (!token) throw new Error("토큰 발급 실패");

      await createExpoTokenStorage().setToken(token);
      router.replace("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "카카오 로그인 처리에 실패했습니다.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
      pkceRef.current = null;
    }
  }, [appRedirectUri, kakaoRedirectUri, kakaoRestApiKey, signInWithKakaoCode, router]);

  return (
    <SafeAreaView edges={["top", "bottom"]} className="bg-background-normal flex-1">
      {/* Logo area */}
      <View className="flex-1 items-center justify-center gap-4">
        {/* TODO: Replace with your app logo */}
        <View className="h-20 w-20 items-center justify-center rounded-2xl bg-primary-normal">
          <Text className="text-24/heading" style={{ color: "#ffffff" }}>
            App
          </Text>
        </View>
        <Text className="text-20/heading text-label-normal">App Name</Text>
        <Text className="text-label-alternative text-14/body">서비스 소개 문구를 입력하세요</Text>
      </View>

      {/* Login button area */}
      <View className="gap-3 px-6 pb-16">
        {errorMessage ? <Text className="text-center text-12/body text-status-negative">{errorMessage}</Text> : null}
        {/* Kakao login button */}
        <Button
          className={clsx("w-full !bg-[#FEE500]", loading && "opacity-50")}
          size="large"
          onPress={() => handleKakaoSignIn().catch(() => undefined)}
          leftIcon={
            loading ? (
              <ActivityIndicator size={20} color="#000000" />
            ) : (
              <Image source={KakaoIcon} style={{ width: 20, height: 20 }} resizeMode="contain" />
            )
          }
          textClassName="!text-black"
        >
          카카오로 계속하기
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
