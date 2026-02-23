import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSystemColorScheme } from "@libs/ui-mobile";
import "../global.css";

export const RootLayout = () => {
  const colorScheme = useSystemColorScheme();

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
