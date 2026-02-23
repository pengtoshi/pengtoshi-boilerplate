import clsx from "clsx";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import type { TextInputProps } from "react-native";

export type TextFieldProps = Omit<TextInputProps, "onChangeText" | "value" | "defaultValue"> & {
  value?: string;
  defaultValue?: string;
  label?: string;
  guide?: string;
  error?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  onChangeText?: (value: string) => void;
  onClear?: () => void;
};

export const TextField = ({
  value,
  defaultValue,
  label,
  guide,
  error,
  leadingIcon,
  trailingIcon,
  editable = true,
  containerClassName,
  inputClassName,
  onChangeText,
  onClear,
  ...props
}: TextFieldProps) => {
  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");

  useEffect(() => {
    if (value === undefined) return;
    setInternalValue(value);
  }, [value]);

  const handleChangeText = (nextValue: string) => {
    setInternalValue(nextValue);
    onChangeText?.(nextValue);
  };

  const showClearButton = !!onClear && !!internalValue.length && editable;

  return (
    <View className={clsx("w-full gap-1.5", containerClassName)}>
      {!!label && <Text className="font-sans text-12/body text-label-assertive">{label}</Text>}
      <View
        className={clsx(
          "h-10 flex-row items-center gap-2.5 rounded-md border border-line-normal bg-background-strong px-4",
          editable ? "active:border-primary-normal" : "bg-background-disabled",
          !!error && "border-status-negative",
        )}
      >
        {leadingIcon}
        <TextInput
          className={clsx(
            "flex-1 font-sans text-14/body text-label-normal placeholder:text-label-placeholder",
            !editable && "text-label-disabled",
            inputClassName,
          )}
          editable={editable}
          onChangeText={handleChangeText}
          value={internalValue}
          {...props}
        />
        {trailingIcon}
        {showClearButton && (
          <Pressable
            accessibilityLabel="Clear input"
            accessibilityRole="button"
            className="rounded-md px-1 py-0.5 active:opacity-70"
            onPress={onClear}
          >
            <Text className="font-sans text-12/body text-label-assertive">Clear</Text>
          </Pressable>
        )}
      </View>
      <View className="gap-0.5">
        {!!guide && <Text className="font-sans text-12/body text-label-assertive">{guide}</Text>}
        {!!error && <Text className="font-sans text-12/body text-status-negative">{error}</Text>}
      </View>
    </View>
  );
};
