import clsx from "clsx";
import type { ReactNode } from "react";
import { Pressable, type PressableProps } from "react-native";

export type IconButtonSize = "small" | "medium" | "large";

export type IconButtonProps = Omit<PressableProps, "children"> & {
  icon: ReactNode;
  size?: IconButtonSize;
  disabled?: boolean;
  className?: string;
};

const iconButtonSizeClass: Record<IconButtonSize, string> = {
  small: "h-8 w-8",
  medium: "h-10 w-10",
  large: "h-12 w-12",
};

export const IconButton = ({ icon, size = "medium", className, disabled = false, ...props }: IconButtonProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      className={clsx(
        "items-center justify-center text-label-normal active:opacity-70 disabled:text-label-disabled dark:text-dark-label-normal dark:disabled:text-dark-label-disabled",
        iconButtonSizeClass[size],
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {icon}
    </Pressable>
  );
};
