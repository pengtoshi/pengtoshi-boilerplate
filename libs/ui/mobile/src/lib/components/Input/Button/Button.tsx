import clsx from "clsx";
import type { ReactNode } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import type { PressableProps } from "react-native";
import { Text } from "../../Display/Text/Text";

export type UIButtonVariant = "solid" | "outlinedPrimary" | "outlinedAssertive" | "textPrimary" | "textAssertive";
export type UIButtonSize = "small" | "medium" | "large" | "extraLarge";

export type ButtonProps = Omit<PressableProps, "children"> & {
  children?: ReactNode;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: UIButtonVariant;
  size?: UIButtonSize;
  loading?: boolean;
  className?: string;
  textClassName?: string;
};

const variantClasses: Record<UIButtonVariant, { container: string; text: string; spinner: string }> = {
  solid: {
    container: "bg-primary-normal disabled:bg-background-disabled",
    text: "text-normal disabled:text-label-disabled",
    spinner: "#FAFAFA",
  },
  outlinedPrimary: {
    container: "border border-primary-normal bg-transparent disabled:border-line-normal",
    text: "text-primary-normal disabled:text-label-disabled",
    spinner: "#B571BB",
  },
  outlinedAssertive: {
    container: "border border-line-normal bg-transparent disabled:border-line-normal",
    text: "text-label-normal disabled:text-label-disabled",
    spinner: "#1F1F1F",
  },
  textPrimary: {
    container: "bg-transparent",
    text: "text-primary-normal disabled:text-label-disabled",
    spinner: "#B571BB",
  },
  textAssertive: {
    container: "bg-transparent",
    text: "text-label-assertive disabled:text-label-disabled",
    spinner: "#6F6F6F",
  },
};

const sizeClasses: Record<UIButtonSize, { container: string; text: string }> = {
  small: { container: "h-[32px] rounded-md px-[12px]", text: "text-14/button" }, // 8*4, 3*4
  medium: { container: "h-[40px] rounded-md px-[16px]", text: "text-14/button" }, // 10*4, 4*4
  large: { container: "h-[48px] rounded-md px-[20px]", text: "text-16/button" }, // 12*4, 5*4
  extraLarge: { container: "h-[64px] rounded-md px-[24px]", text: "text-18/button" }, // 16*4, 6*4
};

export const Button = ({
  children,
  label,
  leftIcon,
  rightIcon,
  variant = "solid",
  size = "medium",
  loading = false,
  disabled = false,
  className,
  textClassName,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const textValue = children ?? label;
  const variantStyle = variantClasses[variant];
  const sizeStyle = sizeClasses[size];

  return (
    <Pressable
      accessibilityRole="button"
      className={clsx(
        "flex-row items-center justify-center gap-2 active:opacity-80 disabled:opacity-100",
        variantStyle.container,
        sizeStyle.container,
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? <ActivityIndicator color={variantStyle.spinner} size="small" /> : leftIcon}
      {typeof textValue === "string" ? (
        <Text className={clsx(variantStyle.text, sizeStyle.text, textClassName)}>{textValue}</Text>
      ) : (
        textValue
      )}
      {!loading && rightIcon}
    </Pressable>
  );
};
