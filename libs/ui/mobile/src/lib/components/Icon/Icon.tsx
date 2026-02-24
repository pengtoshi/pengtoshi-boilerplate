import clsx from "clsx";
import type { ComponentType } from "react";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import type { SvgProps } from "react-native-svg";

// NOTE:
// - Use lucide-react-native as default (via `component` prop).
// - Register non-lucide SVGs from `libs/ui/mobile/assets` in `IconVariants` below.

export const IconVariants = {
  // Example registration (once you add an SVG under libs/ui/mobile/assets):
  // Example: ExampleIcon,
} as const;

type IconName = keyof typeof IconVariants;

type SvgIconProps = SvgProps & {
  className?: string;
};

type IconComponent = ComponentType<SvgIconProps>;

export interface IconProps extends SvgIconProps {
  name?: IconName; // Registered custom SVG icon name
  component?: IconComponent; // lucide-react-native icon or arbitrary SVG component
  size?: number;
}

export const Icon = ({ name, size = 24, className, ...props }: IconProps) => {
  const registryIcon = name ? IconVariants[name] : undefined;
  const IconToRender = (props as IconProps).component ?? registryIcon;

  if (!IconToRender) return null;

  return (
    <IconToRender
      {...props}
      width={size}
      height={size}
      className={clsx(
        "text-label-normal group-disabled:text-label-disabled dark:text-dark-label-normal dark:group-disabled:text-dark-label-disabled",
        className,
      )}
    />
  );
};

const AnimatedBaseIcon = Animated.createAnimatedComponent(Icon);

export interface AnimatedColorIconProps extends IconProps {
  fromColor: string;
  toColor: string;
  active: boolean;
  duration?: number;
}

export const AnimatedColorIcon = ({
  fromColor,
  toColor,
  active,
  duration = 300,
  ...iconProps
}: AnimatedColorIconProps) => {
  const progress = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: active ? 1 : 0,
      duration,
      useNativeDriver: false,
    }).start();
  }, [active, duration, progress]);

  const color = progress.interpolate<string>({
    inputRange: [0, 1],
    outputRange: [fromColor, toColor],
  });

  return <AnimatedBaseIcon {...iconProps} color={color} />;
};
