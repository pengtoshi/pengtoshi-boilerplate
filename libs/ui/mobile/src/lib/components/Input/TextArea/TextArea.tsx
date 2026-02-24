import clsx from "clsx";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import type { TextInputProps } from "react-native";
import { Text } from "../../Display/Text/Text";

export type TextAreaProps = Omit<TextInputProps, "onChangeText" | "value" | "defaultValue"> & {
  value?: string;
  defaultValue?: string;
  guide?: string;
  error?: string;
  maxLength?: number;
  containerClassName?: string;
  onChangeText?: (value: string) => void;
};

export const TextArea = ({
  value,
  defaultValue,
  guide,
  error,
  editable = true,
  maxLength,
  containerClassName,
  onChangeText,
  ...props
}: TextAreaProps) => {
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

  return (
    <View className={clsx("w-full gap-[6px]", containerClassName)}>
      <View
        className={clsx(
          "h-[100px] rounded-md border border-line-normal bg-background-strong px-[16px] py-[10px] transition-colors duration-300",
          focused && "border-primary-normal bg-normal",
          !editable && "bg-background-disabled",
          !!error && "border-status-negative",
        )}
      >
        <TextInput
          className={clsx(
            "font-regular h-full px-0 py-0 text-14/body text-label-normal placeholder:text-label-placeholder",
            !editable && "text-label-disabled",
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editable={editable}
          multiline
          onChangeText={handleChangeText}
          textAlignVertical="top"
          value={internalValue}
          {...props}
        />
      </View>
      <View className="flex-row items-center justify-between gap-[16px]">
        <View className="gap-[2px]">
          {!!guide && <Text className="text-12/body text-label-assertive">{guide}</Text>}
          {!!error && <Text className="text-12/body text-status-negative">{error}</Text>}
        </View>
        {maxLength !== undefined && (
          <Text className="text-12/body text-label-assertive">
            {internalValue.length}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
};
