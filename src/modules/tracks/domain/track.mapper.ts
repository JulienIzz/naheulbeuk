import type { TrackDto } from "#modules/tracks/api/track.dto.types";
import type { Track } from "#modules/tracks/domain/track.types";
import { buildR2Url } from "#shared/utils/r2Url";

export const mapTrackDtoToTrack = (dto: TrackDto): Track => ({
  id: dto.id,
  type: dto.type,
  title: dto.title,
  season: dto.season,
  episodeNumber: dto.episode_number,
  partNumber: dto.part_number,
  audioUrl: buildR2Url(dto.r2_path),
});
