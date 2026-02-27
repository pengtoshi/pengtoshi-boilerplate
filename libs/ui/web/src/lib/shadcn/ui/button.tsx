import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils/utils";

const buttonVariants = cva(
  "group w-fit inline-flex items-center justify-center whitespace-nowrap rounded-md transition-all duration-300 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid:
          "bg-primary-normal dark:bg-dark-primary-normal !text-normal dark:!text-dark-normal disabled:bg-background-disabled dark:disabled:bg-dark-background-disabled disabled:text-label-disabled dark:disabled:text-dark-label-disabled",
        outlinedPrimary:
          "bg-transparent border border-primary-normal dark:border-dark-primary-normal !text-primary-normal dark:!text-dark-primary-normal disabled:border-line-normal dark:disabled:border-dark-line-normal disabled:!text-label-disabled dark:disabled:!text-dark-label-disabled",
        outlinedAssertive:
          "bg-transparent border border-line-normal dark:border-dark-line-normal !text-label-normal dark:!text-dark-label-normal disabled:!text-label-disabled dark:disabled:!text-dark-label-disabled",
        textPrimary:
          "bg-transparent !text-primary-normal dark:!text-dark-primary-normal disabled:!text-label-disabled dark:disabled:!text-dark-label-disabled !px-2",
        textAssertive:
          "bg-transparent !text-label-assertive dark:!text-dark-label-assertive disabled:!text-label-disabled dark:disabled:!text-dark-label-disabled !px-2",
      },
      size: {
        small: "h-8 px-3 text-14/button gap-1",
        medium: "h-10 px-4 text-14/button gap-1.5",
        large: "h-[52px] px-5 text-16/button gap-1.5",
        extraLarge: "h-16 px-6 text-18/button gap-1.5",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "medium",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
