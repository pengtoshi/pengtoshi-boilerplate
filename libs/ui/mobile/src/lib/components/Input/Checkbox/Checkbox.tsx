import clsx from "clsx";
import { Check } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import type { PressableProps } from "react-native";

export type CheckboxProps = Omit<PressableProps, "onPress"> & {
  active: boolean;
  onChange?: (next: boolean) => void;
  handleClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const Checkbox = ({ active, onChange, handleClick, disabled = false, className, ...props }: CheckboxProps) => {
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
        onChange?.(next);
        handleClick?.();
      }}
      {...props}
    >
      <View
        className={clsx(
          "h-full w-full items-center justify-center rounded-sm",
          internalActive ? "bg-primary-normal" : "border-[1.5px] border-line-normal bg-background-strong",
        )}
      >
        {internalActive && <Check size={14} color="#FAFAFA" strokeWidth={2.5} />}
      </View>
    </Pressable>
  );
};
