import { useCallback } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const SCALE_PRESSED = 0.96;
const SCALE_DEFAULT = 1;
const DURATION_MS = 100;

export const useScalePress = () => {
  const scale = useSharedValue(SCALE_DEFAULT);

  const onPressIn = useCallback(() => {
    scale.value = withTiming(SCALE_PRESSED, { duration: DURATION_MS });
  }, [scale]);

  const onPressOut = useCallback(() => {
    scale.value = withTiming(SCALE_DEFAULT, { duration: DURATION_MS });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(function scaleAnimatedStyle() {
    return { transform: [{ scale: scale.value }] };
  });

  return { animatedStyle, onPressIn, onPressOut };
};
