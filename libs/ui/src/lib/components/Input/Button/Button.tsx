import { Button as ShadcnButton } from "../../../shadcn";
import type { ButtonProps as ShadcnButtonProps } from "../../../shadcn";

export type ButtonProps = ShadcnButtonProps;

export const Button = ({ children, ...props }: ButtonProps) => {
  return <ShadcnButton {...props}>{children}</ShadcnButton>;
};
