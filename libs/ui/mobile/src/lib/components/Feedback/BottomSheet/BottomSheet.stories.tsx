import React, { type ComponentType } from "react";
import { View } from "react-native";
import { BottomSheet, type BottomSheetProps } from "./BottomSheet";
import { Button } from "../../Input/Button/Button";

const meta = {
  component: BottomSheet,
  title: "Feedback/BottomSheet",
  args: {
    title: "BottomSheet Title",
    description: "BottomSheet Description",
    actionsDirection: "row",
    closeButton: true,
    closeText: "닫기",
  } satisfies Partial<BottomSheetProps>,
  argTypes: {
    actionsDirection: {
      control: { type: "select" },
      options: ["row", "column"],
    },
    closeButton: {
      control: { type: "boolean" },
    },
    closeText: {
      control: { type: "text" },
    },
  },
  decorators: [
    (Story: ComponentType) => (
      <View style={{ width: "100%", maxWidth: 420, padding: 16, gap: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

export const Playground = {
  render: (args: BottomSheetProps) => (
    <BottomSheet
      {...args}
      trigger={<Button label="Show BottomSheet" />}
      contents={<View className="h-[80px] w-full rounded-md border border-line-normal bg-background-strong" />}
      actions={[
        {
          label: "Main Action",
          onPress: () => {
            // eslint-disable-next-line no-console
            console.log("Main action pressed");
          },
        },
      ]}
    />
  ),
};

export const ActionsDirectionVariants = {
  render: (args: BottomSheetProps) => (
    <View style={{ width: "100%", gap: 16 }}>
      <BottomSheet
        {...args}
        actionsDirection="row"
        title="Row Actions"
        trigger={<Button label="Row Actions BottomSheet" />}
        actions={[
          {
            label: "Primary",
            onPress: () => {
              // eslint-disable-next-line no-console
              console.log("Primary pressed");
            },
          },
          {
            label: "Secondary",
            variant: "outlinedPrimary",
            onPress: () => {
              // eslint-disable-next-line no-console
              console.log("Secondary pressed");
            },
          },
        ]}
      />
      <BottomSheet
        {...args}
        actionsDirection="column"
        title="Column Actions"
        trigger={<Button label="Column Actions BottomSheet" />}
        actions={[
          {
            label: "Primary",
            onPress: () => {
              // eslint-disable-next-line no-console
              console.log("Primary pressed");
            },
          },
          {
            label: "Secondary",
            variant: "outlinedPrimary",
            onPress: () => {
              // eslint-disable-next-line no-console
              console.log("Secondary pressed");
            },
          },
        ]}
      />
    </View>
  ),
};

export const WithoutCloseButton = {
  render: (args: BottomSheetProps) => (
    <BottomSheet
      {...args}
      closeButton={false}
      title="Without Close Button"
      trigger={<Button label="Open Without Close Button" />}
      actions={[
        {
          label: "Confirm",
          onPress: () => {
            // eslint-disable-next-line no-console
            console.log("Confirm pressed");
          },
        },
      ]}
    />
  ),
};

export const OnlyCloseButton = {
  render: (args: BottomSheetProps) => (
    <BottomSheet
      {...args}
      actions={[]}
      title="Only Close Button"
      description="이 BottomSheet는 닫기 버튼만 가지고 있습니다."
      trigger={<Button label="Open Only Close Button" />}
    />
  ),
};
