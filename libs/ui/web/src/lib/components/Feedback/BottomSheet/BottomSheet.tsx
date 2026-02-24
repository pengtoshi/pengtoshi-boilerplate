import clsx from "clsx";
import type { UIProps } from "../../../props";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../../../shadcn";
import { Button } from "../../Input/Button/Button";
import type { ButtonProps } from "../../Input/Button/Button";

export interface BottomSheetAction extends UIProps.Button {
  label: string;
  onClick: () => void;
  variant?: ButtonProps["variant"];
}

export interface BottomSheetProps {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  contents?: React.ReactNode;
  actions?: BottomSheetAction[];
  actionsDirection?: "row" | "column";
  closeButton?: boolean;
  closeText?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const BottomSheet = ({
  trigger,
  title,
  description,
  contents,
  actions,
  actionsDirection = "row",
  closeButton = true,
  closeText = "Close",
  open,
  defaultOpen,
  onOpenChange,
}: BottomSheetProps) => {
  return (
    <Drawer open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger ? (
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      ) : (
        <DrawerTrigger>
          <Button variant="outlinedPrimary">Open</Button>
        </DrawerTrigger>
      )}
      <DrawerContent>
        <div className="flex w-full flex-col gap-1">
          {title && <span className="text-16/body/emp text-label-normal dark:text-dark-label-normal">{title}</span>}
          {description && (
            <span className="text-14/body text-label-assertive dark:text-dark-label-assertive">{description}</span>
          )}
        </div>
        {contents}
        <div className={clsx("flex w-full", actionsDirection === "row" ? "flex-row gap-3" : "flex-col gap-2")}>
          {closeButton && actionsDirection === "row" && (
            <DrawerClose asChild>
              <Button className="flex-1" variant="outlinedPrimary">
                {closeText}
              </Button>
            </DrawerClose>
          )}
          {actions?.map(({ label, className, variant, ...props }) => (
            <Button
              className={clsx(actionsDirection === "row" ? "flex-1" : "w-full", className)}
              key={label}
              variant={variant ?? "solid"}
              {...props}
            >
              {label}
            </Button>
          ))}
          {closeButton && actionsDirection === "column" && (
            <DrawerClose asChild>
              <Button className="w-full" variant="textPrimary">
                {closeText}
              </Button>
            </DrawerClose>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
