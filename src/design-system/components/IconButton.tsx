import styled from "@emotion/native";
import type { ReactNode } from "react";
import type { PressableProps } from "react-native";
import Animated from "react-native-reanimated";

import { useScalePress } from "#design-system/components/useScalePress";

type Props = {
  icon: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel: string;
} & Omit<PressableProps, "children">;

export const IconButton = ({
  icon,
  disabled = false,
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
  ...props
}: Props) => {
  const { animatedStyle, onPressIn, onPressOut } = useScalePress();

  return (
    <Animated.View style={animatedStyle}>
      <Container
        disabled={disabled}
        accessibilityRole="button"
        onPressIn={(e) => {
          onPressIn();
          onPressInProp?.(e);
        }}
        onPressOut={(e) => {
          onPressOut();
          onPressOutProp?.(e);
        }}
        {...props}
      >
        {icon}
      </Container>
    </Animated.View>
  );
};

const Container = styled.Pressable<{ disabled: boolean }>(({ disabled }) => ({
  opacity: disabled ? 0.4 : 1,
}));
