import { Text, View } from "react-native";

export const Index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-slate-950 px-6">
      <Text className="text-3xl font-bold text-lime-400">NativeWind + Expo Router</Text>
      <Text className="text-base mt-3 text-center text-slate-200">
        apps/client-expo/src/app/index.tsx is now being rendered correctly.
      </Text>
      <View className="mt-8 h-12 w-12 rounded-xl bg-rose-500" />
    </View>
  );
};

export default Index;
