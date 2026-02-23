import clsx from "clsx";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import type { PressableProps } from "react-native";

export type CheckboxProps = Omit<PressableProps, "onPress"> & {
  active: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export const Checkbox = ({ active, onChange, disabled = false, className, ...props }: CheckboxProps) => {
  const [internalActive, setInternalActive] = useState(active);

  useEffect(() => {
    setInternalActive(active);
  }, [active]);

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: internalActive, disabled }}
      className={clsx("h-6 w-6 items-center justify-center p-[3px] disabled:opacity-40", className)}
      disabled={disabled}
      onPress={() => {
        const next = !internalActive;
        setInternalActive(next);
        onChange(next);
      }}
      {...props}
    >
      <View
        className={clsx(
          "h-full w-full items-center justify-center rounded-sm",
          internalActive ? "bg-primary-normal" : "border-[1.5px] border-line-normal bg-background-strong",
        )}
      >
        {internalActive && <Text className="font-sans text-12/body text-normal">✓</Text>}
      </View>
    </Pressable>
  );
};
