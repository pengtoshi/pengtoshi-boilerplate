import clsx from "clsx";
import type { ReactNode } from "react";
import type { PressableProps } from "react-native";
import { Button, type UIButtonSize, type UIButtonVariant } from "./Button";

export type IconButtonProps = Omit<PressableProps, "children"> & {
  icon: ReactNode;
  variant?: UIButtonVariant;
  size?: UIButtonSize;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

const iconButtonSizeClass: Record<UIButtonSize, string> = {
  small: "w-8 px-0",
  medium: "w-10 px-0",
  large: "w-12 px-0",
};

export const IconButton = ({ icon, size = "medium", className, ...props }: IconButtonProps) => {
  return (
    <Button className={clsx(iconButtonSizeClass[size], className)} size={size} {...props}>
      {icon}
    </Button>
  );
};
