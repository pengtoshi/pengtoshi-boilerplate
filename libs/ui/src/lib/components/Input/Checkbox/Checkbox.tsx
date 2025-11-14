import clsx from "clsx";
import { useEffect, useState } from "react";
import type { UIProps } from "../../../props";
import { Interaction } from "../../Display/Interaction/Interaction";
import { Icon } from "../../Icon/Icon";

export interface CheckboxProps extends UIProps.Button {
  active: boolean;
  handleClick: () => void;
  disabled?: boolean;
}

export const Checkbox = ({ active, handleClick, className, disabled, ...props }: CheckboxProps) => {
  const [internalActive, setInternalActive] = useState(active);

  useEffect(() => {
    setInternalActive(active);
  }, [active]);

  return (
    <button
      type="button"
      className={clsx("group relative h-6 w-6 p-[3px] disabled:opacity-40", className)}
      disabled={disabled}
      onClick={() => {
        setInternalActive(!internalActive);
        handleClick();
      }}
      {...props}
    >
      <div
        className={clsx(
          "flex h-full w-full items-center justify-center rounded-sm bg-background-strong dark:bg-dark-background-strong",
          internalActive
            ? "!bg-primary-normal dark:!bg-dark-primary-normal"
            : "border-[1.5px] border-line-normal dark:border-dark-line-normal",
        )}
      >
        {internalActive && <Icon size={16} name="CheckThick" className="text-normal dark:text-dark-normal" />}
      </div>
      {!disabled && <Interaction focus={false} className={clsx("-left-1 -top-1 h-8 w-8 rounded-full")} />}
    </button>
  );
};
