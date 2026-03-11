import { screen } from "@testing-library/react-native";

import { SoundboardScreen } from "#modules/soundboard/screens/Soundboard.screen";
import { renderWithProviders } from "#testing/render";

jest.mock("#modules/tracks/hooks/useSoundboardClips", () => ({
  useSoundboardClips: () => ({
    data: [
      {
        id: "clip-1",
        type: "soundboard",
        title: "Vous n'aurez pas le trésor",
        season: null,
        episodeNumber: null,
        partNumber: null,
        audioUrl: "https://r2.dev/clip1.mp3",
      },
      {
        id: "clip-2",
        type: "soundboard",
        title: "On n'est pas des demi-portions",
        season: null,
        episodeNumber: null,
        partNumber: null,
        audioUrl: "https://r2.dev/clip2.mp3",
      },
      {
        id: "clip-3",
        type: "soundboard",
        title: "C'est de la merde",
        season: null,
        episodeNumber: null,
        partNumber: null,
        audioUrl: "https://r2.dev/clip3.mp3",
      },
    ],
  }),
}));

describe("SoundboardScreen", () => {
  it("renders the soundboard grid", () => {
    renderWithProviders(<SoundboardScreen />);

    expect(screen.getByText("Soundboard")).toBeOnTheScreen();
    expect(screen.getByText("Vous n'aurez pas le trésor")).toBeOnTheScreen();
    expect(
      screen.getByText("On n'est pas des demi-portions"),
    ).toBeOnTheScreen();
    expect(screen.getByText("C'est de la merde")).toBeOnTheScreen();
    expect(screen).toMatchComponentSnapshot();
  });
});
