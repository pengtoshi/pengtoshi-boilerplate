import { View } from "react-native";
import { UIButton, UIText } from "@libs/ui-mobile";

export const Index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background-strong px-6">
      <UIText className="text-3xl font-bold text-primary-normal">NativeWind + Expo Router</UIText>
      <UIText className="text-base mt-3 text-center text-label-normal">
        apps/client-expo/src/app/index.tsx is now being rendered correctly.
      </UIText>
      <View className="mt-8 w-56">
        <UIButton label="UI Mobile Button" />
      </View>
    </View>
  );
};

export default Index;
