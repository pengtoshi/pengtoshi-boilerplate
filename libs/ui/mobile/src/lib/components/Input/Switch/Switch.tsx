import clsx from "clsx";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import type { PressableProps } from "react-native";

export type SwitchProps = Omit<PressableProps, "onPress"> & {
  active: boolean;
  onChange?: (next: boolean) => void;
  handleClick?: () => void;
  size?: "small" | "medium";
  disabled?: boolean;
  className?: string;
};

const SwitchSize = {
  toggle: {
    small: "h-[14px] w-[14px]",
    medium: "h-[22px] w-[22px]",
  },
  container: {
    small: "h-[18px] w-[32px]",
    medium: "h-[26px] w-[48px]",
  },
};

const getTranslateClass = (active: boolean, size: "small" | "medium") => {
  if (!active) return "translate-x-0";
  return size === "medium" ? "translate-x-[22px]" : "translate-x-[14px]";
};

export const Switch = ({
  active,
  onChange,
  handleClick,
  size = "medium",
  disabled = false,
  className,
  ...props
}: SwitchProps) => {
  const [internalActive, setInternalActive] = useState(active);

  useEffect(() => {
    setInternalActive(active);
  }, [active]);

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: internalActive, disabled }}
      className={clsx(
        "relative z-10 flex-shrink-0 rounded-full transition-colors duration-300 disabled:opacity-40",
        SwitchSize.container[size],
        internalActive ? "bg-primary-normal" : "bg-background-disabled",
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
          "absolute left-0.5 top-0.5 z-20 flex-shrink-0 rounded-full bg-normal transition-transform duration-200",
          SwitchSize.toggle[size],
          getTranslateClass(internalActive, size),
        )}
      />
    </Pressable>
  );
};
