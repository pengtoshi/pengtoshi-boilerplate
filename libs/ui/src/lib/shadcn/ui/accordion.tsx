import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";
import { Icon } from "../../components";
import { cn } from "../utils/utils";

export const Accordion = ({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) => {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
};

export const AccordionItem = ({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) => {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-line-normal last:border-b-0 dark:border-dark-line-normal", className)}
      {...props}
    />
  );
};

export const AccordionTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) => {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left !text-14/body/emp outline-none transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          "text-label-normal hover:text-primary-strong data-[state=open]:text-primary-strong dark:text-dark-label-normal dark:hover:text-dark-primary-strong dark:data-[state=open]:text-dark-primary-strong",
          className,
        )}
        {...props}
      >
        {children}
        <Icon
          name="ChevronDown"
          size={20}
          className="pointer-events-none shrink-0 translate-y-0.5 text-label-normal transition-transform duration-300 dark:text-dark-label-normal"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};

export const AccordionContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) => {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-14/body data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
};
