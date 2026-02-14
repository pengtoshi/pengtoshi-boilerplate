import { PropsWithChildren } from "react";
import { Text } from "react-native";

type UITextProps = PropsWithChildren<{
  className?: string;
}>;

export const UIText = ({ children, className }: UITextProps) => {
  return <Text className={className}>{children}</Text>;
};
