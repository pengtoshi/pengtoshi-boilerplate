import { ApolloProvider } from "@apollo/client";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { Text, View, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ReanimatedLogLevel, configureReanimatedLogger } from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getExpoApolloClient } from "@libs/graphql-mobile";
import { Toaster } from "@libs/ui-mobile";
import "../global.css";

SplashScreen.preventAutoHideAsync().catch(() => null);

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export const RootLayout = () => {
  const colorScheme = useColorScheme();

  // GraphQL Client
  const graphqlServerUrl = process.env.EXPO_PUBLIC_SERVER_URL;
  const apolloClient = useMemo(() => {
    if (!graphqlServerUrl) return null;
    return getExpoApolloClient(graphqlServerUrl);
  }, [graphqlServerUrl]);

  const [fontsLoaded, fontsLoadingError] = useFonts({
    "Aspekta-Regular": require("../../assets/shared/fonts/Aspekta-Regular.otf"),
    "Aspekta-Medium": require("../../assets/shared/fonts/Aspekta-Medium.otf"),
    "Aspekta-SemiBold": require("../../assets/shared/fonts/Aspekta-SemiBold.otf"),
    "Aspekta-Bold": require("../../assets/shared/fonts/Aspekta-Bold.otf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontsLoadingError) {
      SplashScreen.hideAsync().catch(() => null);
    }
  }, [fontsLoaded, fontsLoadingError]);

  if (!fontsLoaded && !fontsLoadingError) {
    return null;
  }

  if (!apolloClient) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
        <Text style={{ textAlign: "center" }}>EXPO_PUBLIC_SERVER_URL 환경변수를 설정해주세요.</Text>
      </View>
    );
  }

  return (
    <ApolloProvider client={apolloClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="(main)" />
              <Stack.Screen name="oauth/kakao" />
            </Stack>
            <Toaster />
            <PortalHost />
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
};

export default RootLayout;
