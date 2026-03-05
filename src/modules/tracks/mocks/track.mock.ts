import type { TrackDto } from "#modules/tracks/api/track.dto.types";
import type { Track } from "#modules/tracks/domain/track.types";

export const makeDto = (overrides?: Partial<TrackDto>): TrackDto => ({
  id: "abc-123",
  type: "episode",
  title: "Episode 1",
  season: 1,
  episode_number: 1,
  part_number: null,
  r2_path: "audio/s1/ep1.mp3",
  created_at: "2024-01-01T00:00:00Z",
  ...overrides,
});

export const makeTrack = (overrides?: Partial<Track>): Track => ({
  id: "abc-123",
  type: "episode",
  title: "Episode 1 - The Beginning",
  season: 1,
  episodeNumber: 1,
  partNumber: null,
  audioUrl: "https://r2.dev/ep1.mp3",
  ...overrides,
});
