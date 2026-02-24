import React, { type ComponentType } from "react";
import { View } from "react-native";
import { Modal, type ModalProps } from "./Modal";
import { Text } from "../../Display/Text/Text";
import { Button } from "../../Input/Button/Button";

const meta = {
  component: Modal,
  title: "Feedback/Modal",
  args: {
    title: "Modal Title",
    description: "Modal Description",
    actionsDirection: "row",
    closeButton: true,
    closeText: "닫기",
    actions: [
      {
        label: "Main Action",
        onPress: () => {
          // eslint-disable-next-line no-console
          console.log("Main action pressed");
        },
      },
    ],
  } satisfies Partial<ModalProps>,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
    },
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
      <View style={{ width: "100%", maxWidth: 360, padding: 16, gap: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

export const Playground = {
  render: (args: ModalProps) => <Modal {...args} trigger={<Button label="Show Modal" />} />,
};

export const ActionsDirectionVariants = {
  render: (args: ModalProps) => (
    <View style={{ width: "100%", gap: 16 }}>
      <Modal
        {...args}
        actionsDirection="row"
        title="Row Actions"
        trigger={<Button label="Row Actions Modal" />}
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
      <Modal
        {...args}
        actionsDirection="column"
        title="Column Actions"
        trigger={<Button label="Column Actions Modal" />}
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
  render: (args: ModalProps) => (
    <Modal
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
  render: (args: ModalProps) => (
    <Modal
      {...args}
      actions={[]}
      title="Only Close Button"
      description="이 모달은 닫기 버튼만 가지고 있습니다."
      trigger={<Button label="Open Only Close Button" />}
    />
  ),
};

export const LongContent = {
  render: (args: ModalProps) => (
    <Modal
      {...args}
      title="Long Content Modal"
      description="스크롤이 필요한 긴 내용이 들어간 모달입니다."
      trigger={<Button label="Open Long Content Modal" />}
      contents={
        <View className="mt-4 flex flex-col gap-2">
          {Array.from({ length: 12 }).map((_, index) => (
            <Text key={index} className="text-14/body text-label-normal">
              {index + 1}. 긴 내용 예시 텍스트입니다. 다양한 길이의 콘텐츠가 들어와도 잘 동작하는지 확인해 보세요.
            </Text>
          ))}
        </View>
      }
    />
  ),
};
