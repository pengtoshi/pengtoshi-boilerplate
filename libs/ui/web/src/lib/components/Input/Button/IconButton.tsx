import clsx from "clsx";
import { forwardRef } from "react";
import type { UIProps } from "../../../props";

export interface IconButtonProps extends UIProps.Button {
  disabled?: boolean;
  icon: React.ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ disabled = false, className, icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={clsx(
          "group text-label-normal group-disabled:text-label-disabled dark:text-dark-label-normal dark:group-disabled:text-dark-label-disabled",
          className,
        )}
        {...props}
      >
        {icon}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
