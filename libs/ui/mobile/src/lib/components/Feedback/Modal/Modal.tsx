import clsx from "clsx";
import React from "react";
import { View } from "react-native";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../../../shadcn";
import { Text } from "../../Display/Text/Text";
import { Button, type ButtonProps } from "../../Input/Button/Button";

export interface ModalAction extends ButtonProps {
  label: string;
}

export interface ModalProps extends React.ComponentProps<typeof Dialog> {
  trigger?: React.ReactNode;
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
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[320px]">
        <View className="flex w-full items-start justify-between">
          <View className="flex w-full flex-col gap-1">
            {title && <Text className="text-16/body/emp text-label-normal">{title}</Text>}
            {description && <Text className="text-14/body text-label-assertive">{description}</Text>}
            {contents}
          </View>
        </View>
        <View className={clsx("flex w-full", actionsDirection === "row" ? "flex-row gap-3" : "flex-col gap-2")}>
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
        </View>
      </DialogContent>
    </Dialog>
  );
};

export { Dialog, DialogContent, DialogTrigger, DialogClose };
