import { screen } from "@testing-library/react-native";

import { HomeScreen } from "#modules/home/screens/Home.screen";
import { renderWithProviders } from "#testing/render";

jest.mock("#modules/tracks/hooks/useEpisodes", () => ({
  useEpisodes: () => ({
    data: [
      {
        id: "1",
        type: "episode",
        title: "Ep 1",
        season: 1,
        episodeNumber: 1,
        partNumber: null,
        audioUrl: "https://r2.dev/ep1.mp3",
      },
      {
        id: "2",
        type: "episode",
        title: "Ep 2",
        season: 2,
        episodeNumber: 1,
        partNumber: null,
        audioUrl: "https://r2.dev/ep2.mp3",
      },
    ],
  }),
}));

it("shows season cards derived from episodes", async () => {
  renderWithProviders(<HomeScreen />);

  expect(await screen.findByText("Saison 1")).toBeOnTheScreen();
  expect(screen.getByText("Saison 2")).toBeOnTheScreen();
});

it("shows bonus and songs navigation", async () => {
  renderWithProviders(<HomeScreen />);

  expect(await screen.findByText("Bonus")).toBeOnTheScreen();
  expect(screen.getByText("Chansons")).toBeOnTheScreen();
});
