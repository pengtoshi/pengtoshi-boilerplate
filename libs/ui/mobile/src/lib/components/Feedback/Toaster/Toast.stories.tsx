import React, { type ComponentType } from "react";
import { View } from "react-native";
import { Toast, type ToastProps } from "./Toast";
import { toast } from "./Toaster";
import { Button } from "../../Input/Button/Button";

const meta = {
  component: Toast,
  title: "Feedback/Toast",
  args: {
    title: "Example Toast",
    description: "This is toast description.",
    type: "info",
    showIcon: true,
  } satisfies Partial<ToastProps>,
  argTypes: {
    type: {
      control: { type: "select" },
      options: [undefined, "success", "error", "info"],
    },
    showIcon: {
      control: { type: "boolean" },
    },
    button: {
      control: { type: "object" },
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

export const Default = {};

export const WithButton = {
  args: {
    button: {
      label: "Click me",
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log("Button clicked");
      },
    },
  } satisfies Partial<ToastProps>,
};

export const Types = {
  render: (args: ToastProps) => {
    const types: Array<ToastProps["type"] | undefined> = [undefined, "success", "error", "info"];

    return (
      <View style={{ width: "100%", gap: 12 }}>
        {types.map((targetType) => (
          <View key={targetType ?? "default"} style={{ flexDirection: "column", gap: 8 }}>
            <Toast {...args} type={targetType} />
            <Toast
              {...args}
              type={targetType}
              button={{
                label: "Click me",
                onClick: () => {
                  // eslint-disable-next-line no-console
                  console.log("Button clicked");
                },
              }}
            />
            <Toast {...args} type={targetType} description="This is toast description." />
            <Toast
              {...args}
              type={targetType}
              description="This is toast description."
              button={{
                label: "Click me",
                onClick: () => {
                  // eslint-disable-next-line no-console
                  console.log("Button clicked");
                },
              }}
            />
          </View>
        ))}
      </View>
    );
  },
  args: {
    title: "Example Toast",
    showIcon: true,
  } satisfies Partial<ToastProps>,
};

export const PlaygroundWithToaster = {
  render: () => (
    <View style={{ width: "100%", maxWidth: 360, gap: 16 }}>
      <Toast title="Inline Toast" description="Rendered directly in story." />
      <Button
        label="Show Toast"
        size="medium"
        onPress={() =>
          toast({
            title: "Toast from Toaster",
            description: "This is toast description.",
            type: "success",
            showIcon: true,
            button: {
              label: "확인",
              onClick: () => {
                // eslint-disable-next-line no-console
                console.log("Toast action clicked");
              },
            },
          })
        }
      />
    </View>
  ),
};
