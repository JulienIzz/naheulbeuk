import { buildR2Url } from "#shared/utils/r2Url";

it("builds a full R2 URL from a path", () => {
  expect(buildR2Url("audio/episode-1.mp3")).toMatchInlineSnapshot(
    `"https://pub-b2080dc457b840d2b6ddeef1a326efb0.r2.dev/audio/episode-1.mp3"`,
  );
});

it("handles paths without leading slash", () => {
  expect(buildR2Url("songs/song.mp3")).toMatchInlineSnapshot(
    `"https://pub-b2080dc457b840d2b6ddeef1a326efb0.r2.dev/songs/song.mp3"`,
  );
});
