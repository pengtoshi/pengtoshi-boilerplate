import { toast } from "sonner";
import type { Action } from "sonner";
import { Toaster as ShadcnToaster } from "../../../shadcn/ui/sonner";
import { Icon } from "../../Icon/Icon";

export interface ToasterProps extends React.ComponentProps<typeof ShadcnToaster> {
  className?: string;
}

export const Toaster = ({ ...props }: ToasterProps) => (
  <ShadcnToaster
    toastOptions={{
      className: "font-sans text-14/body !gap-3 !px-4 !py-3",
    }}
    {...props}
  />
);

export const showErrorToast = (title: string, description: string, action?: Action) => {
  toast.error(title, {
    description,
    icon: <Icon name="CircleErrorFilled" className="text-etc-negative" />,
    action,
  });
};

export const showSuccessToast = (title: string, description: string, action?: Action) => {
  toast.success(title, {
    description,
    icon: <Icon name="CircleCheckFilled" className="text-etc-positive" />,
    action,
  });
};

export const showInfoToast = (title: string, description: string, action?: Action) => {
  toast.info(title, {
    description,
    icon: <Icon name="CircleInfoFilled" className="text-gray-400" />,
    action,
  });
};
