import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

export interface HeartbeatWrapperProps {
  active: boolean;
  children: React.ReactNode;
  /**
   * 전체 주기(ms). 기본값 4000ms (웹 heartbeat 4s와 동일).
   */
  periodMs?: number;
  /**
   * scale 피크 값. 기본값 1.08.
   */
  peakScale?: number;
}

/**
 * 임의의 children에 heartbeat 스케일 애니메이션을 적용하는 래퍼.
 * - React Native 공식 Animated API + wrapper 컴포넌트 패턴 (일반적인 재사용 방식).
 */
export const HeartbeatWrapper = ({ active, children, periodMs = 4000, peakScale = 1.08 }: HeartbeatWrapperProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active) {
      scale.setValue(1);
      return;
    }

    const beatDuration = 200;
    const restDuration = Math.max(periodMs - beatDuration * 2, 0);

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: peakScale,
          duration: beatDuration,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: beatDuration,
          useNativeDriver: true,
        }),
        Animated.delay(restDuration),
      ]),
    );

    loop.start();

    return () => {
      loop.stop();
    };
  }, [active, peakScale, periodMs, scale]);

  return <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>;
};
