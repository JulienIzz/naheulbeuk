import { useSuspenseQuery } from "@tanstack/react-query";

import { getEpisodes } from "#modules/tracks/api/tracks.service";

const STALE_TIME = 1000 * 60 * 60;

export const useEpisodes = () =>
  useSuspenseQuery({
    queryKey: ["tracks", "episode"],
    queryFn: getEpisodes,
    staleTime: STALE_TIME,
  });
