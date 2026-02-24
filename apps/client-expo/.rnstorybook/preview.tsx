import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Toaster } from "@libs/ui-mobile";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  canvas: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 28,
  },
  storySurface: {
    flex: 1,
    width: "100%",
    maxWidth: 420,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    padding: 16,
  },
});

const preview = {
  decorators: [
    (Story: React.ComponentType<any>) => (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <SafeAreaView style={styles.screen}>
              <View style={styles.canvas}>
                <View style={styles.storySurface}>
                  <Story />
                </View>
              </View>
              <Toaster />
              <PortalHost />
            </SafeAreaView>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    ),
  ],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
  },
};

export default preview;
