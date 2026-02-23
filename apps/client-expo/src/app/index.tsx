import { Text, View } from "react-native";
import { Button } from "@libs/ui-mobile";

export const Index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background-strong px-6">
      <Text className="text-3xl font-sans font-bold text-primary-normal">NativeWind + Expo Router</Text>
      <Text className="text-base mt-3 text-center font-sans text-label-normal">
        apps/client-expo/src/app/index.tsx is now being rendered correctly.
      </Text>
      <View className="mt-8 w-56">
        <Button label="UI Mobile Button" />
      </View>
    </View>
  );
};

export default Index;
