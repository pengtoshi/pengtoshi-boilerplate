import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { Text } from "../../Display/Text/Text";
import { Button, type ButtonProps } from "../../Input/Button/Button";

export interface BottomSheetAction extends ButtonProps {
  label: string;
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
  snapPoints?: Array<string | number>;
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
  snapPoints: snapPointsProp,
}: BottomSheetProps) => {
  const sheetRef = useRef<BottomSheetModal>(null);

  const controlled = typeof open === "boolean";
  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen ?? false);
  const isOpen = controlled ? Boolean(open) : internalOpen;

  const snapPoints = useMemo(() => snapPointsProp, [snapPointsProp]);

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 24,
    stiffness: 180,
    mass: 1,
    overshootClamping: true,
  });

  const handleOpen = useCallback(() => {
    if (controlled) {
      onOpenChange?.(true);
    } else {
      setInternalOpen(true);
    }
  }, [controlled, onOpenChange]);

  const handleClose = useCallback(() => {
    if (controlled) {
      onOpenChange?.(false);
    } else {
      setInternalOpen(false);
    }
  }, [controlled, onOpenChange]);

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.present();
    } else {
      sheetRef.current?.dismiss();
    }
  }, [isOpen]);

  return (
    <>
      {trigger ? (
        React.cloneElement(trigger as React.ReactElement<{ onPress?: () => void }>, {
          onPress: () => {
            (trigger as React.ReactElement<{ onPress?: () => void }>)?.props?.onPress?.();
            handleOpen();
          },
        })
      ) : (
        <Button variant="outlinedPrimary" label="Open" onPress={handleOpen} />
      )}

      <BottomSheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        // snapPoints가 없으면 콘텐츠 높이에 맞춰 자동으로 높이를 계산한다.
        enableDynamicSizing={snapPoints == null}
        enablePanDownToClose
        enableHandlePanningGesture
        enableContentPanningGesture={false}
        onDismiss={handleClose}
        style={{
          marginHorizontal: 8,
          borderRadius: 24,
          overflow: "hidden",
        }}
        detached
        bottomInset={24}
        animationConfigs={animationConfigs}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} />
        )}
        backgroundStyle={{ backgroundColor: "#FAFAFA", borderRadius: 24 }}
        handleIndicatorStyle={{ backgroundColor: "#C6C6C680", width: 40, height: 4, marginTop: 4, marginBottom: 0 }}
      >
        <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 20 }}>
          <View className="flex w-full flex-col gap-3">
            <View className="flex w-full flex-col gap-1">
              {title && <Text className="text-16/body/emp text-label-normal">{title}</Text>}
              {description && <Text className="text-14/body text-label-assertive">{description}</Text>}
            </View>
            {contents}
            <View className={clsx("flex w-full", actionsDirection === "row" ? "flex-row gap-3" : "flex-col gap-2")}>
              {closeButton && actionsDirection === "row" && (
                <Button className="flex-1" variant="outlinedPrimary" label={closeText} onPress={handleClose} />
              )}
              {actions?.map(({ label, className, ...props }) => (
                <Button
                  className={clsx(actionsDirection === "row" ? "flex-1" : "w-full", className)}
                  key={label}
                  {...props}
                >
                  {label}
                </Button>
              ))}
              {closeButton && actionsDirection === "column" && (
                <Button className="w-full" variant="textPrimary" label={closeText} onPress={handleClose} />
              )}
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};
