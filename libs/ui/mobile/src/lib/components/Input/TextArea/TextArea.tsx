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

  useEffect(() => {
    if (value === undefined) return;
    setInternalValue(value);
  }, [value]);

  const handleChangeText = (nextValue: string) => {
    setInternalValue(nextValue);
    onChangeText?.(nextValue);
  };

  return (
    <View className={clsx("w-full gap-1.5", containerClassName)}>
      <View
        className={clsx(
          "min-h-[100px] rounded-md border border-line-normal bg-background-strong px-4 py-2.5",
          !editable && "bg-background-disabled",
          !!error && "border-status-negative",
        )}
      >
        <TextInput
          className={clsx(
            "text-14/body text-label-normal placeholder:text-label-placeholder",
            !editable && "text-label-disabled",
          )}
          editable={editable}
          multiline
          onChangeText={handleChangeText}
          textAlignVertical="top"
          value={internalValue}
          {...props}
        />
      </View>
      <View className="flex-row items-center justify-between gap-4">
        <View className="gap-0.5">
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
