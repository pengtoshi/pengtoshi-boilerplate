import clsx from "clsx";
import AvatarPrimitive, { genConfig } from "react-nice-avatar";

interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive> {
  seed: string;
}

export const Avatar = ({ seed, className, ...props }: AvatarProps) => {
  const config = genConfig(seed);
  return <AvatarPrimitive className={clsx("h-12 w-12 rounded-full", className)} {...props} {...config} />;
};
