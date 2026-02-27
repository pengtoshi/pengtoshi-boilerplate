import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "@libs/ui-mobile";

/**
 * Kakao OAuth 딥링크 fallback 화면
 *
 * 정상 흐름에서는 login.tsx가 WebBrowser.openAuthSessionAsync()로 OAuth를 완료하고
 * 이 화면을 거치지 않습니다.
 *
 * 이 화면은 앱이 OAuth 도중 백그라운드/종료된 후 딥링크로 재진입하는 엣지 케이스에서만 표시됩니다.
 * 해당 상황에서는 codeVerifier를 복구할 수 없으므로 로그인 화면으로 리다이렉트합니다.
 */
const KakaoCallbackScreen = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-background-strong px-6">
      <ActivityIndicator />
      <Text className="mt-4 text-14/body text-label-normal">로그인 처리 중...</Text>
    </View>
  );
};

export default KakaoCallbackScreen;
