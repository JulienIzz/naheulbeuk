import { z } from "zod/v4";

import { trackDtoSchema } from "#modules/tracks/api/track.dto.types";
import { mapTrackDtoToTrack } from "#modules/tracks/domain/track.mapper";
import type { Track } from "#modules/tracks/domain/track.types";
import { supabase } from "#shared/supabase";

const tracksDtoArraySchema = z.array(trackDtoSchema);

const fetchTracks = async (
  type: string,
  orderBy: { column: string; ascending: boolean }[],
  select = "*",
): Promise<Track[]> => {
  let query = supabase.from("tracks").select(select).eq("type", type);

  for (const { column, ascending } of orderBy) {
    query = query.order(column, { ascending });
  }

  const { data, error } = await query;

  if (error) throw error;

  return tracksDtoArraySchema.parse(data).map(mapTrackDtoToTrack);
};

export const getEpisodes = () =>
  fetchTracks("episode", [
    { column: "season", ascending: true },
    { column: "episode_number", ascending: true },
    { column: "part_number", ascending: true },
  ]);

export const getBonusEpisodes = () =>
  fetchTracks("bonus", [{ column: "title", ascending: true }]);

export const getSongs = () =>
  fetchTracks("song", [{ column: "title", ascending: true }]);

export const getSoundboardClips = () =>
  fetchTracks("soundboard", [{ column: "title", ascending: true }]);
