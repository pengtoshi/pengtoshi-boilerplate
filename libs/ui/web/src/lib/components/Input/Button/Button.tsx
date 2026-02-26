import clsx from "clsx";
import { Button as ShadcnButton } from "../../../shadcn";
import type { ButtonProps as ShadcnButtonProps } from "../../../shadcn";
import { Interaction } from "../../Display/Interaction/Interaction";

export type ButtonProps = ShadcnButtonProps & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textClassName?: string;
};

const interactionClasses = {
  solid: "",
  outlinedPrimary: "!bg-primary-normal dark:!bg-dark-primary-normal",
  outlinedAssertive: "",
  textPrimary: "!bg-primary-normal dark:!bg-dark-primary-normal",
  textAssertive: "",
};

export const Button = ({ children, leftIcon, rightIcon, className, textClassName, ...props }: ButtonProps) => {
  return (
    <ShadcnButton {...props} className={clsx("relative overflow-hidden", className)}>
      <Interaction focus={false} className={interactionClasses[props.variant ?? "solid"]} />
      {leftIcon}
      <span className={clsx("relative z-10", textClassName)}>{children}</span>
      {rightIcon}
    </ShadcnButton>
  );
};
