import { useLingui } from "@lingui/react/macro";
import { useLocalSearchParams } from "expo-router";

import { TrackList } from "#modules/tracks/components/TrackList";
import { Track } from "#modules/tracks/domain/track.types";
import { useEpisodes } from "#modules/tracks/hooks/useEpisodes";
import { BaseScreen } from "#shared/components/BaseScreen";

export const SeasonScreen = () => {
  const { t } = useLingui();
  const { season } = useLocalSearchParams<{ season: string }>();

  return (
    <BaseScreen title={t`Saison ${season}`} withBackButton>
      <SeasonScreenContent season={season} />
    </BaseScreen>
  );
};

const SeasonScreenContent = ({ season }: { season: string }) => {
  const { data: episodes } = useEpisodes();

  const seasonEpisodes = filterBySeason(episodes, season);

  return <TrackList tracks={seasonEpisodes} />;
};

const filterBySeason = (episodes: Track[], season: string) => {
  const seasonNumber = Number(season);
  return episodes.filter((e) => e.season === seasonNumber);
};
