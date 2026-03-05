import styled from "@emotion/native";
import { Pressable, PressableProps, StyleSheet, ViewProps } from "react-native";
import Animated from "react-native-reanimated";

import paperTexture from "#assets/images/paper.jpg";
import woodTexture from "#assets/images/wood.jpg";
import { useScalePress } from "#design-system/components/useScalePress";

export const WoodenView = (props: ViewProps) => {
  return (
    <WoodenViewContainer {...props}>
      <WoodenBackground />
      {props.children}
    </WoodenViewContainer>
  );
};

export const WoodenPressable = ({
  children,
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
  ...props
}: PressableProps) => {
  const { animatedStyle, onPressIn, onPressOut } = useScalePress();

  return (
    <Animated.View style={animatedStyle}>
      <WoodenPressableContainer
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
        {(state) => (
          <>
            <WoodenBackground />
            {typeof children === "function" ? children(state) : children}
          </>
        )}
      </WoodenPressableContainer>
    </Animated.View>
  );
};

export const WoodenBackground = () => {
  return (
    <>
      <WoodColorUnderlay />
      <Texture source={woodTexture} />
    </>
  );
};

export const PaperBackground = () => {
  return (
    <>
      <WhiteColorUnderlay />
      <Texture source={paperTexture} />
    </>
  );
};

const WoodenViewContainer = styled.View({ overflow: "hidden" });

const WoodenPressableContainer = styled(Pressable)({
  overflow: "hidden",
});

const WoodColorUnderlay = styled.View(({ theme }) => ({
  ...StyleSheet.absoluteFill,
  backgroundColor: theme.colors.wood,
}));

const WhiteColorUnderlay = styled.View(({ theme }) => ({
  ...StyleSheet.absoluteFill,
  backgroundColor: theme.colors.white,
}));

const Texture = styled.Image({
  ...StyleSheet.absoluteFill,
  opacity: 0.4,
});
