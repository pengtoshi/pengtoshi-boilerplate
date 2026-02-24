import clsx from "clsx";
import { CheckCircle2, Info, XCircle } from "lucide-react-native";
import type { ViewProps } from "react-native";
import { View } from "react-native";
import { toast as sonnerToast } from "sonner-native";
import { Text } from "../../Display/Text/Text";
import { Icon } from "../../Icon/Icon";
import { Button } from "../../Input/Button/Button";

export interface ToastProps extends ViewProps {
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
  success: <Icon component={CheckCircle2} size={20} color="#00BF40" />,
  error: <Icon component={XCircle} size={20} color="#FF4242" />,
  info: <Icon component={Info} size={20} color="#6F6F6F" />,
};

const colorMap: Record<NonNullable<ToastProps["type"]>, string> = {
  success: "text-status-positive",
  error: "text-status-negative",
  info: "text-label-normal",
};

export const Toast = ({
  title,
  type = "info",
  description,
  button,
  showIcon = true,
  className,
  ...rest
}: ToastProps) => {
  return (
    <View
      className={clsx(
        "mx-4 flex w-full max-w-[360px] flex-row items-center justify-between gap-3 self-center rounded-md bg-black/90 px-4 py-3 shadow-emphasize",
        className,
      )}
      {...rest}
    >
      <View className="flex flex-1 flex-row items-center justify-start gap-2">
        {showIcon && IconMap[type]}
        <View className="flex flex-1 flex-col gap-1">
          <Text className={clsx("text-14/body/emp text-dark-label-normal", colorMap[type])} numberOfLines={2}>
            {title}
          </Text>
          {description && (
            <Text className="text-12/body text-dark-label-assertive" numberOfLines={3}>
              {description}
            </Text>
          )}
        </View>
      </View>
      {!!button && (
        <Button
          size="small"
          variant="solid"
          className="!w-auto !bg-dark-normal px-3 !text-dark-label-normal"
          onPress={() => {
            button.onClick();
            sonnerToast.dismiss();
          }}
        >
          {button.label}
        </Button>
      )}
    </View>
  );
};
