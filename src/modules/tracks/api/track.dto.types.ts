import { z } from "zod/v4";

const trackType = z.enum(["episode", "bonus", "song", "soundboard"]);

export const trackDtoSchema = z.object({
  id: z.uuid(),
  type: trackType,
  title: z.string(),
  season: z.number().int().nullable(),
  episode_number: z.number().int().nullable(),
  part_number: z.number().int().nullable(),
  r2_path: z.string(),
  created_at: z.string(),
});

export type TrackDto = z.infer<typeof trackDtoSchema>;
export type TrackType = z.infer<typeof trackType>;
