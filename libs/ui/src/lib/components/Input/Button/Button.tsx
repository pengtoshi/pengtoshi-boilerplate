import { Button as ShadcnButton } from "../../../shadcn";
import type { ButtonProps as ShadcnButtonProps } from "../../../shadcn";
import { Interaction } from "../../Display/Interaction/Interaction";

export type ButtonProps = ShadcnButtonProps & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const interactionBackground = {
  solid: "",
  outlinedPrimary: "!bg-primary-500",
  outlinedAssertive: "",
  textPrimary: "!bg-primary-500",
  textAssertive: "",
};

export const Button = ({ children, leftIcon, rightIcon, ...props }: ButtonProps) => {
  return (
    <ShadcnButton {...props} className="relative overflow-hidden">
      <Interaction className={interactionBackground[props.variant ?? "solid"]} />
      {leftIcon}
      <span className="relative z-10">{children}</span>
      {rightIcon}
    </ShadcnButton>
  );
};
