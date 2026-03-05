import { useLingui } from "@lingui/react/macro";

import { TrackList } from "#modules/tracks/components/TrackList";
import { useSongs } from "#modules/tracks/hooks/useSongs";
import { BaseScreen } from "#shared/components/BaseScreen";

export const SongsScreen = () => {
  const { t } = useLingui();

  return (
    <BaseScreen title={t`Chansons`} withBackButton>
      <SongsScreenContent />
    </BaseScreen>
  );
};

const SongsScreenContent = () => {
  const { data: tracks } = useSongs();

  return <TrackList tracks={tracks} />;
};
