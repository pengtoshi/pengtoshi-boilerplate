import { Pressable, Text } from "react-native";

type UIButtonProps = {
  label: string;
  onPress?: () => void;
};

export const UIButton = ({ label, onPress }: UIButtonProps) => {
  return (
    <Pressable className="rounded-xl bg-primary-normal px-4 py-3 active:opacity-80" onPress={onPress}>
      <Text className="text-center text-white">{label}</Text>
    </Pressable>
  );
};
