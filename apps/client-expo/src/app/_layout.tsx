import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { ReanimatedLogLevel, configureReanimatedLogger } from "react-native-reanimated";
import "../global.css";

SplashScreen.preventAutoHideAsync().catch(() => null);

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export const RootLayout = () => {
  const colorScheme = useColorScheme();
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

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
};

export default RootLayout;
