import styled from "@emotion/native";
import { useTheme } from "@emotion/react";

import { WoodenPressable } from "#design-system/components/TexturedComponents";
import { Typography } from "#design-system/typography/Typography";
import type { Track } from "#modules/tracks/domain/track.types";

type Props = {
  clip: Track;
  onPress: (_clip: Track) => void;
};

export const SoundButton = ({ clip, onPress }: Props) => {
  const theme = useTheme();

  return (
    <Wrapper>
      <StyledPressable
        onPress={() => onPress(clip)}
        accessibilityRole="button"
        accessibilityLabel={clip.title}
      >
        <Typography
          variant="P2"
          text={clip.title}
          color={theme.colors.primary}
          center
          numberOfLines={0}
        />
      </StyledPressable>
    </Wrapper>
  );
};

const Wrapper = styled.View({
  flex: 1,
});

const StyledPressable = styled(WoodenPressable)(({ theme }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.borderRadius.m,
  paddingVertical: theme.spacing.l,
  paddingHorizontal: theme.spacing.m,
  minHeight: 80,
}));
