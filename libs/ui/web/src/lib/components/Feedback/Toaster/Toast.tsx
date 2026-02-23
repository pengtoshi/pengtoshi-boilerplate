import clsx from "clsx";
import { CheckCircleIcon, InfoIcon, XCircleIcon } from "lucide-react";
import { toast as sonnerToast } from "sonner";
import type { UIProps } from "../../../props";
import { Icon } from "../../Icon/Icon";
import { Button } from "../../Input/Button/Button";

export interface ToastProps extends Omit<UIProps.Div, "id"> {
  id: string | number;
  title: string;
  type?: "success" | "error" | "info";
  description?: string;
  button?: {
    label: string;
    onClick: () => void;
  };
  showIcon?: boolean;
}

const IconMap: Record<NonNullable<ToastProps["type"]>, React.ReactNode> = {
  success: (
    <Icon component={CheckCircleIcon} size={20} className="text-status-positive dark:text-dark-status-positive" />
  ),
  error: <Icon component={XCircleIcon} size={20} className="text-status-negative dark:text-dark-status-negative" />,
  info: <Icon component={InfoIcon} size={20} className="text-label-normal dark:text-dark-label-normal" />,
};

const colorMap: Record<NonNullable<ToastProps["type"]>, string> = {
  success: "text-status-positive dark:text-dark-status-positive",
  error: "text-status-negative dark:text-dark-status-negative",
  info: "text-label-normal dark:text-dark-label-normal",
};

export const Toast = ({ id, title, type = "info", description, button, showIcon = true }: ToastProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-md bg-background-strong px-4 py-3 shadow-emphasize dark:bg-dark-background-strong sm:w-[360px]">
      <div className="flex items-center justify-start gap-2">
        {showIcon && IconMap[type]}
        <div className="flex flex-col gap-1">
          <p className={clsx("text-14/body/emp", colorMap[type])}>{title}</p>
          {description && (
            <p className="text-12/body text-label-assertive dark:text-dark-label-assertive">{description}</p>
          )}
        </div>
      </div>
      {!!button && (
        <Button
          size="small"
          className="!w-fit !bg-dark-normal !text-dark-label-normal dark:!bg-normal dark:!text-label-normal"
          onClick={() => {
            button.onClick();
            sonnerToast.dismiss(id);
          }}
        >
          {button.label}
        </Button>
      )}
    </div>
  );
};
