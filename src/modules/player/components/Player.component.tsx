import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLingui } from "@lingui/react/macro";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconButton } from "#design-system/components/IconButton";
import { WoodenView } from "#design-system/components/TexturedComponents";
import { Typography } from "#design-system/typography/Typography";
import { ProgressBar } from "#modules/player/components/ProgressBar.component";
import { usePlayer } from "#modules/player/hooks/usePlayer";
import { Track } from "#modules/tracks/domain/track.types";
import { Row } from "#shared/components/GenericComponents";

export const Player = () => {
  const { bottom } = useSafeAreaInsets();
  const { currentTrack, currentTime, duration, seekTo } = usePlayer();

  return (
    <PlayerContainer bottomInset={bottom}>
      <TrackInfo track={currentTrack} />
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        disabled={currentTrack === null}
        seekTo={seekTo}
      />
      <ButtonContainer>
        <PreviousButton />
        <PlayPauseButton />
        <NextButton />
      </ButtonContainer>
    </PlayerContainer>
  );
};

const TrackInfo = ({ track }: { track: Track | null }) => {
  const { t } = useLingui();

  if (!track) {
    return (
      <View>
        <TrackText variant="P1" text={t`Aucune piste en cours`} bold center />
      </View>
    );
  }

  const subtitle =
    track.season !== null && track.episodeNumber !== null
      ? `S${track.season} · E${track.episodeNumber}`
      : null;

  return (
    <Row>
      {subtitle ? <TrackText variant="P2" text={subtitle} center /> : null}
      <TrackText
        variant="P1"
        text={track.title}
        bold
        center
        numberOfLines={1}
      />
    </Row>
  );
};

const PlayPauseButton = () => {
  const { isPlaying, play, pause, currentTrack } = usePlayer();
  const { t } = useLingui();
  const theme = useTheme();

  const disabled = !currentTrack;

  return (
    <IconButton
      onPress={isPlaying ? pause : play}
      disabled={disabled}
      accessibilityLabel={isPlaying ? t`Pause` : t`Lecture`}
      icon={
        isPlaying ? (
          <MaterialIcons
            name="pause-circle"
            color={theme.colors.primary}
            size={theme.icons.l}
          />
        ) : (
          <MaterialIcons
            name="play-circle"
            color={theme.colors.primary}
            size={theme.icons.l}
          />
        )
      }
    />
  );
};

const NextButton = () => {
  const { playNext, hasNext, currentTrack } = usePlayer();
  const { t } = useLingui();
  const theme = useTheme();

  const disabled = !hasNext || !currentTrack;

  return (
    <IconButton
      onPress={playNext}
      disabled={disabled}
      accessibilityLabel={t`Suivant`}
      icon={
        <MaterialIcons
          name="skip-next"
          color={theme.colors.primary}
          size={theme.icons.m}
        />
      }
    />
  );
};

const PreviousButton = () => {
  const { playPrevious, hasPrevious, currentTrack } = usePlayer();
  const { t } = useLingui();
  const theme = useTheme();

  const disabled = !hasPrevious || !currentTrack;

  return (
    <IconButton
      onPress={playPrevious}
      disabled={disabled}
      accessibilityLabel={t`Précédent`}
      icon={
        <MaterialIcons
          name="skip-previous"
          color={theme.colors.primary}
          size={theme.icons.m}
        />
      }
    />
  );
};

const TrackText = styled(Typography)(({ theme }) => ({
  padding: theme.spacing.s,
}));

const ButtonContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing.xxxl,
}));

const PlayerContainer = styled(WoodenView)<{ bottomInset: number }>(
  ({ bottomInset, theme }) => ({
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: theme.spacing.s,
    borderTopColor: theme.colors.wood,
    padding: theme.spacing.xl,
    paddingBottom:
      bottomInset > theme.spacing.l
        ? theme.spacing.l + bottomInset
        : theme.spacing.xl,
  }),
);
