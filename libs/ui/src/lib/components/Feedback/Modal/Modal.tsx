import clsx from "clsx";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../../../shadcn";
import { Button } from "../../Input/Button/Button";
import { IconButton } from "../../Input/Button/IconButton";

export interface ModalAction {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

export interface ModalProps extends React.ComponentProps<typeof Dialog> {
  trigger?: React.ReactNode;
  size?: "small" | "medium";
  title?: string;
  description?: string;
  actions?: ModalAction[];
  actionsDirection?: "row" | "column";
  closeButton?: boolean;
}

export const Modal = ({
  trigger,
  size = "small",
  title,
  description,
  actions,
  actionsDirection = "row",
  closeButton = false,
  ...props
}: ModalProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className={clsx(size === "small" ? "max-w-[320px]" : "max-w-[480px]")}>
        <div className="flex w-full items-start justify-between">
          <div className="flex w-full flex-col gap-1">
            <span className="text-16/body/emp text-gray-950">{title}</span>
            <span className="text-14/body text-gray-600">{description}</span>
          </div>
          {closeButton && (
            <DialogClose asChild>
              <IconButton name="CloseThick" size={20} iconClassName="!text-gray-600" />
            </DialogClose>
          )}
        </div>
        <div className={clsx("flex", actionsDirection === "row" ? "flex-row gap-3" : "flex-col gap-3")}>
          {actions?.map((action) => (
            <Button
              className="flex-1"
              key={action.label}
              onClick={action.onClick}
              variant={action.primary ? "solid" : "outlinedPrimary"}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
