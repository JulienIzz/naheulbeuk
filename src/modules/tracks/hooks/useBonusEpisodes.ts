import { useSuspenseQuery } from "@tanstack/react-query";

import { getBonusEpisodes } from "#modules/tracks/api/tracks.service";

const STALE_TIME = 1000 * 60 * 60;

export const useBonusEpisodes = () =>
  useSuspenseQuery({
    queryKey: ["tracks", "bonus"],
    queryFn: getBonusEpisodes,
    staleTime: STALE_TIME,
  });
