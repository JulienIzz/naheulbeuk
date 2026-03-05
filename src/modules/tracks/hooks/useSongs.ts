import { useSuspenseQuery } from "@tanstack/react-query";

import { getSongs } from "#modules/tracks/api/tracks.service";

const STALE_TIME = 1000 * 60 * 60;

export const useSongs = () =>
  useSuspenseQuery({
    queryKey: ["tracks", "song"],
    queryFn: getSongs,
    staleTime: STALE_TIME,
  });
