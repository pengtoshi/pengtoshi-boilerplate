import { View } from "react-native";
import { Button, Text } from "@libs/ui-mobile";

export const Index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background-strong px-6">
      <Text className="text-24/heading text-primary-normal">NativeWind + Expo Router</Text>
      <Text className="mt-3 text-center text-14/body text-label-normal">
        apps/client-expo/src/app/index.tsx is now being rendered correctly.
      </Text>
      <Text className="mt-3 text-center text-14/body/emp text-label-normal">
        apps/client-expo/src/app/index.tsx is now being rendered correctly.
      </Text>
      <View className="mt-8 w-56">
        <Button label="UI Mobile Button" />
      </View>
    </View>
  );
};

export default Index;
