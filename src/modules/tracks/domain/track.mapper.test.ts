import { mapTrackDtoToTrack } from "#modules/tracks/domain/track.mapper";
import { makeDto } from "#modules/tracks/mocks/track.mock";

it("maps snake_case DTO fields to camelCase domain fields", () => {
  const track = mapTrackDtoToTrack(makeDto());

  expect(track.episodeNumber).toBe(1);
  expect(track.partNumber).toBeNull();
});

it("builds audioUrl from r2_path", () => {
  const track = mapTrackDtoToTrack(makeDto({ r2_path: "songs/test.mp3" }));

  expect(track.audioUrl).toMatchInlineSnapshot(
    `"https://pub-b2080dc457b840d2b6ddeef1a326efb0.r2.dev/songs/test.mp3"`,
  );
});

it("drops created_at from the domain object", () => {
  const track = mapTrackDtoToTrack(makeDto());

  expect(track).not.toHaveProperty("created_at");
  expect(track).not.toHaveProperty("createdAt");
});

it("preserves all other fields", () => {
  const track = mapTrackDtoToTrack(makeDto());

  expect(track).toMatchInlineSnapshot(`
    {
      "audioUrl": "https://pub-b2080dc457b840d2b6ddeef1a326efb0.r2.dev/audio/s1/ep1.mp3",
      "episodeNumber": 1,
      "id": "abc-123",
      "partNumber": null,
      "season": 1,
      "title": "Episode 1",
      "type": "episode",
    }
  `);
});
