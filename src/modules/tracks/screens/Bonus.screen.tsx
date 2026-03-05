import { useLingui } from "@lingui/react/macro";

import { TrackList } from "#modules/tracks/components/TrackList";
import { useBonusEpisodes } from "#modules/tracks/hooks/useBonusEpisodes";
import { BaseScreen } from "#shared/components/BaseScreen";

export const BonusScreen = () => {
  const { t } = useLingui();

  return (
    <BaseScreen title={t`Bonus`} withBackButton>
      <BonusScreenContent />
    </BaseScreen>
  );
};

const BonusScreenContent = () => {
  const { data: tracks } = useBonusEpisodes();

  return <TrackList tracks={tracks} />;
};
