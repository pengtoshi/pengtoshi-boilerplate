import clsx from "clsx";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Pressable, TextInput, View } from "react-native";
import type { TextInputProps } from "react-native";
import { Text } from "../../Display/Text/Text";

export type TextFieldProps = Omit<TextInputProps, "onChangeText" | "value" | "defaultValue"> & {
  value?: string;
  defaultValue?: string;
  label?: string;
  guide?: string;
  isError?: boolean;
  errorGuide?: string | ReactNode;
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
  isError,
  errorGuide,
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
  const [focused, setFocused] = useState(false);

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
    <View className={clsx("w-full gap-[6px]", containerClassName)}>
      {!!label && <Text className="text-12/body text-label-assertive">{label}</Text>}
      <View
        className={clsx(
          "h-[40px] flex-row items-center gap-[10px] rounded-md border border-line-normal bg-background-strong px-[16px] transition-colors duration-300",
          editable ? "" : "bg-background-disabled",
          focused && "border-primary-normal bg-normal",
          isError && "border-status-negative",
        )}
      >
        {leadingIcon}
        <TextInput
          className={clsx(
            "font-regular flex-1 px-0 py-0 text-14/body text-label-normal placeholder:text-label-placeholder",
            !editable && "text-label-disabled",
            inputClassName,
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
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
            className="rounded-md px-[4px] py-[2px] active:opacity-70"
            onPress={onClear}
          >
            <Text className="text-12/body text-label-assertive">Clear</Text>
          </Pressable>
        )}
      </View>
      <View className="gap-[2px]">
        {!!guide && <Text className="text-12/body text-label-assertive">{guide}</Text>}
        {!!errorGuide && <Text className="text-12/body text-status-negative">{errorGuide}</Text>}
      </View>
    </View>
  );
};
