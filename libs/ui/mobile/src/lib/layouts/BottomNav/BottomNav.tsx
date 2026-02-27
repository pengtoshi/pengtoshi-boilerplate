import clsx from "clsx";
import React from "react";
import { Pressable, View } from "react-native";
import type { ViewStyle } from "react-native";
import { AnimatedColorIcon, HeartbeatWrapper, Text } from "../../components";

export interface BottomNavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  /**
   * 배지 영역에 렌더링할 내용 (예: 숫자 뱃지, 점 표시 등)
   * 필요 없으면 생략
   */
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  activeKey: string;
  onChange?: (key: string) => void;
  /**
   * Safe area 하단 여백 등을 조절하고 싶을 때 사용하는 스타일
   * (예: paddingBottom에 insets.bottom 추가)
   */
  contentContainerStyle?: ViewStyle;
  className?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  items,
  activeKey,
  onChange,
  contentContainerStyle,
  className,
}) => {
  return (
    <View
      className={clsx("flex-row items-center border-t border-line-normal bg-normal px-4 pt-2", className)}
      style={contentContainerStyle}
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;
        const handlePress = () => {
          if (item.disabled) return;
          onChange?.(item.key);
        };

        let iconElement: React.ReactNode = null;
        if (React.isValidElement(item.icon)) {
          const iconProps = item.icon.props as { component?: React.ComponentType<unknown>; size?: number };
          iconElement = (
            <AnimatedColorIcon {...iconProps} fromColor="#6F6F6F" toColor="#1F1F1F" active={isActive} duration={300} />
          );
        }

        if (iconElement && isActive) {
          iconElement = <HeartbeatWrapper active>{iconElement}</HeartbeatWrapper>;
        }

        return (
          <View key={item.key} className="flex-1 items-center">
            <Pressable onPress={handlePress} disabled={item.disabled}>
              {({ pressed }) => (
                <View className={clsx("items-center justify-center", item.disabled && "opacity-40")}>
                  <View
                    className={clsx(
                      "items-center justify-center rounded-md px-3 py-1 transition-colors duration-300",
                      pressed && "bg-background-strong",
                    )}
                  >
                    {iconElement && (
                      <View className="relative mb-0.5 items-center justify-center transition-colors duration-300">
                        {iconElement}
                        {item.badge && <View className="absolute -right-1 -top-1">{item.badge}</View>}
                      </View>
                    )}

                    <Text
                      className={clsx(
                        "text-12/body transition-colors duration-300",
                        isActive ? "text-label-normal" : "text-label-assertive",
                      )}
                    >
                      {item.label}
                    </Text>
                  </View>
                </View>
              )}
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

interface BottomNavBadgeDotProps {
  className?: string;
}

/**
 * BottomNav 전용 기본 dot 배지 컴포넌트
 * - 색상: primary-normal
 * - 필요 시 className으로 위치/크기 확장 가능
 */
export const BottomNavBadgeDot: React.FC<BottomNavBadgeDotProps> = ({ className }) => {
  return <View className={clsx("h-2 w-2 rounded-full bg-primary-normal", className)} />;
};
