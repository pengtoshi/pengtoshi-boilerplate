import { useState } from "react";
import { Pressable, Text } from "react-native";
import type { TextFieldProps } from "./TextField";
import { TextField } from "./TextField";

export type PasswordFieldProps = Omit<TextFieldProps, "secureTextEntry" | "trailingIcon"> & {
  hiddenByDefault?: boolean;
};

export const PasswordField = ({ hiddenByDefault = true, ...props }: PasswordFieldProps) => {
  const [isHidden, setIsHidden] = useState(hiddenByDefault);

  return (
    <TextField
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={isHidden}
      trailingIcon={
        <Pressable
          accessibilityLabel={isHidden ? "Show password" : "Hide password"}
          accessibilityRole="button"
          className="rounded-md px-1 py-0.5 active:opacity-70"
          onPress={() => setIsHidden((prev) => !prev)}
        >
          <Text className="font-sans text-12/body text-label-assertive">{isHidden ? "Show" : "Hide"}</Text>
        </Pressable>
      }
      {...props}
    />
  );
};
