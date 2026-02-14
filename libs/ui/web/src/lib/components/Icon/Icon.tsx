import type { SVGProps } from "react";
import { ReactComponent as Example } from "~/ui-web/public/icons/example_check.svg";

// NOTE: Use Lucide React as default, but add icons that are not in Lucide React here.
// See: https://lucide.dev/icons

export const IconVariants = {
  Example,
};

type IconName = keyof typeof IconVariants;

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export const Icon = ({ name, size = 24, className, ...props }: IconProps) => {
  const IconComponent = IconVariants[name];
  return (
    <IconComponent
      {...props}
      width={size}
      height={size}
      className={className ?? "text-label-normal dark:text-dark-label-normal"}
    />
  );
};
