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
  small: "h-[32px] w-[32px]", // 8*4
  medium: "h-[40px] w-[40px]", // 10*4
  large: "h-[48px] w-[48px]", // 12*4
};

export const IconButton = ({ icon, size = "medium", className, disabled = false, ...props }: IconButtonProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      className={clsx(
        "items-center justify-center text-label-normal transition-opacity duration-300 active:opacity-70 disabled:text-label-disabled dark:text-dark-label-normal dark:disabled:text-dark-label-disabled",
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
