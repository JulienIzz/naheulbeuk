import { screen } from "@testing-library/react-native";

import { TrackListItem } from "#modules/tracks/components/TrackListItem.component";
import { makeTrack } from "#modules/tracks/mocks/track.mock";
import { renderWithProviders } from "#testing/render";

it("renders an episode track", () => {
  renderWithProviders(
    <TrackListItem track={makeTrack()} onPress={jest.fn()} />,
  );

  expect(screen).toMatchComponentSnapshot();
});

it("renders a song track without season info", () => {
  renderWithProviders(
    <TrackListItem
      track={makeTrack({
        type: "song",
        title: "A Song",
        season: null,
        episodeNumber: null,
      })}
      onPress={jest.fn()}
    />,
  );

  expect(screen).toMatchComponentSnapshot();
});

it("renders active state", () => {
  renderWithProviders(
    <TrackListItem track={makeTrack()} onPress={jest.fn()} isActive />,
  );

  expect(screen).toMatchComponentSnapshot();
});
