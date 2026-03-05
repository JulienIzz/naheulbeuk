import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Pressable } from "react-native";

import { Typography } from "#design-system/typography/Typography";
import type { Track } from "#modules/tracks/domain/track.types";

type Props = {
  track: Track;
  onPress: () => void;
  isActive?: boolean;
};

export const TrackListItem = ({ track, onPress, isActive }: Props) => {
  const theme = useTheme();
  const subtitle = formatSubtitle(track);

  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Container isActive={isActive}>
        <Typography
          variant="P1"
          color={theme.colors.secondary}
          text={track.title}
          numberOfLines={1}
        />
        {subtitle !== null ? (
          <Typography
            variant="P2"
            color={theme.colors.secondary}
            text={subtitle}
          />
        ) : null}
      </Container>
    </Pressable>
  );
};

const formatSubtitle = (track: Track): string | null => {
  if (track.season !== null && track.episodeNumber !== null) {
    const part = track.partNumber !== null ? ` · Part ${track.partNumber}` : "";
    return `S${track.season} · E${track.episodeNumber}${part}`;
  }
  return null;
};

const Container = styled.View<{ isActive?: boolean }>(
  ({ isActive, theme }) => ({
    padding: theme.spacing.l,
    gap: theme.spacing.xs,
    backgroundColor: isActive ? theme.colors.active : theme.colors.transparent,
  }),
);
