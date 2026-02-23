import clsx from "clsx";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import type { PressableProps } from "react-native";

export type RadioSize = "small" | "medium";

export type RadioProps = Omit<PressableProps, "onPress"> & {
  active: boolean;
  onChange: (next: boolean) => void;
  size?: RadioSize;
  disabled?: boolean;
  className?: string;
};

const radioSizeClasses: Record<RadioSize, string> = {
  small: "h-5 w-5",
  medium: "h-6 w-6",
};

const selectedBorderClasses: Record<RadioSize, string> = {
  small: "border-[4px]",
  medium: "border-[5px]",
};

export const Radio = ({ active, onChange, size = "medium", disabled = false, className, ...props }: RadioProps) => {
  const [internalActive, setInternalActive] = useState(active);

  useEffect(() => {
    setInternalActive(active);
  }, [active]);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: internalActive, disabled }}
      className={clsx("items-center justify-center p-0.5 disabled:opacity-40", radioSizeClasses[size], className)}
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
          "h-full w-full rounded-full bg-normal",
          internalActive
            ? clsx(selectedBorderClasses[size], "border-primary-normal")
            : "border-[1.5px] border-line-normal",
        )}
      />
    </Pressable>
  );
};
