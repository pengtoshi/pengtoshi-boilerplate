import clsx from "clsx";
import type { ComponentType, SVGProps } from "react";
import { ReactComponent as Example } from "~/ui-web/public/icons/example_check.svg";

// NOTE: Use Lucide React as default, but add icons that are not in Lucide React here.
// See: https://lucide.dev/icons

export const IconVariants = {
  Example,
};

type IconName = keyof typeof IconVariants;

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface IconProps extends SVGProps<SVGSVGElement> {
  name?: IconName; // Registered custom SVG icon name
  component?: IconComponent; // lucide-react icon or arbitrary SVG component
  size?: number;
}

export const Icon = ({ name, size = 24, className, ...props }: IconProps) => {
  const registryIcon = name ? IconVariants[name] : undefined;
  const IconToRender = (props as IconProps).component ?? registryIcon;

  if (!IconToRender) return null;

  return (
    <IconToRender
      {...props}
      width={size}
      height={size}
      className={clsx(
        "text-label-normal group-disabled:text-label-disabled dark:text-dark-label-normal dark:group-disabled:text-dark-label-disabled",
        className,
      )}
    />
  );
};
