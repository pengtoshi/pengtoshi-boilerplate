import clsx from "clsx";
import type { SVGProps } from "react";
import { ReactComponent as CheckThick } from "~/ui/public/icons/check_thick.svg";
import { ReactComponent as CheckThin } from "~/ui/public/icons/check_thin.svg";
import { ReactComponent as ChevronDown } from "~/ui/public/icons/chevron_down.svg";
import { ReactComponent as ChevronLeft } from "~/ui/public/icons/chevron_left.svg";
import { ReactComponent as ChevronRight } from "~/ui/public/icons/chevron_right.svg";
import { ReactComponent as ChevronUp } from "~/ui/public/icons/chevron_up.svg";

export const IconVariants = {
  CheckThick,
  CheckThin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
};

type IconName = keyof typeof IconVariants;

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export const Icon = ({ name, size = 24, className, ...props }: IconProps) => {
  const IconComponent = IconVariants[name];
  return <IconComponent {...props} width={size} height={size} className={clsx("text-gray-600", className)} />;
};
