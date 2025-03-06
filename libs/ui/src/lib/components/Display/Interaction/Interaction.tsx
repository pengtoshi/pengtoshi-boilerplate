import clsx from "clsx";
import type { UIProps } from "../../../props";

export const Interaction = ({ className, ...props }: UIProps.Div) => {
  return (
    <div
      className={clsx(
        "absolute inset-0 bg-gray-950 opacity-0 transition-opacity duration-300",
        "group-hover:opacity-[0.06] group-focus:opacity-[0.06] group-active:opacity-[0.12]",
        className,
      )}
      {...props}
    />
  );
};
