import clsx from "clsx";
import { useEffect, useState } from "react";
import type { UIProps } from "../../../props";
import { Interaction } from "../../Display/Interaction/Interaction";

export interface ToggleIconProps extends UIProps.Button {
  active: boolean;
  icon: React.ReactNode;
  handleClick: () => void;
}

export const ToggleIcon = ({ active, handleClick, className, icon, ...props }: ToggleIconProps) => {
  const [internalActive, setInternalActive] = useState(active);

  useEffect(() => {
    setInternalActive(active);
  }, [active]);

  return (
    <button
      type="button"
      className={clsx(
        "group relative",
        internalActive
          ? "text-primary-normal dark:text-dark-primary-normal"
          : "text-label-placeholder dark:text-dark-label-placeholder",
        className,
      )}
      onClick={() => {
        setInternalActive(!internalActive);
        handleClick();
      }}
      {...props}
    >
      {icon}
      <Interaction
        focus={false}
        className={clsx("inset-auto left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full")}
      />
    </button>
  );
};
