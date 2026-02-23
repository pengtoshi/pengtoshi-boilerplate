import clsx from "clsx";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import type { PressableProps } from "react-native";

export type RadioSize = "small" | "medium";

export type RadioProps = Omit<PressableProps, "onPress"> & {
  active: boolean;
  onChange?: (next: boolean) => void;
  handleClick?: () => void;
  size?: RadioSize;
  disabled?: boolean;
  className?: string;
};

const radioSizeClasses: Record<RadioSize, string> = {
  small: "h-[20px] w-[20px]", // 5*4
  medium: "h-[24px] w-[24px]", // 6*4
};

const selectedBorderClasses: Record<RadioSize, string> = {
  small: "border-[4px]",
  medium: "border-[5px]",
};

export const Radio = ({
  active,
  onChange,
  handleClick,
  size = "medium",
  disabled = false,
  className,
  ...props
}: RadioProps) => {
  const [internalActive, setInternalActive] = useState(active);

  useEffect(() => {
    setInternalActive(active);
  }, [active]);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: internalActive, disabled }}
      className={clsx(
        "items-center justify-center p-[2px] disabled:opacity-40", // 0.5*4
        radioSizeClasses[size],
        className,
      )}
      disabled={disabled}
      onPress={() => {
        const next = !internalActive;
        setInternalActive(next);
        onChange?.(next);
        handleClick?.();
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
