import clsx from "clsx";
import type { UIProps } from "../../../props";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../../../shadcn";
import { Button } from "../../Input/Button/Button";

export interface ModalAction extends UIProps.Button {
  label: string;
}

export interface ModalProps extends React.ComponentProps<typeof Dialog> {
  trigger?: React.ReactNode;
  size?: "small" | "medium";
  title?: string;
  description?: string;
  contents?: React.ReactNode;
  actions?: ModalAction[];
  actionsDirection?: "row" | "column";
  closeButton?: boolean;
  closeText?: string;
}

export const Modal = ({
  trigger,
  size = "small",
  title,
  description,
  contents,
  actions,
  actionsDirection = "row",
  closeButton = true,
  closeText = "Close",
  ...props
}: ModalProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className={clsx(size === "small" ? "max-w-[320px]" : "max-w-[480px]")}>
        <div className="flex w-full items-start justify-between">
          <div className="flex w-full flex-col gap-1">
            {title && <span className="text-16/body/emp text-label-normal dark:text-dark-label-normal">{title}</span>}
            {description && (
              <span className="text-14/body text-label-assertive dark:text-dark-label-assertive">{description}</span>
            )}
            {contents}
          </div>
        </div>
        <div className={clsx("flex w-full", actionsDirection === "row" ? "flex-row gap-3" : "flex-col gap-2")}>
          {closeButton && actionsDirection === "row" && (
            <DialogClose asChild>
              <Button className="flex-1" variant="outlinedPrimary">
                {closeText}
              </Button>
            </DialogClose>
          )}
          {actions?.map(({ label, className, ...action }) => (
            <Button
              className={clsx(actionsDirection === "row" ? "flex-1" : "w-full", className)}
              key={label}
              variant="solid"
              {...action}
            >
              {label}
            </Button>
          ))}
          {closeButton && actionsDirection === "column" && (
            <DialogClose asChild>
              <Button className="w-full" variant="outlinedPrimary">
                {closeText}
              </Button>
            </DialogClose>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { Dialog, DialogContent, DialogTrigger, DialogClose };
