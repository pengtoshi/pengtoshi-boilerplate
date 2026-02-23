import clsx from "clsx";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import type { PressableProps } from "react-native";

export type SwitchSize = "small" | "medium";

export type SwitchProps = Omit<PressableProps, "onPress"> & {
  active: boolean;
  onChange: (next: boolean) => void;
  size?: SwitchSize;
  disabled?: boolean;
  className?: string;
};

const switchSizeClasses: Record<SwitchSize, { track: string; thumb: string; translateX: string }> = {
  small: {
    track: "h-[18px] w-8",
    thumb: "h-[14px] w-[14px]",
    translateX: "translate-x-[14px]",
  },
  medium: {
    track: "h-[26px] w-12",
    thumb: "h-[22px] w-[22px]",
    translateX: "translate-x-[22px]",
  },
};

export const Switch = ({ active, onChange, size = "medium", disabled = false, className, ...props }: SwitchProps) => {
  const [internalActive, setInternalActive] = useState(active);

  useEffect(() => {
    setInternalActive(active);
  }, [active]);

  const sizeStyle = switchSizeClasses[size];

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: internalActive, disabled }}
      className={clsx(
        "justify-center rounded-full p-0.5 disabled:opacity-40",
        sizeStyle.track,
        internalActive ? "bg-primary-normal" : "bg-background-disabled",
        className,
      )}
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
          "rounded-full bg-normal transition-transform duration-200",
          sizeStyle.thumb,
          internalActive ? sizeStyle.translateX : "translate-x-0",
        )}
      />
    </Pressable>
  );
};
