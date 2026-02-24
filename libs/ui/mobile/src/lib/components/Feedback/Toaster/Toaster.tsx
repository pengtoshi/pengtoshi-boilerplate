import React from "react";
import { Platform } from "react-native";
import { Toaster as ToasterPrimitive, toast as sonnerToast } from "sonner-native";
import { Toast, type ToastProps } from "./Toast";

export interface ToasterProps extends React.ComponentProps<typeof ToasterPrimitive> {
  className?: string;
}

export const Toaster = ({ ...props }: ToasterProps) => {
  return <ToasterPrimitive offset={Platform.OS === "ios" ? 64 : 24} position="top-center" {...props} />;
};

export const toast = (toastProps: ToastProps) => {
  return sonnerToast.custom(<Toast {...toastProps} />);
};
