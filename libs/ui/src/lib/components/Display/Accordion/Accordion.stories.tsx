import type { StoryFn } from "@storybook/react";
import type { ComponentProps } from "react";
import { Accordion } from "./Accordion";

export default { component: Accordion };

const Template: StoryFn<ComponentProps<typeof Accordion>> = (args: ComponentProps<typeof Accordion>) => {
  return <Accordion {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      label: "Product Information",
      value: "product-information",
      content: (
        <>
          <p>
            Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it
            offers unparalleled performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an intuitive user interface designed for both
            beginners and experts.
          </p>
        </>
      ),
    },
    {
      label: "Shipping Details",
      value: "shipping-details",
      content: (
        <>
          <p>
            We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days,
            while express shipping ensures delivery within 1-2 business days.
          </p>
          <p>
            All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated
            tracking portal.
          </p>
        </>
      ),
    },
    {
      label: "Return Policy",
      value: "return-policy",
      content: (
        <>
          <p>
            We stand behind our products with a comprehensive 30-day return policy. If you&apos;re not completely
            satisfied, simply return the item in its original condition.
          </p>
          <p>
            Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of
            receiving the returned item.
          </p>
        </>
      ),
    },
  ],
};
