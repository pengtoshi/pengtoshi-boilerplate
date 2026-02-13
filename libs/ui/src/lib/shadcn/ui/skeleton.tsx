import { cn } from "../utils/utils";

export const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-background-strong dark:bg-dark-background-strong", className)}
      {...props}
    />
  );
};
