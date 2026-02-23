import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
      <SafeAreaProvider>
        <SafeAreaView style={styles.screen}>
          <View style={styles.canvas}>
            <View style={styles.storySurface}>
              <Story />
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
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
