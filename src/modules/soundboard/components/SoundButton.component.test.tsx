import { screen } from "@testing-library/react-native";

import { SoundButton } from "#modules/soundboard/components/SoundButton.component";
import { makeTrack } from "#modules/tracks/mocks/track.mock";
import { renderWithProviders } from "#testing/render";

describe("SoundButton", () => {
  it("renders the clip title", () => {
    const clip = makeTrack({
      type: "soundboard",
      title: "Vous n'aurez pas le trésor",
    });

    renderWithProviders(<SoundButton clip={clip} onPress={jest.fn()} />);

    expect(screen.getByText("Vous n'aurez pas le trésor")).toBeOnTheScreen();
    expect(screen).toMatchComponentSnapshot();
  });
});
