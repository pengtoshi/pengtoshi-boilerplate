import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { createExpoTokenStorage } from "@libs/graphql-mobile";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { accessToken } = await createExpoTokenStorage().getToken();
      if (accessToken) {
        router.replace("/(main)");
      } else {
        router.replace("/login");
      }
    };
    checkAuth().catch(() => router.replace("/login"));
  }, [router]);

  return (
    <View className="bg-background-normal flex-1 items-center justify-center">
      <ActivityIndicator />
    </View>
  );
};

export default Index;
