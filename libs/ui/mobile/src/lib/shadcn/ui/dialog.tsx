import * as DialogPrimitive from "@rn-primitives/dialog";
import * as React from "react";
import { Platform, View, type ViewProps } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";
import { NativeOnlyAnimatedView } from "./native-only-animated-view";
import { cn } from "../utils/utils";

export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogPortal = DialogPrimitive.Portal;

export const DialogClose = DialogPrimitive.Close;

export const FullWindowOverlay = Platform.OS === "ios" ? RNFullWindowOverlay : React.Fragment;

export const DialogOverlay = ({
  className,
  children,
  ...props
}: Omit<DialogPrimitive.OverlayProps, "asChild"> &
  React.RefAttributes<DialogPrimitive.OverlayRef> & {
    children?: React.ReactNode;
  }) => {
  return (
    <FullWindowOverlay>
      <DialogPrimitive.Overlay
        className={cn(
          "absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50 p-2",
          Platform.select({
            web: "fixed cursor-default animate-in fade-in-0 [&>*]:cursor-auto",
          }),
          className,
        )}
        {...props}
        asChild={Platform.OS !== "web"}
      >
        <NativeOnlyAnimatedView entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
          <NativeOnlyAnimatedView entering={FadeIn.delay(50)} exiting={FadeOut.duration(150)}>
            {children}
          </NativeOnlyAnimatedView>
        </NativeOnlyAnimatedView>
      </DialogPrimitive.Overlay>
    </FullWindowOverlay>
  );
};

export const DialogContent = ({
  className,
  portalHost,
  children,
  ...props
}: DialogPrimitive.ContentProps &
  React.RefAttributes<DialogPrimitive.ContentRef> & {
    portalHost?: string;
  }) => {
  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlay>
        <DialogPrimitive.Content
          className={cn(
            "z-50 mx-auto grid w-full min-w-[320px] max-w-[calc(100%-2rem)] gap-4 rounded-md bg-normal p-4 shadow-lg sm:max-w-lg",
            Platform.select({
              web: "duration-200 animate-in fade-in-0 zoom-in-95",
            }),
            className,
          )}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
};

export const DialogHeader = ({ className, ...props }: ViewProps) => {
  return <View className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} />;
};

export const DialogFooter = ({ className, ...props }: ViewProps) => {
  return <View className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />;
};

export const DialogTitle = ({
  className,
  ...props
}: DialogPrimitive.TitleProps & React.RefAttributes<DialogPrimitive.TitleRef>) => {
  return (
    <DialogPrimitive.Title
      className={cn("text-[16px] font-medium leading-[22.4px] text-label-normal", className)}
      {...props}
    />
  );
};

export const DialogDescription = ({
  className,
  ...props
}: DialogPrimitive.DescriptionProps & React.RefAttributes<DialogPrimitive.DescriptionRef>) => {
  return (
    <DialogPrimitive.Description
      className={cn("font-regular text-[14px] leading-[19.6px] text-label-assertive", className)}
      {...props}
    />
  );
};
