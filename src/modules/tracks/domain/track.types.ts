import type { TrackType } from "#modules/tracks/api/track.dto.types";

export type Track = {
  id: string;
  type: TrackType;
  title: string;
  season: number | null;
  episodeNumber: number | null;
  partNumber: number | null;
  audioUrl: string;
};
