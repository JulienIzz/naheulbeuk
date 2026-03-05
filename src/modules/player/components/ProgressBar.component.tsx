import styled from "@emotion/native";
import { useCallback, useEffect, useRef, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { Typography } from "#design-system/typography/Typography";
import { formatSecondsAsMinutesAndSeconds } from "#shared/utils/date";

const DOT_SIZE = 12;
const BAR_HEIGHT = 4;
const TOUCH_HEIGHT = 32;
const SEEK_SNAP_THRESHOLD = 0.02;
const TIME_CODE_WIDTH = 40;

type Props = {
  currentTime: number;
  duration: number;
  disabled: boolean;
  seekTo: (_seconds: number) => void;
};

export const ProgressBar = ({
  currentTime,
  duration,
  disabled,
  seekTo,
}: Props) => {
  const seekToRef = useRef(seekTo);
  seekToRef.current = seekTo;
  const durationRef = useRef(duration);
  durationRef.current = duration;

  const [seekingTime, setSeekingTime] = useState<number | null>(null);
  const [pendingSeekRatio, setPendingSeekRatio] = useState<number | null>(null);

  const barWidthSV = useSharedValue(0);
  const gestureRatioSV = useSharedValue(-1);
  const pendingRatioSV = useSharedValue(-1);
  const playRatioSV = useSharedValue(0);

  const playRatio = duration > 0 ? currentTime / duration : 0;

  useEffect(
    function syncPlayRatio() {
      playRatioSV.value = playRatio;
      if (
        pendingSeekRatio !== null &&
        Math.abs(playRatio - pendingSeekRatio) < SEEK_SNAP_THRESHOLD
      ) {
        setPendingSeekRatio(null);
        pendingRatioSV.value = -1;
      }
    },
    [playRatio, pendingSeekRatio, pendingRatioSV, playRatioSV],
  );

  const updateSeekingTime = useCallback((ratio: number) => {
    setSeekingTime(ratio * durationRef.current);
  }, []);

  const commitSeek = useCallback(
    (ratio: number) => {
      seekToRef.current(ratio * durationRef.current);
      setPendingSeekRatio(ratio);
      pendingRatioSV.value = ratio;
      setSeekingTime(null);
    },
    [pendingRatioSV],
  );

  const gesture = Gesture.Pan()
    .enabled(!disabled)
    .hitSlop({ vertical: TOUCH_HEIGHT / 2 })
    .minDistance(0)
    .onBegin(function onBegin(e) {
      "worklet";
      const ratio = Math.min(1, Math.max(0, e.x / barWidthSV.value));
      gestureRatioSV.value = ratio;
      scheduleOnRN(updateSeekingTime, ratio);
    })
    .onUpdate(function onUpdate(e) {
      "worklet";
      const ratio = Math.min(1, Math.max(0, e.x / barWidthSV.value));
      gestureRatioSV.value = ratio;
      scheduleOnRN(updateSeekingTime, ratio);
    })
    .onFinalize(function onFinalize(e) {
      "worklet";
      const ratio = Math.min(1, Math.max(0, e.x / barWidthSV.value));
      gestureRatioSV.value = -1;
      scheduleOnRN(commitSeek, ratio);
    });

  const getDisplayRatio = () => {
    "worklet";
    if (gestureRatioSV.value >= 0) return gestureRatioSV.value;
    if (pendingRatioSV.value >= 0) return pendingRatioSV.value;
    return playRatioSV.value;
  };

  const filledBarAnimStyle = useAnimatedStyle(function filledBarAnimStyle() {
    const r = getDisplayRatio();
    return {
      width: Math.min(1, Math.max(0, r)) * barWidthSV.value,
    };
  });

  const dotAnimStyle = useAnimatedStyle(function dotAnimStyle() {
    const r = getDisplayRatio();
    const px = Math.min(1, Math.max(0, r)) * barWidthSV.value;
    return { transform: [{ translateX: px }] };
  });

  const getDisplayTime = () => {
    if (seekingTime !== null) return seekingTime;
    if (pendingSeekRatio !== null) return pendingSeekRatio * duration;
    return currentTime;
  };
  const displayTime = getDisplayTime();

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      barWidthSV.value = event.nativeEvent.layout.width;
    },
    [barWidthSV],
  );

  return (
    <Container disabled={disabled}>
      <TimeCode time={displayTime} disabled={disabled || duration === 0} />
      <GestureDetector gesture={gesture}>
        <TouchArea onLayout={handleLayout}>
          <BarTrack>
            <FilledBar style={filledBarAnimStyle} />
          </BarTrack>
          {disabled ? null : <DotIndicator style={dotAnimStyle} />}
        </TouchArea>
      </GestureDetector>
      <TimeCode time={duration} disabled={disabled || duration === 0} />
    </Container>
  );
};

const TimeCode = ({ time, disabled }: { time: number; disabled: boolean }) => {
  return (
    <TimeCodeText
      variant="P2"
      bold
      text={disabled ? "--:--" : formatSecondsAsMinutesAndSeconds(time)}
      center
    />
  );
};

const TimeCodeText = styled(Typography)({
  width: TIME_CODE_WIDTH,
});

const Container = styled.View<{ disabled: boolean }>(({ disabled }) => ({
  flexDirection: "row",
  alignItems: "center",
  opacity: disabled ? 0.4 : 1,
  width: "100%",
}));

const TouchArea = styled.View(({ theme }) => ({
  flex: 1,
  height: TOUCH_HEIGHT,
  justifyContent: "center",
  marginHorizontal: theme.spacing.m,
}));

const BarTrack = styled.View({
  height: BAR_HEIGHT,
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  borderRadius: BAR_HEIGHT / 2,
  overflow: "hidden",
});

const FilledBar = styled(Animated.View)(({ theme }) => ({
  height: BAR_HEIGHT,
  backgroundColor: theme.colors.white,
  borderRadius: BAR_HEIGHT / 2,
}));

const DotIndicator = styled(Animated.View)(({ theme }) => ({
  position: "absolute",
  left: -DOT_SIZE / 2,
  top: (TOUCH_HEIGHT - DOT_SIZE) / 2,
  width: DOT_SIZE,
  height: DOT_SIZE,
  borderRadius: theme.borderRadius.round,
  backgroundColor: theme.colors.white,
}));
