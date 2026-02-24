import clsx from "clsx";
import { View, type ViewProps } from "react-native";

export type SkeletonProps = ViewProps & {
  className?: string;
};

export const Skeleton = ({ className, style, ...props }: SkeletonProps) => {
  return (
    <View className={clsx("rounded-md bg-background-strong", "animate-pulse", className)} style={style} {...props} />
  );
};
