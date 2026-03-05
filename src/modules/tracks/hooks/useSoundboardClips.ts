import { useSuspenseQuery } from "@tanstack/react-query";

import { getSoundboardClips } from "#modules/tracks/api/tracks.service";

const STALE_TIME = 1000 * 60 * 60;

export const useSoundboardClips = () =>
  useSuspenseQuery({
    queryKey: ["tracks", "soundboard"],
    queryFn: getSoundboardClips,
    staleTime: STALE_TIME,
  });
